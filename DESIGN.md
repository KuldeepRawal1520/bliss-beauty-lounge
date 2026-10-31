# Bliss Beauty Lounge design direction

## Experience
Warm, elegant and friendly for salon visitors. The visual language is calm and welcoming, with familiar navigation, visible actions and readable service information. The hero's arched mirror photography is the signature dimensional feature; the brand intro is a short cinematic "The Cut" moment.

## Colour system
Only three brand colours: Ivory #F1EEDB, Charcoal #1A1917 and Scarlet #F02B1F. The requested approximate 60/30/10 background balance applies outside the intro. The hero remains ivory. Scarlet is reserved there for the Call to Book action, the word "colour" and small accents. The intro uses only the three colours and their mixes. Business content, service prices, reviews, SEO and JSON-LD remain unchanged.

## Typography and layout
Playfair Display for headings, DM Sans 400/500 for body and controls, and Great Vibes for the Bliss wordmark and intro. Desktop hero pairs the original copy with three fanned, extruded mirror arches. Mobile puts the headline first, then a compact arch composition and the existing actions. Header navigation, gallery, services, reviews, booking band, visit details and footer retain their existing structure and content.

## Hero depth and motion
The mirror stage uses approximately 1100px perspective, preserved 3D transforms, layered charcoal extrusion, an ivory inner frame, diagonal glass glints and soft contact shadows. The platinum, scarlet and blue arches sit at distinct Z depths and base Y rotations. The hero includes a restrained spotlight, faint script, two depth strands, capped star particles and a floating inline SVG scissors signature. Desktop pointer parallax is eased; mobile uses slow automatic sway and scroll-linked tilt. ScrollTrigger swings the outer arches open while the centre retreats, without pinning. Scissor and floating loops pause when the hero leaves the viewport. Motion is transform, opacity or clip-path only; pre-blurred shadows are static. Reduced motion and ?fx=off retain composed static poses.

## Brand intro: The Cut
The intro is created by JavaScript only. It uses a scarlet stage with a static charcoal vignette, eight line sweeps, three crossing paper planes, the ivory Bliss script, descriptor, eight sparkles and a scissors diagonal cut. The overlay separates to reveal the existing page and the script flies toward the real header wordmark when measurable. A visible keyboard-accessible Skip button jumps to the end. The GSAP choreography targets approximately 3.4 seconds; the hard failsafe removes and disables the overlay at 4.6 seconds, and CSS reveals pending hero/header states at 4.9 seconds. The inline head guard uses sessionStorage, ?intro=1 replay, ?fx=off and reduced-motion checks. Intro flash peak is capped at 35%; logo glow flicker amplitude is soft, with three separated flickers.

## Accessibility, performance and verification
Static HTML remains available without JavaScript. Features are isolated in try/catch blocks with null checks. Particles are capped at 12 desktop / 6 mobile; will-change is limited to active motion; hero loops pause off-screen. GSAP and ScrollTrigger remain at 3.12.5. Browser rendering, real-device testing, Lighthouse and assistive-technology testing remain separate QA tasks.
