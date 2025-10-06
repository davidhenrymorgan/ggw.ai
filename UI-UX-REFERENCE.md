# UI/UX Reference Documentation

## 🎨 Current Design System Overview

### **Design Foundation**
- **Framework**: Next.js 15 with App Router
- **Styling**: TailwindCSS v4 with CSS Variables
- **Component Library**: shadcn/ui (New York style) with Radix UI primitives
- **Theme System**: next-themes with dark/light mode support
- **Animation**: Framer Motion + React Bits + Motion Primitives
- **Icons**: Lucide React (primary) + Tabler Icons
- **Charts**: Recharts for data visualization

### **Color System (OKLCH)**
```css
/* Light Theme */
--background: oklch(1 0 0)           /* Pure white */
--foreground: oklch(0.145 0 0)       /* Near black */
--primary: oklch(0.205 0 0)          /* Dark gray */
--secondary: oklch(0.97 0 0)         /* Light gray */
--muted: oklch(0.97 0 0)             /* Light gray */
--accent: oklch(0.97 0 0)            /* Light gray */
--destructive: oklch(0.577 0.245 27.325) /* Red */
--border: oklch(0.922 0 0)           /* Light border */
--ring: oklch(0.708 0 0)             /* Focus ring */

/* Dark Theme */
--background: oklch(0.145 0 0)       /* Dark gray */
--foreground: oklch(0.985 0 0)       /* Near white */
--primary: oklch(0.922 0 0)          /* Light gray */
--secondary: oklch(0.269 0 0)        /* Medium gray */
--muted: oklch(0.269 0 0)            /* Medium gray */
--accent: oklch(0.371 0 0)           /* Lighter gray */
--destructive: oklch(0.704 0.191 22.216) /* Red */
--border: oklch(1 0 0 / 10%)         /* Semi-transparent white */
--ring: oklch(0.556 0 0)             /* Focus ring */
```

### **Typography**
- **Font Family**: Geist Sans (primary), Geist Mono (code)
- **Font Variables**: `--font-sans`, `--font-mono`, `--font-serif`
- **CSS Classes**: Applied via TailwindCSS typography utilities

### **Spacing & Layout**
- **Border Radius**: `--radius: 0.625rem` (10px base)
- **Responsive**: Mobile-first approach
- **Container**: Standard Next.js layout patterns
- **Grid**: CSS Grid and Flexbox via TailwindCSS

## 🧩 Component Architecture

### **Core UI Components** (`components/ui/`)
```
├── button.tsx           # Primary action component
├── card.tsx            # Content containers
├── input.tsx           # Form inputs
├── avatar.tsx          # User profile images
├── badge.tsx           # Status indicators
├── sidebar.tsx         # Navigation sidebar
├── table.tsx           # Data tables
├── chart.tsx           # Chart wrappers
├── dropdown-menu.tsx   # Context menus
├── sheet.tsx           # Slide-out panels
├── drawer.tsx          # Mobile drawers
├── tabs.tsx            # Tab navigation
├── tooltip.tsx         # Hover information
├── skeleton.tsx        # Loading states
├── sonner.tsx          # Toast notifications
└── [20+ other components]
```

### **Custom Components**
```
├── theme-provider.tsx      # Theme management
├── ConvexClientProvider.tsx # Database provider
├── custom-clerk-pricing.tsx # Payment integration
├── mode-toggle.tsx         # Theme switcher
├── logo.tsx               # Brand logo
└── [Animation Components]
    ├── magicui/
    ├── motion-primitives/
    └── react-bits/
```

### **Layout Components**
```
├── app/(landing)/          # Public pages
│   ├── header.tsx         # Navigation header
│   ├── hero-section.tsx   # Landing hero
│   ├── features-one.tsx   # Feature showcase
│   ├── testimonials.tsx   # Social proof
│   ├── faqs.tsx          # FAQ section
│   ├── footer.tsx        # Site footer
│   └── call-to-action.tsx # CTA sections
└── app/dashboard/          # Protected area
    ├── layout.tsx         # Dashboard wrapper
    ├── app-sidebar.tsx    # Main navigation
    ├── nav-user.tsx       # User menu
    ├── data-table.tsx     # Data display
    └── chart-area-interactive.tsx # Analytics
```

## 🎭 Animation & Effects

### **Animation Libraries**
1. **Framer Motion** - Complex animations and transitions
2. **React Bits** - Custom animation components
3. **Motion Primitives** - Reusable animation patterns
4. **tw-animate-css** - CSS animation utilities

### **Current Animation Components**
- **Splash Cursor** - Interactive cursor effects
- **Animated Lists** - Smooth list animations
- **Progressive Blur** - Modern blur effects
- **Infinite Slider** - Continuous scrolling
- **Pulsating Button** - Attention-grabbing CTAs
- **Text Cursor** - Typing animations

