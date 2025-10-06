Awesome—here’s a short, high-signal bullet outline that folds in your clarifications (Firecrawl premium, Leonardo UI reference, Sora inspiration, Clerk wrapping rules, and whether to use Vercel AI SDK v5). Skim this, tweak anything, and I’ll expand it into a full ROADMAP.md.

⸻

🎯 Product & Design North Star
	•	UI/UX: Hybrid of Leonardo’s app shell (structure/flows) + Sora’s visual minimalism (dark canvas, glass cards, big rhythm).
	•	Scope: Public-by-default gallery (images/videos), likes, saves → collections/folders; generation pages for image & video.
	•	Ethics: Recreate structure & patterns; rewrite copy; no verbatim scraping of protected content.

🔎 Firecrawl (Premium) — “Study Only”
	•	Use Map → Diff → Scrape (html-only, depth=2) on app.leonardo.ai to learn routes, layout regions, component blocks (no content reuse).
	•	Export a SITE_STRUCTURE.md (routes + components) to guide build; keep screenshots/HTML in WIP only.

👤 Clerk Integration (critical constraints)
	•	Follow Clerk’s Next.js App Router wrapping: ClerkProvider in app/layout.tsx, route guarding via middleware.ts.
	•	When embedding shadcn/ui pages/blocks:
	•	Logged-in: render authenticated views/components (SSR-safe).
	•	Logged-out: show gated/marketing variants (avoid leaking private data).
	•	Use Convex + Clerk JWT template for server checks on mutations/queries (no client-only auth checks).

🧱 Convex Data Model (core tables)
	•	users (Clerk bridge; handle, avatar)
	•	assets (image|video, visibility, status, r2Key, meta, likeCount, createdAt)
	•	generations (userId, type, input, engine, status, assetId, creditsUsed, timestamps)
	•	likes (userId+assetId unique)
	•	collections, collectionItems (optional parentId for folders)
	•	Indexes for feed & profile: by_visibility, by_createdAt, by_owner, by_user, by_asset.

🧰 Generation Providers (Promptchan first; pluggable)
	•	Add a provider interface; start with Promptchan endpoints:
	•	Image: POST /api/external/create (cost by quality/options).
	•	Video: POST /api/external/video_v2/submit → GET …/status(_with_logs) → GET …/result.  ￼
	•	Keep adapters for future engines (Flux/OpenAI/Sora when available); select via GEN_PROVIDER env.

🗂️ Storage (Cloudflare R2)
	•	Bucket layout: assets/{userId}/{assetId}/[original|thumb|poster].(jpg|mp4).
	•	Public CDN for public assets; signed URLs for private/unlisted.
	•	Generate poster/thumbnail on finalize; store on assets.

💳 Credits & Billing
	•	credits, creditTransactions tables; deduct on enqueue, refund on fail.
	•	Clerk Billing → Convex webhook maps plan → monthly credit allotment; support one-time top-ups.

🖼️ Frontend (Sora/Leonardo style)
	•	Explore: masonry grid (CSS columns, break-inside-avoid), filters (All/Images/Videos), sort (New/Trending).
	•	Asset Detail: modal/page with viewer, prompt/settings, like/save/share.
	•	Generate: tabs for Image/Video (quality, aspect, seed, negative prompt, presets).
	•	Profile: tabs (Gallery, Collections, Likes); owner tools to toggle visibility.
	•	Polished A11y (AA contrast, focus rings, PRM), subtle motion.

🧩 Vercel AI SDK v5 — use or skip?
	•	Use it if you want streaming UI, tool calls, server actions ergonomics (especially for chatty/agent features).
	•	OK to skip for the core Promptchan workflow (it’s HTTP + polling). Consider SDK v5 later for assistants/UX (prompt helpers, captioners, etc.).

🛡️ Moderation & Safety (minimum)
	•	assets.moderation.status gates public listing; simple reports table + admin queue.
	•	Rate-limit generation endpoints; log provider errors; do not store secrets client-side.

🗓️ Build Order (phases)
	1.	UI Shell + Explore (Sora/Leonardo look) → AssetCard, GalleryGrid, detail modal.
	2.	Convex schema + Likes/Collections (optimistic updates + denorm likeCount).
	3.	Generation Core (Promptchan adapter, enqueue/finish/fail, credits).  ￼
	4.	R2 finalize (upload, poster/thumb, public URLs).
	5.	Generate pages (image/video forms + progress).
	6.	Profiles & Collections pages.
	7.	Polish/branding + landing refresh.

🧪 Acceptance checks (each phase)
	•	Page renders SSR, passes auth guards, and no secret leakage.
	•	Queries use withIndex; feeds paginate by cursor (createdAt + id).
	•	Generation deducts/credits correctly, resumes on retry; asset appears in Explore on status="ready".

⸻