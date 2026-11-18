# Speakout B2 · Course Companion

A B2-only version of the original Book 2 course companion UI, built from the
Speakout 3rd Edition B2 Student's Book (2022) sources in `D:\New Book-B2`.

## Run locally

```bash
npm install
npm run dev
```

## Verification gates

```bash
node scripts/verify-structure.mjs   # structure + source-safety checks
npm run verify:content              # regenerates ../CONTENT_VERIFICATION.md
npm run verify:images               # page-scan naming, count and resolution
npm run build                       # typecheck + production build
```

## Regenerating book page scans

Page scans are 1-based PDF page renders (`public/book/p001.jpg` … `p179.jpg`)
at 200 DPI / 1653×2339. If they need to be rebuilt:

```bash
npm run render:pages
# or: node scripts/render-pages.mjs --out <dir> --dpi 200 --quality 75
```

Requires Ghostscript (`GS_EXE` env var, or `gswin64c.exe` at
`D:\Downloads\gs10.08.0\bin\gswin64c.exe` on Windows).

## Content rules

- Only B2 source material from `D:\New Book-B2` may be displayed.
- No account gate, Shadowing, trainer marketing, TTS, invented quizzes,
  invented audio accents or Arabic translation surfaces.
- The B2 book has no answer key; do not fabricate exercises or writing feedback.
- See `../CONTENT_VERIFICATION.md`, `../CONTENT_INVENTORY.md`,
  `../PROJECT_PROGRESS.md` and `../STRUCTURE_COMPARISON.md` for full evidence.
