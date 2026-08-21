#!/usr/bin/env bash
# ============================================================
# Substitute Terraform output IDs into a Worker's wrangler.toml.
#
# Reads `terraform output -json` and replaces REPLACE_WITH_*
# placeholders in the target wrangler.toml with real resource IDs.
# Called BEFORE cloudflare/wrangler-action runs the actual deploy.
#
# Placeholder substitution relies on the comment annotations in each
# wrangler.toml:
#   id = "REPLACE_WITH_KV_ID"   # ... kv_namespaces["<key>"]
# Each comment uniquely identifies which Terraform output to use.
#
# Usage:
#   ./scripts/substitute-bindings.sh <worker>
#   ./scripts/substitute-bindings.sh gateway
#   ./scripts/substitute-bindings.sh --dry-run gateway
# ============================================================
set -euo pipefail

DRY_RUN=0
TARGET_WORKER=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run) DRY_RUN=1; shift ;;
    -h|--help)
      sed -n '2,/^set -euo/p' "$0" | sed 's/^# \?//'
      exit 0 ;;
    *) TARGET_WORKER="$1"; shift ;;
  esac
done

ALL_WORKERS=(gateway user graph ingestion ai cleanup)

if [[ -z "${TARGET_WORKER}" ]]; then
  echo "Missing required argument: <worker>" >&2
  echo "Valid: ${ALL_WORKERS[*]}" >&2
  exit 1
fi

found=0
for a in "${ALL_WORKERS[@]}"; do [[ "$a" == "${TARGET_WORKER}" ]] && found=1; done
[[ "$found" -eq 0 ]] && { echo "Unknown worker: ${TARGET_WORKER}" >&2; exit 1; }

TF_DIR="${TF_DIR:-infrastructure/terraform}"
TOML="apps/api/${TARGET_WORKER}/wrangler.toml"

if [[ ! -f "${TOML}" ]]; then
  echo "ERROR: wrangler.toml not found at ${TOML}" >&2
  exit 1
fi

# --- Read Terraform outputs ---------------------------------------------
echo "==> Reading Terraform outputs for Worker: ${TARGET_WORKER}"
RAW="$(terraform -chdir="${TF_DIR}" output -json)"

D1_ID="$(jq -r '.d1_database_id.value' <<<"${RAW}")"

declare -A KV_IDS
while IFS=$'\t' read -r key val; do
  KV_IDS["$key"]="$val"
done < <(jq -r '.kv_namespaces.value | to_entries[] | [.key, .value] | @tsv' <<<"${RAW}")

echo "    D1 database ID: ${D1_ID}"
echo "    KV namespaces:  ${#KV_IDS[@]} found"

# --- Extract Neo4j host from full URL ----------------------------------
NEO4J_HOST=""
if [[ -n "${NEO4J_URL:-}" ]]; then
  NEO4J_HOST="$(echo "${NEO4J_URL}" | sed -E 's|^[a-z+]+://||; s|\.databases\.neo4j\.io$||')"
  echo "    Neo4j host: ${NEO4J_HOST}"
else
  echo "    WARNING: NEO4J_URL not set — REPLACE_WITH_AURADB_HOST not substituted"
fi

WORKERS_DEV="${WORKERS_DEV_SUBDOMAIN:-}"
echo "    Workers.dev: ${WORKERS_DEV:-<not set>}"

# --- Substitute placeholders --------------------------------------------
echo "  Substituting placeholders in ${TOML}"

if [[ "${DRY_RUN}" -eq 1 ]]; then
  echo "  [DRY-RUN] No changes applied. Would substitute:"
  echo "    D1_ID=${D1_ID}"
  echo "    NEO4J_HOST=${NEO4J_HOST}"
  echo "    WORKERS_DEV=${WORKERS_DEV}"
  exit 0
fi

# D1 database ID — global replace
sed -i "s|REPLACE_WITH_D1_ID|${D1_ID}|g" "${TOML}"

# KV namespace IDs — per-line replace using the comment annotation.
for kv_key in "${!KV_IDS[@]}"; do
  local_kv_id="${KV_IDS[$kv_key]}"
  sed -i "/kv_namespaces\[\"${kv_key}\"\"]/ s|REPLACE_WITH_KV_ID|${local_kv_id}|" "${TOML}"
done

# Neo4j AuraDB host
if [[ -n "${NEO4J_HOST}" ]]; then
  sed -i "s|REPLACE_WITH_AURADB_HOST|${NEO4J_HOST}|g" "${TOML}"
fi

# Workers.dev subdomain
if [[ -n "${WORKERS_DEV}" ]]; then
  sed -i "s|<ACCOUNT-SUBDOMAIN>|${WORKERS_DEV}|g" "${TOML}"
fi

echo "  Done: ${TARGET_WORKER} placeholders substituted."
