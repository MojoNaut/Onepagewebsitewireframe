# LIVOTI STUDIO - DESIGN SYSTEM DOCUMENTATION

## Overview

This design system follows the **HJM Studio aesthetic**: minimal, premium, warm off-white background, strong typography, hairline dividers, and clean spacing.

---

## 🎨 Color Palette

### Primary Colors
```css
--color-background: #F5F1E8    /* Warm off-white base */
--color-foreground: #1a1a1a    /* Near-black text (not pure black) */
```

### Muted Colors
```css
--color-muted: #E8E4DC              /* Slightly darker than background */
--color-muted-foreground: #666666   /* Secondary text */
```

### Accent Colors
```css
/* Muted lavender for CTAs */
--color-accent: #C4B5FD
--color-accentHover: #A78BFA
--color-accentForeground: #1a1a1a

/* Alternative neutral accent */
--color-accentNeutral: #1a1a1a
--color-accentNeutralHover: #333333
```

### Border Colors
```css
--color-border: #D4CFC4         /* Hairline divider (1px) */
--color-borderSubtle: #E8E4DC   /* Even more subtle */
```

### Status Colors (subtle, not bright)
```css
--color-success: #86EFAC
--color-successForeground: #166534
--color-error: #FCA5A5
--color-errorForeground: #991B1B
--color-warning: #FCD34D
--color-warningForeground: #92400E
```

---

## 📐 Spacing System (8pt Grid)

All spacing follows an 8-point grid for consistency:

```
4px  = 0.25rem = spacing-1
8px  = 0.5rem  = spacing-2
12px = 0.75rem = spacing-3
16px = 1rem    = spacing-4
24px = 1.5rem  = spacing-6
32px = 2rem    = spacing-8
48px = 3rem    = spacing-12
64px = 4rem    = spacing-16
80px = 5rem    = spacing-20
96px = 6rem    = spacing-24
```

---

## 🔤 Typography

### Font Family
- **Sans:** Inter (system-ui, -apple-system fallback)
- **Mono:** JetBrains Mono, Fira Code

### Font Sizes
```
12px (xs)   - Small labels
14px (sm)   - Secondary text
16px (base) - Body text (desktop)
18px (lg)   - Large body text
20px (xl)   - Small headings
24px (2xl)  - Section titles
30px (3xl)  - Subsection headings
36px (4xl)  - Medium headings
48px (5xl)  - Hero mobile
60px (6xl)  - Hero tablet
72px (7xl)  - Hero desktop
96px (8xl)  - Large wordmark
```

### Letter Spacing
- **Uppercase labels:** `tracking-widest` (0.3em)
- **Normal text:** `tracking-normal` (0)
- **Tight headings:** `tracking-tight` (-0.02em)

---

## 📦 Border Radius

```css
--radius-sm: 6px     /* Subtle corners */
--radius: 8px        /* Default (cards, inputs) */
--radius-md: 10px    /* Medium */
--radius-lg: 12px    /* Large */
--radius-full: 9999px /* Pills/badges */
```

---

## 🧩 Component Library

### Button

**Variants:** `primary` | `secondary` | `ghost`  
**Sizes:** `sm` | `md` | `lg`

```tsx
import { Button } from '@/components/ui';

// Primary CTA
<Button variant="primary" size="md">
  Parliamo del progetto
</Button>

// Secondary button
<Button variant="secondary">
  Vedi lavori
</Button>

// Ghost button (subtle)
<Button variant="ghost" size="sm">
  Learn more
</Button>

// Full width
<Button fullWidth>
  Submit
</Button>

// Loading state
<Button loading disabled>
  Sending...
</Button>
```

---

### Badge

**Variants:** `default` | `outline` | `muted`

```tsx
import { Badge } from '@/components/ui';

<Badge variant="default">Web App</Badge>
<Badge variant="outline">MVP</Badge>
<Badge variant="muted">Featured</Badge>
```

---

### Input

**Props:** `label`, `error`, `helperText`, `required`

```tsx
import { Input } from '@/components/ui';

<Input
  label="Nome"
  placeholder="Il tuo nome"
  required
/>

<Input
  label="Email"
  type="email"
  error="Formato email non valido"
/>

<Input
  label="Website"
  helperText="Include https://"
/>
```

---

### Textarea

**Props:** `label`, `error`, `helperText`, `rows`

```tsx
import { Textarea } from '@/components/ui';

<Textarea
  label="Messaggio"
  placeholder="Raccontaci del tuo progetto..."
  rows={6}
  required
/>
```

---

### Select

**Props:** `label`, `options`, `error`

