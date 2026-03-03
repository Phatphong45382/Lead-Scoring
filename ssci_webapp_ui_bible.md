# SSCI WebApp UI/UX Design Bible

*This document serves as the ground truth for agents and developers when generating or modifying web applications to ensure maximum consistency with the SSCI project ecosystem.*

## 1. Core Technology Stack
- **Framework**: Next.js App Router (`app/` directory).
- **Language**: TypeScript (`.tsx`, `.ts`).
- **Styling**: Tailwind CSS v4, initialized through `app/globals.css`.
- **UI Components**: ShadCN UI + Radix UI Primitives.
- **Icons**: Lucide React (`w-4 h-4` or `w-5 h-5` predominantly).
- **Data Visualization**: Recharts (with custom tooltips).

## 2. Theming & Brand Colors
The application leverages a strict, premium enterprise color palette enforced through CSS variables and inline styles for specific gradients.

**SSCI Brand Palette:**
- **Primary Blue**: `#3DB9EB` (DeepSkyBlue)
- **Dark Blue**: `#2A9AD4` (Hover/pressed state)
- **Sidebar Deep Blue**: `#1B7FB5`
- **Brand Yellow**: `#FFC223` (Accent / CTA)
- **Positive/Success**: `#10b981` (Emerald)
- **Neutral Background**: `#F8F9FA`

**Typography:**
- Primary font: **Manrope** (Headers & Body).
- Monospace font: **JetBrains Mono**.
- Text colors: Dark blue/slate (`#1a1a2e` or `text-slate-900`) for headers, `text-slate-500` for subtitles.

## 3. Global CSS & Design Language
To achieve a "wow factor", incorporate the custom CSS utility classes defined in `globals.css`:

- **Premium Cards**: Use the `.card-enterprise` class. This provides a clean border, soft shadow, and a subtle `-translate-y-[2px]` hover animation with elevated shadow.
- **Glassmorphism**: When laying out overlays, modals, or special hero sections, use `.glass-enterprise` or `.glass-enterprise-strong` for a blur-backdrop effect.
- **Shadows**: Prefer `.shadow-enterprise-sm`, `.shadow-enterprise-md`, and `.shadow-enterprise-lg` over default Tailwind shadows for a softer, more professional look.
- **Gradients**: For primary calls-to-action or hero banners, use the brand text gradient: `.text-gradient-brand` or a background gradient: `background: linear-gradient(135deg, #1B7FB5 0%, #3DB9EB 50%, #2A9AD4 100%)`.

## 4. Application Architecture & Layout
Always maintain the consistent shell structure across the app:

**Layout Shell:**
All pages must be wrapped in the `<MainLayout>` component.
```tsx
import { MainLayout } from "@/components/layout/main-layout"

export default function Page() {
  return (
    <MainLayout title="Page Title" description="Page description here" hideTopBar={false}>
      <div className="max-w-7xl mx-auto space-y-6">
         {/* Page content */}
      </div>
    </MainLayout>
  )
}
```

**Layout Grid Patterns:**
Pages that display metrics and charts should use CSS grid:
```tsx
// For KPI Metric Cards (Top row)
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
   <KPICard ... /> 
</div>

// For Data Charts (Bento box style)
<div className="grid grid-cols-12 gap-5 mt-5">
   <div className="col-span-12 lg:col-span-7">
      {/* Chart Component */}
   </div>
   <div className="col-span-12 lg:col-span-5">
      {/* Chart Component */}
   </div>
</div>
```

## 5. UI Components Rules
- **KPI Cards** (`<KPICard>`): Used for displaying top-level metrics. Keep `format` standard (`percent`, `number`, `currency`, `days`). Include a Lucide icon.
- **Tabs**: Use ShadCN `<Tabs variant="line">` for switching between detailed views (e.g., History vs Forecast). Incorporate icons into the `<TabsTrigger>`.
- **Empty & Loading States**: 
  - Loading skeletons should use Tailwind `.animate-pulse` with `.bg-white .rounded-xl .border-slate-100`.
  - Custom loaders can use the `.loading-shimmer` class.
- **Buttons**: Use standard ShadCN buttons `<Button>`. For Primary CTAs, add the brand yellow: `style={{ background: "#FFC223", color: "#1a1a2e" }}`.

## 6. Development Directives for New Pages
When tasked with generating a new web app or new feature page:
1. **Never use standard Tailwind basic colors** (`bg-blue-500`, etc.) when brand colors are applicable.
2. **Abstract Business Logic**: Keep `page.tsx` clean by placing data fetching and transformations inside hooks (e.g., `useScoreData()`).
3. **Consistency**: Use `space-y-6` for vertical rhythm between major sections.
4. **Icons**: Pair metric text with small Lucide icons (`w-4 h-4`) logically colored (e.g., Emerald for positive trends, Yellow for warnings).
5. **Chart consistency**: Export individual charts to `components/...` folders instead of dumping Recharts logic directly inside the main page layout.
