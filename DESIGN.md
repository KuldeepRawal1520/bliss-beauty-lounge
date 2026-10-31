# Bliss Beauty Lounge design direction

## Experience
Warm, elegant, friendly and immediately understandable for salon visitors. The visual language is calm and welcoming, with familiar navigation, visible actions and readable service information. The arched mirror photography remains the signature visual, while its 3D scroll movement is restrained and purposeful.

## Colour system
Only three brand colours: Ivory #F1EEDB (dominant), Charcoal #1A1917 (secondary), and Scarlet #F02B1F (accent). Target visible background split is approximately 60% ivory, 30% charcoal and 10% scarlet. Ivory is used for the header, hero, Our Work and Kind Words; charcoal for Our Services, Visit Us and footer; scarlet for the Call Us band and primary booking accents. Tints are limited to mixes of these colours. No blue or unrelated hue is used in the interface.

## Typography
Playfair Display 700 for headings, with restrained italic Playfair accents; DM Sans 400/500 for body and controls; Great Vibes only for the Bliss wordmark and intro. Georgia and system-ui fallbacks preserve a considered hierarchy if web fonts fail.

## Layout and navigation
Desktop uses a simple header with four text links and a prominent Call to Book action. Mobile uses the wordmark, a visible Call button and a fixed four-action bar for Call, Directions, Hours and Services. Page content uses consistent responsive gutters and a centred maximum width. The hero pairs plain-language copy with the existing three-arch mirror cluster. Our Work is an arched image gallery; Our Services presents four straightforward categories and their complete price lists; Kind Words shows all eight reviews; Call Us is a clear scarlet booking band; Visit Us contains the address, seven-day hours and social/directions links.

## Motion
The desktop gallery retains its existing GSAP/ScrollTrigger scroll-swing concept, reduced to a maximum 16-degree rotateY and -120px depth, returning to a fully opaque, front-facing state. Mobile gallery interaction is a native swipe carousel with snap points and explicit controls. Other reveals are short fades and small rises. ?fx=off and prefers-reduced-motion leave the page static and complete. No custom cursor, magnetic interaction, grain, fan menu, neon glow or pointer tilt.

## Intro
A JavaScript-created scarlet brand moment uses the Great Vibes Bliss wordmark, ivory descriptor and charcoal diagonal sweep. It remains skippable by touch, click or keyboard, respects reduced motion, uses sessionStorage and retains the 3.5-second failsafe and 3.6-second CSS reveal fallback. ?intro=1 requests replay.

## Accessibility and content integrity
Semantic links and buttons, visible charcoal/ivory focus rings, minimum 52px primary actions, readable mobile body text, safe-area padding and native scrolling are required. Business facts remain in config.js. Existing service names, prices, durations, eight review texts, gallery captions and image assets are retained. SEO metadata and BeautySalon JSON-LD remain unchanged. Images retain width and height attributes and use object-fit:cover without source upscaling beyond the supplied dimensions.

## Dependencies and verification
GSAP and ScrollTrigger remain pinned to 3.12.5. Browser/device rendering, Lighthouse and live assistive-technology testing must be performed separately; code-level checks do not substitute for visual QA.
