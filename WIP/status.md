# STATUS.md

Project Status for girlsgonewild.ai
Last Updated: 2025-10-05

## ✅ Deployed & Working

- Next.js 15 starter with App Router and Turbopack
- Clerk authentication (sign-up, sign-in, social logins)
- Clerk → Convex user sync via webhooks
- Clerk Billing integration with payment webhooks
- Basic dashboard (protected route)
- Theme provider (light/dark mode)
- TailwindCSS v4 + shadcn/ui components

## 🚧 Built But Not Deployed

None yet - working on production deployment

## 🔧 Partially Working

### UI Shell & Explore Page
- **Branch:** feature/ui-shell-explore
- **Status:** Started - 2025-10-05
- **What works:** (building now)
- **What doesn't:** (will update as we go)

## ❌ Known Issues

None yet

## 📊 Latest Deployment

- **Environment:** Development only
- **URL:** localhost:3000
- **Convex:** Development deployment
- **Domain:** girlsgonewild.ai (configured in Cloudflare, not yet attached)

## Current Sprint: Foundation → Production

### Pre-Phase 0: Production Deployment
**Goal:** Get current foundation live  
**Estimated Time:** 1 day

- [ ] Connect repository to Vercel
- [ ] Configure production environment variables
- [ ] Deploy Convex to production
- [ ] Attach girlsgonewild.ai domain to Vercel
- [ ] Update webhook URLs to production endpoints
- [ ] Verify auth flow in production
- [ ] Test payment webhooks in production

---

## Phase 1: Credit System & Billing Integration
**Goal:** Connect Clerk subscriptions to internal credit system  
**Estimated Time:** 3-5 days  
**Prerequisites:** Phase 0 complete

### 1.1 Database Schema
- [ ] Add `credits` table to Convex schema
- [ ] Add `creditTransactions` table for audit trail
- [ ] Add `subscriptionTiers` table for pricing config
- [ ] Create indexes: `by_user`, `by_type`, `by_timestamp`

### 1.2 Credit Management Backend
- [ ] Create `convex/credits.ts` with credit operations
- [ ] Implement `deductCredits` mutation with validation
- [ ] Implement `addCredits` mutation for purchases
- [ ] Implement `resetMonthlyCredits` for subscription renewals
- [ ] Add `getCreditBalance` query
- [ ] Add `getCreditHistory` query with pagination

### 1.3 Clerk Billing → Credits Sync
- [ ] Update webhook handler to process subscription events
- [ ] Map Clerk subscription tiers to credit allotments:
  - Free: 0 credits
  - Starter ($29/mo): 500 credits
  - Pro ($79/mo): 2000 credits
  - Ultimate ($199/mo): 6000 credits
- [ ] Implement monthly credit reset logic (cron job)
- [ ] Handle subscription upgrades/downgrades
- [ ] Handle one-time credit purchases

### 1.4 Frontend Credit Display
- [ ] Create `<CreditBalance>` component for navbar
- [ ] Create `<CreditHistory>` component for dashboard
- [ ] Add credit cost indicators to generation UI
- [ ] Show "insufficient credits" messaging

**Acceptance Criteria:**
- User sees current credit balance in real-time
- Credits deduct immediately on generation
- Monthly resets work automatically
- Upgrade/downgrade flows update credits correctly

---

## Phase 2: Promptchan API Integration
**Goal:** Establish connection to Promptchan for image generation  
**Estimated Time:** 3-4 days  
**Prerequisites:** Phase 1 complete

### 2.1 API Setup
- [ ] Create Promptchan account
- [ ] Purchase gems (starting with $29.99 = 900 gems for testing)
- [ ] Generate API key from promptchan.com/settings
- [ ] Add to Convex environment: `PROMPTCHAN_API_KEY`
- [ ] Test API connection with basic image generation

### 2.2 API Wrapper
- [ ] Create `convex/lib/promptchan.ts` API client
- [ ] Implement `generateImage()` action
- [ ] Implement `submitVideo()` action
- [ ] Implement `pollVideoStatus()` action
- [ ] Implement `getVideoResult()` action
- [ ] Add error handling and retry logic
- [ ] Add request/response logging

### 2.3 Generation Database Schema
- [ ] Add `generations` table to schema
- [ ] Fields: userId, type (image/video), prompt, settings, status, etc.
- [ ] Add indexes: `by_user`, `by_status`, `by_user_and_status`
- [ ] Store Promptchan request IDs for polling

