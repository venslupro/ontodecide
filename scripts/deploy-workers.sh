#!/usr/bin/env bash
# ============================================================
# CI/CD Worker Deployment Script
#
# Runs AFTER `terraform apply` succeeds to deploy Worker code
# bundles.  Replaces the Cloudflare Workers Builds Dashboard
# integration with a version-controlled CI/CD pipeline.
#
# Prerequisites:
#   1. `terraform apply` has succeeded (resources exist).
#   2. Terraform state is accessible (terraform init done).
#   3. CLOUDFLARE_API_TOKEN is set.
#   4. Code has been built (pnpm turbo run build).
#
# This script:
#   1. Reads `terraform output -json` for real resource IDs.
#   2. Substitutes REPLACE_WITH_* placeholders in each
#      wrangler.toml (KV IDs, D1 ID, Neo4j host, workers.dev
#      subdomain).
#   3. Deploys each Worker via `wrangler deploy --config`.
#   4. Sets runtime secrets via `wrangler secret put`.
#
# The placeholder substitution relies on the comment annotations
# in each wrangler.toml:
#   id = "REPLACE_WITH_KV_ID"   # ... kv_namespaces["<key>"]
# Each comment uniquely identifies which Terraform output to use.
#
# Usage:
#   ./scripts/deploy-workers.sh                     # deploy all 6
#   ./scripts/deploy-workers.sh --dry-run           # substitute + print, no deploy
#   ./scripts/deploy-workers.sh --skip-secrets       # deploy without setting secrets
#   ./scripts/deploy-workers.sh gateway               # deploy only gateway
# ============================================================
set -euo pipefail

# --- Parse args ---------------------------------------------------------
DRY_RUN=0
SKIP_SECRETS=0
TARGET_WORKER=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)      DRY_RUN=1; shift ;;
    --skip-secrets) SKIP_SECRETS=1; shift ;;
    -h|--help)
      sed -n '2,/^set -euo/p' "$0" | sed 's/^# \?//'
      exit 0 ;;
    *) TARGET_WORKER="$1"; shift ;;
  esac
done

# --- Config -------------------------------------------------------------
TF_DIR="${TF_DIR:-infrastructure/terraform}"
ALL_WORKERS=(gateway user graph ingestion ai cleanup)

if [[ -n "${TARGET_WORKER}" ]]; then
  WORKERS=("${TARGET_WORKER}")
else
  WORKERS=("${ALL_WORKERS[@]}")
fi

# Validate target
for w in "${WORKERS[@]}"; do
  found=0
  for a in "${ALL_WORKERS[@]}"; do [[ "$a" == "$w" ]] && found=1; done
  [[ "$found" -eq 0 ]] && { echo "Unknown worker: $w" >&2; exit 1; }
done

# --- Read Terraform outputs ---------------------------------------------
echo "==> Reading Terraform outputs..."
RAW="$(terraform -chdir="${TF_DIR}" output -json)"

D1_ID="$(jq -r '.d1_database_id.value' <<<"${RAW}")"

# Extract all KV namespace IDs into an associative array.
declare -A KV_IDS
while IFS=$'\t' read -r key val; do
  KV_IDS["$key"]="$val"
done < <(jq -r '.kv_namespaces.value | to_entries[] | [.key, .value] | @tsv' <<<"${RAW}")

echo "    D1 database ID: ${D1_ID}"
echo "    KV namespaces:  ${#KV_IDS[@]} found"
for k in "${!KV_IDS[@]}"; do
  echo "      ${k} → ${KV_IDS[$k]}"
done

# --- Extract Neo4j host from full URL ----------------------------------
# Input forms: https://abc123.databases.neo4j.io
#              neo4j+s://abc123.databases.neo4j.io
# Output:      abc123
NEO4J_HOST=""
if [[ -n "${NEO4J_URL:-}" ]]; then
  NEO4J_HOST="$(echo "${NEO4J_URL}" | sed -E 's|^[a-z+]+://||; s|\.databases\.neo4j\.io$||')"
  echo "    Neo4j host: ${NEO4J_HOST}"
else
  echo "    WARNING: NEO4J_URL not set — REPLACE_WITH_AURADB_HOST will not be substituted"
fi

# Workers.dev subdomain
WORKERS_DEV="${WORKERS_DEV_SUBDOMAIN:-}"
echo "    Workers.dev: ${WORKERS_DEV:-<not set>}"

