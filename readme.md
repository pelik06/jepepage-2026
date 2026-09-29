# Jepepage 2026 — a little universe

A personal birthday website: a small dreamy universe with letters waiting in
envelopes, floating memories, one long love letter, and a cinematic final
surprise. Chapter two of the Jepepage tradition (2025 lives on at `#/2025`).

Built with **React 18 + Vite**, `react-router-dom` (hash routing), and
`framer-motion` for the envelope choreography. Fully static — no server, no
external requests (all fonts/images ship inside the site, strict-CSP safe).

## Run it

```bash
npm install
npm run dev        # local dev server (http://localhost:5173)
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

## Where things live

```
src/
├── content/          ← ALL personal content (edit here!)
│   ├── site.js         brand, birthday date, hero date label, names
│   ├── home.js         homepage copy
│   ├── openWhen.js     the 6 "Open When..." envelopes + messages
│   ├── memories.js     the memory polaroids + captions
│   ├── letter.js       the main love letter
│   ├── surprise.js     final reveal copy
│   └── archive.js      2025 archive page copy
├── assets/
│   ├── img/            photos (replace freely, keep filenames or fix imports)
│   └── fonts/          self-hosted woff2 (Cormorant Garamond, Jost, Parisienne, Caveat)
├── components/        starfield, envelopes, polaroids, fireworks, nav, footer
├── pages/             one component per route
└── styles/            design tokens + css (tokens.css has the palette)
```

## Personalizing it

1. **Messages** — open `src/content/*.js` and edit the text. Every message,
   caption, salutation and signature is plain data; the UI adapts to any number
   of envelopes/memories.
2. **Photos** — drop your real photos into `src/assets/img/` (square crops look
   best for polaroids; the hero/finale are 16:9). Keep the same filenames and
   you don't have to touch any code.
3. **Names** — `site.js` has `herName` / `yourName`; leave `''` for the generic
   "My Love" wording, or fill them in.
4. **Birthday lock** — the golden envelope always unlocks on
   `birthdayISO: '2026-09-29'` (see `site.js`). Before that date the Surprise
   page shows a locked state with a countdown.

## Music

There is no audio file: the ♫ toggle in the nav plays a tiny **generative
music box** (Web Audio API) — a slow dreamy arpeggio with a soft pad and echo.
It only starts after a user gesture (browser autoplay rules), and the
preference is remembered in `localStorage`. To use a real song or a recorded
voice note instead: put the file in `src/assets/img/…` (or `public/assets/`),
import it in the relevant component and call `.play()`/`.pause()` on an
`<audio>` element from the same toggle button.

## The 2025 archive

This project ships a quiet "Chapter One · 2025" page at `#/2025` (footer link
"Previous Birthday · 2025"). If you still have the original 2025 website build,
you can serve it for real: drop its files into `public/2025/` (so that
`/2025/index.html` exists), then change the footer link in
`src/components/Footer.jsx` from `/2025` to `/2025/index.html` — the static
file will be served directly instead of the in-app archive page.

## Deployment

`npm run build` produces a self-contained `dist/` folder (entry:
`dist/index.html`). Upload/copy that folder to any static host — nothing else
is needed. Hash routing (`#/open-when`) means deep links work on any host
without server rewrites.

## Design notes

- **Palette** — midnight navy `#0B0A1F`, deep violet `#2B1B4D`/`#4B2E83`,
  horizon pink `#F7A8B8`, warm gold `#F7D08A`; rose is the everyday accent,
  gold is reserved for the birthday/surprise moment. Envelopes each carry a
  pastel tint from the same family.
- **Type** — Cormorant Garamond (display serif) · Parisienne (script accents:
  "My Love", signatures) · Caveat (handwritten notes & captions) · Jost (UI).
- **Motion** — framer-motion for page transitions and the envelope ritual;
  canvas for the starfield + finale fireworks. Everything respects
  `prefers-reduced-motion` (static sky, no parallax/fireworks, crossfades only).
- **Accessibility** — semantic landmarks, keyboard-operable envelopes and menu,
  visible focus rings, aria-labels on icon buttons, skip link, alt text.
