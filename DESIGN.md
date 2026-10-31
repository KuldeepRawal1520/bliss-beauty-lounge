# DESIGN.md — The Mirror Hall

## Story
Every client sits in front of a mirror and leaves seeing someone brighter. The site is a hall of arched salon mirrors lit by one scarlet neon tube. The tagline is “See yourself in colour.”

## Palette
Only these hues are used: Charcoal #1A1917, Ivory #F1EEDB, Scarlet #F02B1F, Oxblood #3A0D0B (background gradients and shadows only), and Ivory-muted #B1AEA0 for secondary copy on charcoal. Scarlet is reserved for neon outlines, buttons, accents and the tickets section. Small scarlet copy on charcoal and small ivory copy on scarlet are avoided. Ticket copy is charcoal on ivory paper.

## Typography
Syne 700/800 uppercase for display; Instrument Serif italic for expressive accent words and captions; DM Sans 400/500/700 for body copy. Fonts are preconnected and the display family is preloaded in the document head. Fallbacks are real system stacks.

## Composition
No top navigation bar. The hero is a 100svh split composition with a stacked headline, booking CTA, live Toronto-time status and three arched mirrors at separate CSS 3D depths. The ghost BLISS word is a deep outlined layer. The Hall uses twelve arched portfolio frames in a staggered desktop grid and a native horizontal snap hall on mobile. Tickets sit on a scarlet field as ivory notched paper panels with perforated rules and an accordion reveal. Reviews use a native horizontal snap strip. Visit closes with a neon-outline call CTA, address, seven-day hours and social/directions links.

## Depth and motion
CSS perspective and preserve-3d establish the stage. Mirror layers use rotateX/rotateY/translateZ and shadows/reflections. GSAP 3.12.5 and ScrollTrigger provide scroll-scrubbed desktop gallery motion; requestAnimationFrame computes mobile coverflow and review-card depth. Pointer tilt and magnetic controls are limited to fine-pointer devices. No scroll hijacking, pinning, WebGL, OGL or Lenis. ?fx=off disables scroll and pointer effects. prefers-reduced-motion removes intro and animated effects while leaving the layout usable.

## Intro
The first visit of a session can show a JS-created BLISS reveal. ?intro=1 replays it. The static HTML never contains the overlay. A CSS reveal fallback prevents hidden hero content from remaining hidden if the enhancement fails. The intro has a hard timeout and supports click/tap/keyboard skip.

## Content and accessibility
config.js remains the sole source for business facts. content.js holds the tagline and ordered gallery captions; service prices, timings and review quotations remain server-rendered in index.html so all essential information is available without JavaScript. Prices and reviewer wording are preserved verbatim from the prior site. One h1, skip link, real accordion buttons, dialog semantics, visible focus, native scroll and image dimensions are required. All images are the supplied originals and must not be enlarged beyond their source dimensions. No embedded map or invented booking service.

## SEO
Canonical and social metadata use the production Vercel URL and red-hair.jpg. BeautySalon JSON-LD contains name, address, phone, seven-day hours, URL, image and Instagram sameAs; no prices or aggregate rating.

## Known implementation limits
The visual system uses CSS 3D plus GSAP rather than a WebGL scene. The optional OGL ripple was intentionally omitted to keep the first load resilient. Browser rendering, actual mobile devices, console inspection and Lighthouse require manual browser QA.