### **CSS Animations**
- **CPU Architecture** - Custom path animations
- **Pulse Effects** - Loading and attention states
- **Shadow System** - Layered shadow effects

## 🔧 Theme System

### **Theme Provider Setup**
```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  <ClerkProvider>
    <ConvexClientProvider>
      {children}
    </ConvexClientProvider>
  </ClerkProvider>
</ThemeProvider>
```

### **Theme Customization Tools**
- [tweakcn.com](https://tweakcn.com/editor/theme?tab=typography)
- [themux.vercel.app](https://themux.vercel.app/shadcn-themes)
- [ui.jln.dev](https://ui.jln.dev/)

### **Customization Points**
1. **Global CSS** (`app/globals.css`) - Core variables
2. **Component Styles** (`components/ui/`) - Individual components
3. **Theme Variables** - CSS custom properties
4. **Dark Mode** - Automatic system detection

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: Default (320px+)
- **Tablet**: `md:` (768px+)
- **Desktop**: `lg:` (1024px+)
- **Large**: `xl:` (1280px+)
- **XL**: `2xl:` (1536px+)

### **Layout Patterns**
- **Mobile-First**: Base styles for mobile
- **Progressive Enhancement**: Add desktop features
- **Sidebar Collapse**: Mobile-friendly navigation
- **Touch-Friendly**: Appropriate tap targets

## 🔐 Authentication UI

### **Clerk Integration**
- **Sign In/Up Buttons**: Modal-based authentication
- **User Button**: Profile management
- **Theme Support**: Dark/light mode integration
- **Custom Styling**: Brand-consistent appearance

### **Auth Components**
```tsx
// Landing page
<SignInButton mode="modal">
  <Button variant="outline">Login</Button>
</SignInButton>

<SignUpButton mode="modal">
  <Button>Sign Up</Button>
</SignUpButton>

// Dashboard
<UserButton appearance={appearance} />
```

## 📊 Data Visualization

### **Chart Components**
- **Recharts** - Primary charting library
- **Interactive Charts** - Hover states and tooltips
- **Responsive Design** - Mobile-optimized charts
- **Theme Integration** - Automatic dark/light mode

### **Chart Color Palette**
```css
--chart-1: oklch(0.81 0.1 252)    /* Blue */
--chart-2: oklch(0.62 0.19 260)   /* Purple */
--chart-3: oklch(0.55 0.22 263)   /* Dark Purple */
--chart-4: oklch(0.49 0.22 264)   /* Darker Purple */
--chart-5: oklch(0.42 0.18 266)   /* Darkest Purple */
```

## 🚀 Performance Considerations

### **Optimization Strategies**
1. **Server Components** - Next.js 15 App Router
2. **Code Splitting** - Automatic route-based splitting
3. **Image Optimization** - Next.js Image component
4. **Font Loading** - Optimized Google Fonts
5. **CSS Purging** - TailwindCSS optimization
6. **Bundle Analysis** - Webpack bundle analyzer

### **Animation Performance**
- **GPU Acceleration** - Transform-based animations
- **Reduced Motion** - Respect user preferences
- **Lazy Loading** - Defer non-critical animations
- **Optimized Re-renders** - React optimization

## 📝 Development Guidelines

### **Component Development**
1. **TypeScript First** - Full type safety
2. **Accessibility** - ARIA labels and keyboard navigation
3. **Responsive Design** - Mobile-first approach
4. **Theme Support** - Dark/light mode compatibility
5. **Performance** - Optimized rendering

### **Styling Conventions**
1. **TailwindCSS Classes** - Utility-first approach
2. **CSS Variables** - Consistent theming
3. **Component Variants** - CVA (Class Variance Authority)
4. **Responsive Utilities** - Mobile-first breakpoints
5. **Animation Classes** - Consistent motion design

### **File Organization**
```
components/
├── ui/                 # Base UI components
├── custom/            # Custom business components
├── layout/            # Layout-specific components
├── forms/             # Form components
└── animations/        # Animation components
```

---

## 🔄 Migration & Refactoring Notes

### **Safe Refactoring Areas**
- Component styling and variants
- Animation timing and easing
- Color palette adjustments
- Typography scaling
- Spacing and layout tweaks

### **High-Risk Areas**
- Authentication flow components
- Database integration points
- Payment processing UI
- Core navigation structure
- Theme provider hierarchy

### **Testing Requirements**
- Cross-browser compatibility
- Mobile responsiveness
- Dark/light theme switching
- Animation performance
- Accessibility compliance

---

*Last Updated: $(date)*
*Version: 1.0*
*Next Review: After UI/UX changes*
