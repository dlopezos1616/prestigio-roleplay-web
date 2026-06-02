# Task: Prestigio Roleplay Normativas Web

## Summary
Built a complete single-page normative website for Prestigio Roleplay GTA V RP server with Riot Games/Valorant inspired dark premium gaming aesthetic.

## Files Modified/Created

### Modified
- `src/app/globals.css` - Complete custom CSS with dark theme, glow effects, glassmorphism, neon borders, animations (fadeInUp, fadeIn, slideInLeft, pulseGlow, shimmer, subtleFloat), stagger delays, content block styles, table styles, hero gradients, scrollbar, selection color
- `src/app/layout.tsx` - Updated with Inter font, Spanish language, Prestigio Roleplay metadata, dark background
- `src/app/page.tsx` - Main page with hash-based routing (parses `#/` and `#/normativa/{id}`), HomePage component with hero section + card grid, state management via `window.location.hash`

### Created
- `src/components/Navbar.tsx` - Sticky glassmorphism navbar with logo, PRESTIGIO ROLEPLAY branding, desktop dropdown for normativas, mobile hamburger menu
- `src/components/Footer.tsx` - Dark footer with gold accents, gradient divider line, copyright
- `src/components/NormativaCard.tsx` - Glassmorphism card with per-normativa color accents, hover effects (border glow, scale, "Leer más" animation), staggered fade-in animation
- `src/components/NormativaBlock.tsx` - Block renderer for 8 content types: definition (blue), allowed (green), forbidden (red), sanction (amber), example (purple), warning (orange), info (neutral), table (dark styled)
- `src/components/NormativaPage.tsx` - Full normativa page with back button, colored title area, table of contents, IntersectionObserver scroll animations, "back to top" button

## Design System
- **Background**: #0a0a0f (deep black), #111118 (secondary)
- **Primary accent**: #00b4ff (electric blue neon)
- **Secondary accent**: #d4a843 (premium gold)
- **Glassmorphism**: backdrop-blur + semi-transparent backgrounds
- **Animations**: CSS keyframes with staggered delays, IntersectionObserver for scroll reveal

## Routes (Hash-based)
- `#/` → Home page (hero + 6 normativa cards)
- `#/normativa/general` → Normativa General
- `#/normativa/ilicitos` → Criminalidad
- `#/normativa/comercios` → Comercios
- `#/normativa/staff` → Staff
- `#/normativa/streamers` → Streamers
- `#/normativa/codigo-penal` → Código Penal

## Lint Status
✅ All lint checks pass (ESLint)
