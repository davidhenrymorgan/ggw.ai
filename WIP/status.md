# STATUS.md

Project Status for girlsgonewild.ai
Last Updated: 2025-10-07

## 🚨 CRITICAL ISSUE - REQUIRES IMMEDIATE ATTENTION

**Build Successful but UI Broken:**
- Latest deployment: https://ggw-ndlmgr3gb-davidhenrymorgans-projects.vercel.app
- Build passes all checks (TypeScript, linting, Tailwind compilation)
- **HOWEVER**: Deployed site appears structurally broken, lacking visual styling/structure
- **Suspected cause**: Missing shadcn/ui base styles or incorrect Tailwind CSS v4 configuration
- **Impact**: Site is not usable despite successful build

**What's Broken:**
- Visual structure missing (no proper layout, spacing, or component styling)
- May be missing base CSS imports
- Possibly incomplete Tailwind CSS v4 migration
- Could be @layer directives not working properly

**Comparison:**
- Working deployment (before Sora redesign): https://ggw-qczy442v3-davidhenrymorgans-projects.vercel.app
- Broken deployment (after Sora redesign): https://ggw-ndlmgr3gb-davidhenrymorgans-projects.vercel.app

**Next Steps:**
1. Compare `app/globals.css` between working and broken versions
2. Verify Tailwind CSS v4 base layers are properly imported
3. Check if shadcn/ui components need base CSS that was removed
4. Review Tailwind config for missing plugin or configuration
5. Test if custom utilities (.glass, .bg-gradient-*) are causing conflicts
6. Verify @apply directives work in Tailwind CSS v4

---

## ✅ Deployed & Working (Code-wise)

**Foundation:**
- Next.js 15 starter with App Router and Turbopack
- Clerk authentication (sign-up, sign-in, social logins)
- Clerk → Convex user sync via webhooks
- Clerk Billing integration with payment webhooks
- Theme provider (light/dark mode with Sora-inspired dark theme)
- TailwindCSS v4 + shadcn/ui components
- All TypeScript, linting, and build checks pass

**Sora-Inspired UI/UX (STYLED BUT NOT RENDERING PROPERLY):**
- Complete redesign implemented across all pages
- Custom Tailwind config with Sora brand colors (oklch color space)
- Glass morphism effects throughout (backdrop-blur, semi-transparent cards)
- Custom animations (fade-in, slide-up, glow-pulse)
- Gradient system (purple, cyan, magenta, orange, gold)
- Custom auth pages with gradient backgrounds
- Minimal 48px icon-only sidebar navigation
- Enhanced landing page with full-viewport hero
- Multi-mode generation tabs with gradient active states
- Enhanced explore page with glass-morphism filters
- Enhanced asset cards with luminous glow effects

**Backend Infrastructure:**
- Convex schema: `assets`, `generations`, `likes`, `collections`, `collectionItems`, `boards`, `boardPrompts`
- Cloudflare R2 storage client (S3-compatible API)
- Promptchan API wrapper for image/video generation
- Image generation flow: `createImageGeneration` → `processImageGeneration` action
- Convex queries for explore feed with filters/sorting
- R2 integration with custom domain: cloud.girlsgonewild.ai

**Generation UI:**
- `/dashboard/generate` page with multi-mode support
- 4 generation modes: Text-to-Image, Text-to-Video, Image-to-Image, Image Edit
- Image upload component with drag-and-drop
- Quality selectors with dynamic credit cost display
- Style, filter, emotion, and advanced settings controls

## 🚧 Built But Not Deployed Properly

**Sora Redesign (Code Complete, Visually Broken):**
- All components updated with new styling classes
- Tailwind config customized with brand colors and utilities
- Custom gradients and animations defined
- Glass morphism effects applied throughout
- **BUT**: Not rendering properly in production

**Needs Environment Variable Fix:**
- Auth currently failing: `NEXT_PUBLIC_CLERK_FRONTEND_API_URL` not set in Convex
- Once set, full generation flow should work end-to-end

**Backend Ready, Not Tested:**
- Complete image generation workflow (API → R2 → Convex)
- R2 storage with proper key generation and CDN URL handling
- Asset creation and status tracking

## 🔧 Partially Working

**Generation Flow:**
- ✅ Frontend forms built and styled
- ✅ Backend mutations/actions implemented
- ✅ R2 client configured with credentials
- ✅ Promptchan API client updated to official spec
- ❌ Auth blocking: Need to set `NEXT_PUBLIC_CLERK_FRONTEND_API_URL` in Convex
- ⏳ End-to-end testing pending auth fix

**Explore Feed:**
- ✅ UI built and connected to Convex queries
- ⏳ No real data yet (waiting for successful generations)

## ❌ Known Issues

