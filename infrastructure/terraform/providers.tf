# ============================================================================
# Cloudflare Provider 配置 (项目记忆硬约束对齐)
#   * 在 Cloudflare Provider v4 中，account_id / api_token 优先通过
#     环境变量 CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_API_TOKEN 或 TF_VAR_*
#     注入，而不是 provider 块内的字段 (provider 块本身不接受
#     account_id 这一顶层属性；账户级资源通过 account_id resource
#     参数或 cloudflare_accounts data source 解析)。
#   * 为同时兼容 TF_VAR_* 与 CLOUDFLARE_* 两套命名，这里通过 locals
#     映射到 CLOUDFLARE_* 环境变量。
#   * 默认不配置远程后端，便于 PR 阶段在无凭证时即可跑 fmt/validate/plan。
# ============================================================================

provider "cloudflare" {
  # 鉴权走环境变量:
  #   export CLOUDFLARE_ACCOUNT_ID  (或 TF_VAR_account_id)
  #   export CLOUDFLARE_API_TOKEN   (或 TF_VAR_api_token)
}
