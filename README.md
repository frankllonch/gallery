# Gallery — Frank Llonch

Paintings, drawings and animations. A Next.js site, deployed on Vercel.

## Add work

1. Drop the files (jpg/png/webp, mp4/mov) into `public/artwork/`.
2. Add an entry to `content/artwork.json` (title, description, size, year, files — the first file is the tile).
3. `npm run build:artwork` once, so the big images get an optimised twin for local dev (production runs it in `prebuild`).

## Run

```bash
npm install
npm run dev
```
