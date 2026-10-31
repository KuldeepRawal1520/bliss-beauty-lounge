# DESIGN.md — The Scarlet Thread

## Story
A single scarlet thread connects the first impression, portfolio, service menu, reviews and final phone call. The visual language should feel editorial and salon-led, never like a generic business template.

## Palette
- Ivory: `#F1EEDB`
- Charcoal: `#1A1917`
- Scarlet: `#F02B1F`
- Muted ivory: ivory at 60% opacity on charcoal

Use charcoal for cinematic and review sections, ivory for the service menu, and scarlet sparingly for the thread, buttons, focus rings and small accents. Never use scarlet for small body copy on charcoal. Maintain WCAG AA contrast for text.

## Typography
- Display: Bodoni Moda, with Georgia fallback.
- Body: Manrope, with system-ui fallback.
- Oversized, tightly tracked display typography for “Bliss”.

## Composition
- The opening is a charcoal cinematic panel with a scarlet silk-thread motif, oversized ivory “Bliss”, a phone CTA, walk-in note and live open/closed status.
- Portfolio is an editorial centerpiece. Desktop may arrange the 12 images in a perspective carousel; mobile uses a natural vertical depth stack. A plain scrollable gallery is the reliable fallback.
- The four service categories are oversized salon-ticket cards on ivory. They reveal complete, readable service lists.
- Reviews are large ivory-on-charcoal quote panels in a native horizontal scroll strip.
- The visit section closes the thread at the phone CTA and includes all seven days of hours, directions and Instagram.

## Motion
Motion should be slow, silky and ease-out. Prefer transform and opacity. Keep all scrolling native; never trap or hijack it. Disable nonessential movement for `prefers-reduced-motion`. Pointer-only effects must never run on touch devices.

## Non-negotiables
- Mobile-first; use separate mobile and desktop compositions where appropriate.
- Semantic HTML, one H1, visible keyboard focus, keyboard-operable controls and AA contrast.
- No online booking URL. The primary action is “Call to Book”.
- All business facts and hours come from `config.js`.
- Do not invent services, awards, claims, review text or prices.
- Preserve supplied portfolio images without editing them.
- No embedded map, emoji icons, layout-shifting images or scroll hijacking.
- All service prices remain readable without JavaScript.
- Reduced-motion and no-JavaScript experiences must remain usable.

## Implementation note
The first repository was empty and contained no portfolio image files. The site therefore references the exact expected image paths and provides labelled fallbacks until the original images are added. This implementation uses local CSS/JS effects rather than WebGL, OGL, GSAP or Lenis to keep the first load small and robust.
