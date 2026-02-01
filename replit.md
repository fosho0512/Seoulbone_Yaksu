# Seoul Bone Pain Clinic Website

## Overview
This project delivers a premium static website for the Seoul Bone Pain Clinic (rebranded from Rehabilitation Medicine), designed with a luxury resort-inspired aesthetic. It features elegant animations, gold accents, and refined typography to provide a high-end user experience. The website showcases the clinic's services and facilities through a visually sophisticated and engaging online presence. Key capabilities include interactive elements, dynamic content sections, and responsive design across various devices.

## User Preferences
- Simple language in explanations
- Functional programming paradigms where applicable
- Iterative development with small, reviewable changes
- Ask before making major architectural changes
- **CRITICAL**: Always prioritize long-term stable and flexible solutions over quick implementations

## Project Structure

```
/
├── index.html          # Home page with intro animation
├── data.js             # Centralized site data (staff, services, etc.)
├── style.css           # Global styles
├── staff/              # Medical Staff page
│   └── index.html
├── values/             # Core Values page (GSAP slides)
│   └── index.html
├── diagnosis/          # Diagnostics page (horizontal scroll)
│   └── index.html
├── treatment/          # Treatments page (sticky slogan)
│   └── index.html
├── prp/                # Cell Therapy PRP page
│   └── index.html
├── contact/            # Contact & Location page
│   └── index.html
├── js/                 # Page-specific JavaScript
│   ├── common.js       # Shared functions (header, menu, scroll)
│   ├── home.js         # Home page logic (intro, banner)
│   ├── diagnosis.js    # Diagnosis page scroll effects
│   ├── values.js       # Values page GSAP slider
│   ├── treatment.js    # Treatment page sticky scroll
│   └── prp.js          # PRP page animations
└── images/             # Image assets
```

## System Architecture

### Page Navigation (Refactored Jan 2026)
**Folder-based clean URL navigation** - Each page is organized as a folder with index.html, enabling clean URLs without .html extension. Benefits:
- Better SEO optimization
- Clean browser history
- Easier maintenance
- Clean URL structure (e.g., `/staff/` instead of `/staff.html`)
- **Hash redirect support**: Old URLs like `/#staff` automatically redirect to `/staff/`

### UI/UX Decisions
The website adopts a luxury resort theme, characterized by gold accents, subtle animations, and sophisticated typography.
- **Color Scheme**: Predominantly uses a refined palette with prominent gold accents.
- **Typography**: Employs a modular typography scale system with CSS variables. Fonts include Playfair Display, Manrope, Noto Serif KR, Gowun Batang, and Pretendard via CDN.
- **Animations**: Subtle animations including element fade-ins on scroll, interactive hover effects, and scroll-triggered transformations.
- **Responsive Design**: Utilizes Flexbox, `clamp()` for responsive sizing, and media queries. Key principle: avoid `vw` units for width, prefer `width: 100%`.

### Technical Implementations
- **Core Technologies**: Static HTML, CSS, and JavaScript. No build system required.
- **Data Architecture**: All content managed through `data.js` for consistency (staff info, service descriptions, etc.)
- **Premium Effects**:
    - Gold gradient text and accent lines
    - Enhanced hover effects (scale, translateY, box-shadow)
    - Gold underline animation for menu items
    - Scroll progress bar
    - Header shrink/transparency based on scroll
    - Fade-in animations using IntersectionObserver
- **GSAP ScrollTrigger**: Used for advanced scroll animations (Values slider, Diagnosis horizontal scroll)

### Feature Specifications
- **Treatment Page**: Three-phase sticky slogan section with background zoom, followed by CSS Grid details section with fade-up animations
- **Diagnosis Page**: Vertical-to-horizontal scroll conversion using GSAP ScrollTrigger. Three sections: Sub Hero, Slogan (dual headline), Equipment (sticky image + scroll text)
- **Core Values Page**: Scroll-triggered pinned slides with GSAP, progress dots navigation
- **Sub-hero Sections**: Unified design across all pages with wipe reveal animations
- **Philosophy Card**: Triggers at 80vh with CSS transitions for expansion effect

