# Bliss Beauty Lounge

A static, mobile-first website for Bliss Beauty Lounge in Etobicoke. Built with semantic HTML, CSS and progressive JavaScript enhancements.

## Project structure
- index.html: page content, service prices, reviews, SEO metadata and BeautySalon JSON-LD
- config.js: business name, phone, address, hours, timezone and social links
- content.js: ordered gallery caption metadata
- css/styles.css: responsive ivory, charcoal and scarlet design system
- js/main.js: opening status, hours sheet, service tabs, gallery/review controls, restrained scroll motion and brand intro
- images/: original salon portfolio images
- DESIGN.md: visual direction and implementation rules

## Accessibility and motion
Native page scrolling, keyboard-operable tabs, visible focus states, mobile quick actions, safe-area padding and reduced-motion support. ?fx=off disables enhanced motion; ?intro=1 replays the intro. Service prices and reviews remain in the HTML for no-JavaScript access.

## Dependencies
GSAP 3.12.5 and ScrollTrigger 3.12.5 are pinned to cdnjs. No build step is required.

## Deployment
The repository remains connected to the existing Vercel production project. Commits to main trigger deployment.
