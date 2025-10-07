# ROADMAP.md

Product Roadmap for girlsgonewild.ai
Last Updated: 2025-10-06

---

## 🎯 Product Vision

**UI/UX Inspiration:**
- Leonardo.ai app structure (routes, flows, component blocks)
- Sora visual aesthetic (dark canvas, glass cards, minimal, big rhythm)

**Core Features:**
- Public gallery with images/videos (likes, saves, collections)
- Multi-mode AI generation (text-to-image, text-to-video, image-to-image, image editing)
- Credit-based billing system via Clerk
- Cloudflare R2 storage with CDN delivery

---

## 🚨 Current Status: CRITICAL UI ISSUE - BUILD SUCCESS BUT VISUALLY BROKEN

**HIGHEST PRIORITY BLOCKER:**
- Build succeeds but deployed UI is structurally broken
- Latest deployment: https://ggw-ndlmgr3gb-davidhenrymorgans-projects.vercel.app
- Suspected: Missing Tailwind base layers or shadcn/ui CSS
- Last working version: https://ggw-qczy442v3-davidhenrymorgans-projects.vercel.app (before Sora redesign fixes)
- **MUST FIX BEFORE ANY OTHER WORK**

**Secondary Blocker:**
- Missing `NEXT_PUBLIC_CLERK_FRONTEND_API_URL` in Convex environment variables
- User upgrading Convex to paid tier ($25/month)
- Once UI is fixed, can test end-to-end generation flow

---

## 📋 Next Up (This Week)

### 1. 🚨 FIX BROKEN UI (CRITICAL - DO FIRST)
**Time Estimate:** 2-4 hours
**Files to Investigate:**
- [app/globals.css](app/globals.css) - Compare with working version
- [tailwind.config.ts](tailwind.config.ts) - Verify Tailwind CSS v4 compatibility
- [components/ui/](components/ui/) - Check if shadcn components need base CSS

**Exact Investigation Steps:**
1. **Compare globals.css:**
   ```bash
   # Get working version from last successful deployment
   git diff ggw-qczy442v3..874a9f6 -- app/globals.css
   ```
2. **Check Tailwind CSS v4 @import statements:**
   - Verify `@import "tailwindcss"` is correct
   - Check if `@layer` directives work in v4
   - Verify custom utilities are properly defined

3. **Verify shadcn/ui base styles:**
   - Check if components.json is correctly configured
   - Verify CSS variables are defined in :root
   - Check if @apply directives work in Tailwind CSS v4

4. **Test custom utilities:**
   - Review .bg-gradient-* classes
   - Check if inline `backdrop-blur` utilities work
   - Verify oklch() color functions render

5. **Compare with working deployment:**
   - Load both URLs side-by-side
   - Use browser DevTools to inspect CSS loading
   - Check Network tab for missing CSS files
   - Compare computed styles between working and broken

**Suspected Root Causes (prioritized):**
1. **Tailwind CSS v4 @layer syntax incompatibility** - Custom utilities may not be properly defined
2. **Missing base/components/utilities imports** - Removed during cleanup
3. **@apply directives not working** - Tailwind CSS v4 deprecated @apply in some contexts
4. **CSS variables not defined** - shadcn relies on CSS variables in :root
5. **Plugin removed (tailwindcss-animate)** - May be needed despite error

**Exact Fix Options:**
- **Option A:** Revert globals.css to working version, then carefully re-apply Sora styles
- **Option B:** Add missing Tailwind base imports or configuration
- **Option C:** Fix Tailwind CSS v4 compatibility issues with custom utilities
- **Option D:** Ensure shadcn/ui CSS variables are properly defined

### 2. Fix Authentication & Test Generation Flow
**Time Estimate:** 1-2 hours
**Files:** Convex environment variables
**Dependencies:** Convex upgrade complete

**Steps:**
1. Run: `npx convex env set NEXT_PUBLIC_CLERK_FRONTEND_API_URL https://natural-gazelle-72.clerk.accounts.dev`
2. Verify auth works in dashboard
3. Test image generation end-to-end:
   - Create generation from `/dashboard/generate`
   - Verify Promptchan API call succeeds
   - Verify R2 upload completes
   - Verify asset appears in Convex
   - Verify asset shows in `/explore` feed