## Recent Changes
- **Feb 2026**: **Image Optimization Complete**
  - Converted all 44 images from PNG/JPG to WebP format (85% quality)
  - Size reduction examples: treatment.jpg 18MB → 277KB (98.5% reduction)
  - Added `loading="lazy"` to all `<img>` tags (HTML and dynamic JS)
  - Diagnosis horizontal scroll scrub value increased 0.5 → 2.0 for smoother transitions
  - Lenis duration 1.8, wheelMultiplier 0.8 for premium scroll experience
- **Feb 2026**: **Lenis Smooth Scroll Integrated**
  - Added Lenis v1.1.18 to all 7 HTML pages via unpkg CDN
  - `js/common.js`: Added `initLenis()` with GSAP ticker + ScrollTrigger integration
  - Mobile excluded: Lenis disabled for window.innerWidth <= 768
  - `js/values.js`: Progress dot click uses `window.lenis.scrollTo()` with fallback
  - `style.css`: Added Lenis CSS rules (section 0) for smooth scroll behavior
  - `window.lenis` globally exposed for cross-module access
- **Jan 2026**: **Values Page Mobile Overhaul**
  - Converted from GSAP scroll slider to vertical card list layout on mobile
  - Mobile detection: `window.innerWidth <= 768` triggers `setupMobileValuesLayout()`
  - GSAP ScrollTrigger disabled on mobile (`.kill()` called to prevent memory leaks)
  - Each value card displays: number, title, subtitle, and detail points
  - PC version unchanged: GSAP slider works as before
  - CSS: `body.values-mobile-mode` class controls mobile-specific styles
- **Jan 2026**: **Staff Page Text Animation Added**
  - Added fade-in-up animation to profile-header and bio-group elements
  - IntersectionObserver triggers `.visible` class on scroll
  - Sequential transition delays for staggered effect
- **Jan 2026**: **Mobile Optimization Complete**
  - PRP page: Added 768px media query - 3-column grid converted to single column flex, sticky text released, font sizes adjusted
  - Values page: Improved slide container height (45vh), progress dots repositioned to right side, layer min-heights reduced for mobile
  - Treatment page: Reduced slogan section min-height from 250vh to 180vh for better mobile scroll experience
  - Touch targets: All interactive buttons (menu toggle, drawer close) now meet 44px minimum for accessibility
  - Diagnosis page: Already had proper mobile CSS, verified working correctly
- **Jan 2026**: **Header Opacity System Complete**
  - Main page: Added `has-sub-hero` class + `setupHomeHeaderObserver()` for visual-section scroll detection
  - Contact Us button: Added hover style for `sub-hero-passed` state (dark text on dark background)
  - Treatment page: Fixed slogan section flicker - header stays transparent until section fully passed
  - Removed legacy CSS: `#global-header.scrolled`, `body.site-entered:not(.content-view-active)`, mobile `content-view-active` styles
  - Removed `!important` declarations - CSS specificity now managed by declaration order
  - Header transition: `body.has-sub-hero` (transparent) → `body.has-sub-hero.sub-hero-passed` (opaque)
  - Diagnosis page: Refactored to use ScrollTrigger `onLeave/onEnterBack` + IntersectionObserver pattern
- **Jan 2026**: **Clean URL Structure** - Changed from `/pages/*.html` to folder-based structure (`/staff/index.html`) for clean URLs without .html extension
- **Jan 2026**: **Major Refactoring** - Converted from modal-layer (hash-based) system to standard page-based navigation
  - Created folder structure for each page (staff/, values/, diagnosis/, treatment/, prp/, contact/)
  - Split JavaScript into page-specific modules in `/js/` directory
  - Added hash redirect support for backward compatibility
  - Removed legacy `showContentView()` modal logic
- **Jan 2026**: Updated diagnosis slogan section - dual headlines always visible with sequential fade-up animation and gold divider
- **Jan 2026**: Consolidated treatment pages, removed GSAP dependency from treatment scroll

## External Dependencies
- **Google Fonts**: Playfair Display, Manrope, Noto Serif KR, Gowun Batang
- **Pretendard Font**: Loaded via CDN
- **Font Awesome**: For icons
- **GSAP ScrollTrigger**: For Values and Diagnosis page animations
- **Lenis Library**: Smooth scroll inertia (PC only, 768px+) - v1.1.18 via unpkg CDN
