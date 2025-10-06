# MCP Servers (Cloudflare Bindings + Firecrawl)

Status: Documentation only. This file describes how we use MCP servers in Cursor/Codex and how they fit our project. Safe to modify.

## Overview

We use two Model Context Protocol (MCP) servers:

- Cloudflare Workers Bindings MCP (remote over OAuth) — manage Workers Platform resources (Accounts, KV, Workers, R2, D1, Hyperdrive).
- Firecrawl MCP — high-quality scraping/crawling/extraction for RAG/ETL with flexible formats and automation actions.

Cursor stores MCP client configuration outside the repo (e.g., in its Settings UI or a user config like `~/.cursor/mcp.json`). Snippets below show how to register these servers with placeholders.

---

## Cloudflare Workers Bindings MCP

Purpose: Manage Cloudflare resources directly from the MCP client with OAuth.

Official remote URL: `https://bindings.mcp.cloudflare.com/sse`

Client config (Cursor):

```
{
  "mcpServers": {
    "cloudflare": {
      "command": "npx",
      "args": ["mcp-remote", "https://bindings.mcp.cloudflare.com/sse"]
    }
  }
}
```

Setup
- Restart the MCP client (Cursor). A browser window opens for Cloudflare OAuth.
- Complete the auth flow; tools will appear under the `cloudflare` server.

Available tools (subset; destructive actions marked):
- Accounts: `accounts_list`, `set_active_account`
- KV Namespaces: `kv_namespaces_list`, `kv_namespace_create` (write), `kv_namespace_get`, `kv_namespace_update` (write), `kv_namespace_delete` (delete)
- Workers: `workers_list`, `workers_get_worker`, `workers_get_worker_code`
- R2 Buckets: `r2_buckets_list`, `r2_bucket_create` (write), `r2_bucket_get`, `r2_bucket_delete` (delete)
- D1 Databases: `d1_databases_list`, `d1_database_create` (write), `d1_database_get`, `d1_database_query`, `d1_database_delete` (delete)
- Hyperdrive: `hyperdrive_configs_list`, `hyperdrive_config_create` (write), `hyperdrive_config_get`, `hyperdrive_config_edit` (write), `hyperdrive_config_delete` (delete)

Safety notes
- Always run `set_active_account` with the intended account ID before write/delete operations.
- Treat all `*_delete` tools as production-impacting; prefer staging and confirm identifiers.
- Capture outputs for audit; avoid storing secrets in prompts.

Prompt examples
- “List my Cloudflare accounts, then set active to `<ACCOUNT_ID>`.”
- “Show KV namespaces; create one called `my-kv-store`.”
- “List Workers; get code for `my-worker-script`.”
- “Create R2 bucket `my-new-bucket`, then get details.”
- “Create D1 `analytics-db`; run `SELECT * FROM customers LIMIT 10;`.”
- “List Hyperdrive configs; create `prod-db-cache`.”

Project fit
- Potential use: R2 for images; KV for caching; Workers for PG-13 masking/blur transforms; D1/Hyperdrive for experiments.
- Keep separation-of-concerns with Convex; document any adopted Cloudflare resources and migration paths.

---

## Firecrawl MCP

Purpose: Robust web/PDF scraping, crawling, mapping, and JSON extraction for RAG/ingestion.

Auth
- Requires `FIRECRAWL_API_KEY` (looks like `fc-...`). Store outside the repo (e.g., in Cursor MCP env or system keychain).

Client config (examples — confirm your exact server entry)

Remote via mcp-remote:
```
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["mcp-remote", "https://<your-firecrawl-mcp-remote>/sse"],
      "env": { "FIRECRAWL_API_KEY": "fc-***" }
    }
  }
}
```

Local/binary server:
```
{
  "mcpServers": {
    "firecrawl": {
      "command": "firecrawl-mcp",
      "env": { "FIRECRAWL_API_KEY": "fc-***" }
    }
  }
}
```

Key endpoints and options (from docs)
- `POST /v2/scrape` (single page)
  - `formats`: ["markdown", "links", "html", "rawHtml", "summary"] or objects `{ type: "json" | "screenshot" | "changeTracking", ... }`
  - `onlyMainContent` (default true), `includeTags`, `excludeTags`
  - `waitFor` (ms), `timeout` (ms), `maxAge` (ms, cache; 0 for fresh)
  - `parsers`: ["pdf"] for PDF parsing
  - `actions`: scripted steps before scrape (`wait`, `click`, `write`, `press`, `scroll`, `scrape`, `executeJavascript`, `pdf`)
- `POST /v2/extract` (async extraction job)
  - Provide `urls`, `prompt`, and JSON `schema`; poll with `getExtractStatus`
- `POST /v2/crawl` (multi-page)
  - Options: `includePaths`, `excludePaths`, `maxDiscoveryDepth`, `limit`, `crawlEntireDomain`, `allowExternalLinks`, `allowSubdomains`, `delay`, `scrapeOptions`
  - `GET /v2/crawl/{id}` to check status; `next` for pagination
- `POST /v2/map` (discover related URLs)
  - Options: `search`, `limit` (default 100), `sitemap` ("only" | "include" | "skip"), `includeSubdomains` (default true)

Usage examples (cURL)
```
curl -X POST https://api.firecrawl.dev/v2/scrape \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer fc-YOUR-API-KEY' \
  -d '{
    "url": "https://docs.firecrawl.dev",
    "formats": ["markdown", "links", "html", "rawHtml", {"type":"screenshot","fullPage":true,"quality":80}],
    "includeTags": ["h1", "p", "a", ".main-content"],
    "excludeTags": ["#ad", "#footer"],
    "onlyMainContent": false,
    "waitFor": 1000,
    "timeout": 15000,
    "parsers": ["pdf"]
  }'
```

Safety notes
- Respect robots.txt, terms of service, and rate limits; set `maxAge` to leverage caching.
- Constrain scope with `includePaths`/`excludePaths` and avoid PII collection.
- Log scrape/crawl targets and purpose for auditability.

Project fit
- Populate/tag sources for RAG and metadata enrichment; change tracking for policies and docs.
- Use JSON extraction to structure data (titles, tags, pricing, etc.) during ingestion.

---

## Where to store configs

- Cursor UI: Settings → MCP → add servers (recommended). Or user config file like `~/.cursor/mcp.json`.
- Do not commit API keys or OAuth tokens. Use environment variables and local secrets.

## Troubleshooting

- Cloudflare OAuth window doesn’t open: fully restart Cursor; ensure default browser can open external links.
- Cloudflare tools missing: verify `set_active_account` and that the OAuth scope covers your resources.
- Firecrawl rate limits/timeouts: increase `maxAge`, tune `waitFor`, avoid huge `formats` payloads, or paginate crawl results via `next`.
- Firecrawl JSON extraction returns nulls: simplify `schema`, reduce page scope, or fetch fresh with `maxAge: 0`.

## Open items

- Confirm Firecrawl MCP client entry in Cursor (remote URL or local binary) to replace placeholders above.
- Decide which Cloudflare resources (if any) we’ll adopt for production vs. keep entirely on Convex.

