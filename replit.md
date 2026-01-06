# Seoul Bone Rehab Clinic Website

## Overview
A premium static website for Seoul Bone Rehabilitation Medicine clinic. Features a luxury resort-inspired aesthetic with elegant animations, gold accents, and refined typography.

## Project Structure
- `index.html` - Main HTML page with unified intro overlay
- `style.css` - Premium resort theme with gold accents, responsive Flexbox layout
- `script.js` - Interactive functionality (loading, menu, modals)
- `data.js` - Content data for dynamic sections
- `images/` - All images used on the site

## Technology Stack
- Static HTML/CSS/JavaScript
- No build system required
- Google Fonts (Playfair Display, Manrope, Noto Serif KR, Gowun Batang)
- Pretendard font via CDN
- Font Awesome icons

## Running the Project
The project is served using Python's built-in HTTP server on port 5000.

## Deployment
Configured as a static site deployment serving from the root directory.

## Intro Page Architecture (2025-12-21)
The intro page uses a unified Flexbox container structure for consistent PC/mobile display:

### HTML Structure
```html
<div class="intro-overlay loading">
  <div class="intro-bg"></div>           <!-- Background image -->
  <div class="intro-shell">               <!-- Flexbox container -->
    <h1 class="intro-logo">...</h1>       <!-- Brand text -->
    <div class="intro-loader">...</div>   <!-- Line loader -->
    <div class="intro-cta">...</div>      <!-- Enter button -->
  </div>
</div>
```

### CSS Key Features
- `.intro-shell`: `display: flex; flex-direction: column; gap: clamp(24px, 4vh, 48px)`
- Responsive sizing with `clamp()` for fonts, gaps, and button padding
- `.loading` class controls visibility transitions:
  - Loading: Black background, text + loader visible, button/bg hidden
  - Ready: Background fades in, button appears, loader fades out

### JavaScript Flow
1. Page loads with `.loading` class already in HTML
2. After 2 seconds, `.loading` class is removed
3. CSS transitions reveal background and Enter button
4. Click "Enter Site" adds `.hidden` class (slides up)

## Recent Changes (2026-01-06)
- Critical scroll/layout bug fixes across Treatment and Diagnosis pages:
  - Treatment intro: Changed `pinSpacing: true` → `pinSpacing: false` to eliminate white flash
  - Treatment grid section: Added manual `padding-top: 300vh; margin-top: -300vh` to compensate for pinSpacing:false
  - Sub-hero hiding: Changed from `visibility: hidden` → `opacity: 0` with CSS transition for smooth fade
  - Horizontal scroll prevention: Replaced all `width: 100vw` with `width: 100%`
  - Added `overflow-x: hidden` to html, body, and body.content-view-active
  - Added `.pin-spacer { width: 100% !important; max-width: 100% !important; overflow: hidden !important; }`
  - Header transparency now managed entirely via ScrollTrigger callbacks (onEnter/onLeave/onEnterBack/onLeaveBack)

## Previous Changes (2026-01-03)
- Dwell phase subdivision for better content consumption:
  - 0-65%: Horizontal scroll phase (sub-hero slides left, slogan slides in)
  - 65-80%: Text dwell phase (main/sub text visible, ~15% scroll distance ≈ 60vh)
  - 80-100%: Principle card phase (card visible, ~20% scroll distance ≈ 80vh)
  - Total dwell time significantly increased for content consumption
- Removed ScrollTrigger pin due to position conflict:
  - ScrollTrigger pin caused white screen issue (position: fixed conflict with translateX transform)
  - Instead, increased .horizontal-scroll-outer height from 350vh to 400vh
  - This provides ~50vh additional dwell time using native sticky behavior
  - No transform/position conflicts, cleaner implementation
- Slogan animation timing:
  - Text activation at 60% horizontal phase
  - Main text position: top 35vh
  - Description delay: 0.6s after main text
  - Principle card position: bottom 30vh
  - Principle card delay: 0.2s
- Slogan background always visible (opacity: 1)
- Zoom-out effect starts at 50% horizontal scroll progress

## Previous Changes (2026-01-02)
- Horizontal scroll velocity clamping for luxury feel:
  - Added MAX_VELOCITY constant (0.017 per frame = ~1.0 screen widths/sec at 60fps)
  - Previous max velocity: ~2.4 screen widths/sec (2.4x faster)
  - Module-level state: `horizontalDisplayProgress`, `horizontalLastFrameTime`
  - Time-based deltaTime calculation for consistent behavior across refresh rates
  - State reset in cleanupHorizontalScroll() and setupHorizontalScroll() for proper navigation cycling

