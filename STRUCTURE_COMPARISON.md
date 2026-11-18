# Structure Comparison — Original Book 2 (master) vs current B2 implementation

Last updated: 2026-11-18 (implementation complete; sections 1–11 below are the historical comparison and plan that drove the work)

## Implementation status — current state

The comparison and plan below were executed. `b2-site` now uses the original reference application layer rather than the Book3-derived simplification. Current facts supersede any "current" descriptions in sections 1–11:

| Area | Current state |
|---|---|
| App shell | `ThemeProvider → ProgressProvider → ToastProvider → ConfettiHost → HashRouter → ScrollToTop → Layout`; no auth/Gate |
| Routes | `/`, `/book`, `/unit/:unitId`, `/unit/:unitId/lesson/:lessonId`, `/page/:pdf`, `/bank/:bankId`, `/review`, `*` 404 — all inside `Layout` except 404 |
| Components | Original reference set restored: `Header`, overlay `Sidebar`, `LineMap`, `CoverStack`, `BookProgress`, `HomePage`, `BookPage`, `UnitPage`, `LessonPage`, `BankPage`, `PageView`, `ReviewPage`, `MiniPlayer`, `Media`, `BackToTop`, `Reveal`, global lightbox |
| Exclusions | No account/admin, Shadowing, trainer, TTS, external grammar videos, invented quizzes/writing tasks or Arabic translation surfaces |
| Page scans | `public/book/p001.jpg`–`p179.jpg`, 1-based PDF page numbering, 200 DPI / 1653×2339 (was 803×1137 and 0-based). Regenerate with `npm run render:pages`; gate with `npm run verify:images`. |
| Lightbox | Zoom capped at native source resolution; native non-passive wheel listener (no passive-listener console errors) |
| Media | 88 audio + 16 video bundled and unmodified; unit videos in `UnitPage`, audio bound to source lesson codes |
| Gates | `verify-structure` PASS 364, `verify:content` PASS 253, `verify:images` PASS 5, `npm run build` passes |
| Upload | Repo `makahsg94/speakout-b2` (public) created with the desktop uploader workflow; >100 MB source archives handled with Git LFS; push in progress |
| Not done | Deployment not started |

## 0. Source of truth and scope decision

| Role | Location | Status |
|---|---|---|
| **Master design/structure reference** | `D:\ref-book-2` (clone of `https://github.com/makahsg94/the-book-2`) and live `https://the-book-2.pages.dev/` | Inspected directly, not inferred from Book3 |
| **Previous implementation (comparison only)** | `D:\book3` | Inspected; Book3-specific choices are not to be reproduced |
| **Active build target** | `D:\New Book-B2\b2-site` | Inspected; currently a Book3-derived simplification |
| **Educational content only** | `D:\New Book-B2` (B2 PDF, audio, video) | Already extracted into `b2-site/src/content` and `public` |

**User decision (2026-11-18):** the original site's Supabase-backed Arabic account gate is **not** to be reproduced. Visitors land directly on the B2 homepage. Everything else in the original reference is the target, except the two explicit exclusions below.

**Explicit exclusions (do not reintroduce):**
1. Shadowing route, page, banner, sidebar card, speech recognition / Whisper / YouTube shadowing clips.
2. Electronic trainer advertisement: trainer page, homepage banner, sidebar card, fixed sponsor bar, auto-opening offer modal, trainer copy/assets.

**Content constraints:**
- No fabricated Arabic translations, titles, definitions, exercises or readings.
- No US/UK labels on source audio (there is no word-level accent audio).
- Browser `SpeechSynthesis` is allowed only if explicitly labelled as generated speech.
- Only `D:\New Book-B2` educational content may appear.

---

## 1. Executive verdict

The current `b2-site` is a **content-first reader derived from Book3**, not a structural clone of the original Book 2 site. The B2 content extraction is largely done and should be preserved. The surrounding application shell, homepage, navigation, book organisation and page layouts must be replaced with the original reference implementation.

The cleanest, lowest-risk path is to **restore the original reference source as the application layer**, remove only the excluded features and the account gate, then reconnect the already-extracted B2 content data. This preserves the original's exact CSS, component hierarchy, animation classes, interactions and responsive behaviour, and avoids trying to reimplement pixel-level details by eye.

