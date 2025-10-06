# Codex CLI Notes (Draft)

Status: Reference for installing/using Codex locally with this project.

## Install
- npm: `npm install -g @openai/codex`
- Homebrew (macOS): `brew install codex`
- Run: `codex`

## Sign In
- Prefer “Sign in with ChatGPT” in the Codex splash.
- API key mode also works; see Codex docs if needed.

## Config Location
- File: `~/.codex/config.toml`
- Example baseline:
```
[ui]
telemetry = true

[approvals]
# Options: on-request | on-failure | never | untrusted
policy = "on-request"

[sandbox]
# Filesystem: workspace-write | read-only | danger-full-access
filesystem = "workspace-write"
# Network: on | off
network = "on"

[mcp_servers]
# Add MCP servers here (see below)
```

## MCP Servers
- Cloudflare Workers Bindings (remote OAuth):
```
[mcp_servers.cloudflare]
command = "npx"
args = ["mcp-remote", "https://bindings.mcp.cloudflare.com/sse"]
```
- Firecrawl (replace with your method; remote or local):
```
[mcp_servers.firecrawl]
# Remote example
# command = "npx"
# args = ["mcp-remote", "https://<your-firecrawl-mcp-remote>/sse"]
# Local/binary example
command = "firecrawl-mcp"

[mcp_servers.firecrawl.env]
FIRECRAWL_API_KEY = "fc-***"
```
- After editing config, restart Codex and complete any OAuth prompts.

## Useful Commands
- Start interactive: `codex`
- Non-interactive run: `codex exec -p "your prompt"`
- Verbose/tracing: `codex --verbose`

## Agents and Memory
- `/agents` shows available agents (if your UI supports it); MCP servers are configured via config, not `/agents`.
- Long-term instructions live in `AGENTS.md` if used. This repo does not include AGENTS.md yet.

## Project Defaults (recommended)
- Approvals: `on-request` for write/network actions.
- Filesystem: `workspace-write` to confine changes to this repo.
- Network: `on` only when needed for MCP/installs; otherwise keep restricted.

## Safety Notes
- Treat Cloudflare `*_delete` and Firecrawl wide crawls as destructive/expensive—run in staging and log actions.
- Never commit secrets. Keep API keys in local config or env.
