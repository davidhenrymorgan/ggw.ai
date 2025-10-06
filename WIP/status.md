# STATUS.md

Project Status for girlsgonewild.ai
Last Updated: 2025-10-06

## ✅ Deployed & Working

**Foundation:**
- Next.js 15 starter with App Router and Turbopack
- Clerk authentication (sign-up, sign-in, social logins)
- Clerk → Convex user sync via webhooks
- Clerk Billing integration with payment webhooks
- Theme provider (light/dark mode with Sora-inspired dark theme)
- TailwindCSS v4 + shadcn/ui components

**UI/UX (Sora/Leonardo-inspired):**
- `/explore` page with filter/sort controls (All/Images/Videos, New/Trending)
- Masonry grid layout using CSS columns
- AssetCard component with glass morphism effects
- Dark canvas theme (oklch 0.08) with subtle borders and glass cards

**Backend Infrastructure:**
- Convex schema: `assets`, `generations`, `likes`, `collections`, `collectionItems` tables
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

## 🚧 Built But Not Deployed

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
1. **Auth Error**: Missing `NEXT_PUBLIC_CLERK_FRONTEND_API_URL` in Convex environment variables
   - Error: "No auth provider found matching the given token"
   - Fix: Run `npx convex env set NEXT_PUBLIC_CLERK_FRONTEND_API_URL https://natural-gazelle-72.clerk.accounts.dev`
   - User is currently upgrading Convex to paid tier

**Infrastructure:**
2. **Convex Free Tier Limits**: Upgrading to paid tier for production usage
3. **Custom Domain**: girlsgonewild.ai configured in Cloudflare but not yet attached to Vercel deployment

**To Test:**
- Full image generation flow (once auth is fixed)
- R2 upload and CDN URL generation
- Asset creation and explore feed population
- Credit cost calculations
- Multi-mode generation (image-to-image, video, etc.)

## 📊 Latest Deployment

- **Environment:** Production (Vercel)
- **URL:** https://ggw-nyh9byo6f-davidhenrymorgans-projects.vercel.app
- **Branch:** main
- **Status:** ✅ READY
- **Deployed:** 2025-10-06 (lockfile fix)
- **Convex:** Development deployment
- **Domain:** girlsgonewild.ai (configured in Cloudflare, not yet attached)
- **R2 CDN:** cloud.girlsgonewild.ai (configured and ready)

### Deployment History

| Date | Branch | Status | Commit | Notes |
|------|--------|--------|--------|-------|
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