```tsx
import { Select } from '@/components/ui';

<Select
  label="Tipo progetto"
  options={[
    { value: '', label: 'Seleziona...' },
    { value: 'mvp', label: 'MVP Sprint' },
    { value: 'webapp', label: 'Web App' },
    { value: 'landing', label: 'Landing / Sito' },
  ]}
  required
/>
```

---

### Card

**Variants:** `default` | `bordered` | `elevated`  
**Interactive:** adds hover effect

```tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter 
} from '@/components/ui';

<Card variant="bordered" interactive>
  <CardHeader>
    <CardTitle>Camed Immobiliare</CardTitle>
    <CardDescription>
      Piattaforma gestionale immobiliare con CMS
    </CardDescription>
  </CardHeader>
  
  <CardContent>
    <img src="/project.jpg" alt="Project" />
  </CardContent>
  
  <CardFooter>
    <Badge>Web App</Badge>
    <Badge>Real Estate</Badge>
  </CardFooter>
</Card>
```

---

### AccordionRow

**Props:** `title`, `isOpen`, `onToggle`, `defaultOpen`

```tsx
import { AccordionRow, Accordion } from '@/components/ui';

// Single accordion (uncontrolled)
<AccordionRow title="Quanto costa un progetto?" defaultOpen>
  <p>Dipende da complessità e valore portato...</p>
</AccordionRow>

// Multiple accordions with controlled state
const [openIndex, setOpenIndex] = useState(0);

<Accordion>
  {faqs.map((faq, index) => (
    <AccordionRow
      key={faq.id}
      title={faq.question}
      isOpen={openIndex === index}
      onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
    >
      {faq.answer}
    </AccordionRow>
  ))}
</Accordion>
```

---

## 🎭 Utility Classes

### Section Padding
```tsx
<section className="section-padding">
  {/* Responsive padding: 80px mobile, 128px desktop */}
</section>
```

### Container
```tsx
<div className="container">
  {/* Max-width 1120px, responsive padding */}
</div>
```

### Hairline Border
```tsx
<div className="hairline-border border-border">
  {/* 1px border */}
</div>
```

### Hide Scrollbar
```tsx
<div className="overflow-auto hide-scrollbar">
  {/* Scroll without visible scrollbar */}
</div>
```

---

## ♿ Accessibility

### Focus States
All interactive elements have visible focus rings:
```css
*:focus-visible {
  outline: 2px solid var(--color-foreground);
  outline-offset: 2px;
}
```

### Reduced Motion
Respects user's motion preferences:
```css
@media (prefers-reduced-motion: reduce) {
  /* Animations disabled */
}
```

### Keyboard Navigation
- All buttons accessible with Enter/Space
- Accordions navigable with keyboard
- Form inputs have proper labels and ARIA attributes

### Scroll Margin
All elements have `scroll-margin-top: 80px` for sticky header offset.

---

## 📱 Responsive Breakpoints

```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

**Usage:**
```tsx
<div className="text-5xl md:text-7xl">
  {/* 48px mobile, 72px desktop */}
</div>
```

---

## 🚀 Usage Examples

### Contact Form
```tsx
import { Input, Textarea, Select, Button } from '@/components/ui';

<form onSubmit={handleSubmit}>
  <Input label="Nome" required />
  <Input label="Email" type="email" required />
  
  <Select
    label="Tipo progetto"
    options={projectTypes}
    required
  />
  
  <Textarea 
    label="Messaggio"
    rows={6}
    required
  />
  
  <Button 
    variant="primary" 
    fullWidth 
    loading={isSubmitting}
  >
    Invia
  </Button>
</form>
```

### Project Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {projects.map(project => (
    <Card key={project.id} variant="bordered" interactive>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        {project.tags.map(tag => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </CardFooter>
    </Card>
  ))}
</div>
```

---

## 📚 Design Tokens Reference

All tokens are available in `/lib/design-tokens.ts` for programmatic access:

```tsx
import { designTokens } from '@/lib/design-tokens';

// Access tokens
const primaryColor = designTokens.colors.accent;
const baseSpacing = designTokens.spacing[4];
const borderRadius = designTokens.borderRadius.md;
```

---

## ✅ STEP 1 Complete

You now have:
- ✅ Centralized design tokens (`/lib/design-tokens.ts`)
- ✅ Updated `globals.css` with comprehensive theme
- ✅ Button component (3 variants, 3 sizes, loading state)
- ✅ Badge component (pill-shaped tags)
- ✅ Input & Textarea components (with labels, errors)
- ✅ Select component (dropdowns)
- ✅ Card component (with sub-components)
- ✅ AccordionRow component (reusable for FAQ/Services)
- ✅ Utility function `cn()` for class merging
- ✅ Central export point (`components/ui/index.ts`)

**Next:** Proceed to STEP 2 when ready! 🎉
