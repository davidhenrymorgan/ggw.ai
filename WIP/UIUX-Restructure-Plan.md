# UI/UX Restructure Plan (Draft)

Branch suggestion: `feature/uiux-restructure-phase-0`

## Goals
- Premium, smooth UI/UX with PG-13 default surfaces.
- Clear NSFW state and settings UX (opt-out + 18+ attest).
- High-quality image presentation, fast perceived performance.
- Strong tagging, faceted discovery, and creator flows groundwork.

## Scope (Phase 0)
- Global
  - Typography, spacing, motion audit; consistent theming.
  - Safe-mode badges, blur styles, and NSFW indicators.
- Landing/Discovery
  - PG-13-only grids; skeletons/placeholders; lazy-loading; prefetch.
  - Tag chips and basic filters (PG-13).
- Settings
  - NSFW toggle flow: 18+ attestation + confirm; clear copy and warnings.
- Creator Upload (stub)
  - Upload UI with quality checks; required tags input; preview with safe-mode behavior.

## Acceptance Criteria
- Safe-mode consistently indicated and enforced across pages.
- Settings flow records attestation event (stubbed if backend not ready).
- Landing/Discovery pass Lighthouse performance and accessibility targets.
- Tag UI works for PG-13 discovery; no NSFW leaks in default mode.

## Dependencies
- Backend flags/metadata (`nsfw_filter_enabled`, `age_verified_at`).
- Content schema for tags/images (can be stubbed in UI).

## Nice-to-haves (if time)
- Micro-interactions on toggles/cards.
- Keyboard navigation and focus states.
- Reduced motion support.
