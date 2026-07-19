---
name: Institutional Excellence
colors:
  surface: '#fbf9f9'
  surface-dim: '#dbd9d9'
  surface-bright: '#fbf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#3f4850'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#6f7881'
  outline-variant: '#bfc7d2'
  surface-tint: '#006496'
  primary: '#006192'
  on-primary: '#ffffff'
  primary-container: '#007bb7'
  on-primary-container: '#fcfcff'
  inverse-primary: '#91cdff'
  secondary: '#8f4e00'
  on-secondary: '#ffffff'
  secondary-container: '#ff9318'
  on-secondary-container: '#653500'
  tertiary: '#894d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#ad6200'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cce5ff'
  primary-fixed-dim: '#91cdff'
  on-primary-fixed: '#001e31'
  on-primary-fixed-variant: '#004b72'
  secondary-fixed: '#ffdcc1'
  secondary-fixed-dim: '#ffb779'
  on-secondary-fixed: '#2e1500'
  on-secondary-fixed-variant: '#6c3a00'
  tertiary-fixed: '#ffdcc0'
  tertiary-fixed-dim: '#ffb876'
  on-tertiary-fixed: '#2d1600'
  on-tertiary-fixed-variant: '#6b3b00'
  background: '#fbf9f9'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-lg:
    fontFamily: Work Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Work Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Work Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Work Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Work Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  caption:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  max-width: 1280px
---

## Brand & Style

The brand personality of the design system is professional, authoritative, and focused. Designed specifically for a university assessment environment, the UI prioritizes clarity and cognitive ease to ensure students can focus entirely on their academic performance without distraction. 

The aesthetic follows a **Corporate / Modern** style. It leverages a clean, structured interface that feels established and trustworthy. By utilizing a "paper-white" base with high-contrast institutional blue and vibrant accent triggers, the design system creates a digital environment that mirrors the seriousness of a physical examination hall while maintaining the efficiency of modern SaaS.

The target audience includes students, faculty, and administrators who require a reliable, accessible, and high-performance platform. The emotional response should be one of confidence, stability, and focus.

## Colors

The color strategy is rooted in academic tradition and high-visibility functionalism. 

- **Primary Blue (#008ED3):** Used as the primary brand anchor. It dominates the navigation systems, header backgrounds, and primary action buttons to establish a sense of hierarchy and institutional presence.
- **Accent Orange (#F08700):** Reserved strictly for high-priority calls to action (CTAs), notification badges, and active highlights. Its purpose is to draw immediate attention to critical tasks like "Start Assessment" or "Submit."
- **Secondary Red (#D22118):** Used exclusively for error states, destructive actions (e.g., "Delete Assignment"), or critical warnings.
- **Neutral Gray (#9C9B9B):** Utilized for secondary information, metadata, and subtle borders. It provides structure without competing for visual attention.
- **Base White (#FFFFFF) & Text Black (#000000):** Ensures maximum legibility and meets WCAG AA standards for all core reading experiences.

## Typography

**Work Sans** is the sole typeface for this design system, chosen for its professional, grounded, and highly legible characteristics. Its geometric influence ensures a modern look, while its generous x-height makes it ideal for long-form reading during assessments.

- **Headlines:** Use Bold (700) weights to establish clear content sections. 
- **Body Text:** Maintained at 16px (Body-md) for standard reading, with 18px (Body-lg) reserved for assessment questions to reduce eye strain.
- **Labels:** Use Medium (500) weight with slight uppercase styling for small UI elements like table headers and meta-tags to differentiate them from body content.

## Layout & Spacing

This design system utilizes a **Fixed Grid** approach for desktop views to maintain a consistent reading line length, which is crucial for educational content. On smaller devices, the layout transitions to a fluid model.

- **Grid:** A 12-column grid for desktop with 24px gutters. For assessment pages, a centered 8-column "reading track" is recommended to minimize horizontal scanning.
- **Spacing Rhythm:** Based on an 8px scale (4, 8, 16, 24, 32, 48, 64). 
- **Breakpoints:**
  - **Mobile:** 0-599px (4 columns, 16px margins).
  - **Tablet:** 600-1023px (8 columns, 24px margins).
  - **Desktop:** 1024px+ (12 columns, 48px margins, max-width 1280px).

## Elevation & Depth

To maintain a clean, academic feel, the design system avoids heavy shadows. Instead, it uses **Tonal Layers** and **Low-Contrast Outlines** to create depth.

- **Surface Levels:** The base background is pure white. Secondary containers (like sidebars or card backgrounds) use a very light tint of gray or blue to separate themselves from the base.
- **Outlines:** Elements like cards and input fields use a 1px border (#9C9B9B) at low opacity (20-30%) rather than a shadow.
- **Active States:** Only high-priority elements like "In-Progress" assessment cards may use a soft, ambient shadow (12px blur, 5% opacity, Primary Blue tint) to indicate "Lift."

## Shapes

The design system uses a **Rounded** shape language (Value 2). This provides a contemporary, friendly touch to a serious institutional platform without appearing overly casual.

- **Standard Elements (Buttons, Inputs):** 0.5rem (8px) radius.
- **Large Elements (Cards, Modals):** 1rem (16px) radius.
- **Specific Accents:** Notification badges and status chips may use a full-pill radius (rounded-full) to distinguish them from interactive buttons.

## Components

- **Buttons:** 
  - *Primary:* Blue background, white text.
  - *CTA:* Orange background, white text (used for "Submit" or "Start").
  - *Ghost:* Blue outline or text only, used for secondary actions like "Back" or "Save Draft."
- **Cards:** Assessment cards should feature a top-border accent color indicating status (Blue for assigned, Orange for in-progress, Neutral for completed).
- **Inputs:** High-contrast 1px borders. Focused state uses a 2px Blue border with a soft inner glow.
- **Progress Bars:** Thin, linear bars using the Primary Blue for standard progress and Accent Orange for "Time Expiring" warnings.
- **Chips/Badges:** Small, low-saturation backgrounds with high-saturation text for categorized metadata like "Exam," "Quiz," or "Assignment."
- **Navigation:** A persistent top navbar in Primary Blue with white typography to maintain brand presence across the entire journey.