# ============================================================
# Placeholder substitution
#
# Each wrangler.toml contains these placeholders:
#   REPLACE_WITH_D1_ID               — D1 database ID (global sed)
#   REPLACE_WITH_KV_ID                — KV namespace ID (per-line sed
#                                        using the comment annotation
#                                        kv_namespaces["<key>"])
#   REPLACE_WITH_AURADB_HOST          — Neo4j AuraDB host (global sed)
#   <ACCOUNT-SUBDOMAIN>               — workers.dev subdomain (global sed)
# ============================================================
substitute_placeholders() {
  local toml="$1"

  echo "  Substituting placeholders in ${toml}"

  # D1 database ID — global replace (unique per file)
  sed -i "s|REPLACE_WITH_D1_ID|${D1_ID}|g" "${toml}"

  # KV namespace IDs — per-line replace using the comment annotation.
  # Each line looks like:
  #   id = "REPLACE_WITH_KV_ID"   # Terraform output key: kv_namespaces["user-cache"]
  # The sed address matches the kv_namespaces["X"] comment and replaces
  # REPLACE_WITH_KV_ID only on that line.
  for kv_key in "${!KV_IDS[@]}"; do
    local kv_id="${KV_IDS[$kv_key]}"
    # Escape any sed-special chars in kv_key (hyphens are fine with |)
    sed -i "/kv_namespaces\[\"${kv_key}\"\"]/ s|REPLACE_WITH_KV_ID|${kv_id}|" "${toml}"
  done

  # Neo4j AuraDB host
  if [[ -n "${NEO4J_HOST}" ]]; then
    sed -i "s|REPLACE_WITH_AURADB_HOST|${NEO4J_HOST}|g" "${toml}"
  fi

  # Workers.dev subdomain
  if [[ -n "${WORKERS_DEV}" ]]; then
    sed -i "s|<ACCOUNT-SUBDOMAIN>|${WORKERS_DEV}|g" "${toml}"
  fi
}

# ============================================================
# Per-Worker secret mapping
#
# Values are read from environment variables.  In CI these are
# mapped from GitHub Secrets:
#   JWT_SECRET            ← secrets.TF_VAR_jwt_secret
#   NEO4J_PASSWORD        ← secrets.TF_VAR_neo4j_password
#   B2_KEY_ID             ← secrets.TF_VAR_b2_application_key_id
#   B2_KEY                ← secrets.TF_VAR_b2_application_key
#
# LLM API keys (OPENAI_API_KEY, etc.) are NOT set here — add them
# as GitHub Secrets and extend WORKER_SECRETS if needed.
# ============================================================
declare -A WORKER_SECRETS
WORKER_SECRETS[gateway]="JWT_SECRET"
WORKER_SECRETS[user]="JWT_SECRET NEO4J_PASSWORD"
WORKER_SECRETS[graph]="JWT_SECRET NEO4J_PASSWORD"
WORKER_SECRETS[ingestion]="JWT_SECRET B2_KEY_ID B2_KEY"
WORKER_SECRETS[ai]="JWT_SECRET"
WORKER_SECRETS[cleanup]="JWT_SECRET NEO4J_PASSWORD B2_KEY_ID B2_KEY"

set_secret() {
  local toml="$1"
  local secret_name="$2"
  local secret_value="${!secret_name:-}"

  if [[ -z "${secret_value}" ]]; then
    echo "    SKIP ${secret_name} (env var not set)"
    return 0
  fi

  printf '%s' "${secret_value}" | npx wrangler secret put "${secret_name}" --config "${toml}" 2>&1 | sed 's/^/      /'
}

# --- Deploy loop --------------------------------------------------------
for worker in "${WORKERS[@]}"; do
  TOML="apps/api/${worker}/wrangler.toml"

  echo ""
  echo "==> Processing Worker: ${worker} (${TOML})"

  if [[ ! -f "${TOML}" ]]; then
    echo "  ERROR: wrangler.toml not found at ${TOML}" >&2
    exit 1
  fi

  substitute_placeholders "${TOML}"

  if [[ "${DRY_RUN}" -eq 1 ]]; then
    echo "  [DRY-RUN] Skipping deploy. Patched wrangler.toml:"
    grep -n 'id\|database_id\|NEO4J_URL\|workers.dev' "${TOML}" | sed 's/^/    /'
    continue
  fi

  # Deploy Worker code bundle
  echo "  Deploying..."
  npx wrangler deploy --config "${TOML}"

  # Set runtime secrets
  if [[ "${SKIP_SECRETS}" -eq 0 ]]; then
    echo "  Setting secrets..."
    for secret_name in ${WORKER_SECRETS[$worker]}; do
      set_secret "${TOML}" "${secret_name}"
    done
  fi

  echo "  Done: ${worker}"
done

echo ""
echo "==> All Workers deployed successfully."
