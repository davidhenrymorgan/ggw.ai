# Design System Documentation

## 🎨 Design System Overview

### **Design Philosophy**
- **Modern & Clean**: Minimalist aesthetic with purposeful elements
- **Accessible**: WCAG 2.1 AA compliance
- **Responsive**: Mobile-first approach
- **Consistent**: Unified visual language across all components
- **Performant**: Optimized for speed and smooth interactions

### **Design Tokens**
All design decisions are tokenized for consistency and easy maintenance.

## 🎯 Color System

### **Color Palette (OKLCH)**

#### **Primary Colors**
```css
/* Light Theme */
--primary: oklch(0.205 0 0)              /* Dark Gray */
--primary-foreground: oklch(0.985 0 0)   /* Near White */

/* Dark Theme */
--primary: oklch(0.922 0 0)              /* Light Gray */
--primary-foreground: oklch(0.205 0 0)   /* Dark Gray */
```

#### **Semantic Colors**
```css
/* Background Colors */
--background: oklch(1 0 0)               /* Pure White (Light) */
--background: oklch(0.145 0 0)           /* Dark Gray (Dark) */

/* Text Colors */
--foreground: oklch(0.145 0 0)           /* Near Black (Light) */
--foreground: oklch(0.985 0 0)           /* Near White (Dark) */

/* Muted Colors */
--muted: oklch(0.97 0 0)                 /* Light Gray (Light) */
--muted: oklch(0.269 0 0)                /* Medium Gray (Dark) */
--muted-foreground: oklch(0.556 0 0)     /* Medium Gray Text */

/* Accent Colors */
--accent: oklch(0.97 0 0)                /* Light Gray (Light) */
--accent: oklch(0.371 0 0)               /* Lighter Gray (Dark) */

/* Destructive (Error) */
--destructive: oklch(0.577 0.245 27.325) /* Red (Light) */
--destructive: oklch(0.704 0.191 22.216) /* Red (Dark) */
```

#### **Chart Colors**
```css
--chart-1: oklch(0.81 0.1 252)    /* Blue */
--chart-2: oklch(0.62 0.19 260)   /* Purple */
--chart-3: oklch(0.55 0.22 263)   /* Dark Purple */
--chart-4: oklch(0.49 0.22 264)   /* Darker Purple */
--chart-5: oklch(0.42 0.18 266)   /* Darkest Purple */
```

#### **Sidebar Colors**
```css
/* Light Theme */
--sidebar: oklch(0.985 0 0)                    /* Light Gray */
--sidebar-foreground: oklch(0.145 0 0)         /* Dark Text */
--sidebar-primary: oklch(0.205 0 0)            /* Dark Gray */
--sidebar-accent: oklch(0.94 0 0)              /* Lighter Gray */

/* Dark Theme */
--sidebar: oklch(0.205 0 0)                    /* Dark Gray */
--sidebar-foreground: oklch(0.985 0 0)         /* Light Text */
--sidebar-primary: oklch(0.488 0.243 264.376)  /* Purple */
--sidebar-accent: oklch(0.269 0 0)             /* Medium Gray */
```

### **Color Usage Guidelines**

#### **Primary Colors**
- **Primary**: Main brand color, CTAs, links
- **Primary Foreground**: Text on primary backgrounds

#### **Semantic Colors**
- **Background**: Main page background
- **Foreground**: Primary text color
- **Muted**: Secondary backgrounds, disabled states
- **Accent**: Highlights, hover states
- **Destructive**: Errors, delete actions, warnings

#### **Accessibility**
- All color combinations meet WCAG 2.1 AA contrast ratios
- Color is never the only indicator of state
- Dark mode provides equivalent contrast ratios

## 📝 Typography

### **Font System**
```css
/* Font Families */
--font-sans: 'Geist', system-ui, sans-serif
--font-mono: 'Geist Mono', 'Fira Code', monospace
--font-serif: 'Georgia', serif
```

### **Font Weights**
- **Light**: 300
- **Regular**: 400 (default)
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