---

## 2. Configuration and infrastructure differences

| # | Original reference | Current `b2-site` | Required correction |
|---|---|---|---|
| C1 | `vite.config.ts`: `base: process.env.VITE_BASE || '/'`, dev port 5173 | `base: './'`, no port config | Adopt reference config; set `VITE_BASE` for Pages deploy as in reference |
| C2 | `package.json`: React 19.2.8, Router 7.18.3, Tailwind 4.3.3, Vite 8.2.2, TS 6.0.2; scripts `dev`, `prebuild` (`scripts/fit-media.mjs`), `build`, `fit-media`, `lint`, `validate`, `preview` | React 19.2.0, Router 7.9.4, Tailwind 4.1.14, Vite 7.1.9, TS 5.9.3; only `dev`, `build`, `preview` | Adopt reference versions/scripts where compatible; keep only dependencies still used after exclusions |
| C3 | Strict CSP/HSTS/permissions and asset cache rules in `public/_headers` | Absent | Restore `public/_headers` (adjust only if a removed feature requires a directive) |
| C4 | `index.html`: favicon `/favicon.svg`, viewport with `viewport-fit=cover`, title `Speakout B1 · Course Companion` | Google Fonts links, no favicon, title `Speakout B2 · The Book` | Restore favicon + viewport; set title to B2; keep only fonts actually used (reference declares fonts in CSS, no Google links) |
| C5 | CSS `src/index.css` is the single source of design tokens; SHA256 `BC8BF59…98A8C`, 1097 lines | Derived CSS, SHA256 `F52CA6A…0FA53`; contains leftover Arabic, sponsor, auth and line/train blocks, missing some reference blocks | Restore the reference CSS verbatim as the base; keep B2-specific additions only if they do not alter reference visuals |
| C6 | Provider stack: `ThemeProvider → AuthProvider → ProgressProvider → ToastProvider → ConfettiHost → HashRouter → ScrollToTop → Gate` | `HashRouter → App → ConfettiHost`; no providers | Restore theme/progress/toast/confetti/scroll providers; **omit auth and Gate** per user decision |
| C7 | `LightboxProvider` mounted globally in `Layout` | Page-local lightbox only in `PageViewer` | Restore global lightbox provider and route book images through it |
| C8 | `prebuild` fits media files | No media preprocessing | Restore `scripts/fit-media.mjs` only if needed for B2 media paths; otherwise document as intentionally omitted |

---

## 3. Routing differences

| Original reference route | Current `b2-site` | Required correction |
|---|---|---|
| `/` HomePage | Present but redesigned | Replace with reference title-page structure, B2 content |
| `/book` BookPage | Present but simplified | Replace with reference `book-page` printed contents layout |
| `/unit/:unitId` UnitPage | Present | Replace with reference unit hero/lesson list |
| `/unit/:unitId/lesson/:lessonId` LessonPage | Present | Replace with reference TOC/reading-progress/blocks layout |
| `/bank/:bankId` generic BankPage | Only `/bank/grammar`, `/bank/vocabulary` separate pages | Replace with generic bank route; B2 banks: grammar, vocabulary, writing, mediation |
| `/bank/grammar/:code` (current only) | Present | Not in reference; fold into generic bank page or retain as compatible extension only if it does not change layout |
| `/page/:pdf` PageView | Absent | Restore scanned-page route with `page-turn`, `page-corner`, lightbox, printed-page offset |
| `/review` ReviewPage | Present but quiz shell advertises unavailable quizzes | Restore reference review layout; remove invented/quiz copy that source cannot support |
| `/unit/:unitId/quiz` UnitQuizPage | Absent | Restore route/shell only if sourced questions exist. B2 source has **no answer key**, so do not fabricate questions; show source exercises from book pages instead |
| `/unit/:unitId/writing` WritingPage | Absent | Restore route/shell using B2 Writing Bank pp.104–107 source pages; no invented tasks/feedback |
| `/account`, `/admin`, `/shadowing`, `/trainer` | Absent | **Do not add** (account/admin per user decision; shadowing/trainer per explicit exclusion) |
| `/search` (current only) | Present | Not a reference route; reference uses header `SearchBox` + search lib. Keep as extension only if harmless, otherwise remove |
| `/media` (current only) | Present | Not a reference route. B2 audio/video must be presented through reference `AudioPlayer`/`VideoCard` placement on lesson/unit pages; a media index may remain only as a non-visual-priority extension |
| `*` NotFound outside Layout | Present inside Layout | Match reference: 404 outside `Layout` |

