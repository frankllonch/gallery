# CLAUDE.md

The gallery site (Next.js 16 App Router, React 19, Tailwind 4). The projects site is a separate repo, `frankllonch/personal_page`; the top bar links to it (`MAIN_SITE` in components/top-bar.tsx).

- `content/artwork.json` + `public/artwork/` — the only things to touch to add work.
- `lib/artwork.ts` — server-only loader: measures images (sharp) and MP4/MOV (tkhd), prefers `<file>.opt.webp` twins written by `scripts/build-artwork.mjs` (prebuild; twins are gitignored).
- `components/gallery/` — the grid, pointer label and lightbox; `gal-` class selectors on purpose.
- `components/wierdtext.tsx` — GSAP scramble used by the top bar.

`npm run dev`, `npm run build`, `npm run lint`. No tests.