4. Test different quality levels and credit costs
5. Test image upload modes (image-to-image, edit)

### 2. Add Navigation Links
**Time Estimate:** 30 minutes
**Files to Modify:**
- `app/dashboard/layout.tsx` or create sidebar component
- Add links to `/explore` and `/dashboard/generate`

**Implementation:**
- Create `<DashboardNav>` component with links
- Highlight active route
- Mobile-responsive navigation
- Match Sora/Leonardo aesthetic

### 3. Build Generation History Page
**Time Estimate:** 2-3 hours
**Exact Route:** `app/dashboard/history/page.tsx`
**Exact Convex Function:** `queries.getUserGenerations` in `convex/generations.ts`
**Exact Components:**
- `components/ui/generation-card.tsx` - Shows generation with status
- `components/ui/generation-status-badge.tsx` - Status indicator

**Implementation:**
```typescript
// convex/generations.ts
export const getUserGenerations = query({
  args: {
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
  },
  returns: v.object({
    generations: v.array(v.object({...})),
    cursor: v.optional(v.string()),
  }),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    const generations = await ctx.db
      .query("generations")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(args.limit || 20);
    return { generations, cursor: null };
  },
});
```

**UI Features:**
- Grid of generation cards
- Status badges (pending, processing, ready, failed)
- Filter by status and type
- Pagination with cursor-based loading
- Click card to view full asset
- Retry failed generations

### 4. Add Real-Time Generation Status
**Time Estimate:** 2 hours
**Exact Package:** Already using Convex React subscriptions
**Files to Modify:**
- `app/dashboard/generate/page.tsx` - Subscribe to generation status
- `components/ui/generation-progress.tsx` - New component

**Implementation:**
```typescript
// In generate page
const generation = useQuery(api.generations.getGenerationById, { 
  generationId: currentGenerationId 
});

// Show progress based on status
{generation?.status === "pending" && <GenerationProgress status="pending" />}
{generation?.status === "processing" && <GenerationProgress status="processing" />}
{generation?.status === "ready" && <GenerationResult assetId={generation.assetId} />}
{generation?.status === "failed" && <GenerationError error={generation.error} />}
```

### 5. Test Video Generation Flow
**Time Estimate:** 3-4 hours
**Dependencies:** Image generation working
**Exact API Endpoint:** `POST /api/external/video_v2/submit`
**Exact Convex Functions:**
- `mutations.createVideoGeneration` in `convex/generations.ts`
- `actions.submitVideoJob` in `convex/generations.ts`
- `actions.pollVideoStatus` (scheduled function)
- `actions.processVideoResult` in `convex/generations.ts`

**Implementation:**
1. Create scheduled function to poll pending videos:
```typescript
// convex/crons.ts
export default {
  pollVideoGenerations: {
    schedule: "*/2 * * * *", // Every 2 minutes
    handler: async (ctx) => {
      const pending = await ctx.db
        .query("generations")
        .withIndex("by_status", (q) => 
          q.eq("status", "processing").eq("type", "video")
        )
        .collect();
      
      for (const gen of pending) {
        await ctx.scheduler.runAfter(0, api.generations.pollVideoStatus, {
          generationId: gen._id,
        });
      }
    },
  },
};
```

2. Test full video flow:
   - Submit video generation
   - Verify polling updates status
   - Verify video downloads from Promptchan
   - Verify video uploads to R2
   - Verify thumbnail generation
   - Verify asset creation

---

## 📅 This Month

### Week 2: Polish & Production Setup
**Estimated Time:** 10-15 hours

**1. Attach Custom Domain (girlsgonewild.ai)**
- Configure in Vercel dashboard
- Update DNS settings if needed
- Set up SSL certificate
- Test deployment on custom domain

**2. Set Up Vercel Environment Variables**
- Copy all env vars from `.env.local`
- Configure production Convex deployment
- Update webhook URLs to production endpoints
- Test auth flow in production

