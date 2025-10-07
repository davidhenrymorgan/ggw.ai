# Sora-Inspired UI/UX Redesign Documentation

**Status:** ⚠️ BUILD SUCCESSFUL, UI BROKEN
**Last Updated:** 2025-10-07
**Commits:** 6f4a8c3 → 874a9f6

---

## 🚨 CRITICAL ISSUE

**Problem:** Build passes all checks but deployed UI is structurally broken
- **Broken Deployment:** https://ggw-ndlmgr3gb-davidhenrymorgans-projects.vercel.app
- **Working Deployment:** https://ggw-qczy442v3-davidhenrymorgans-projects.vercel.app (before redesign fixes)
- **Suspected Cause:** Missing Tailwind base layers or incorrect Tailwind CSS v4 configuration
- **Impact:** Site is not usable despite successful TypeScript, linting, and Tailwind compilation

---

## Original Plan

User provided comprehensive plan to implement Sora-inspired UI/UX based on https://sora.chatgpt.com/explore

### Design Goals

**Visual Language:**
- Dark cinematic theme (canvas: `oklch(0.08 0 0)`)
- Glass morphism effects (semi-transparent cards with backdrop-blur)
- Luminous glow accents (subtle purple/cyan glows on hover)
- Gradient system (purple → cyan → magenta → orange → gold)
- Generous spacing and big rhythm
- Minimal, elegant typography (Geist Sans/Mono)

**Navigation:**
- 48px icon-only sidebar (fixed left)
- Floating top-right navigation on landing page
- Minimal visual weight

**Interactions:**
- Smooth transitions (300ms duration)
- Scale transforms on hover (1.02)
- Glow effects on active states
- Fade-in/slide-up animations on load

---

## Implementation Summary

### Phase 1: Tailwind Configuration
**File Created:** [tailwind.config.ts](../tailwind.config.ts)

**Custom Theme:**
```typescript
colors: {
  brand: {
    dark: "oklch(0.08 0 0)",
    purple: "oklch(0.488 0.243 264.376)",
    cyan: "oklch(0.7 0.15 220)",
    blue: "oklch(0.45 0.2 260)",
    magenta: "oklch(0.6 0.25 330)",
    orange: "oklch(0.65 0.2 50)",
    gold: "oklch(0.75 0.15 80)",
  }
}
```

**Custom Animations:**
- `fade-in`: 0.5s ease-out opacity transition
- `slide-up`: 0.6s ease-out vertical slide with opacity
- `slide-in`: 0.4s ease-out horizontal slide with opacity
- `scale-in`: 0.3s ease-out scale with opacity
- `glow-pulse`: 2s infinite glow effect

**Custom Shadows:**
- `shadow-glow`: Subtle white glow
- `shadow-glow-purple`: Purple accent glow
- `shadow-glow-cyan`: Cyan accent glow

### Phase 2: Global Styles
**File Modified:** [app/globals.css](../app/globals.css)

**Added Utilities:**
```css
.bg-gradient-sora {
  background: linear-gradient(to bottom, oklch(0.37 0.1 296), oklch(0.25 0.08 264));
}

.bg-gradient-hero {
  background: linear-gradient(135deg, oklch(0.37 0.1 296) 0%, oklch(0.35 0.15 264) 50%, oklch(0.25 0.08 264) 100%);
}

.bg-gradient-card-purple {
  background: linear-gradient(135deg, oklch(0.488 0.243 264.376), oklch(0.45 0.2 260));
}

.bg-gradient-card-cyan {
  background: linear-gradient(135deg, oklch(0.7 0.15 220), oklch(0.488 0.243 264.376));
}

/* Additional gradient utilities... */
```

**Note:** Originally included `.glass` and `.glass-hover` utilities but these were removed due to Tailwind CSS v4 build errors.

### Phase 3: Landing Page Hero
**File Modified:** [app/(landing)/hero-section.tsx](../app/(landing)/hero-section.tsx)

**Changes:**
- Full-viewport layout (`min-h-screen`)
- Gradient background (purple → blue → dark purple)
- Floating navigation (top-right with glass morphism)
- Split typography: "Dream" (serif) + "Generator" (sans)
- Framer Motion animations on scroll
- Bottom brand bar with project count

### Phase 4: Authentication Pages
**Files Created:**
- [app/(auth)/sign-in/[[...sign-in]]/page.tsx](../app/(auth)/sign-in/[[...sign-in]]/page.tsx)
- [app/(auth)/sign-up/[[...sign-up]]/page.tsx](../app/(auth)/sign-up/[[...sign-up]]/page.tsx)

