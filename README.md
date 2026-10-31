# Bliss Beauty Lounge

A static, mobile-first salon website for Bliss Beauty Lounge, Etobicoke, built with plain HTML, CSS and JavaScript for Vercel.

## Run locally
Open `index.html` in a browser, or serve the repository root with any static file server. There is no build step and no package installation.

## Project structure
- `index.html` - semantic page content, services, reviews and SEO metadata
- `config.js` - business contact details, hours and social links
- `css/styles.css` - theme, responsive layouts and motion
- `js/main.js` - hours status, menu interactions, navigation sheet and gallery behavior
- `images/` - salon portfolio images (expected filenames are listed below)
- `DESIGN.md` - visual direction and implementation rules

## Portfolio image assets
The empty GitHub repository did not contain the 12 supplied portfolio images at the time this site was created. Add the original, unmodified files to `images/` using these exact names:

`blue-colour.jpg`, `blonde-ombre.jpg`, `burgundy-highlights.jpg`, `caramel-bob.jpg`, `caramel-highlights-waves.jpg`, `red-hair.jpg`, `silver-chunky-highlights.jpg`, `ash-blonde-balayage.jpg`, `brunette-caramel-waves.jpg`, `gold-highlights-layers.jpg`, `platinum-blonde.jpg`, `silver-highlights.jpg`.

Until those assets are added, the gallery gracefully displays labelled visual placeholders. Do not substitute stock photography for the owner's images.

## Business details
All operational details are centralized in `config.js`. Booking is by phone only. Walk-ins are welcome. There is no online booking integration.

## Deployment
Connect this GitHub repository to a Vercel project with the project root as the root directory and no build command. Vercel can serve the static `index.html` directly.

## Accessibility and performance
The page includes keyboard-operable menu controls, visible focus states, reduced-motion handling, lazy-loaded portfolio images, responsive layouts, and non-blocking progressive enhancement. Heavy WebGL/3D dependencies are intentionally not included in this first implementation; see `DESIGN.md` for the simplified motion approach.