**Router type is already correct:** both use `HashRouter`. Keep it. Test URLs must use `/#/…`.

---

## 4. Homepage differences

### Reference homepage (exact order)
1. `section.title-page max-w-2xl pt-6`: Arabic level badge, `3rd Edition · Level {level}` eyebrow, huge `display` title, subtitle, description, two `page-turn` CTAs (`Start reading` / `Continue reading`, `Contents of this course`), progress card with XP/streak/level, `AnimatedBar`, "Share today's card" button.
2. Account CTA (omit — user decision).
3. Review banner (`/review`).
4. Trainer banner (excluded).
5. Shadowing banner (excluded).
6. Book 1 external link (`BOOK_1_URL`).
7. `<LineMap />` — 1200×380 SVG metro line, wavy path, station dots, animated train, end-of-line caption.
8. Achievements grid — `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`, `Reveal` wrappers, earned/locked states.
9. Printed contents block — `book-page`, `running-head`, chapter glyphs, `toc-row` / `toc-dots` / `toc-page`, unit/lesson links, reference banks list.

### Current homepage
- Two-column hero with `Speakout B2` badge, cover image, floating "Listen & watch" / "Your progress" callouts, stats strip (8 units / 40 lessons / 88 audio / 16 videos), progress card, "Eight units, one journey" card grid, three bank/media cards, gradient CTA "Read the page. Play the audio. Do the practice."
- No title-page styling, no LineMap, no achievements grid, no printed-contents TOC, no review banner, no Book 1 link.

### Required corrections
- Replace the entire homepage component with the reference component structure, using B2 `BOOK` data.
- Remove Arabic badge/labels and all trainer/shadowing/account sections.
- Replace invented strings ("Eight units, one journey", "Read the page…", stats counts as marketing copy) with reference copy and source-derived B2 descriptions.
- Keep `LineMap`, achievements and printed contents because they are core to the original visual identity (the "no gate" decision did not remove them).
- Keep share card only if it can be generated without inventing content; otherwise omit the button but retain the card layout.

---

## 5. Navigation / shell differences

### Reference
- `Header`: sticky, `grid-cols-[auto_1fr_auto]`; left = Contents button with `IconList`; centre = `Speakout` + `the line · A2 · 3rd edition`; right = `SearchBox` (lg), admin shield, account button, sound toggle, theme toggle.
- Contents is an **overlay drawer** (`fixed inset-0 z-40`, 320px left panel, `IconClose`), **not** a persistent sidebar.
- `Sidebar` inside drawer: progress, comprehensive review, shadowing/trainer/account cards, "This course" book map, all units and lessons with `toc-row`/`toc-dots`/`toc-page`, writing/quiz links, reference banks.
- Main: `page-enter mx-auto w-full max-w-4xl px-4 pb-28 pt-6 sm:px-6`, keyed by `pathname` for page transitions.
- Floating `MiniPlayer`, `BackToTop`, lightbox provider; footer centered with provenance text.
- No section nav array (`Book / Grammar / Vocabulary / Media`).

### Current
- Header has left menu button, home/brand link with `B2 · 3rd edition`, desktop nav array `Book / Grammar / Vocabulary / Media`, mobile search button, theme cycle, sound toggle, second search row.
- `Layout` has custom `ScrollMemory`, `ScrollProgress`, Sidebar, footer with nav links, inline MiniPlayer; contents drawer uses wrong `IconSearch` for the close button (`Sidebar.tsx:44-51`).
- No `BackToTop`, no global lightbox.

