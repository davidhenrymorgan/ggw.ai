# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 SaaS starter kit with Clerk authentication, Clerk Billing for payments, and Convex as the real-time database backend. The stack combines modern frontend technologies with a serverless backend architecture.

**Custom Domain:** girlsgonewild.ai (configured in Cloudflare, not yet attached to deployment)

**Tech Stack:**
- Next.js 15 with App Router and Turbopack
- Clerk for authentication and billing/payments
- Convex for real-time database and serverless backend
- TailwindCSS v4 for styling
- shadcn/ui components with Radix UI primitives
- TypeScript throughout

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build production bundle
npm run build

# Run production server
npm start

# Run linter
npm run lint

# Initialize/start Convex development
npx convex dev
```

## Architecture

### Authentication & User Management

**Clerk → Convex Sync Flow:**
1. Clerk handles all authentication (sign-up, sign-in, social logins)
2. Webhook at `/clerk-users-webhook` syncs user events to Convex
3. JWT template named "convex" bridges Clerk and Convex authentication
4. `middleware.ts` protects routes matching `/dashboard(.*)`

**User Identity in Convex:**
- `ctx.auth.getUserIdentity()` returns Clerk identity
- `identity.subject` contains the Clerk user ID (stored as `externalId` in Convex)
- Use `getCurrentUser(ctx)` helper from `convex/users.ts` to get current user
- Use `getCurrentUserOrThrow(ctx)` when user must be authenticated

### Payment Flow

**Clerk Billing Integration:**
- Clerk manages subscription plans and payment processing
- Webhook events (`paymentAttempt.updated`) sync payment status to Convex
- Payment attempts stored in `paymentAttempts` table with user reference
- Custom `<CustomClerkPricing>` component wraps Clerk's `<PricingTable>` with theme support
- Check payment status via queries against `paymentAttempts` table

### Convex Backend Structure

**Key Files:**
- `convex/schema.ts` - Database schema with `users` and `paymentAttempts` tables
- `convex/http.ts` - HTTP endpoint for Clerk webhooks
- `convex/users.ts` - User management functions (upsert, delete, current user)
- `convex/paymentAttempts.ts` - Payment tracking functions
- `convex/auth.config.ts` - Clerk JWT configuration
- `.cursor/rules/convex_rules.mdc` - Comprehensive Convex development guidelines

**Important Convex Patterns (see `.cursor/rules/convex_rules.mdc` for full details):**
- Always use new function syntax with `args`, `returns`, and `handler`
- Use `query` for reads, `mutation` for writes, `action` for external API calls
- Use `internalQuery`, `internalMutation`, `internalAction` for private functions
- Always include validators for both arguments and return values
- Reference functions via `api` (public) or `internal` (private) objects from `_generated/api`
- Use `withIndex` instead of `filter` for database queries (requires schema indexes)

### Frontend Structure

**App Router Layout:**
- `app/(landing)/` - Public landing page with hero, features, pricing
- `app/dashboard/` - Protected dashboard area (requires authentication)
- `app/dashboard/payment-gated/` - Subscription-protected content
- `app/layout.tsx` - Root layout with Clerk, Convex, and Theme providers
- `app/globals.css` - Global styles and TailwindCSS configuration
- `middleware.ts` - Route protection via Clerk

**Provider Hierarchy:**
```tsx
<ThemeProvider>
  <ClerkProvider>
    <ConvexClientProvider>
      {children}
    </ConvexClientProvider>
  </ClerkProvider>
</ThemeProvider>
```

**Components:**
- `components/ui/` - shadcn/ui component library
- `components/ConvexClientProvider.tsx` - Wraps `ConvexProviderWithClerk`
- `components/custom-clerk-pricing.tsx` - Theme-aware pricing table
- `components/theme-provider.tsx` - next-themes integration

## Environment Variables

**Required in `.env.local`:**
```bash
CONVEX_DEPLOYMENT=          # Convex deployment URL
NEXT_PUBLIC_CONVEX_URL=     # Convex client URL
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=  # Clerk public key
CLERK_SECRET_KEY=           # Clerk secret key
NEXT_PUBLIC_CLERK_FRONTEND_API_URL= # From Clerk JWT template (issuer URL)

# Clerk redirects (all typically point to /dashboard)
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
```

**Required in Convex Dashboard:**
```bash
CLERK_WEBHOOK_SECRET=       # Webhook signing secret from Clerk
NEXT_PUBLIC_CLERK_FRONTEND_API_URL= # Same as in .env.local
```

## Key Integration Points

### Clerk JWT Template Setup
1. Create JWT template in Clerk dashboard named "convex"
2. Copy the Issuer URL → this becomes `NEXT_PUBLIC_CLERK_FRONTEND_API_URL`
3. Set in both `.env.local` and Convex environment variables
4. Referenced in `convex/auth.config.ts` as `domain` field

### Webhook Configuration
- Endpoint: `{your_domain}/clerk-users-webhook`
- Events: `user.created`, `user.updated`, `user.deleted`, `paymentAttempt.updated`
- Handler in `convex/http.ts` validates with Svix and dispatches to internal mutations
- Webhook secret must be set in Convex dashboard environment variables

### Database Schema
```typescript
users: {
  name: string
  externalId: string  // Clerk user ID
}

paymentAttempts: {
  payment_id: string
  userId: Id<"users">
  payer: { user_id: string }
  // ... additional payment data from Clerk
}
```

## Common Patterns

### Adding a New Convex Query
```typescript
// convex/myFeature.ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const myQuery = query({
  args: { someId: v.id("tableName") },
  returns: v.array(v.object({ field: v.string() })),
  handler: async (ctx, args) => {
    // Use withIndex, not filter
    return await ctx.db
      .query("tableName")
      .withIndex("byField", (q) => q.eq("field", args.someId))
      .collect();
  },
});
```

### Using the Query in React
```typescript
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const data = useQuery(api.myFeature.myQuery, { someId: "..." });
```

### Getting Current User in Convex
```typescript
import { getCurrentUser, getCurrentUserOrThrow } from "./users";

export const myQuery = query({
  args: {},
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    // ... use user
    return null;
  },
});
```

## Deployment

**Vercel (Recommended):**
1. Connect repository to Vercel
2. Set all environment variables in Vercel dashboard
3. Automatic deployments on push to main
4. Turbopack optimizations applied automatically

**Convex Deployment:**
- Development: `npx convex dev` runs local dev server
- Production: Convex automatically deploys when pushing to connected Git branch
- Environment variables set in Convex dashboard

## Notes

- Always follow Convex guidelines in `.cursor/rules/convex_rules.mdc`
- Route protection happens in `middleware.ts` using Clerk's `createRouteMatcher`
- Theme switching uses `next-themes` with system preference detection
- All dashboard components expect authenticated users
- Payment-gated content should check subscription status via Convex queries