**Critical (Blocking):**
1. **🚨 UI STRUCTURE BROKEN** (HIGHEST PRIORITY)
   - Build succeeds but deployed site has no proper styling/structure
   - Suspected: Missing Tailwind base layers or shadcn/ui CSS
   - Impact: Site is unusable despite passing all build checks
   - Last working version: commit before Sora redesign (pre-874a9f6)
   - Broken version: commit 874a9f6 "fix: Resolve Tailwind CSS v4 build errors"

2. **Auth Error**: Missing `NEXT_PUBLIC_CLERK_FRONTEND_API_URL` in Convex environment variables
   - Error: "No auth provider found matching the given token"
   - Fix: Run `npx convex env set NEXT_PUBLIC_CLERK_FRONTEND_API_URL https://natural-gazelle-72.clerk.accounts.dev`
   - User is currently upgrading Convex to paid tier

**Infrastructure:**
3. **Convex Free Tier Limits**: Upgrading to paid tier for production usage
4. **Custom Domain**: girlsgonewild.ai configured in Cloudflare but not yet attached to Vercel deployment

**To Test (After UI Fix):**
- Visual appearance and layout structure
- Tailwind utility classes rendering correctly
- Glass morphism effects
- Gradient backgrounds
- Custom animations
- Full image generation flow (once auth is fixed)
- R2 upload and CDN URL generation
- Asset creation and explore feed population

## 📊 Latest Deployment

- **Environment:** Production (Vercel)
- **URL:** https://ggw-ndlmgr3gb-davidhenrymorgans-projects.vercel.app
- **Branch:** main
- **Status:** ⚠️ BUILD SUCCESS, UI BROKEN
- **Deployed:** 2025-10-07 (Tailwind CSS v4 build error fixes)
- **Commit:** 874a9f6
- **Convex:** Development deployment
- **Domain:** girlsgonewild.ai (configured in Cloudflare, not yet attached)
- **R2 CDN:** cloud.girlsgonewild.ai (configured and ready)

### Deployment History

| Date | Branch | Status | Commit | Notes |
|------|--------|--------|--------|-------|
| 2025-10-07 | main | ⚠️ BUILD OK, UI BROKEN | 874a9f6 | Fixed Tailwind CSS v4 build errors (UI now broken) |
| 2025-10-07 | main | ❌ BUILD FAILED | b5e7583 | Tailwind CSS v4 error: unknown utility 'glass' |
| 2025-10-07 | main | ❌ BUILD FAILED | 12f6f92 | TypeScript error: darkMode array syntax |
| 2025-10-07 | main | ❌ BUILD FAILED | 6f4a8c3 | Missing textarea component |
| 2025-10-07 | main | ✅ READY | ggw-qczy442v3 | Checkpoint after Sora redesign (LAST WORKING VERSION) |
| 2025-10-06 | main | ✅ READY | a6b9fbb | Fixed pnpm lockfile for @aws-sdk/client-s3 |
| 2025-10-06 | main | ✅ READY | f6a2488 | Fixed generation flow with correct Promptchan API format |
| 2025-10-06 | main | ✅ READY | 8a1ee18 | Updated Promptchan client to official spec |
| 2025-10-06 | main | ✅ READY | e196065 | Added multi-mode generation UI with image upload |
| 2025-10-06 | main | ✅ READY | d314238 | Added backend for image generation and R2 storage |
| 2025-10-06 | main | ✅ READY | 0703453 | Added UI shell with explore page and gallery grid |
| 2025-10-05 | main | ✅ READY | bb3a7f9 | Initial project documentation and WIP tracking |

## Environment Variables Status

### ✅ Set in `.env.local` (Local Development)
- `CONVEX_DEPLOYMENT`
- `NEXT_PUBLIC_CONVEX_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_FRONTEND_API_URL`
- All Clerk redirect URLs
- All Promptchan and R2 credentials

### ✅ Set in Convex Dashboard
- `PROMPTCHAN_API_KEY`
- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET_NAME`
- `R2_PUBLIC_URL`
- `webhook` (Clerk webhook secret)

### ❌ Missing in Convex Dashboard
- `NEXT_PUBLIC_CLERK_FRONTEND_API_URL` ← **CRITICAL: Blocking auth**

### ⏳ Needs Setup in Vercel
- All environment variables (pending production deployment)

## Next Steps

1. **Immediate**: User upgrading Convex to paid tier ($25/month)
2. **After upgrade**: Set `NEXT_PUBLIC_CLERK_FRONTEND_API_URL` in Convex
3. **Test**: Full image generation flow end-to-end
4. **Deploy**: Set up Vercel environment variables for production
5. **Domain**: Attach girlsgonewild.ai to Vercel deployment
6. **Navigation**: Add sidebar links for Explore and Generate pages
7. **Polish**: Add generation history page and status tracking
