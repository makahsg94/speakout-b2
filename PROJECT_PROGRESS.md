# B2 Website Project — Progress

Last updated: 2026-11-18 (image-quality fix and final verification phase)

## Objective
Reproduce the original `https://the-book-2.pages.dev/` website (repo `makahsg94/the-book-2`, local master `D:\ref-book-2`) as the master reference for design, structure, navigation, layouts, media players and interactions, while using **only** educational content in `D:\New Book-B2` (Speakout 3rd Edition B2 Student's Book, 2022).

**Excluded (must stay out):** account gate, account/admin pages, Shadowing, electronic-trainer marketing/banner/card/link, TTS, invented quizzes/writing tasks, invented audio accents, Arabic translation surfaces, external grammar videos.

## Overall progress
- Phase: 3 — implementation complete; final verification in progress
- Reference application layer restored: complete
- B2 content extraction and reconnection: complete
- Automated verification gates: all passing
- Desktop browser verification: complete
- Mobile/responsive verification: complete
- Documentation refresh: complete
- Upload / deployment: **not started** (explicitly out of scope for this task)

## Source material verified
- `689_1- Speakout 3rd B2 Student's Book_2022.pdf` — 179 PDF pages; text layer on 171 pages; image-only pages 107–109 and 144–147. Rendered to `public/book/p001.jpg`–`p179.jpg` at 200 DPI.
- `689_3- Speakout 3rd B2 Class Audio/` — 88 MP3 tracks in `public/audio`.
- `689_4- Speakout 3rd B2 Videos/` — 16 MP4 videos in `public/video` + `SO3_B2_SB_Videoscripts.pdf`.
- PDF contents: 8 units, lead-in, writing bank, grammar bank, vocabulary bank, mediation bank, audioscripts, videoscripts.
- No Arabic text, no word-level US/UK pronunciation audio, and no answer key exists in the source.

## Completed work
- Restored the original reference application layer (`Layout`, `Header`, overlay `Sidebar`, `LineMap`, `CoverStack`, `HomePage`, `BookPage`, `UnitPage`, `LessonPage`, `BankPage`, `PageView`, `ReviewPage`, `MiniPlayer`, `Media`, `BackToTop`, global lightbox, theme/progress/toast/confetti providers) while keeping `HashRouter`.
- Removed all gate/auth/admin/account, Shadowing and trainer surfaces; removed B1/B1+/Arabic educational copy and invented quiz content.
- Reconnected B2 data into the reference model: 8 units / 40 lessons / 214 reading blocks, 88 audio tracks, 16 unit videos, 28 grammar titles, vocabulary/writing/mediation banks, audioscripts and videoscripts.
- Unit videos attach at unit level and render in `UnitPage`; audio tracks remain bound to source lesson codes from `audio-files.json`.
- Grammar Bank titles now come from B2 `grammar-data.json` (the stale other-edition override map was removed).
- Added repeatable verification gates and reports:
  - `node scripts/verify-structure.mjs` → structural/source-safety gate
  - `npm run verify:content` → `CONTENT_VERIFICATION.md`
  - `npm run verify:images` → page-scan naming, count and resolution gate
  - `npm run render:pages` → reproducible high-DPI PDF → `public/book` renderer
- Fixed the reported image pixelation at its root cause:
  - Old scans were 803×1137 (≈96 DPI), heavily compressed, and named 0-based (`p000.jpg`–`p178.jpg`) while the app resolves 1-based `/book/pNNN.jpg` — every page was also off by one.
  - Regenerated all 179 scans from the authoritative PDF at 200 DPI / JPEG Q75 → 1653×2339, 1-based `p001.jpg`–`p179.jpg` (85.3 MB).
  - Verified sample pages render byte-identically to single-page renders (p001→PDF 1, p008→PDF 8, p179→PDF 179).
  - Capped lightbox magnification at native source resolution instead of a fixed 6×; replaced React's passive `onWheel` with a native non-passive listener so zoom works without console errors.

## Verification evidence (latest runs)
| Gate | Result |
|---|---|
| `node scripts/verify-structure.mjs` | PASS 364 |
| `npm run verify:content` | PASS 253 · exact=436, corroborated=30, unavailable=2 |
| `npm run verify:images` | PASS 5 |
| `npm run build` | ✓ built (non-blocking chunk-size warning) |
| Browser console | no application errors after lightbox wheel fix |
| Media audit | audio 88/88 present, video 16/16 present, book pages 179/179 |
| Desktop routes | homepage, 8 unit pages, 40 lesson routes, book, banks, review, page viewer all render |
| Audio playback | `/audio/1A_1_01.mp3` HTTP 206, MiniPlayer Pause/Stop |
| Video playback | readyState 4, valid duration/dimensions, `play()` succeeded |
| Mobile/responsive | 390px iframe: no horizontal overflow on home, lesson or page routes; page image loads at 1653×2339 |
| Lazy images | lesson page scans load at native 1653px when scrolled into view |

## Known, source-documented gaps (intentionally not fabricated)
- Two vocabulary items (`6a: impatient`, `6a: dishonest`, printed p.140) are transcribed from the scanned B2 page but cannot be matched to the extractable text layer or scripts. No B1 substitute is used.
- 30 vocabulary items are corroborated by token-level evidence in lesson text/audioscripts rather than an exact page match.
- The B2 book has no answer key, so no authored quiz questions or graded writing feedback are shown.
- Pages 107–109 and 144–147 are image-only in the PDF; their content is available only as page scans.

## Remaining work
- None for the requested build/fix scope. Upload and deployment remain deliberately untouched.

## Upload / deployment
- Not started. No commit, push, upload or deploy was performed.
