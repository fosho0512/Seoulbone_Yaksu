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
├── pages/              # Individual page files
│   ├── staff.html      # Medical Staff page
│   ├── values.html     # Core Values page (GSAP slides)
│   ├── diagnosis.html  # Diagnostics page (horizontal scroll)
│   ├── treatment.html  # Treatments page (sticky slogan)
│   ├── prp.html        # Cell Therapy PRP page
│   └── contact.html    # Contact & Location page
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
**Standard page-based navigation** - Each menu item links to a separate HTML file instead of the previous modal-layer (hash-based) system. Benefits:
- Better SEO optimization
- Clean browser history
- Easier maintenance
- Standard URL structure
- **Hash redirect support**: Old URLs like `/#staff` automatically redirect to `pages/staff.html`

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
- **Jan 2026**: **Major Refactoring** - Converted from modal-layer (hash-based) system to standard page-based navigation
  - Created separate HTML files for each page in `/pages/` directory
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
- **Lenis Library** (planned): For smooth scroll inertia (PC only)