**3. Add Like & Save Features**
**Exact Convex Functions:**
- `mutations.toggleLike` in `convex/likes.ts`
- `queries.getUserLikes` in `convex/likes.ts`
- `mutations.addToCollection` in `convex/collections.ts`

**Implementation:**
```typescript
// convex/likes.ts
export const toggleLike = mutation({
  args: { assetId: v.id("assets") },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    const existing = await ctx.db
      .query("likes")
      .withIndex("by_user_and_asset", (q) =>
        q.eq("userId", user._id).eq("assetId", args.assetId)
      )
      .first();
    
    if (existing) {
      await ctx.db.delete(existing._id);
      await ctx.db.patch(args.assetId, {
        likeCount: (await ctx.db.get(args.assetId))!.likeCount - 1,
      });
      return false;
    } else {
      await ctx.db.insert("likes", {
        userId: user._id,
        assetId: args.assetId,
        createdAt: Date.now(),
      });
      await ctx.db.patch(args.assetId, {
        likeCount: (await ctx.db.get(args.assetId))!.likeCount + 1,
      });
      return true;
    }
  },
});
```

**4. Implement Collections/Folders**
**Exact Route:** `app/dashboard/collections/page.tsx`
**Exact Convex Functions:**
- `queries.getUserCollections` in `convex/collections.ts`
- `mutations.createCollection` in `convex/collections.ts`
- `mutations.addToCollection` in `convex/collections.ts`

**5. Add Asset Detail Modal**
**Component:** `components/ui/asset-detail-modal.tsx`
**Features:**
- Full-size image/video viewer
- Download button
- Like/save actions
- Prompt and settings display
- Share link
- Delete option (if owner)

### Week 3: Credit System
**Estimated Time:** 8-12 hours

**1. Add Credits Schema**
**Exact File:** `convex/schema.ts`
**Exact Tables:**
```typescript
credits: defineTable({
  userId: v.id("users"),
  balance: v.number(),
  monthlyAllotment: v.number(),
  subscriptionTier: v.union(
    v.literal("free"),
    v.literal("starter"),
    v.literal("pro"),
    v.literal("ultimate")
  ),
  lastReset: v.number(),
  createdAt: v.number(),
  updatedAt: v.number(),
}).index("by_user", ["userId"]),

creditTransactions: defineTable({
  userId: v.id("users"),
  amount: v.number(), // positive = add, negative = deduct
  type: v.union(
    v.literal("generation"),
    v.literal("purchase"),
    v.literal("monthly_reset"),
    v.literal("refund")
  ),
  relatedId: v.optional(v.id("generations")), // Link to generation
  description: v.string(),
  balanceAfter: v.number(),
  createdAt: v.number(),
})
  .index("by_user", ["userId", "createdAt"])
  .index("by_type", ["type", "createdAt"]),
```

**2. Implement Credit Operations**
**Exact File:** `convex/credits.ts`
**Exact Functions:**
- `queries.getCreditBalance` - Get current balance
- `queries.getCreditHistory` - Get transaction history (paginated)
- `mutations.deductCredits` - Deduct for generation
- `mutations.addCredits` - Add from purchase
- `mutations.resetMonthlyCredits` - Scheduled monthly reset
- `internalMutations.initializeUserCredits` - Called from user webhook

**3. Update Generation Flow to Use Credits**
**Files to Modify:**
- `convex/generations.ts` - Add credit check and deduction
- `app/dashboard/generate/page.tsx` - Show credit balance and cost

**4. Add Credit Display Components**
**Exact Components:**
- `components/ui/credit-balance.tsx` - Show in navbar
- `components/ui/credit-history.tsx` - Transaction list
- `components/ui/credit-cost-badge.tsx` - Show cost on generation form

**5. Clerk Billing → Credits Sync**
**File to Modify:** `convex/http.ts`
**Handle Events:**
- `subscription.created` - Initialize credits
- `subscription.updated` - Update tier and allotment
- `paymentAttempt.updated` - Add one-time credits

**Credit Tiers:**
- Free: 10 credits (test only)
- Starter ($29/mo): 500 credits
- Pro ($79/mo): 2000 credits
- Ultimate ($199/mo): 6000 credits