## Previous Changes (2026-01-02)
- Slogan section redesign with three-group sequential animation system:
  - HTML Structure: `.slogan-main-group`, `.slogan-description-group`, `.principle-card`
  - Main text (45vh): 1.2s fade-up with cubic-bezier(0.22, 0.61, 0.36, 1) easing
  - Description: 1.0s fade-in with 1.6s delay after main
  - Principle card: Appears at 40% dwell phase with 1.3s scale(0.98→1) animation
  - Card internal elements: Sequential fade with staggered delays (0.2s, 0.35s, 0.5s, 0.65s)
  - Layout: All centered, max-width constraints (main: 900px, card: 680px)
  - Mobile: All elements visible immediately, no animation delays

## Previous Changes (2026-01-02)
- Header transparency fix using scroll-progress based approach:
  - Desktop: `handleScroll()` manages header state via `overallProgress` (0-1)
  - When `overallProgress >= 1` (horizontal+dwell complete) → `sub-hero-passed` class added (header opaque)
  - When `overallProgress < 1` → `sub-hero-passed` class removed (header transparent)
  - Mobile: IntersectionObserver on `.equipment-narrative` with `-50%` rootMargin
  - Removed sentinel-based approach (caused timing issues due to sticky wrapper)

## Previous Changes (2026-01-02)
- Premium horizontal-to-vertical scroll transition with dwell section:
  - `.horizontal-scroll-outer` height: 350vh (increased from 200vh)
  - easeInOutCubic easing for slow, deliberate movement
  - Phase allocation:
    - 0-65%: Horizontal scroll phase (~162.5vh) - sub-hero slides left, slogan slides in
    - 65-100%: Dwell zone (~87.5vh) - slogan stays pinned and readable
  - Slogan remains visible for extended scroll distance before releasing to vertical
- Added `.sub-hero-panel .sub-hero-curve` z-index: 5 to display wave above overlay

## Previous Changes (2026-01-02)
- CSS Architecture cleanup: Removed unnecessary negative margin patterns
  - All `has-sub-hero` pages: `.content-wrapper` padding set to 0
  - Full-width sections now use clean `width: 100vw` without margin hacks

## Previous Changes (2026-01-02)
- Diagnostic Tools page horizontal scroll redesign:
  - Sub-hero is now the first panel inside `.horizontal-scroll-track` (no duplicate)
  - Scroll down: Sub-hero slides left, slogan appears from right
  - Equipment narrative follows with sticky image + scroll text
- HTML Structure:
  ```html
  .horizontal-scroll-outer (height: 350vh)
    └── .horizontal-scroll-wrapper (sticky, 100vh)
          └── .horizontal-scroll-track (translateX animation)
                ├── .scroll-panel.sub-hero-panel
                └── .scroll-panel.slogan-section
  ```
- JavaScript: setupHorizontalScroll() with easeInOutCubic easing and dwell phase
- Mobile (768px↓): Falls back to vertical scroll layout

## Previous Changes (2025-12-31)
- Core Values page: Removed slogan section, sub-hero now uses values.jpg

## Previous Changes (2025-12-30)
- Initial Diagnostic Tools redesign with equipment-narrative sticky scroll

## Previous Changes (2025-12-29)
- Implemented comprehensive Korean font system:
  - Headings: Playfair Display (영문) + Noto Serif KR (한글)
  - Body: Manrope (영문) + Pretendard (한글)
  - Quote/Conversational: Gowun Batang (구어체용)
- Added .quote-text utility class for conversational text styling
- Fixed hero text truncation (max-width: 650px → 900px)
- Sub-hero sections now use 100vh for consistent full-screen coverage

## Previous Changes (2025-12-28)
- Homepage background image now extends behind header (same pattern as sub-hero)
- Added transparent header styling for home view with white text/icons
- .visual-section uses width: 100vw + calc() margins for full-width extension
- Home state removes #main-container padding-top for proper background positioning
- File permission fix for main-bg.png (644)

## Previous Changes (2025-12-27)
- Core Values page complete redesign with scroll-triggered pinned slides
- GSAP ScrollTrigger integration with Lenis smooth scroll
- Image track: Y-axis slide transitions (top-to-bottom)
- Text track: Fade + X-axis slide transitions (right-to-left)
- Progress dots for slide navigation
- Mobile responsive layout with stacked grid

## Previous Changes (2025-12-23)
- All menu pages now have unified sub-hero sections with wipe reveal animation
- Added Smooth Scroll Inertia using Lenis library (PC only, disabled on mobile)
- Sub-hero full-width extension using negative margins (-12% left/right, header height offset on top)
- Header transparency in content-view with white text/icons, solid background on scroll
- Mobile responsive sub-hero with 6% margin calculations

