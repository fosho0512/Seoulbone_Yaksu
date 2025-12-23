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
- Google Fonts (Manrope, Playfair Display)
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

## Recent Changes (2025-12-23)
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
