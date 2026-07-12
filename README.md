# Noir & Gold — Cafe & Coffee Shop Website

A premium, fully responsive coffee shop website built with **only HTML, CSS, and vanilla JavaScript** — no frameworks, no build tools. Just open `index.html` in a browser.

## Design

- **Palette:** espresso black (`#0c0805`), warm dark brown (`#1b120c` / `#241811`), cream (`#f6efe2`), brass gold (`#c9a15e`).
- **Type:** [Fraunces](https://fonts.google.com/specimen/Fraunces) for display headings, [Manrope](https://fonts.google.com/specimen/Manrope) for body text.
- **Signature detail:** an animated steam wisp rising over the hero image and inside the loading screen, echoing a fresh-poured espresso.
- Glassmorphism on the sticky nav (once scrolled) and the contact form; soft shadows and rounded corners throughout.
- Scroll-reveal animations, animated stat counters, hover zoom on the menu and gallery cards, and a back-to-top button.

## Project structure

```
/cafe-website
├── index.html          → All page markup (semantic, SEO-friendly)
├── css/
│   └── style.css        → Design tokens, layout, animations, responsive rules
├── js/
│   └── script.js         → Nav, scroll reveal, counters, form handling, etc.
└── README.md
```

No local `/images` folder is used — all photography is linked directly from Unsplash (royalty-free) so the project stays lightweight.

## Sections included

1. Sticky glass navigation bar with mobile hamburger menu
2. Full-screen hero with animated background zoom and steam effect
3. About Us — two-column layout with animated counters
4. Featured Menu — 8 items with hover-zoom cards
5. Why Choose Us — 6 feature cards with icons
6. Gallery — responsive masonry-style grid with hover zoom
7. Testimonials — 3 cards with photos and star ratings
8. Contact — form with client-side validation + embedded Google Map
9. Footer — social links, quick links, opening hours, newsletter signup
10. Back-to-top button + page loading animation

## Notes for customization

- Update the address, phone, email and map embed URL in the **Contact** section of `index.html` with your real cafe details.
- The contact form currently simulates a submission in the browser (`js/script.js`, section 8). Wire it up to your backend or a form service (Formspree, Netlify Forms, etc.) by replacing the `setTimeout` block with a real `fetch()` call.
- All images are served directly from Unsplash's CDN via URL — swap any `src` in `index.html` to use your own photography if preferred.
- Colors, fonts and spacing are controlled by CSS custom properties at the top of `style.css` (`:root`), so a full re-theme only requires editing that block.

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses `IntersectionObserver`, CSS `clamp()`, `backdrop-filter`, and `aspect-ratio` — all widely supported as of 2026.
