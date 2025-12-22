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

## Recent Changes (2025-12-22)
- Added premium UI effects (see Premium Effects section below)

## Recent Changes (2025-12-21)
- Refactored intro page to unified Flexbox container
- Fixed PC/mobile overlap issues with clamp() responsive spacing
- Loading class now in HTML for flicker-free initial load
- Removed separate loading-overlay, intro-text, intro-page elements
- Single .intro-overlay controls entire intro sequence

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