**Acceptance Criteria:**
- Can call Promptchan API successfully from Convex action
- Errors are caught and logged appropriately
- API responses are typed and validated

---

## Phase 3: Cloudflare R2 Storage
**Goal:** Store generated content permanently in R2  
**Estimated Time:** 2-3 days  
**Prerequisites:** Phase 2 complete

### 3.1 R2 Bucket Setup
- [ ] Create Cloudflare R2 bucket: `girlsgonewild-content`
- [ ] Generate R2 API tokens
- [ ] Add to Convex environment:
  - `R2_ACCOUNT_ID`
  - `R2_ACCESS_KEY_ID`
  - `R2_SECRET_ACCESS_KEY`
  - `R2_BUCKET_NAME`
  - `R2_PUBLIC_URL` (for CDN)
- [ ] Configure CORS for bucket
- [ ] Set up public access policy for read-only

### 3.2 Storage Implementation
- [ ] Create `convex/lib/r2.ts` storage client
- [ ] Implement `uploadImage()` - base64 → R2
- [ ] Implement `uploadVideo()` - URL download → R2
- [ ] Implement `generateThumbnail()` for videos
- [ ] Create file naming convention: `{userId}/{generationId}.{ext}`
- [ ] Generate signed URLs for private content

### 3.2 Integration with Generation Flow
- [ ] Update image generation action to upload to R2
- [ ] Update video generation action to download + upload to R2
- [ ] Store R2 keys and CDN URLs in `generations` table
- [ ] Clean up temporary files after upload
- [ ] Handle upload failures and retries

**Acceptance Criteria:**
- Images uploaded to R2 immediately after generation
- Videos downloaded from Promptchan, then uploaded to R2
- CDN URLs accessible and fast
- Thumbnails generated for videos

---

## Phase 4: Image Generation Feature
**Goal:** Complete image generation workflow  
**Estimated Time:** 4-5 days  
**Prerequisites:** Phases 1-3 complete

### 4.1 Generation Flow Backend
- [ ] Create `convex/generations.ts`
- [ ] Implement `createImageGeneration` mutation
  - Validate credit balance
  - Deduct credits based on quality tier
  - Create generation record
  - Return generation ID
- [ ] Implement `processImageGeneration` action
  - Call Promptchan API
  - Upload to R2
  - Update generation status
  - Handle errors
- [ ] Implement `getGenerationById` query
- [ ] Implement `getUserGenerations` query with pagination

### 4.2 Frontend Generation Form
- [ ] Create `/dashboard/generate/image` page
- [ ] Build `<ImageGenerationForm>` component:
  - Prompt textarea with character limit
  - Style selector (Cinematic XL, Anime XL+, etc.)
  - Quality selector (Standard/High/Max) with credit costs
  - Pose dropdown (organized by model type)
  - Filter selector
  - Emotion selector
  - Advanced sliders (age, weight, body)
  - Negative prompt (optional)
- [ ] Show credit cost preview
- [ ] Implement form validation
- [ ] Handle submission with loading states

### 4.3 Generation Display
- [ ] Create `<GenerationResult>` component
- [ ] Show loading state with progress indicator
- [ ] Display generated image with download button
- [ ] Show generation details (prompt, settings, cost)
- [ ] Add regenerate option
- [ ] Real-time updates via Convex subscription

### 4.4 Generation History
- [ ] Create `/dashboard/generations` page
- [ ] Build gallery grid with filters (All/Images/Videos)
- [ ] Add search by prompt
- [ ] Pagination or infinite scroll
- [ ] Bulk actions (delete, download)

**Acceptance Criteria:**
- User can generate images with all Promptchan features
- Credits deduct correctly based on quality
- Images appear in real-time when complete
- History persists and is searchable

---

## Phase 5: Video Generation Feature
**Goal:** Async video generation with polling  
**Estimated Time:** 4-5 days  
**Prerequisites:** Phase 4 complete

### 5.1 Video Flow Backend
- [ ] Implement `createVideoGeneration` mutation
  - Validate credits (100/200 credits for Standard/High)
  - Create generation record with `status: "pending"`
- [ ] Implement `submitVideoJob` action
  - Call Promptchan `/video_v2/submit`
  - Store `request_id` in generation record
  - Return immediately
- [ ] Implement `pollVideoStatus` scheduled function
  - Query pending video generations
  - Check status with Promptchan
  - Update generation records
  - Trigger processing when complete
- [ ] Implement `processVideoResult` action
  - Download video from Promptchan URL
  - Upload to R2
  - Generate thumbnail
  - Update generation status to "completed"