### **Font Sizes (TailwindCSS)**
```css
text-xs    /* 12px / 0.75rem */
text-sm    /* 14px / 0.875rem */
text-base  /* 16px / 1rem */
text-lg    /* 18px / 1.125rem */
text-xl    /* 20px / 1.25rem */
text-2xl   /* 24px / 1.5rem */
text-3xl   /* 30px / 1.875rem */
text-4xl   /* 36px / 2.25rem */
text-5xl   /* 48px / 3rem */
text-6xl   /* 60px / 3.75rem */
```

### **Line Heights**
```css
leading-none   /* 1 */
leading-tight  /* 1.25 */
leading-snug   /* 1.375 */
leading-normal /* 1.5 */
leading-relaxed /* 1.625 */
leading-loose  /* 2 */
```

### **Typography Hierarchy**
1. **Headings**: Use semantic HTML (h1-h6) with appropriate sizes
2. **Body Text**: Use `text-base` for readable content
3. **Small Text**: Use `text-sm` for captions and metadata
4. **Large Text**: Use `text-lg` or larger for emphasis

## 📐 Spacing System

### **Spacing Scale (TailwindCSS)**
```css
/* Base spacing unit: 0.25rem (4px) */
space-0     /* 0px */
space-1     /* 4px */
space-2     /* 8px */
space-3     /* 12px */
space-4     /* 16px */
space-5     /* 20px */
space-6     /* 24px */
space-8     /* 32px */
space-10    /* 40px */
space-12    /* 48px */
space-16    /* 64px */
space-20    /* 80px */
space-24    /* 96px */
space-32    /* 128px */
```

### **Spacing Guidelines**
- **Component Internal**: 4px, 8px, 12px, 16px
- **Component External**: 16px, 24px, 32px, 48px
- **Section Spacing**: 48px, 64px, 80px, 96px
- **Page Margins**: 16px (mobile), 24px (tablet), 32px (desktop)

## 🔲 Border Radius

### **Radius Scale**
```css
--radius: 0.625rem;        /* 10px - Base radius */
--radius-sm: 0.375rem;     /* 6px - Small radius */
--radius-md: 0.5rem;       /* 8px - Medium radius */
--radius-lg: 0.625rem;     /* 10px - Large radius */
--radius-xl: 0.875rem;     /* 14px - Extra large radius */
```

### **Usage Guidelines**
- **Buttons**: `rounded-md` (8px)
- **Cards**: `rounded-lg` (10px)
- **Inputs**: `rounded-md` (8px)
- **Images**: `rounded-lg` (10px)
- **Modals**: `rounded-xl` (14px)

## 🌫️ Shadow System

### **Shadow Tokens**
```css
--shadow-2xs: 0 1px 3px 0px rgb(from var(--shadow-color) r g b / 0.05);
--shadow-xs: 0 1px 3px 0px rgb(from var(--shadow-color) r g b / 0.05);
--shadow-sm: 0 1px 3px 0px rgb(from var(--shadow-color) r g b / 0.1), 0 1px 2px -1px rgb(from var(--shadow-color) r g b / 0.1);
--shadow: 0 1px 3px 0px rgb(from var(--shadow-color) r g b / 0.1), 0 1px 2px -1px rgb(from var(--shadow-color) r g b / 0.1);
--shadow-md: 0 1px 3px 0px rgb(from var(--shadow-color) r g b / 0.1), 0 2px 4px -1px rgb(from var(--shadow-color) r g b / 0.1);
--shadow-lg: 0 1px 3px 0px rgb(from var(--shadow-color) r g b / 0.1), 0 4px 6px -1px rgb(from var(--shadow-color) r g b / 0.1);
--shadow-xl: 0 1px 3px 0px rgb(from var(--shadow-color) r g b / 0.1), 0 8px 10px -1px rgb(from var(--shadow-color) r g b / 0.1);
--shadow-2xl: 0 1px 3px 0px rgb(from var(--shadow-color) r g b / 0.1);
```