### Week 4: Analytics & Monitoring
**Estimated Time:** 6-8 hours

**1. Add Error Tracking**
**Package:** `@sentry/nextjs@^9.0.0`
**Setup:**
- Install Sentry SDK
- Configure `sentry.client.config.ts`
- Configure `sentry.server.config.ts`
- Add to `next.config.js`
- Test error reporting

**2. Add Analytics**
**Package:** `@vercel/analytics@^2.0.0`
**Track:**
- Page views
- Generation events
- Credit purchases
- User engagement

**3. Create Admin Dashboard**
**Exact Route:** `app/admin/page.tsx`
**Protected By:** Admin role check in Clerk
**Show:**
- Total users, generations, credits used
- Daily/weekly/monthly trends
- Failed generations rate
- Top users by generations

---

## 🔮 Future (Backlog)

### Advanced Generation Features
- **Image-to-Image Generation**: Upload reference image and transform
- **Batch Generation**: Generate multiple variations
- **ControlNet Integration**: Pose control, depth maps
- **Character Consistency**: LoRA training for custom characters
- **Scheduled Generations**: Queue generations for later

### Social Features
- **User Profiles**: Public gallery, bio, social links
- **Following System**: Follow creators, see their content
- **Comments**: Allow feedback on public assets
- **Trending Algorithm**: Surface popular content
- **Featured Collections**: Curated galleries

### Business Features
- **API Access**: Programmatic generation for Pro+ users
- **Webhooks**: Generation completion notifications
- **Team Accounts**: Shared credits and collections
- **Custom Model Training**: Upload datasets, train custom models
- **White-Label**: Custom branding for enterprise

### Mobile
- **Progressive Web App**: Install on mobile
- **React Native App**: Native iOS/Android
- **Mobile-Optimized UI**: Touch-friendly generation forms
- **Push Notifications**: Generation complete alerts

---

## 🎯 Success Metrics

### Phase 1 (Current Month)
- ✅ Authentication working
- ✅ Image generation < 10s average
- ✅ Video generation < 5min average
- ✅ 95%+ generation success rate
- ✅ Zero credit sync errors

### Phase 2 (Month 2)
- 100+ signed-up users
- 50+ paid subscribers
- 5%+ conversion rate
- < 5% monthly churn
- 1000+ generations/day

### Phase 3 (Month 3+)
- 20%+ MRR growth month-over-month
- NPS score > 40
- < 3% failed generation rate
- 10min+ average session length
- 50%+ repeat generation rate

---

## 🛡️ Technical Debt & Maintenance

### Security & Compliance (Before Public Launch)
- [ ] Content moderation system
- [ ] DMCA takedown process
- [ ] Age verification (18+ content)
- [ ] 2257 compliance documentation
- [ ] Rate limiting on API endpoints
- [ ] DDoS protection via Cloudflare
- [ ] Privacy policy (GDPR/CCPA compliant)
- [ ] Terms of service
- [ ] Cookie consent banner

### Performance Optimization
- [ ] Image optimization (WebP, AVIF formats)
- [ ] CDN caching strategy
- [ ] Database query optimization
- [ ] R2 storage cost monitoring
- [ ] Convex function performance monitoring

### Testing & CI/CD
- [ ] Unit tests for critical functions
- [ ] Integration tests for generation flow
- [ ] E2E tests with Playwright
- [ ] Automated deployment on push to main
- [ ] Preview deployments for PRs

---

## 💡 Notes

**Ethics & Legal:**
- Recreate structure & patterns from Leonardo.ai
- Rewrite all copy - no verbatim content
- No scraping of protected content
- Follow Clerk's integration patterns exactly
- Use Convex + Clerk JWT for auth checks (no client-only)

**Tech Stack Locked In:**
- Next.js 15 + App Router
- Clerk (auth + billing)
- Convex (database + serverless)
- Cloudflare R2 (storage)
- Promptchan (generation provider)
- shadcn/ui + TailwindCSS v4
- Vercel (hosting)

**Development Workflow:**
- Feature branches for all work
- PRs to main with review
- Conventional commits
- Update WIP/status.md after each deploy
- Keep roadmap concrete and actionable
