# Policies (Draft)

Status: Draft. Guides PG-13 default, NSFW access, disclaimers, and moderation.

## PG-13 Default
- Landing and discovery show PG-13 only; no nudity or explicit previews.
- Use blur/placeholders for items flagged above PG-13.

## NSFW Access
- Requires login, 18+ self-attestation, and manual disable of NSFW filter.
- Defaults: `nsfw_filter_enabled = true`; store `age_verified_at` timestamp on attestation.
- Middleware enforces PG-13 unless verified and opted out.

## Disclaimers
- Site-wide note: “All images are AI-generated; no real persons are depicted.”
- Place in footer + relevant settings/NSFW dialogs.

## Moderation Overview
- Prompt filtering in PG-13 mode; explicit prompts only after opt-out + 18+.
- Text moderation pre-check; image moderation post-check; quarantine borderline content.
- Human review queue (override path + audit log).
- Log: toggles, attestations, moderation outcomes, appeals.

## Data & Privacy
- Avoid collecting PII in prompts or scraped content.
- Retention: keep moderation logs and toggles for audit; define deletion SLAs later.

## Open Questions
- Exact NSFW boundaries (sheer/lingerie/drawn content).
- Future age verification options (ID vendor vs. self-attest).
