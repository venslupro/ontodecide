#!/usr/bin/env bash
# ============================================================
# Set runtime secrets for a single Worker via `wrangler secret put`.
#
# Called AFTER cloudflare/wrangler-action deploys the Worker code.
# Reads secret values from environment variables (set by the CI job
# from GitHub Secrets) and pushes them to the Worker.
#
# Per-Worker secret mapping:
#   gateway   : JWT_SECRET
#   user      : JWT_SECRET NEO4J_PASSWORD
#   graph     : JWT_SECRET NEO4J_PASSWORD
#   ingestion : JWT_SECRET B2_KEY_ID B2_KEY
#   ai        : JWT_SECRET
#   cleanup   : JWT_SECRET NEO4J_PASSWORD B2_KEY_ID B2_KEY
#
# Usage:
#   ./scripts/set-worker-secrets.sh <worker>
#   ./scripts/set-worker-secrets.sh gateway
# ============================================================
set -euo pipefail

TARGET_WORKER="${1:-}"

if [[ -z "${TARGET_WORKER}" ]]; then
  echo "Missing required argument: <worker>" >&2
  exit 1
fi

ALL_WORKERS=(gateway user graph ingestion ai cleanup)
found=0
for a in "${ALL_WORKERS[@]}"; do [[ "$a" == "${TARGET_WORKER}" ]] && found=1; done
[[ "$found" -eq 0 ]] && { echo "Unknown worker: ${TARGET_WORKER}" >&2; exit 1; }

TOML="apps/api/${TARGET_WORKER}/wrangler.toml"
if [[ ! -f "${TOML}" ]]; then
  echo "ERROR: wrangler.toml not found at ${TOML}" >&2
  exit 1
fi

# --- Per-Worker secret mapping -----------------------------------------
declare -A WORKER_SECRETS
WORKER_SECRETS[gateway]="JWT_SECRET"
WORKER_SECRETS[user]="JWT_SECRET NEO4J_PASSWORD"
WORKER_SECRETS[graph]="JWT_SECRET NEO4J_PASSWORD"
WORKER_SECRETS[ingestion]="JWT_SECRET B2_KEY_ID B2_KEY"
WORKER_SECRETS[ai]="JWT_SECRET"
WORKER_SECRETS[cleanup]="JWT_SECRET NEO4J_PASSWORD B2_KEY_ID B2_KEY"

echo "==> Setting secrets for Worker: ${TARGET_WORKER}"

set_secret() {
  local secret_name="$1"
  local secret_value="${!secret_name:-}"

  if [[ -z "${secret_value}" ]]; then
    echo "    SKIP ${secret_name} (env var not set)"
    return 0
  fi

  echo "    Setting ${secret_name}..."
  printf '%s' "${secret_value}" | npx wrangler secret put "${secret_name}" --config "${TOML}"
}

for secret_name in ${WORKER_SECRETS[$TARGET_WORKER]}; do
  set_secret "${secret_name}"
done

echo "  Done: ${TARGET_WORKER} secrets set."