### Required corrections
- Restore exact reference Header/Sidebar/Layout markup and classes; change only: level label to B2, remove admin/account/shadowing/trainer/account items, keep search and theme/sound toggles.
- Restore overlay contents drawer with `IconClose`.
- Restore `BackToTop` and global `LightboxProvider`.
- Remove the Book/Grammar/Vocabulary/Media section nav from the header and the footer nav links; navigation should follow the reference (contents drawer + in-page links).
- Preserve B2-friendly site title/branding text where the reference says A2/B1.

---

## 6. Book organisation and data model differences

| Aspect | Reference | Current | Required correction |
|---|---|---|---|
| Book object | id `speakout-b1`, title `Speakout`, subtitle `Student's Book with eBook and Online Practice`, edition `3rd Edition`, level `B1`, authors, `coverPage: 3` | `BOOK = { title, level:'B2', edition, subtitle:"Student's Book", description, questions:0 }` | Adopt reference shape with B2 values and B2 description; add `coverPage` from B2 PDF |
| Units | `lead-in`, `unit-1`…`unit-8`, `final-review` with glyphs/taglines, `kind`, `overviewPdf` | 8 numeric units only; no lead-in/final review | Restore full unit list; map B2 lead-in and review material from source where present |
| Lessons | 5 per unit incl. `xr` review; `code`, `title`, `pages`, `pdfPages`, labels, blocks | 40 lessons A–D + R; structured `blocks` (214), audio, video, grammar, vocab | Keep B2 lesson data/formats, re-home into reference `Unit`/`Lesson` types |
| Banks | grammar 104–135, vocabulary 136–145, mediation 150–157 | grammar 104–131 (conflicts with BookPage 108–135), vocabulary 136–141, no writing/mediation | Use B2 source ranges: writing 104–107, grammar 108–135, vocabulary 136–143, mediation 148; expose all four banks |
| Page offset | printed → PDF: `pdf - 14` (`lib/helpers.ts`) | printed → PDF: `printed - 2` (`book.ts:966-970`) | Use B2 PDF's verified offset (`-2`) in reference `pagePath` helper |
| Media paths | `/audio/…`, `/videos/…`, `src/assets/book/p*.jpg` | `/audio/…`, `/video/…`, `public/book/p*.jpg` | Keep B2 `public` paths but align the folder name used by reference video components (`videos` vs `video`) via config/alias; do not duplicate media |
| Audio labels | `Speakout_3E_B1_SB_*` mapped in `lib/audioMap.ts` | B2 filenames mapped in `audio-files.json` | Generate reference-style `audioMap` from B2 JSON (88 tracks) |
| Video refs | `SO3 B1 U# BBC …` in `lib/videos.ts` | B2 `video-files.json` (16) | Generate reference-style `BUNDLED_VIDEOS` from B2 JSON; keep source filenames and types |
| Helpers | `flattenLessons`, `nav`, `unitLabel`, `unitGlyph`, `img`, `au`, `pagePath` | `getUnit`, `getLesson`, `flattenLessons`, `nextLesson`, `previousLesson`, `unitLabel`, `allAudio`, `allVideos` | Restore reference helper set, adapt signatures to B2 data |

---

## 7. Internal page layout differences

