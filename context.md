# Jepepage 2026 — Project Context

> Context file generated from the build session of 2026-09-29. Read this before
> continuing work on the project: it captures what exists, why key decisions
> were made, what broke and how it was fixed, and where to go next.

---

## 1. What this project is

**Jepepage** is a yearly birthday website tradition made for the user's
girlfriend (birthday: **September 29**). 2026 is chapter two.

- Core concept: **"a little universe, just for you"** — a dark, dreamy, starry
  night world with letters hidden in envelopes, floating memories, one long
  love letter, and a cinematic birthday finale.
- The original brief lives in `jepepage-2026-plan.md` (attached in the first
  session). The visual reference is a mockup image with: dark starry sky,
  glassmorphism nav/cards, pastel envelope grid, paper letters with polaroids,
  and a glowing golden birthday envelope finale.
- Tone: romantic, intimate, elegant, cinematic — never flashy, no generic
  Valentine's clichés, no hearts-everywhere.

## 2. Tech stack — and why

| Choice | Reason |
|---|---|
| React 18 + Vite | User asked for "next.js or react"; Vite build fits static hosting |
| react-router-dom, **HashRouter** | Deep links work on any static host without server rewrites; keeps relative asset URLs valid on every route |
| **No framer-motion** (removed) | Was the prime suspect in a blank-page incident; replaced with pure CSS animation system — visually equivalent, zero risk |
| **Single-file build** (`vite-plugin-singlefile`) | The managed preview host executed ES-module scripts unreliably (blank page). Final build: classic IIFE script + inline CSS + all 13 images & 11 fonts as data URIs inside one `index.html`. Zero runtime requests beyond the document itself |
| Generative Web Audio music box | No audio asset exists; the ♫ toggle plays a soft generative arpeggio loop (Gm9 → E♭maj9 → B♭maj7 → Fadd9, 72bpm). Starts only after user gesture; preference persisted via safe storage wrapper |

**Never reintroduce** `type="module"` scripts, framer-motion, CDN links, or
Google Fonts links — they were all removed for cause (see §8).

## 3. Delivery environment (AutoClaw function-compute / nginx)

- Static-only host with strict CSP: **every asset must ship inside the site**
  (fonts/images local or inline; no CDN, no external fetch).
- Site root = directory of `entryFile` (`index.html` at
  `projects/website-fa6636ad37b4e1bb881a0e2f/`). Only that subtree uploads.
- Deployment is triggered by writing `projects/projects.json` (top-level JSON
  array; update the item with id `website-fa6636ad37b4e1bb881a0e2f`, keep
  `createdAt`, bump `updatedAt`, include
  `"deployment":{"provider":"function-compute","environment":"nginx","autoPreview":true}`).
  Write it **last** — that write is the upload signal.
- Agent must not call Function Compute APIs, touch JWTs, or invent preview
  URLs. Real preview/stable URLs arrive via system deployment messages.

## 4. What is built

Routes (hash-based):

| Route | Page |
|---|---|
| `#/` | Landing — parallax hero (see §5), 4 glass feature cards, note section with framed hero image |
| `#/open-when` | 6 pastel envelope cards (5 normal + golden locked birthday) |
| `#/open-when/:id` | Envelope ritual: sealed → tap → flap opens in 3D → paper rises → letter card with photo + "a little message for you..." audio strip |
| `#/memories` | 5 floating polaroids, hover straighten, lightbox |
| `#/letter` | Long-form love letter on paper texture |
| `#/surprise` | Golden pulsing sealed envelope → cinematic opening → finale: intensified starfield, pastel canvas fireworks, final message |
| `#/2025` | "Chapter One" archive page (original 2025 site files were never available; page includes instructions-in-README for swapping in the real one) |
| `*` | "Lost among the stars" 404 |

Global elements: fixed glass pill nav (logo, links, ♫ music toggle, mobile
hamburger + full-screen menu), persistent canvas Starfield (twinkling stars +
shooting stars, intensify event for finale), footer with "Previous Birthday ·
2025" archive link.

## 5. Landing page layout & parallax (v1.2)