**Design:**
- Full-page gradient backgrounds (purple/orange orbs)
- Glass morphism cards for Clerk components
- Custom Clerk appearance theme
- Logo positioning (top-left with fade-in)
- Centered form layout

**Clerk Appearance Customization:**
```typescript
appearance={{
  elements: {
    card: "bg-card/50 backdrop-blur-xl border border-border/50 hover:bg-card/80 hover:border-border hover:shadow-glow transition-all duration-300 rounded-3xl shadow-glow px-8 py-10",
    // ... more custom styling
  }
}}
```

### Phase 5: Minimal Sidebar
**File Created:** [components/ui/minimal-sidebar.tsx](../components/ui/minimal-sidebar.tsx)

**Features:**
- 48px fixed left sidebar
- Icon-only navigation (Home, Explore, Generate, History, Settings)
- Tooltips on hover (right-positioned)
- Active state with gradient glow
- Profile avatar at bottom
- Glass morphism background

**File Modified:** [app/dashboard/layout.tsx](../app/dashboard/layout.tsx)
- Replaced `<AppSidebar>` with `<MinimalSidebar>`
- Removed `<SidebarProvider>`
- Adjusted main content margin (`ml-20`)

### Phase 6: Generation Page Polish
**File Modified:** [app/dashboard/generate/page.tsx](../app/dashboard/generate/page.tsx)

**Enhancements:**
- Multi-mode tabs with gradient active states
  - Text-to-Image: purple gradient
  - Text-to-Video: cyan gradient
  - Image-to-Image: gold gradient
  - Image Edit: magenta gradient
- Glass morphism form container (rounded-3xl)
- Enhanced spacing and typography
- Gradient credit cost badge
- Gradient generate button with glow effect

### Phase 7: Explore Page & Asset Cards
**File Modified:** [app/explore/page.tsx](../app/explore/page.tsx)
- Enhanced header with gradient backdrop
- Glass morphism filter buttons
- Gradient active states on filters
- Improved spacing and layout

**File Modified:** [components/ui/asset-card.tsx](../components/ui/asset-card.tsx)
- Luminous glow on hover (`shadow-glow`)
- Scale transform on hover (`scale-[1.02]`)
- Fade-in animation on load
- Enhanced gradient overlay
- Smooth transitions (300ms)

### Phase 8: Convex Schema Updates
**File Modified:** [convex/schema.ts](../convex/schema.ts)

**Added Tables:**
```typescript
boards: defineTable({
  userId: v.id("users"),
  name: v.string(),
  category: v.optional(v.string()),
  description: v.optional(v.string()),
  coverImageId: v.optional(v.id("assets")),
  isPublic: v.boolean(),
  createdAt: v.number(),
  updatedAt: v.number(),
}),

boardPrompts: defineTable({
  boardId: v.id("boards"),
  prompt: v.string(),
  negativePrompt: v.optional(v.string()),
  style: v.optional(v.string()),
  assetIds: v.array(v.id("assets")),
  order: v.number(),
  createdAt: v.number(),
})
```

---

## Build Errors & Fixes

