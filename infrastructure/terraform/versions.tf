terraform {
  required_version = ">= 1.9.0"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.40"
    }
  }

  # ──────────────────────────────────────────────────────────
  # Remote state backend: Backblaze B2 (S3-compatible)
  #
  # PARTIAL config — bucket / endpoint / region are injected
  # via `-backend-config` flags in CI (terraform.yml) and via
  # a local backend_override.tf for local dev. Credentials
  # come from AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY env
  # vars (reusing B2_KEY_ID / B2_KEY GitHub secrets).
  #
  # This ensures state persists across CI runs so that:
  #   • `terraform plan` shows real diff (not "+create" for all)
  #   • `terraform apply` doesn't fail on "resource already exists"
  # ──────────────────────────────────────────────────────────
  backend "s3" {
    key = "ontodecide/terraform.tfstate"

    skip_credentials_validation = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
  }
}
