# Documentation Index

Comprehensive index of internal and external documentation for girlsgonewild.ai
Last Updated: 2025-10-07

---

## 🚨 START HERE (New Session Checklist)

1. **Read [WIP/status.md](status.md)** - CRITICAL: UI currently broken despite successful build
2. **Read [WIP/roadmap.md](roadmap.md)** - Priority #1: Fix broken UI before any other work
3. **Read [WIP/SORA_REDESIGN.md](SORA_REDESIGN.md)** - Full context on what broke and why
4. **Compare deployments:**
   - Working (before redesign): https://ggw-qczy442v3-davidhenrymorgans-projects.vercel.app
   - Broken (after redesign): https://ggw-ndlmgr3gb-davidhenrymorgans-projects.vercel.app

---

## 📁 Internal Documentation (Repository)

### Project Core (Read First)
- **[WIP/status.md](status.md)** - ⚠️ Current deployment status, known issues, env vars
- **[WIP/roadmap.md](roadmap.md)** - 🚨 Feature roadmap with concrete next steps (UI fix is #1)
- **[WIP/SORA_REDESIGN.md](SORA_REDESIGN.md)** - 🔥 Complete Sora redesign documentation (what broke)
- **[README.md](../README.md)** - Project overview and setup instructions
- **[CLAUDE.md](../CLAUDE.md)** - Project-specific guidance for Claude Code

### Setup & Configuration
- **[WIP/MCP.md](MCP.md)** - MCP server setup (Cloudflare, Firecrawl, Context7)
- **[WIP/Codex.md](Codex.md)** - Local Codex install and MCP configuration
- **[.env.local](../.env.local)** - Local environment variables
- **[convex/auth.config.ts](../convex/auth.config.ts)** - Clerk JWT authentication config

### Policies & Legal
- **[WIP/Policies.md](Policies.md)** - Content moderation, NSFW guidelines, disclaimers
- **[WIP/RefundPolicy.md](RefundPolicy.md)** - Refund policy for unused credits

### Architecture & Schema
- **[convex/schema.ts](../convex/schema.ts)** - Complete database schema
- **[WIP/UIUX-Restructure-Plan.md](UIUX-Restructure-Plan.md)** - Original UI/UX restructuring notes

---

## 🌐 External Documentation (Reference)

### Primary Tech Stack
- **[Next.js 15 Docs](https://nextjs.org/docs)** - App Router, Server Components, Turbopack
- **[Convex Docs](https://docs.convex.dev/)** - Database, queries, mutations, actions
- **[Convex Agents](https://docs.convex.dev/agents)** - AI agents with Convex
- **[Convex MCP Server](https://docs.convex.dev/ai/convex-mcp-server)** - MCP integration
- **[Clerk Docs](https://clerk.com/docs)** - Authentication and user management
- **[Clerk Billing](https://clerk.com/docs/references/javascript/billing/overview)** - Subscription and payment handling
- **[Clerk + Convex](https://docs.convex.dev/auth/clerk)** - Integration guide

### Storage & Infrastructure
- **[Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)** - Object storage
- **[Cloudflare Workers](https://developers.cloudflare.com/workers/)** - Serverless compute
- **[Cloudflare MCP](https://developers.cloudflare.com/agents/model-context-protocol/mcp-servers-for-cloudflare/)** - MCP servers for Cloudflare
- **[AWS S3 SDK Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/)** - For R2 compatibility

### UI/UX & Styling
- **[shadcn/ui Docs](https://ui.shadcn.com/docs)** - Component library
- **[Radix UI Primitives](https://www.radix-ui.com/primitives)** - Accessible components
- **[TailwindCSS v4](https://tailwindcss.com/docs)** - Utility-first CSS
- **[Tailwind Plus](https://tailwindcss.com/plus/ui-blocks/documentation)** - Premium UI blocks
- **[Tailark UI](https://tailark.com/docs)** - Additional components

### AI Generation
- **[Promptchan API Docs](https://promptchan.com/docs)** - Image/video generation API
- **[Promptchan OpenAPI Spec](https://promptchan.com/docs/openapi.json)** - Full API specification

### Web Scraping (Development)
- **[Firecrawl Docs](https://docs.firecrawl.dev)** - Web scraping for UI reference
- **[Firecrawl MCP](https://docs.firecrawl.dev/mcp-server)** - MCP server setup
- **[Firecrawl GitHub](https://github.com/firecrawl/firecrawl)** - Source code

### MCP & Tooling
- **[MCP Specification](https://modelcontextprotocol.io/docs/getting-started/intro)** - Model Context Protocol
- **[MCP Servers Repo](https://github.com/modelcontextprotocol/servers)** - Official MCP servers
- **[Sequential Thinking MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/sequential-thinking)** - Chain-of-thought reasoning

### Deployment & Monitoring
- **[Vercel Docs](https://vercel.com/docs)** - Deployment platform
- **[Vercel Analytics](https://vercel.com/docs/analytics)** - Usage analytics
- **[Sentry Next.js](https://docs.sentry.io/platforms/javascript/guides/nextjs/)** - Error tracking

### Legal & Compliance (Reference)
- **[Promptchan Terms of Service](https://promptchan.com/termsofservice)** - Example ToS
- **[2257 Compliance](https://www.justice.gov/criminal/criminal-ceos/citizens-guide-us-federal-law-child-pornography)** - Adult content regulations
- **[GDPR Compliance](https://gdpr.eu/)** - EU data protection

---

## 🔗 Quick Reference Links

### Dashboards & Admin
- **[Convex Dashboard](https://dashboard.convex.dev)** - Database and functions
- **[Clerk Dashboard](https://dashboard.clerk.com)** - User management and billing
- **[Cloudflare Dashboard](https://dash.cloudflare.com)** - R2 storage and DNS
- **[Vercel Dashboard](https://vercel.com/dashboard)** - Deployments
- **[Promptchan Dashboard](https://promptchan.com/settings)** - API keys and credits

### Development URLs
- **Local Development**: http://localhost:3000
- **Convex Dev**: https://adept-setter-676.convex.cloud
- **Vercel Preview**: https://ggw-nyh9byo6f-davidhenrymorgans-projects.vercel.app
- **R2 CDN**: https://cloud.girlsgonewild.ai
- **Production Domain**: https://girlsgonewild.ai (not yet attached)

---

## 🛠️ Development Patterns

### Convex Best Practices
- **[Convex Rules](.cursor/rules/convex_rules.mdc)** - Comprehensive guidelines
- Always use new function syntax: `args`, `returns`, `handler`
- Use `withIndex` instead of `filter` for queries
- Reference functions via `api` (public) or `internal` (private)
- Always include validators for args and return values

### Authentication Flow
1. Clerk handles sign-up/sign-in
2. Webhook syncs user to Convex `users` table
3. JWT template "convex" bridges Clerk ↔ Convex
4. `getCurrentUserOrThrow(ctx)` gets current user in mutations/queries

### Generation Flow
1. User submits generation form
2. `createImageGeneration` mutation creates record
3. `processImageGeneration` action calls Promptchan API
4. Result uploaded to R2 storage
5. Asset record created in Convex
6. Asset appears in explore feed

### File Structure
```
app/
├── (landing)/          # Public pages
├── dashboard/          # Protected pages (auth required)
├── explore/            # Public gallery
└── layout.tsx          # Root layout with providers

convex/
├── schema.ts           # Database schema
├── http.ts             # Webhook endpoints
├── auth.config.ts      # Clerk JWT config
├── users.ts            # User management
├── generations.ts      # Generation workflow
├── assets.ts           # Asset queries
└── lib/
    ├── r2.ts           # R2 storage client
    └── promptchan.ts   # Promptchan API wrapper

components/
└── ui/                 # shadcn/ui components
```

---

## 📚 To Add (Future)

- [ ] Export Cursor indexed docs list (Settings → Rules & Docs)
- [ ] Internal design system documentation
- [ ] Component usage examples
- [ ] API integration testing guide
- [ ] Content moderation guidelines (detailed)
- [ ] Deployment runbook
- [ ] Incident response playbook
- [ ] Performance optimization guide

---

## 🔄 Maintenance

**Update this index when:**
- Adding new documentation files
- Discovering useful external resources
- Changing architecture or patterns
- Setting up new integrations
- Adding new MCP servers
- Deploying to production

**Review quarterly to:**
- Remove outdated links
- Update version-specific docs
- Add new reference materials
- Archive deprecated documentation
