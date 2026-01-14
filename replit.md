# Seoul Bone Rehab Clinic Website

## Overview
This project delivers a premium static website for the Seoul Bone Rehabilitation Medicine clinic, designed with a luxury resort-inspired aesthetic. It features elegant animations, gold accents, and refined typography to provide a high-end user experience. The website aims to showcase the clinic's services and facilities through a visually sophisticated and engaging online presence, enhancing its brand image and market position. Key capabilities include interactive elements, dynamic content sections, and responsive design across various devices.

## User Preferences
I prefer that you use simple language in explanations. I like functional programming paradigms where applicable. I want iterative development, with small, reviewable changes. Please ask before making major architectural changes or decisions.

## System Architecture

### UI/UX Decisions
The website adopts a luxury resort theme, characterized by gold accents, subtle animations, and sophisticated typography.
- **Color Scheme**: Predominantly uses a refined palette with prominent gold accents.
- **Typography**: Employs a modular typography scale system with CSS variables for consistency and responsiveness. Fonts include Playfair Display, Manrope, Noto Serif KR, Gowun Batang, and Pretendard via CDN, ensuring comprehensive Korean and English support.
- **Animations**: Subtle animations are integrated throughout, including element fade-ins on scroll, interactive hover effects for buttons and menu items, and complex scroll-triggered transformations.
- **Responsive Design**: Utilizes Flexbox for layout, `clamp()` for responsive sizing, and media queries to ensure optimal viewing across PC and mobile devices. A key design principle is avoiding `vw` units for width, preferring `width: 100%` or percentages.

### Technical Implementations
- **Core Technologies**: Static HTML, CSS, and JavaScript. No build system is required.
- **Intro Page**: Features a unified Flexbox container for consistent display, with a loading sequence that transitions from a black overlay to revealing the background and an "Enter Site" button.
- **Page View System**: Uses a hash-based routing system (`#staff`, `#diagnosis`) to switch between content views dynamically without full page reloads. This enables seamless navigation and direct URL access to specific content.
- **Horizontal Scroll Effects**: Implements advanced scroll-triggered animations, particularly on pages like "Diagnosis," where vertical scrolling translates to horizontal content movement. This involves `position: sticky` and `translateX` animations, managed by JavaScript with phase-based progress systems and cubic easing.
- **Premium Effects**:
    - Gold gradient text and accent lines.
    - Enhanced hover effects for interactive elements (scale, translateY, box-shadow).
    - Gold underline animation for menu items.
    - Scroll progress bar.
    - Header shrink effect and transparency changes based on scroll position.
    - Subtle background noise texture.
    - Enhanced card shadows.
    - Fade-in animations on scroll for various elements using Intersection Observer.
- **Font System**: A comprehensive Korean font system is implemented with specific fonts for headings, body text, and conversational elements.
- **Header Management**: Header transparency and styling are dynamically adjusted based on scroll position and current page view (home vs. content).

### Feature Specifications
- **Treatment Page**: Consolidated treatment page featuring a three-phase sticky slogan section with background zoom effect, followed by a details section using CSS Grid (50:50 layout) with fade-up animations. Uses IntersectionObserver for scroll-triggered animations without GSAP dependency.
- **Diagnosis Page (V3)**: Rebuilt with a unique scroll structure where vertical scrolling drives horizontal content movement across three main sections: Sub Hero, Slogan, and Equipment. Features mutual exclusivity for slogan text and smooth easing for animations. Includes a mobile fallback to a vertical layout.
- **Core Values Page**: Redesigned with scroll-triggered pinned slides, integrating GSAP ScrollTrigger for image and text track animations, complemented by progress dots.
- **Sub-hero Sections**: All menu pages include unified sub-hero sections with wipe reveal animations, extending full-width using calculated margins.
- **Menu Navigation**: Utilizes hash-based routing for content switching.

## Recent Changes
- **Jan 2026**: Consolidated 04 and 04-1 treatment pages into single unified treatment page. Removed legacy GSAP ScrollTrigger-based intro section (~140 lines), deleted 04-specific styles (~100 lines). Renamed all treatment_v2 references to treatment. Preserved shared typography styles (.slogan-main, .slogan-sub, .slogan-desc, .promise-item, etc.).

## External Dependencies
-   **Google Fonts**: Playfair Display, Manrope, Noto Serif KR, Gowun Batang.
-   **Pretendard Font**: Loaded via CDN.
-   **Font Awesome**: For icons.
-   **Lenis Library**: For smooth scroll inertia (PC only).
-   **GSAP ScrollTrigger**: For advanced scroll-triggered animations (e.g., Core Values page).