### 5.2 Frontend Video Form
- [ ] Create `/dashboard/generate/video` page
- [ ] Build `<VideoGenerationForm>`:
  - Prompt textarea
  - Quality selector (Standard/High/Max)
  - Aspect ratio (Portrait/Wide)
  - Audio toggle
  - Age slider
  - Seed input (optional)
- [ ] Show estimated cost
- [ ] Submit and show queued status

### 5.3 Video Progress Display
- [ ] Create `<VideoGenerationProgress>` component
- [ ] Show queue position from Promptchan logs
- [ ] Display progress percentage
- [ ] Estimated time remaining
- [ ] Auto-refresh via Convex subscription

**Acceptance Criteria:**
- Videos submit successfully and queue
- Status updates in real-time
- Videos download and upload to R2 automatically
- Thumbnails generated and displayed

---

## Phase 6: UI/UX Polish & Gallery
**Goal:** Professional user experience  
**Estimated Time:** 5-7 days  
**Prerequisites:** Phases 4-5 complete

### 6.1 Dashboard Redesign
- [ ] Replace placeholder content with real data
- [ ] Show generation stats (total, this month, remaining credits)
- [ ] Recent generations carousel
- [ ] Quick action buttons (Generate Image/Video)
- [ ] Credit usage charts

### 6.2 Public Gallery (Optional)
- [ ] Add `visibility` field to generations (private/public)
- [ ] Create `/explore` page
- [ ] Masonry grid layout
- [ ] Filter by type, style, trending
- [ ] User can toggle public/private on their content

### 6.3 Branding
- [ ] Replace "Starter" branding with girlsgonewild.ai
- [ ] Custom logo design
- [ ] Update landing page copy
- [ ] Brand colors and theme
- [ ] Custom fonts

### 6.4 Landing Page Updates
- [ ] Hero section with product demo video
- [ ] Feature showcase (image/video generation)
- [ ] Updated pricing table with credit info
- [ ] Sample gallery
- [ ] Updated FAQ section
- [ ] Custom testimonials

### 6.5 Settings & Preferences
- [ ] User preferences page
- [ ] Default generation settings
- [ ] Privacy controls
- [ ] Download history
- [ ] API key management (future)

**Acceptance Criteria:**
- App feels like a cohesive product, not a template
- Navigation is intuitive
- All placeholder content replaced
- Brand identity established

---

## Phase 7: Advanced Features (Future)
**Goal:** Differentiate from competitors  
**Estimated Time:** Ongoing

### 7.1 Advanced Generation
- [ ] Image-to-image generation
- [ ] ControlNet integration
- [ ] Character consistency (LoRA training)
- [ ] Batch generation
- [ ] Scheduled generations

### 7.2 Social Features
- [ ] Collections/Folders
- [ ] Favorites/Likes
- [ ] Share links
- [ ] Collaborative galleries
- [ ] Comments/Feedback

### 7.3 Business Features
- [ ] API access for Pro+ users
- [ ] Webhooks for generation completion
- [ ] Team accounts
- [ ] Usage analytics dashboard
- [ ] Custom model training

### 7.4 Mobile
- [ ] Progressive Web App
- [ ] Native mobile app (React Native)
- [ ] Mobile-optimized generation forms

---

## Technical Debt & Maintenance

### Ongoing
- [ ] Monitor Promptchan API changes
- [ ] Optimize R2 storage costs
- [ ] Database query performance
- [ ] Error tracking (Sentry integration)
- [ ] Analytics (PostHog/Mixpanel)
- [ ] Automated testing
- [ ] CI/CD pipeline improvements

### Security & Compliance
- [ ] Content moderation system
- [ ] DMCA takedown process
- [ ] Age verification (18+ content)
- [ ] 2257 compliance documentation
- [ ] Rate limiting
- [ ] DDoS protection
- [ ] Privacy policy
- [ ] Terms of service

---

## Success Metrics

### Phase 1-3
- Credit system working without manual intervention
- Zero billing/credit sync errors
- API calls succeed >99% of time

### Phase 4-5
- Image generation &lt;10 seconds avg
- Video generation &lt;5 minutes avg
- User can generate content without errors &gt;95% of time

### Phase 6
- User session length &gt;10 minutes
- Repeat generation rate &gt;50%
- Subscription conversion &gt;5%

### Long-term
- MRR growth 20%+ month-over-month
- Churn rate &lt;5%
- NPS score &gt;40