| Page | Reference layout | Current layout | Required correction |
|---|---|---|---|
| BookPage | Printed TOC with `book-cover` / `book-cover-sheen`, `CoverStack`, chapter rows, `toc-row` | Header + "Book map" list + three cards | Replace with reference BookPage; wire B2 units/banks |
| UnitPage | `chapter-num` hero, glyph, tagline, lesson list, quiz/writing links | Hero + opener image + lead-in + objectives + cards + all pages + videos + inactive quiz card | Replace with reference UnitPage; preserve B2 page images/videos via reference components |
| LessonPage | Sticky TOC (`toc-row`, `toc-dots`, `toc-page`), `reading-progress`, IntersectionObserver active section, arrow-key prev/next, `Blocks` renderer | Header/objectives/custom blocks/page images/audio/video/grammar/vocab/inactive quiz/progress | Replace with reference LessonPage + `Blocks`; map B2 block types into reference block renderer |
| Reading content | `prose-book`, `reading-panel`, `sentence`, `drop-cap`, `content-table` classes | Page images + OCR `PageText` | Restore reference reading presentation; keep B2 page images and OCR text as source content |
| BankPage | Generic tabs, printed-page offset, grid `grid-cols-2 sm:grid-cols-3 md:grid-cols-4` | Separate grammar/vocabulary pages with custom filters | Replace with generic `BankPage` and B2 grammar/vocab/writing/mediation data |
| PageView | Scanned page image, `page-turn`, `page-corner`, lightbox zoom | `PageViewer` with local portal lightbox | Restore reference `PageView` at `/page/:pdf`; keep B2 `p001…p179` images (200 DPI, native-resolution-capped lightbox) |
| Scripts | Not a separate reference route; scripts are part of content/notes | `/scripts` page with PDF cards + iframe | Move B2 script PDF links into reference-style reference-bank/footer placement; keep route only as non-primary extension |
| Media | Audio via `AudioPlayer` inside lessons + `MiniPlayer`; video via `VideoCard` inside lessons/units | Dedicated `/media` library with tabs | Restore reference placement; keep `/media` only as supplementary index if it does not displace reference layout |
| Review | Reference review shell with vocab tables, grammar summary, quiz | Quiz shell advertising 8 unavailable quizzes | Restore reference layout; remove false quiz claims; show only source-derived B2 review material |

---

## 8. Media player differences

| Aspect | Reference | Current | Required correction |
|---|---|---|---|
| Audio engine | Module singleton in `lib/audio.ts`; speeds `[0.5,0.75,1,1.25,1.5,2]`; ±10s, seek, auto-advance | Same pattern in `lib/audio.ts` | Reuse/adapt current engine into reference `Media.tsx` component structure |
| Audio UI | `AudioPlayer` rows + global `MiniPlayer` with `sponsor-aware-fab` class | `AudioPlayer.tsx` + inline `MiniPlayer` in Layout | Restore reference component placement and classes; remove sponsor class assumptions |
| Video UI | `VideoCard` with native `<video controls preload="metadata" playsInline>` and "No autoplay" caption | Click-to-load card that renders `<video autoPlay>` after click | Match reference: native controls, no autoplay, same caption/placement; keep click-to-load only if visually identical placeholder |
| Video source | `public/videos` | `public/video` | Align path; do not recompress or duplicate |
| Transcripts | Not a distinct reference player feature | `Show script` toggles on audio/video players | Preserve as an additive B2 feature only if it does not alter reference player visuals |
| Pronunciation | Reference `lib/speech.ts` + `EchoLab` (shadowing) | None | Shadowing excluded; if speech is added, must be labelled generated speech. Not required for fidelity |

---

## 9. Visual/interaction differences

| Aspect | Reference | Current | Required correction |
|---|---|---|---|
| Animations | `fade-up`, `rise`, `pop`, `reveal`, `page-sweep`, `page-enter`, `word-in`, `eq`, `station-pulse`, reduced-motion support | `Reveal` + `page-enter` subset | Restore reference CSS/classes and `Reveal` usage |
| Scroll | `ScrollToTop` on route change | Custom scroll memory restoring position on POP | Restore `ScrollToTop` for reference behaviour |
| Page transitions | `main key={pathname}` with `page-enter` | Present but different shell | Restore exact shell |
| Themes | light/dark/reading via `ThemeProvider` | `lib/theme.ts` cycle | Restore reference provider/classes |
| Sound effects | `playSound` with sound toggle | `lib/sounds.ts` with reference-only names `xp`, `achievement`, etc. | Keep reference toggle; drop names tied to excluded gamification if unused |
| Progress/XP/streak/achievements | Central in `ProgressProvider`, `levelProgress`, `achievementsFor`, `BookProgress`, `ConfettiHost` | Simplified `progress.ts` with no XP/streak/achievements | Restore reference progress model (local storage is fine since no auth), including XP/streak/achievements used by homepage |
| Global search | `SearchBox` + `lib/search.ts` in header | SearchBox + separate `/search` page | Restore reference header search; keep `/search` only as extension |

---

