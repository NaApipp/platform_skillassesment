---
name: Institutional Excellence Dark
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#bfc7d2'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#89929b'
  outline-variant: '#3f4850'
  surface-tint: '#91cdff'
  primary: '#91cdff'
  on-primary: '#003350'
  primary-container: '#2198de'
  on-primary-container: '#002c46'
  inverse-primary: '#006496'
  secondary: '#ffb779'
  on-secondary: '#4c2700'
  secondary-container: '#ee8600'
  on-secondary-container: '#562d00'
  tertiary: '#ffb876'
  on-tertiary: '#4b2800'
  tertiary-container: '#d27c16'
  on-tertiary-container: '#422200'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
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
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  display-lg:
    fontFamily: Public Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Public Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: '0'
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  label-sm:
    fontFamily: Public Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  container-max: 1280px
---

## Brand & Style

This design system is engineered for high-stakes environments where authority, precision, and clarity are paramount. The brand personality is institutional and steadfast, tailored for government, finance, or large-scale enterprise applications. 

The aesthetic follows a **Corporate / Modern** style adapted for a high-performance dark environment. It utilizes a structured depth model where information is layered on a deep foundation to reduce cognitive load and eye strain while maintaining a sense of prestige. The UI evokes an emotional response of stability and confidence, ensuring that complex data feels organized and accessible.

## Colors

The palette is anchored by a deep **Slate Navy (#0F172A)** background to provide a sophisticated, professional foundation. To maintain institutional authority, we use a tiered surface system where containers use a slightly lighter **#1E293B** to establish hierarchy.

- **Primary Blue (#008ED3):** Used for branding, active states, and primary navigation elements. It is optimized to "pop" against the dark slate background while maintaining professional restraint.
- **Accent Orange (#F08700):** Reserved exclusively for high-priority Call-to-Actions (CTAs) and critical alerts. This high-energy hue provides immediate visual orientation.
- **Contrast & Compliance:** All text-on-background combinations are strictly tuned to meet or exceed WCAG AA standards. Primary white text ensures maximum legibility, while the slate-gray secondary text provides clear information hierarchy without visual noise.

## Typography

This design system utilizes **Public Sans**, a typeface designed for government and institutional use. It is chosen for its exceptional clarity, neutrality, and accessibility.

The type scale is highly structured. Headlines use a bold weight with slightly tighter letter-spacing to command attention. Body text is optimized for long-form reading with generous line-heights to prevent "text-smearing" in dark mode. Labels and metadata utilize a semi-bold weight and increased tracking (letter-spacing) to ensure they remain legible at small sizes against the dark background.

## Layout & Spacing

The design system employs a **Fixed Grid** philosophy for desktop to maintain an organized, "document-like" structure, transitioning to a fluid model for mobile devices.

- **Grid:** A 12-column grid is used for desktop (1280px max-width) with 24px gutters.
- **Rhythm:** An 8px base unit (with a 4px sub-grid) governs all padding and margins, ensuring mathematical harmony across the UI.
- **Mobile Adaptation:** On mobile, side margins shrink to 16px. Multi-column cards stack vertically, and horizontal scrolling "overflow" patterns are preferred for data tables to maintain cell integrity.

## Elevation & Depth

Depth in this system is communicated through **Tonal Layers** rather than heavy shadows. In a dark interface, shadows are often less effective; instead, we lift elements by lightening their surface color.

- **Level 0 (Background):** #0F172A — The lowest layer.
- **Level 1 (Cards/Containers):** #1E293B — Used for the primary content areas.
- **Level 2 (Popovers/Modals):** #2D3748 — The lightest surface, used for elements that sit closest to the user.
- **Borders:** Subtle outlines using **#334155** are applied to Level 1 and Level 2 surfaces to provide crisp definition and prevent "bleeding" between layers. No shadows are used except for high-elevation modals, which use a deep, large-radius black shadow with 40% opacity.

## Shapes

The shape language is **Soft** and professional. A standard radius of 0.25rem (4px) is applied to most UI components, such as input fields and buttons. Larger containers like cards use 0.5rem (8px). 

This subtle rounding balances the "hard" institutional nature of the brand with a modern, approachable touch. Circular shapes are reserved strictly for status indicators or user avatars to distinguish them from functional UI controls.

## Components

- **Buttons:** Primary buttons use the Accent Orange (#F08700) with white text for maximum prominence. Secondary buttons use an outline style with the Primary Blue (#008ED3).
- **Input Fields:** Backgrounds should be slightly darker than their parent container (using #0F172A) with a #334155 border. On focus, the border transitions to Primary Blue with a subtle 2px outer glow.
- **Cards:** Cards use the #1E293B surface color. They should have no shadow by default, relying on the #334155 border for separation.
- **Chips/Tags:** Used for categorization. They use a low-opacity tint of the primary color (e.g., Blue at 15% opacity) with a solid blue text for a "ghost" effect that doesn't distract from primary content.
- **Lists:** List items are separated by 1px dividers in #334155. Hover states should utilize a subtle lighten of the background to #2D3748.
- **Data Tables:** Essential for this design system. Tables use the background color for headers with uppercase `label-sm` typography. Alternating row stripes (zebra striping) are discouraged; use thin borders for cleaner data scanning.