## Previous Changes (2025-12-22)
- Implemented hash-based routing for menu navigation (#staff, #diagnosis, etc.)
- Removed background image change on menu hover
- Added premium UI effects (see Premium Effects section below)

## Page View System (2025-12-22)
Navigation uses content view switching instead of modal overlays:

### HTML Structure
```html
<main id="main-container">
    <section id="home-view" class="page-view active">
        <!-- Menu + Visual Section -->
    </section>
    <section id="content-view" class="page-view">
        <div class="content-wrapper" id="content-body">
            <!-- Dynamic content -->
        </div>
    </section>
</main>
```

### How it works
- Menu click → Changes URL hash (e.g., `#staff`, `#values`)
- Hash change triggers `showContentView(id)` which swaps `.active` class
- Only one `.page-view` is visible at a time
- Browser back/forward buttons work correctly via `popstate` event
- Direct URL access (e.g., `site.com/#diagnosis`) skips intro and shows content

### Key Functions
- `showContentView(id)`: Renders content and switches to content-view
- `showHomeView(skipPushState)`: Returns to home-view, optionally skips history push
- `setupHashRouting()`: Initializes hash event listeners
- `handleHashChange()`: Calls showContentView based on current hash

## Recent Changes (2025-12-21)
- Refactored intro page to unified Flexbox container
- Fixed PC/mobile overlap issues with clamp() responsive spacing
- Loading class now in HTML for flicker-free initial load
- Removed separate loading-overlay, intro-text, intro-page elements
- Single .intro-overlay controls entire intro sequence

## Typography System (2025-12-22)
A modular typography scale system for consistent, premium typography across the site:

### CSS Variables (:root)
```css
/* Size Scale (1.2 modular ratio) */
--font-2xs: 0.694rem;    /* 11px - Fine print */
--font-xs: 0.833rem;     /* 13px - Captions */
--font-sm: 1rem;         /* 16px - Base */
--font-md: 1.2rem;       /* 19px - Body emphasis */
--font-lg: 1.44rem;      /* 23px - Subheadings */
--font-xl: 1.728rem;     /* 28px - Headings */
--font-2xl: 2.074rem;    /* 33px - Section titles */
--font-3xl: 2.488rem;    /* 40px - Page titles */
--font-4xl: 2.986rem;    /* 48px - Hero headlines */
--font-5xl: 3.583rem;    /* 57px - Display text */

/* Semantic Tokens (role-based with clamp() for responsiveness) */
--font-display-xl: clamp(2.5rem, 5vw, 3.583rem);   /* Hero/Intro */
--font-display-lg: clamp(2rem, 4vw, 2.986rem);     /* Section Hero */
--font-display-md: clamp(1.5rem, 3vw, 2.488rem);   /* Page Title */
--font-heading-lg: clamp(1.4rem, 2.5vw, 2.074rem); /* Content H2 */
--font-heading-md: clamp(1.2rem, 2vw, 1.728rem);   /* Content H3 */
--font-heading-sm: clamp(1rem, 1.5vw, 1.44rem);    /* Content H4 */
--font-body-lg: 1.2rem;     /* Body emphasis */
--font-body: 1rem;          /* Body text */
--font-body-sm: 0.875rem;   /* Secondary text */
--font-ui: 0.833rem;        /* UI elements */
--font-caption: 0.75rem;    /* Captions/labels */

/* Line Heights */
--lh-tight: 1.2;     /* Headlines */
--lh-snug: 1.4;      /* Subheadings */
--lh-normal: 1.6;    /* Body text */
--lh-relaxed: 1.8;   /* Long-form text */
--lh-loose: 2;       /* Spacious reading */

/* Letter Spacing */
--ls-tight: -0.02em;   /* Large headlines */
--ls-normal: 0;        /* Body text */
--ls-wide: 0.02em;     /* Subheadings */
--ls-wider: 0.05em;    /* Labels */
--ls-widest: 0.1em;    /* All caps */
```

### Usage Guidelines
- All font-size and letter-spacing values use CSS variables
- No hard-coded rem/em values in component styles
- Responsive scaling via clamp() for display and heading tokens

## Premium Effects (2025-12-22)
Applied luxury, modern, high-end visual enhancements:

### Typography
- Gold gradient text on intro logo (.intro-logo .brand-name)
- Enhanced letter-spacing for headings (0.03em - 0.04em)
- .gold-gradient-text utility class available

### Hover & Interaction Effects
- Buttons: scale(1.02) + translateY(-2px) + box-shadow on hover
- Menu items: gold underline animation (left→right expand) + translateX(5px)
- Images: scale(1.05) + brightness(1.05) on hover

### Scroll Effects
- Scroll progress bar (thin gold line at top)
- Header shrink effect on scroll (reduced height + shadow + darker bg)
- Fade-in on scroll (Intersection Observer) for grid items, flip cards, etc.

### Visual Details
- Subtle background noise texture overlay (opacity: 0.015)
- Gold accent line next to modal titles (::before pseudo-element)
- Enhanced card shadows (0 4px 20px → 0 20px 50px on hover)
- Gold gradient section dividers (.section-divider class)

### JavaScript Functions
- `setupScrollEffects()`: Header scroll state, progress bar
- `setupFadeInObserver()`: Intersection Observer for fade-in animations
- `resetScrollState()`: Resets header/progress bar on modal close
