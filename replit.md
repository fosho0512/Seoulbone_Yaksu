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

## Recent Changes (2025-12-21)
- Refactored intro page to unified Flexbox container
- Fixed PC/mobile overlap issues with clamp() responsive spacing
- Loading class now in HTML for flicker-free initial load
- Removed separate loading-overlay, intro-text, intro-page elements
- Single .intro-overlay controls entire intro sequence
