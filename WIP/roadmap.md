# Roadmap (Draft for Review)

Status: Draft. Do not publish. Intended to align on scope and policies before branching/implementation.

## Vision

Build a premium, safe-by-default AI image platform. Landing/discovery remains PG-13 (no nudity). Access to NSFW requires login, manual filter disable, and 18+ attestation. All content is AI-generated, never real people. Deliver exceptional UI/UX, high-quality images, and rich tagging/organization, with a customer-first approach including fair refunds for unused tokens.

## Principles (Confirmed)

- Safety-first: PG-13 default; explicit content only after 18+ attest + manual NSFW opt-out.
- Truth-in-labeling: Prominent site-wide disclaimer that all images are AI-generated, not real persons.
- Quality bar: Enforce high image quality standards; require descriptive tagging and organization.
- Customer-first: Full cash refunds for unused token purchases within 24 hours upon request.
- Auditability: Log NSFW toggle, age attestations, moderation outcomes, and credit/refund events.

## Safety & NSFW Access Policy (Confirmed)

- Landing/discovery: Always PG-13. No nudity previews. Use tasteful blur/placeholders for flagged content.
- Access control: NSFW requires login, explicit 18+ self-attestation, and manual disable of NSFW filter.
- Persistence: Store `nsfw_filter_enabled = true` by default; record `age_verified_at` timestamp on attestation.
- Enforcement: Middleware enforces PG-13 for anonymous users and any user with NSFW filter enabled.
- Logging: Record toggle actions (time, user, coarse device fingerprint hash), moderation decisions, and appeals.

## Refunds Policy (Confirmed)

- Scope: Refund applies to a specific token/gem purchase (grant), not the entire account balance.
- Window: Eligible for a full cash refund if requested within 24 hours from purchase timestamp.
- Eligibility: The specific purchase must be completely unused (zero consumption from that grant). Any usage voids auto-refund; case-by-case discretionary support credits remain possible.
- Method: Refund to the original payment method via Clerk Billing/Stripe. Reflect state via webhooks.
- Limits & Abuse: One-click refund for eligible purchases; rate-limit excessive refund attempts; idempotent processing.
- SLA: Issue the refund within 24 hours of the user’s request; disclose bank processing delays.
- UI/UX: Purchases list shows eligibility, a countdown timer, and a “Request refund” button with clear policy text.
- Admin: One-click refunds with logged operator, reason, and idempotency keys; audit trail.
- Data model: Ledger per purchase grant and per-consumption record; compute unused by grant; link transactions and refunds.

## Phase 0 — Foundations (Now → MVP readiness)

- Safety & Age Gate
  - Default NSFW filter on for all users; enforce for anonymous sessions.
  - Settings flow to disable filter requires 18+ attestation + confirmation; store `age_verified_at` and log action.
  - Middleware to enforce PG-13 across landing/discovery unless verified + opted out.
- Legal & Disclaimers
  - Footer/banner disclaimer: “All images are AI-generated; no real persons.”
  - Draft ToS/Privacy/Content Policy; collect examples (e.g., promptchan ToS) for inspiration (not copy-paste).
- Moderation Guardrails
  - Prompt filtering in PG-13 mode; allow only after opt-out + 18+.
  - Text moderation pre-check; image moderation post-check; quarantine and review queue in Convex.
- Content Model & Tagging
  - Schema: images (owner, nsfw_level, quality_score, ai_generated=true, hashes), tags, image_tags, collections.
  - Require minimum tags per upload; suggest tags; dedupe via perceptual hash.
- Credits & Refundability
  - Implement credit ledger (grants, consumptions, balances) and transactions.
  - Refund workflow per confirmed policy; user-facing eligibility + admin tooling; webhook sync.
- UI/UX Polish
  - Smooth toggles, confirmations, safe-mode badge/state; blurred/placeholder media in PG-13 contexts.
- Observability
  - Metrics: moderation escapes, false positives, opt-out rate, refunds requested, time-to-refund.
  - Logs: NSFW toggles, attestations, moderation outcomes, credit/refund events.

Exit criteria: PG-13 enforced on landing/discovery; NSFW requires login + attestation + manual disable; disclaimers visible; moderation pipeline active; tagging required; credits usable; refund flow operational for unused packs.

## Phase 1 — MVP (Closed Alpha)

- Safety tuning: Thresholds/heuristics; weekly safety reviews; escalation runbook.
- Tagging UX: Bulk edit, auto-suggest, facet filters, tag quality checks.
- Creator flow v1: Upload → auto tags → review → publish; inline content guidelines.
- Credits: Purchase flow, usage receipts; admin issue/refund credits; simple wallet export.
- Legal pages: Publish ToS/Privacy/Content Policy; link in footer and gates.
- Infra: Staging/prod split; domain + TLS; hardened webhooks; dashboards for moderation and refunds.

Exit criteria: 10–20 testers; <1% critical safety escapes; opt-out path clear and logged; refunds process trialed; positive UX feedback.

## Phase 2 — Beta (Wider Invite)

- Moderation: Sampling audits; reputation signals; improved quarantine review SLAs.
- Discovery: Rich facets, collections, search by tags/attributes; early personalization (privacy-safe).
- Credits: Promotions and pricing experiments; clearer unused-token refund policy text.
- Legal: Policy versioning and change logs; DMCA-style intake (even with AI-only content) for trust.
- Performance: CDN strategy; prefetch and streaming optimizations for images.

## Phase 3 — GA

- Transparency: Safety report cadence; internal audit exports.
- Quality: Continuous evals of prompt filters/moderation; model routing optimization.
- Compliance: Jurisdiction checks; age-gate variants; data retention and deletion SLAs.

## Implementation Notes (Stack: Next.js + Convex + Clerk + Clerk Billing)

- Clerk
  - Store `nsfw_filter_enabled` (default true) and `age_verified_at` in user metadata.
  - Use middleware to read claims and enforce safe mode.
- Convex
  - Tables: users, images, tags, image_tags, reviews, credits, transactions, moderation_events.
  - Jobs: moderation scan, tag suggestion, dedupe, quarantine handling, credit refunds.
- Next.js UI
  - Landing/discover respect safe mode with tasteful blur; settings page for NSFW toggle + attestation.
  - Creator upload with quality gates (min resolution/size) and mandatory tags.

## Open Questions

- Age verification level: self-attestation now vs. third-party ID later?
- NSFW scope: precise definitions and edge cases (sheer, drawn/virtual, lingerie, etc.).
- Refunds: Allow refund of newer unused packs even if older packs were used?
- Token pricing: Packages, deductions (generate vs. view/download), and grace rules.
- Image standards: Required resolution/aspect, compression targets, acceptable generators/models.
- Regional constraints: Any geofencing or jurisdiction-specific policy requirements?

---

Review this draft and share edits. On approval, we will open a new branch and begin implementing Phase 0 tasks.
