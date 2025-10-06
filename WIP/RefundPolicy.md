# Refund Policy (Draft)

Status: Draft. Codifies refunds for unused token purchases.

## Policy
- Full cash refund within 24 hours if a specific token/gem purchase (grant) is completely unused.
- Applies to that purchase only, not the entire account balance.
- Any consumption from that grant voids automatic eligibility (support may issue discretionary credits).
- Refunds are returned to the original payment method (via Clerk Billing/Stripe).

## Definitions
- Grant: Credits added by a purchase. Each grant is tracked separately.
- Consumption: Any deduction referencing a grant. Zero consumption means unused.

## User Experience
- Purchases list shows eligibility, a countdown (24h from purchase), and “Request refund”.
- Clear copy: eligibility requirement, timeframe, and bank processing caveats.

## Admin Flow
- One-click refund for eligible grants; capture operator, reason, idempotency key.
- Webhooks sync refund state (`refund_created`, `refund_updated`).
- Audit: record refund event, link to grant and payment.

## SLA & Abuse Prevention
- SLA: issue refunds within 24 hours of request; note external bank delays.
- Rate-limit excessive requests; block repeat abuse; log anomalies.

## Edge Cases
- Multiple grants: a newer unused grant may be refunded even if older grants were used.
- Partial use: no automatic refund; consider goodwill credits.
- Chargebacks: if refund already issued, mark and append evidence.
