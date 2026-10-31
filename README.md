# Bliss Beauty Lounge — The Mirror Hall

A static salon website for Bliss Beauty Lounge, Etobicoke. Built with semantic HTML, CSS 3D and progressive JavaScript enhancements. No build step.

## Run locally
Open index.html in a browser or serve the repository root with a static file server.

## Project structure
- index.html — accessible page content, full service prices, reviews and SEO metadata
- config.js — unchanged business facts, phone, address, hours and social links
- content.js — commented tagline and ordered portfolio caption data
- css/styles.css — The Mirror Hall visual system, responsive layouts and motion
- js/main.js — intro, Toronto open status, accordions, 3D motion, quick links and reviews
- images/ — the 12 original salon portfolio images
- DESIGN.md — design direction and implementation notes

## Portfolio
The twelve original, unmodified images are in images/. Preserve their filenames. Images are displayed in arched frames and must not be upscaled beyond twice their native pixel width.

## Booking and business details
Booking is phone only. The main action is Call to Book. Walk-ins welcome. Business facts and operating hours are read from config.js.

## Motion and accessibility
The design uses CSS 3D and GSAP 3.12.5 / ScrollTrigger 3.12.5 from cdnjs. Native scrolling is retained. ?fx=off disables scroll and pointer effects; ?intro=1 replays the brand reveal. Reduced-motion users receive a static composition. Service prices and reviews remain in the HTML so they are available without JavaScript.

## Deployment
The repository is connected to the existing Vercel project. Commits to main trigger production deployment. No build command or output directory is required.
