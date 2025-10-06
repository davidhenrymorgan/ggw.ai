# Component Inventory & Usage Guide

## 📋 Complete Component Catalog

### **UI Foundation Components** (`components/ui/`)

#### **Form Components**
| Component | File | Purpose | Usage Examples |
|-----------|------|---------|----------------|
| `Button` | `button.tsx` | Primary actions, CTAs | `<Button variant="default">Submit</Button>` |
| `Input` | `input.tsx` | Text input fields | `<Input placeholder="Enter text..." />` |
| `Label` | `label.tsx` | Form labels | `<Label htmlFor="email">Email</Label>` |
| `Checkbox` | `checkbox.tsx` | Boolean selections | `<Checkbox checked={true} />` |
| `Switch` | `switch.tsx` | Toggle controls | `<Switch checked={isOn} />` |
| `Select` | `select.tsx` | Dropdown selections | `<Select><SelectItem>Option</SelectItem></Select>` |

#### **Layout Components**
| Component | File | Purpose | Usage Examples |
|-----------|------|---------|----------------|
| `Card` | `card.tsx` | Content containers | `<Card><CardHeader>Title</CardHeader></Card>` |
| `Separator` | `separator.tsx` | Visual dividers | `<Separator className="my-4" />` |
| `Sidebar` | `sidebar.tsx` | Navigation sidebar | `<Sidebar><SidebarContent /></Sidebar>` |
| `Sheet` | `sheet.tsx` | Slide-out panels | `<Sheet><SheetContent>Content</SheetContent></Sheet>` |
| `Drawer` | `drawer.tsx` | Mobile drawers | `<Drawer><DrawerContent /></Drawer>` |

#### **Navigation Components**
| Component | File | Purpose | Usage Examples |
|-----------|------|---------|----------------|
| `Tabs` | `tabs.tsx` | Tab navigation | `<Tabs><TabsList><TabsTrigger>Tab</TabsTrigger></TabsList></Tabs>` |
| `Breadcrumb` | `breadcrumb.tsx` | Navigation breadcrumbs | `<Breadcrumb><BreadcrumbItem>Home</BreadcrumbItem></Breadcrumb>` |
| `Dropdown Menu` | `dropdown-menu.tsx` | Context menus | `<DropdownMenu><DropdownMenuTrigger>Menu</DropdownMenuTrigger></DropdownMenu>` |

#### **Display Components**
| Component | File | Purpose | Usage Examples |
|-----------|------|---------|----------------|
| `Avatar` | `avatar.tsx` | User profile images | `<Avatar><AvatarImage src="/user.jpg" /></Avatar>` |
| `Badge` | `badge.tsx` | Status indicators | `<Badge variant="success">Active</Badge>` |
| `Table` | `table.tsx` | Data tables | `<Table><TableHeader><TableRow></TableRow></TableHeader></Table>` |
| `Chart` | `chart.tsx` | Chart wrappers | `<Chart><LineChart data={data} /></Chart>` |
| `Skeleton` | `skeleton.tsx` | Loading states | `<Skeleton className="h-4 w-full" />` |

#### **Feedback Components**
| Component | File | Purpose | Usage Examples |
|-----------|------|---------|----------------|
| `Tooltip` | `tooltip.tsx` | Hover information | `<Tooltip><TooltipTrigger>Hover me</TooltipTrigger></Tooltip>` |
| `Sonner` | `sonner.tsx` | Toast notifications | `toast("Success message")` |

#### **Interactive Components**
| Component | File | Purpose | Usage Examples |
|-----------|------|---------|----------------|
| `Toggle` | `toggle.tsx` | Toggle buttons | `<Toggle pressed={isPressed}>Toggle</Toggle>` |
| `Toggle Group` | `toggle-group.tsx` | Grouped toggles | `<ToggleGroup type="multiple"><ToggleGroupItem>Option</ToggleGroupItem></ToggleGroup>` |

### **Custom Business Components**

#### **Authentication Components**
| Component | File | Purpose | Dependencies |
|-----------|------|---------|--------------|
| `CustomClerkPricing` | `custom-clerk-pricing.tsx` | Payment table with theme | Clerk, Theme Provider |
| `ModeToggle` | `mode-toggle.tsx` | Theme switcher | next-themes |

#### **Layout Components**
| Component | File | Purpose | Dependencies |
|-----------|------|---------|--------------|
| `ThemeProvider` | `theme-provider.tsx` | Theme management | next-themes |
| `ConvexClientProvider` | `ConvexClientProvider.tsx` | Database provider | Convex, Clerk |
| `Logo` | `logo.tsx` | Brand logo component | SVG, Lucide |

#### **Landing Page Components** (`app/(landing)/`)
| Component | File | Purpose | Key Features |
|-----------|------|---------|--------------|
| `HeroHeader` | `header.tsx` | Navigation header | Auth buttons, responsive menu |
| `HeroSection` | `hero-section.tsx` | Landing hero | CTA buttons, animations |
| `FeaturesOne` | `features-one.tsx` | Feature showcase | Interactive elements |
| `Testimonials` | `testimonials.tsx` | Social proof | User testimonials |
| `CallToAction` | `call-to-action.tsx` | CTA sections | Conversion-focused |
| `FAQs` | `faqs.tsx` | FAQ section | Accordion-style Q&A |
| `Footer` | `footer.tsx` | Site footer | Links, branding |