### Error 1: Missing Textarea Component
**Error:** `Module not found: Can't resolve '@/components/ui/textarea'`
**Location:** [app/dashboard/generate/page.tsx:7](../app/dashboard/generate/page.tsx#L7)
**Fix:** Created [components/ui/textarea.tsx](../components/ui/textarea.tsx) with standard shadcn/ui implementation
**Commit:** 6f4a8c3

### Error 2: TypeScript - darkMode Array Syntax
**Error:** `Type '["class"]' is not assignable to type 'DarkModeStrategy | undefined'`
**Location:** [tailwind.config.ts:4](../tailwind.config.ts#L4)
**Fix:** Changed `darkMode: ["class"]` to `darkMode: "class"` (Tailwind CSS v4 syntax)
**Commit:** 12f6f92

### Error 3: Unknown Utility Class 'glass'
**Error:** `[Error: Cannot apply unknown utility class 'glass']`
**Locations:** Multiple TSX files using `.glass` and `.glass-hover` classes
**Fix:** Replaced all instances with inline Tailwind utilities:
```typescript
// Before
className="glass-hover"

// After
className="bg-card/50 backdrop-blur-xl border border-border/50 hover:bg-card/80 hover:border-border hover:shadow-glow transition-all duration-300"
```
**Method:** Used `sed` command to replace across all TSX files
**Commit:** b5e7583

### Error 4: Missing tailwindcss-animate Plugin
**Error:** Build failed due to `require("tailwindcss-animate")` but package not installed
**Location:** [tailwind.config.ts:87](../tailwind.config.ts#L87)
**Fix:** Changed `plugins: [require("tailwindcss-animate")]` to `plugins: []`
**Reason:** Package not in package.json, animations defined manually in config
**Commit:** 874a9f6

---

## Current State (BROKEN)

### Build Status: ✅ SUCCESS
- TypeScript compilation: PASS
- Linting: PASS
- Tailwind compilation: PASS
- All imports resolved: PASS

### Visual Status: ❌ BROKEN
- Deployed site lacks proper styling/structure
- Layout appears broken
- Components missing visual structure
- Glass morphism effects not rendering
- Gradients not visible
- Typography not styled properly

### Suspected Root Causes (Prioritized)

**⚠️ CRITICAL FINDING:** The `.glass` and `.glass-hover` utilities ARE still defined in [app/globals.css](../app/globals.css) lines 202-208, but we replaced all usages with inline utilities in TSX files during the "unknown utility" error fix. This may have been unnecessary and could be the root cause!

1. **Incorrect Fix for "Unknown Utility" Error (MOST LIKELY)**
   - Error said `.glass` utility was unknown
   - We replaced all `.glass-hover` usages with inline utilities
   - BUT the utilities ARE defined in globals.css @layer utilities
   - The build error may have been a false positive or temporary
   - Solution: Revert inline utility replacements and test if .glass works

2. **@apply Directives Not Working in Tailwind CSS v4**
   - `.glass` and `.glass-hover` use `@apply` directive (lines 203, 207)
   - Tailwind CSS v4 may not support @apply in @layer utilities context
   - This would explain "unknown utility" error during build
   - Solution: Replace @apply with actual CSS properties or Tailwind config plugin

3. **Tailwind CSS v4 @layer Syntax Incompatibility**
   - Custom utilities in globals.css may not be properly applied
   - `@layer utilities { ... }` may work differently in v4
   - Solution: Verify @layer syntax or use @theme plugin {} instead

4. **Missing Base/Components/Utilities Imports**
   - May have removed critical `@import "tailwindcss"` directives
   - Current imports: `@import "tailwindcss"` and `@import "tw-animate-css"`
   - Solution: Compare globals.css with working version to see what changed

5. **CSS Variables Not Defined**
   - shadcn/ui relies on CSS variables in `:root`
   - Variables appear properly defined (lines 6-85)
   - Less likely to be the issue

6. **Removed Plugin Still Required**
   - tailwindcss-animate removed but tw-animate-css imported
   - May need to reinstall plugin
   - Less likely since build succeeds

---

## File Change Summary

### Created Files
1. [tailwind.config.ts](../tailwind.config.ts) - Custom Sora theme
2. [app/(landing)/hero-section.tsx](../app/(landing)/hero-section.tsx) - Full-viewport hero
3. [app/(auth)/sign-in/[[...sign-in]]/page.tsx](../app/(auth)/sign-in/[[...sign-in]]/page.tsx) - Custom auth page
4. [app/(auth)/sign-up/[[...sign-up]]/page.tsx](../app/(auth)/sign-up/[[...sign-up]]/page.tsx) - Custom signup page
5. [components/ui/minimal-sidebar.tsx](../components/ui/minimal-sidebar.tsx) - Icon-only sidebar
6. [components/ui/textarea.tsx](../components/ui/textarea.tsx) - Missing component fix

### Modified Files
1. [app/globals.css](../app/globals.css) - Added custom gradient utilities
2. [app/dashboard/layout.tsx](../app/dashboard/layout.tsx) - Switched to minimal sidebar
3. [app/dashboard/generate/page.tsx](../app/dashboard/generate/page.tsx) - Enhanced with gradients
4. [app/explore/page.tsx](../app/explore/page.tsx) - Glass morphism filters
5. [components/ui/asset-card.tsx](../components/ui/asset-card.tsx) - Luminous glow effects
6. [convex/schema.ts](../convex/schema.ts) - Added boards tables

### Affected Files (glass utility replacement)
- [app/dashboard/generate/page.tsx](../app/dashboard/generate/page.tsx)
- [app/explore/page.tsx](../app/explore/page.tsx)
- [components/ui/asset-card.tsx](../components/ui/asset-card.tsx)
- [components/ui/minimal-sidebar.tsx](../components/ui/minimal-sidebar.tsx)
- [app/(auth)/sign-in/[[...sign-in]]/page.tsx](../app/(auth)/sign-in/[[...sign-in]]/page.tsx)
- [app/(auth)/sign-up/[[...sign-up]]/page.tsx](../app/(auth)/sign-up/[[...sign-up]]/page.tsx)

---

## Recommended Quick Fix

Based on the critical finding above, try this first:

### Option 1: Revert .glass-hover Replacements
The build error about "unknown utility 'glass'" may have been temporary or a false positive. Try reverting the inline utility replacements:

```bash
# Revert the sed replacement commit
git revert b5e7583 --no-commit

# Test if build still works with .glass-hover
npm run build

# If successful, deploy and test
```

### Option 2: Replace @apply with CSS Properties
If @apply doesn't work in Tailwind CSS v4, replace the utility definitions in globals.css:

```css
/* Instead of @apply directives */
.glass {
  background-color: rgb(from var(--color-card) r g b / 50%);
  backdrop-filter: blur(24px);
  border: 1px solid rgb(from var(--color-border) r g b / 50%);
}

.glass-hover {
  /* ... replicate with actual CSS */
}
```

### Option 3: Move to Tailwind Config Plugin
Define utilities in tailwind.config.ts instead of @layer:

```typescript
// tailwind.config.ts
plugins: [
  plugin(function({ addUtilities }) {
    addUtilities({
      '.glass': {
        'background-color': 'rgb(from var(--color-card) r g b / 50%)',
        'backdrop-filter': 'blur(24px)',
        'border': '1px solid rgb(from var(--color-border) r g b / 50%)',
      },
    })
  })
]
```

---

## Debugging Steps for Next Session

### 1. Compare globals.css
```bash
git diff ggw-qczy442v3..874a9f6 -- app/globals.css
```
Look for:
- Missing `@import "tailwindcss"` statements
- Removed `:root` CSS variable definitions
- Changes to @layer directives

### 2. Inspect Production Build
- Open both deployments side-by-side
- Use Chrome DevTools → Network tab
- Check if CSS files are loading
- Compare file sizes between working and broken

### 3. Check Compiled CSS
- In broken deployment, view source
- Find `<link rel="stylesheet">` tags
- Download CSS file and inspect compiled output
- Look for missing utility classes

### 4. Test Custom Utilities
- In browser console, inspect elements
- Check if custom classes are applied
- Verify `.bg-gradient-*` classes exist
- Check if `oklch()` colors are rendering

### 5. Verify Tailwind CSS v4 Setup
- Read Tailwind CSS v4 migration guide
- Confirm correct import syntax
- Check if `@tailwindcss/vite` plugin is needed
- Verify package.json has correct Tailwind version

### 6. Review Build Logs
- Check Vercel deployment logs in detail
- Look for CSS compilation warnings
- Check for PostCSS configuration issues

---

## Rollback Option

If debugging proves time-consuming, can rollback to last working version:

```bash
# Revert to last working commit
git revert 874a9f6..HEAD --no-commit

# Or cherry-pick specific working commits
git checkout ggw-qczy442v3 -- app/globals.css
git checkout ggw-qczy442v3 -- tailwind.config.ts

# Then carefully re-apply Sora styles one file at a time
```

**Last Working Commit:** Before 874a9f6 (exact commit from deployment ggw-qczy442v3)
**Broken Commit:** 874a9f6 "fix: Resolve Tailwind CSS v4 build errors"

---

## Next Steps

1. **PRIORITY 1:** Fix broken UI (see debugging steps above)
2. Test visual appearance matches Sora design goals
3. Verify all animations and transitions work
4. Test responsive design on mobile/tablet
5. Fix authentication issue (separate from UI issue)
6. Test full generation flow once auth is fixed

---

## Related Documentation

- [status.md](status.md) - Current deployment status
- [roadmap.md](roadmap.md) - Next priorities (UI fix is #1)
- [DocsIndex.md](DocsIndex.md) - Documentation index with quick links

---

## Design Reference

**Original Inspiration:** https://sora.chatgpt.com/explore
**Key Visual Elements Replicated:**
- Dark canvas background
- Glass morphism cards
- Gradient accents
- Luminous glows
- Minimal navigation
- Generous spacing
- Smooth animations

**NOT Replicated (Yet):**
- Video background on hero
- Storyboard generation UI
- Community feed features
- Remix/extend functionality