## 10. Explicit content/quality defects in the current site (fix during correction)

1. `README.md:1` still says `# book3`.
2. `Sidebar.tsx:44-51` close button uses `IconSearch` instead of `IconClose`.
3. `src/index.css` contains unused Arabic RTL, sponsor, auth and train/line blocks; restore reference CSS instead.
4. `src/components/Blocks.tsx` has latent `titleAr`/`textAr` fields; remove or replace with source-accurate Arabic-not-supplied note.
5. `ReviewPage.tsx:37` advertises "8 unit quizzes" and `:173` "Five questions…" while `quizzes.ts` is empty — remove false claims.
6. Bank page ranges conflict: `BookPage.tsx:118` 108–135 vs `GrammarBankPage.tsx:67` 104–131. Use B2 source ranges (grammar 108–135, vocabulary 136–143).
7. `CONTENT_INVENTORY.md` lists `018_SO3_B2_SB_2_Audio_2_06.mp3` as unassigned but `audio-files.json` assigns it to 2C/2_06 — reconcile inventory.
8. 29 audio tracks lack transcript keys; leave as source gaps, do not invent scripts.
9. Vlogs are shown on unit/media pages but not attached to lessons (`book.ts:986-987`) — preserve only if reference video placement supports it.
10. `--font-display` starts with `Ewert`, which is not loaded; reference declares it but loads no webfont either — keep reference declaration, do not add Google Fonts.

---

## 11. Implementation plan (order matches user priority)

1. Preserve `b2-site/public` and `b2-site/src/content` (the B2 data) in a backup location outside the source tree.
2. Restore original reference application layer into `b2-site`: `src/components`, `src/pages`, `src/lib`, `src/types`, `src/App.tsx`, `src/main.tsx`, `src/index.css`, `index.html`, `vite.config.ts`, `public/_headers`.
3. Remove excluded features and gate: AccountGate/BootSplash/Gate/authContext/Supabase, ShadowingPage/EchoLab, TrainerPage/SponsorBar/TrainerOfferModal/trainer content and assets, admin route, external YouTube grammar/shadowing clips.
4. Reconnect B2 content: generate reference-shaped `book.ts`, `audioMap.ts`, `videos.ts`, `pages`, banks, transcripts, vocabulary, grammar, blocks from the extracted JSON/TS.
5. Replace all B1/A2/Arabic reference UI strings with B2/source-derived English; keep only source-derived educational text.
6. Restore exact Header/Sidebar/Layout/LineMap/HomePage/BookPage/UnitPage/LessonPage/BankPage/PageView/MiniPlayer/VideoCard markup and CSS.
7. Resolve the defects in §10.
8. Build, then browser-test desktop and mobile: homepage, contents drawer, book, all unit/lesson pages, banks, scripts, page viewer, audio, video, search, review.
9. Update `PROJECT_PROGRESS.md` and `CONTENT_INVENTORY.md` continuously.
10. Upload with `D:\67\Desktop\GitHub Uploader\GitHub-One-Click.ps1` and deploy via `.github/workflows/deploy.yml`.

---

## 12. Verification checklist (must be evidenced before claiming completion)

- [x] Homepage matches reference section order and title-page styling (minus excluded sections).
- [x] Header/sidebar/drawer match reference markup and interactions.
- [x] All original reference routes present except excluded/gate routes.
- [x] All 8 B2 units, lessons, readings, vocab, grammar, audio, video mapped from source only (`CONTENT_VERIFICATION.md`: PASS 253).
- [x] No Shadowing or trainer strings, routes, assets or links anywhere in `src`/`public` (`verify-structure`: PASS 364).
- [x] No fabricated Arabic, translations, exercises, answer keys or audio labels.
- [x] Audio and video players work with source files; videos responsive; no recompression (browser-tested).
- [x] Desktop and mobile tested for all major pages (390px responsive check: no horizontal overflow).
- [x] Book page scans are 1-based and high resolution (`verify:images`: PASS 5; 1653×2339, p001–p179).
- [x] `npm run build` passes with no errors.
- [ ] Upload — repo created and push started; final result pending confirmation.
- [ ] Deployment — not started.