#### **Dashboard Components** (`app/dashboard/`)
| Component | File | Purpose | Key Features |
|-----------|------|---------|--------------|
| `AppSidebar` | `app-sidebar.tsx` | Main navigation | Collapsible, user menu |
| `NavUser` | `nav-user.tsx` | User profile menu | Clerk integration, theme |
| `NavMain` | `nav-main.tsx` | Primary navigation | Icon support, routing |
| `NavSecondary` | `nav-secondary.tsx` | Secondary nav | Additional links |
| `DataTable` | `data-table.tsx` | Data display | Sorting, filtering |
| `ChartAreaInteractive` | `chart-area-interactive.tsx` | Analytics charts | Interactive, responsive |

### **Animation Components**

#### **Magic UI Components** (`components/magicui/`)
| Component | File | Purpose | Animation Type |
|-----------|------|---------|----------------|
| `AnimatedList` | `animated-list.tsx` | List animations | Staggered reveals |
| `PulsatingButton` | `pulsating-button.tsx` | Pulsing CTAs | Attention-grabbing |

#### **Motion Primitives** (`components/motion-primitives/`)
| Component | File | Purpose | Animation Type |
|-----------|------|---------|----------------|
| `InfiniteSlider` | `infinite-slider.tsx` | Continuous scroll | Smooth transitions |
| `ProgressiveBlur` | `progressive-blur.tsx` | Blur effects | Modern aesthetics |

#### **React Bits** (`components/react-bits/`)
| Component | File | Purpose | Animation Type |
|-----------|------|---------|----------------|
| `PixelCard` | `pixel-card.tsx` | Card animations | Hover effects |
| `SplashCursor` | `splash-cursor.tsx` | Cursor effects | Interactive |
| `TextCursor` | `text-cursor.tsx` | Typing animations | Text effects |

#### **Kokonut UI** (`components/kokonutui/`)
| Component | File | Purpose | Animation Type |
|-----------|------|---------|----------------|
| `AttractButton` | `attract-button.tsx` | Magnetic buttons | Hover attraction |

## 🎨 Component Usage Patterns

### **Common Component Combinations**

#### **Form Patterns**
```tsx
// Standard form with validation
<Card>
  <CardHeader>
    <CardTitle>Form Title</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" />
      </div>
      <Button type="submit">Submit</Button>
    </div>
  </CardContent>
</Card>
```

#### **Navigation Patterns**
```tsx
// Sidebar navigation
<Sidebar>
  <SidebarHeader>
    <Logo />
  </SidebarHeader>
  <SidebarContent>
    <NavMain items={navigationItems} />
    <NavSecondary items={secondaryItems} />
  </SidebarContent>
  <SidebarFooter>
    <NavUser />
  </SidebarFooter>
</Sidebar>
```

#### **Data Display Patterns**
```tsx
// Chart with controls
<Card>
  <CardHeader>
    <CardTitle>Analytics</CardTitle>
  </CardHeader>
  <CardContent>
    <Chart>
      <LineChart data={chartData} />
    </Chart>
  </CardContent>
</Card>
```

### **Theme Integration Patterns**

#### **Theme-Aware Components**
```tsx
// Component with theme support
const { theme } = useTheme()
const appearance = {
  baseTheme: theme === "dark" ? dark : undefined,
}

<Component appearance={appearance} />
```

#### **CSS Variable Usage**
```tsx
// Using design system colors
<div className="bg-background text-foreground border-border">
  <Button className="bg-primary text-primary-foreground">
    Themed Button
  </Button>
</div>
```

## 🔧 Component Customization

### **Variant Systems**
Most components use Class Variance Authority (CVA) for variants:

```tsx
// Button variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Button sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon Only</Button>
```

### **Customization Points**
1. **CSS Variables** - Global theme colors
2. **Component Variants** - Predefined styles
3. **Tailwind Classes** - Utility-based styling
4. **Custom Props** - Component-specific options

## 📊 Component Dependencies

### **External Libraries**
- **Radix UI** - Accessible primitives
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Tabler Icons** - Additional icons
- **Recharts** - Charts
- **Clerk** - Authentication
- **Convex** - Database

### **Internal Dependencies**
- **Theme Provider** - Theme management
- **Utils** - Helper functions
- **Hooks** - Custom React hooks

## 🚀 Performance Considerations

### **Component Optimization**
1. **Lazy Loading** - Dynamic imports for heavy components
2. **Memoization** - React.memo for expensive renders
3. **Bundle Splitting** - Route-based code splitting
4. **Tree Shaking** - Unused code elimination

### **Animation Performance**
1. **GPU Acceleration** - Transform-based animations
2. **Reduced Motion** - Respect user preferences
3. **Optimized Re-renders** - Minimize animation triggers

---

## 📝 Migration Notes

### **Component Renaming**
- Track all component renames in this document
- Update import statements accordingly
- Maintain backward compatibility where possible

### **Breaking Changes**
- Document all breaking changes
- Provide migration guides
- Update usage examples

### **New Components**
- Add new components to this inventory
- Include usage examples
- Document dependencies and variants

---

*Last Updated: $(date)*
*Version: 1.0*
*Components Count: 50+*