### **Shadow Usage**
- **Cards**: `shadow-sm` or `shadow`
- **Modals**: `shadow-lg` or `shadow-xl`
- **Dropdowns**: `shadow-md`
- **Buttons**: `shadow-sm` on hover
- **Floating Elements**: `shadow-lg` or `shadow-xl`

## 🎭 Animation System

### **Animation Principles**
- **Purposeful**: Animations serve a functional purpose
- **Consistent**: Standardized timing and easing
- **Performant**: GPU-accelerated transforms
- **Accessible**: Respect `prefers-reduced-motion`

### **Animation Tokens**
```css
/* Timing Functions */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Durations */
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
```

### **Common Animations**
- **Hover**: Scale (1.02) + shadow increase
- **Focus**: Ring appearance (200ms)
- **Loading**: Pulse or skeleton animation
- **Page Transitions**: Fade in/out (300ms)
- **Modal**: Scale + fade (200ms)

## 📱 Responsive Design

### **Breakpoint System**
```css
/* Mobile First */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

### **Container Sizes**
```css
/* Container widths */
container-sm: 640px
container-md: 768px
container-lg: 1024px
container-xl: 1280px
container-2xl: 1536px
```

### **Responsive Patterns**
1. **Mobile First**: Design for mobile, enhance for larger screens
2. **Progressive Enhancement**: Add features as screen size increases
3. **Touch Friendly**: Minimum 44px touch targets
4. **Readable Text**: Minimum 16px font size on mobile

## 🎯 Component Variants

### **Button Variants**
```tsx
// Visual variants
<Button variant="default">Primary Action</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Secondary</Button>
<Button variant="secondary">Tertiary</Button>
<Button variant="ghost">Subtle</Button>
<Button variant="link">Link Style</Button>

// Size variants
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon Only</Button>
```

### **Card Variants**
```tsx
// Default card
<Card>
  <CardHeader>Header</CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>

// Interactive card
<Card className="hover:shadow-md transition-shadow">
  <CardContent>Interactive Content</CardContent>
</Card>
```

### **Input Variants**
```tsx
// Standard input
<Input placeholder="Enter text..." />

// Input with label
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
</div>

// Input with error
<Input className="border-destructive" />
```

## 🌙 Theme System

### **Theme Provider Setup**
```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
```

### **Theme Switching**
```tsx
// Mode toggle component
<ModeToggle />

// Programmatic theme change
const { setTheme } = useTheme()
setTheme('dark') // 'light' | 'dark' | 'system'
```

### **Theme-Aware Components**
```tsx
// Using theme in components
const { theme } = useTheme()
const appearance = {
  baseTheme: theme === "dark" ? dark : undefined,
}

<Component appearance={appearance} />
```

## 🔧 Customization Guide

### **Adding New Colors**
1. Add color to CSS variables in `app/globals.css`
2. Update both light and dark theme variants
3. Add TailwindCSS utilities if needed
4. Document usage in this file

### **Creating Component Variants**
1. Use Class Variance Authority (CVA)
2. Define variants in component file
3. Export variant types for TypeScript
4. Add usage examples

### **Extending Animation System**
1. Add new animation tokens
2. Create reusable animation components
3. Document performance considerations
4. Test with reduced motion preferences

## 📊 Design System Metrics

### **Performance Targets**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### **Accessibility Standards**
- **WCAG 2.1 AA Compliance**: All components
- **Keyboard Navigation**: Full support
- **Screen Reader**: ARIA labels and descriptions
- **Color Contrast**: 4.5:1 minimum ratio

### **Browser Support**
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile
- **Progressive Enhancement**: Graceful degradation for older browsers

---

## 🔄 Migration & Updates

### **Version Control**
- Track all design system changes
- Maintain backward compatibility
- Document breaking changes
- Provide migration guides

### **Testing Requirements**
- Visual regression testing
- Cross-browser compatibility
- Accessibility testing
- Performance monitoring

---

*Last Updated: $(date)*
*Version: 1.0*
*Design System Version: v1.0*