- **Full-width celestial assets**: The hero spans 100vw full width. The
  `<Landscape />` SVG (mountains, shimmering lake, glowing city lights, and couple
  silhouette on the hill), drifting blurred clouds, and the glowing crescent moon
  span edge-to-edge without container box clipping.
- **Bottom-anchored hero elements**: Rather than floating in the vertical dead
  center, the hero text (`09 · 29 · 2026`, "Happy Birthday, My Love", "A little
  universe, just for you.", and the "explore ↓" scroll cue) is anchored in the
  lower portion of the hero (`justify-content: flex-end`) just above the
  landscape, letting the upper sky breathe.
- **Removed hero right-side feature cards**: Clean, minimal hero as planned in
  the initial brief.
- **Scroll-revealed picture with parallax**: Scrolling down into `#note-section`
  gracefully triggers the couple Polaroid to glide up and scale into view, with a
  subtle scroll-linked floating parallax depth and optional tap-to-zoom Lightbox.
- **Bottom CTA button**: The "Begin the journey" CTA is positioned at the bottom
  of the note section, appearing only after scrolling down and reading the note.
  The previous right-side button in the note section was removed.
- **Scroll parallax layers**: Moon 0.16, clouds 0.10, hero text 0.24, landscape
  0.44. Pointer parallax shifts desktop layers gently by `±8–14px`. Reduced motion
  supported.

## 6. Design system

- **Palette** (tokens in `src/styles/tokens.css`): midnight navy `#0B0A1F`,
  `#0D0B21`, violet `#2B1B4D` / `#4B2E83`, horizon pink `#F7A8B8`, gold
  `#F7D08A` (gold is reserved for the birthday/surprise moment), lavender text
  `#C8C2E8`, muted `#9D96C9`, envelope pastels (`#F7B3C5`, `#D6B8F0`,
  `#B8D8F8`, `#F8D6B8`, `#B8E6D6`), CTA gradient `#F4B8D8 → #E69AC6`.
- **Type** (all self-hosted woff2 in `src/assets/fonts`): Cormorant Garamond
  (display serif, 400/500/600 + italics), Parisienne (script accents: "My
  Love", signatures), Caveat (handwritten captions/notes), Jost (UI sans,
  300/400/500).
- **Motion**: CSS keyframe system — `rise-item` (hero stagger), `fade-item`
  (staged fades), `reveal/revealed` (scroll reveal via IntersectionObserver
  hook `useInViewOnce`), `route-in` (route fades), envelope open sequence in
  `.big-env.is-opening`. All respect reduced motion.
- **Accessibility**: semantic landmarks, skip link, focus-visible rings,
  aria-labels on icon buttons, keyboard-operable envelopes/menu/lightbox,
  alt text, ErrorBoundary fallback UI.

## 7. Content architecture (where to edit)

All personal content is data — never buried in UI:

```
src/content/
├── site.js      brand, dateLabel, birthdayISO (lock date), herName/yourName ('' = generic wording)
├── home.js      landing copy
├── openWhen.js  6 envelopes: id, eyebrow, title, tint, icon, salutation, message[], photo, signature, ps
├── memories.js  polaroids: src, alt, caption, rotation, size
├── letter.js    main letter: salutation, paragraphs[], photo, closing, signature, ps
├── surprise.js  locked-state copy + finale lines
└── archive.js   2025 archive copy
```

Images: `src/assets/img/*.jpg` (13 generated illustrations — dreamy flat-vector
night scenes, consistent style contract: navy/violet/pink/gold, no faces, no
text). Replace with real photos keeping the same filenames.

## 8. Battle scars — known pitfalls (do not regress)

1. **Blank page incident (preview showed only the gradient background).**
   Root causes addressed, in order of suspicion:
   - `localStorage`/`matchMedia` can throw in the sandboxed preview iframe →
     wrapped in try/catch helpers (`src/lib/safeEnv.js`). Never call
     `localStorage` directly.
   - `<script type="module">` is MIME-strict; some hosts break it → final
     build uses a classic inline IIFE script (`patch_dist.cjs` rewrites
     `<script type="module" crossorigin>` → `<script>` after build).
   - framer-motion removed entirely as a risk factor; replaced by the CSS
     animation system.
2. **UTF-8 mojibake**: writing built files via PowerShell `Set-Content`
   corrupted `·` (in "09 · 29 · 2026") into `Â·`. Any post-build file patching
   must go through the Node script `scripts/patch_dist.cjs` (UTF-8, no BOM) —
   never through PowerShell string rewriting.
3. **Static no-JS fallback**: `index.html` contains a `.boot-hero` inside
   `#root` (static "09 · 29 · 2026 / Happy Birthday, My Love") so even a fully
   script-blocked environment shows the hero. React replaces it on mount.
4. **ErrorBoundary** wraps the app: crashes render a friendly message + console
   details instead of a blank page.
5. **Relative assets with HashRouter**: bundled asset URLs are module-relative
   (`new URL(..., import.meta.url)`); deep routes are hash-based so document
   URL never changes. If routing is ever switched to BrowserRouter, asset
   paths and hosting fallback must be re-verified.

## 9. Build & verify pipeline

```bash
npm install
npm run build                 # → dist/ (single-file index.html)
node scripts/patch_dist.cjs   # REQUIRED: module→classic script + UTF-8 fix + integrity check
node scripts/check_delivered.cjs  # after copying to projects/<id>/: verifies the deployed file
```

Delivery copy step: copy `dist/index.html` →
`projects/website-fa6636ad37b4e1bb881a0e2f/index.html` (plus
`public/assets/favicon.svg` → `projects/<id>/assets/favicon.svg`), then update
`projects/projects.json` (see §3) to trigger redeploy.

Other scripts: `scripts/check_singlefile.cjs` (build checks),
`scripts/check_assets.cjs`, `scripts/check_parallax.cjs`,
`scripts/fetch_fonts.py` (Google Fonts latin woff2 downloader),
`scripts/gen_images.py` (seedream image pipeline + crop/compress).

## 10. Current status & next ideas

**Status**: v1.3 deployed via projects.json (awaiting/confirmed preview).
Personal assets integrated:
- Landing page hero & note section uses user photo `hero-couple-me.jpeg`.
- Memories page uses user polaroids `mem-01-me.jpeg` through `mem-05-me.jpeg`.
- Main letter features user MP4 video `letter-main-me.mp4` with inline autoplay & playback controls.
All assets inlined into single-file build with classic script and verified integrity.

**Candidate next steps** (discussed or implied, none committed):
- Personalize: real names (site.js), real messages (openWhen.js, letter.js).
- Add shooting-star cursor trail / more finale staging.
- If the real 2025 site files appear: drop its build into `public/2025/` and
  point the footer link at `/2025/index.html` (see README §The 2025 archive).
- Music: optionally replace generative loop with a real song/voice note (README
  explains how).

## 11. File map

```
workspace/
├── jepepage-2026/                 ← source project (this is the repo)
│   ├── package.json / vite.config.js / index.html (boot hero + noscript)
│   ├── README.md                  ← run + personalization guide
│   ├── context.md                 ← this file
│   ├── scripts/                   ← build patchers & checkers (§9)
│   ├── public/assets/favicon.svg
│   └── src/
│       ├── main.jsx / App.jsx (routes, ErrorBoundary, starfield, nav, footer)
│       ├── styles/   fonts.css · tokens.css · base.css · layout.css · components.css · pages.css
│       ├── content/  (§7 — all editable copy)
│       ├── components/ icons.jsx · Sky.jsx (Moon/Clouds/Landscape) · Starfield.jsx ·
│       │              Fireworks.jsx · Navbar.jsx · Footer.jsx · Media.jsx ·
│       │              Envelope.jsx (LetterPaper + EnvelopeRitual) · ErrorBoundary.jsx
│       ├── hooks/    useAmbientMusic · usePrefersReducedMotion · useInViewOnce · usePageMeta
│       ├── lib/      musicEngine.js · safeEnv.js
│       ├── pages/    Home · OpenWhen · EnvelopeLetter · Memories · Letter ·
│       │             Surprise · Archive2025 · NotFound
│       └── assets/   fonts/ (11 woff2) · img/ (13 jpg)
└── projects/
    ├── website-fa6636ad37b4e1bb881a0e2f/   ← deployed build (index.html + favicon)
    └── projects.json                        ← deploy trigger registry
```
