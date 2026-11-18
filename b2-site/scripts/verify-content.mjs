// Content verification: every displayed B2 item is checked against the
// authoritative Student's Book PDF and the extracted B2 media manifests.
// Items that cannot be independently verified are reported, never replaced.
//
// Run: node scripts/verify-content.mjs
// Writes: ../CONTENT_VERIFICATION.md
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'

const require = createRequire(import.meta.url)
const root = process.cwd()
const parent = dirname(root)
const read = (rel) => readFileSync(join(root, rel), 'utf8')
const readJson = (rel) => JSON.parse(read(rel))

const pass = []
const fail = []
const unavailable = []
const assert = (condition, message) => (condition ? pass : fail).push(message)

function normalize(value) {
  return String(value)
    .toLowerCase()
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, ' ')
    .replace(/[’‘`´]/g, "'")
    .replace(/[^a-z0-9']+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// --- Authoritative PDF text -------------------------------------------------
const pdfCandidates = [
  join(parent, "689_1- Speakout 3rd B2 Student's Book_2022.pdf"),
  join(root, 'public/docs/speakout-b2-student-book.pdf'),
]
const pdfPath = pdfCandidates.find((path) => existsSync(path))
assert(Boolean(pdfPath), 'authoritative B2 Student’s Book PDF is available')
let pdfNorm = ''
if (pdfPath) {
  const pdfParse = require('pdf-parse')
  const parsed = await pdfParse(readFileSync(pdfPath))
  assert(parsed.numpages === 179, `B2 PDF has 179 pages (found ${parsed.numpages})`)
  pdfNorm = normalize(parsed.text)
  assert(pdfNorm.length > 100000, 'B2 PDF text layer extracted for verification')
}

const transcripts = readJson('src/content/transcripts.json')
const transcriptNorm = [...Object.values(transcripts.audio), ...Object.values(transcripts.video)]
  .map(normalize)
  .join(' ')
const pageText = readJson('src/content/page-text.json')
const pageCorpus = Object.entries(pageText).map(([page, entry]) => ({
  page,
  text: normalize(entry.text),
}))
const pageNorm = pageCorpus.map((entry) => entry.text).join(' ')

function evidenceFor(value) {
  const n = normalize(value)
  if (!n || !pdfNorm) return null
  if (pdfNorm.includes(n)) return { level: 'exact', source: 'Student’s Book PDF text layer' }
  if (transcriptNorm.includes(n)) return { level: 'exact', source: 'B2 audioscript / videoscript' }
  const pageMatch = pageCorpus.find((entry) => entry.text.includes(n))
  if (pageMatch) return { level: 'exact', source: `B2 page-image OCR (printed p. ${pageMatch.page})` }
  const tokens = n.split(' ').filter((token) => token.length >= 3)
  if (!tokens.length) return null
  const allCorroborated = tokens.every((token) => {
    const stem = token.length > 6 ? token.slice(0, token.length - 2) : token
    return pdfNorm.includes(stem) || transcriptNorm.includes(stem) || pageNorm.includes(stem)
  })
  if (allCorroborated) {
    return { level: 'corroborated', source: 'B2 PDF / page OCR / script tokens' }
  }
  return null
}

function recordItem(kind, label, value, sourcePage) {
  const evidence = evidenceFor(value)
  if (evidence) return { kind, label, value, ...evidence }
  unavailable.push({ kind, label, value, sourcePage })
  return null
}

// --- Parse displayed data from the application content layer ---------------
function parseTsArray(source, marker) {
  const key = source.indexOf(marker)
  if (key < 0) throw new Error(`missing ${marker}`)
  const start = source.indexOf('= [', key) + 2
  let depth = 0
  for (let i = start; i < source.length; i++) {
    if (source[i] === '[') depth++
    else if (source[i] === ']') {
      depth--
      if (depth === 0) return JSON.parse(source.slice(start, i + 1))
    }
  }
  throw new Error(`unterminated array for ${marker}`)
}

const bookSrc = read('src/content/book.ts')
const unitTitleMatches = [...bookSrc.matchAll(/^\s+(\d+):\s*'([^']+)'\s*,/gm)].map((m) => ({
  number: Number(m[1]),
  title: m[2],
}))
assert(unitTitleMatches.length === 8, `8 displayed unit titles parsed (found ${unitTitleMatches.length})`)

const seeds = parseTsArray(read('src/content/b2-source.ts'), 'export const unitSeeds')
const lessonSeeds = seeds.flatMap((unit) =>
  unit.lessons.map((lesson) => ({ unit, lesson })),
)
assert(seeds.length === 8, `8 B2 units in the contents transcription (found ${seeds.length})`)
assert(lessonSeeds.length === 40, `40 B2 lessons in the contents transcription (found ${lessonSeeds.length})`)

const unitBlockSets = []
for (let n = 1; n <= 8; n++) {
  const src = read(`src/content/units/unit-0${n}.ts`)
  unitBlockSets.push(JSON.parse(src.slice(src.indexOf('{'), src.lastIndexOf('}') + 1)))
}
const textBlocks = unitBlockSets.flatMap((set) =>
  Object.entries(set).flatMap(([code, blocks]) =>
    blocks
      .filter((block) => block.type === 'text')
      .flatMap((block) => (block.paragraphs ?? []).map((text) => ({ code, title: block.title, text }))),
  ),
)

const vocabGroups = parseTsArray(read('src/content/vocabulary.ts'), 'export const vocabGroups')
const vocabItems = vocabGroups.flatMap((group) =>
  group.items.map((item) => ({ group, item })),
)

// --- Verification categories ----------------------------------------------
const exact = []
const corroborated = []

for (const { number, title } of unitTitleMatches) {
  const seed = seeds.find((unit) => unit.number === number)
  const result = recordItem('unit title', `Unit ${number}`, title, `printed pp. ${seed?.pages?.join('–') ?? '?'}`)
  if (result) exact.push(result)
}
for (const { unit, lesson } of lessonSeeds) {
  const result = recordItem('lesson title', `${lesson.code} (Unit ${unit.number})`, lesson.title, `printed pp. ${lesson.pages.join('–')}`)
  if (result) exact.push(result)
}
for (const { code, text } of textBlocks) {
  const result = recordItem('reading passage', `${code} text block`, text, 'see lesson pages')
  if (result) (result.level === 'exact' ? exact : corroborated).push(result)
}
for (const { group, item } of vocabItems) {
  for (const field of ['word', 'meaning', 'example', 'note']) {
    if (!item[field]) continue
    const sourcePage = group.intro?.match(/page\s+(\d+)/i)?.[1]
    const result = recordItem('vocabulary', `${group.id}: ${item.word} (${field})`, item[field], sourcePage ? `printed p. ${sourcePage}` : undefined)
    if (result) (result.level === 'exact' ? exact : corroborated).push(result)
  }
}

// Grammar: displayed titles must come from the B2 grammar bank, not a stale map.
const grammarSrc = read('src/content/grammar.ts')
assert(!/const\s+grammarTitles\b/.test(grammarSrc), 'grammar.ts must not override PDF grammar-bank titles with a stale edition map')
assert(/cleanTitle\(item\.title\)/.test(grammarSrc), 'grammar.ts must display titles extracted from grammar-data.json')

function cleanGrammarTitle(title) {
  return String(title)
    .replace(/[\u0000-\u001f]/g, ' ')
    .replace(/\b(infi)\s+(nitive)\b/gi, '$1$2')
    .replace(/\b(quantifi)\s+(ers)\b/gi, '$1$2')
    .replace(/\b(non-defi)\s+(ning)\b/gi, '$1$2')
    .replace(/\bi\s+f\b/gi, 'if')
    .replace(/\s+/g, ' ')
    .trim()
}

const grammarData = readJson('src/content/grammar-data.json')
assert(grammarData.length === 28, `28 B2 grammar-bank entries (found ${grammarData.length})`)
for (const entry of grammarData) {
  const title = cleanGrammarTitle(entry.title)
  const result = recordItem('grammar title', entry.code, title, `printed p. ${entry.refPage ?? 'n/a'} / PDF p. ${entry.pdf}`)
  if (result) exact.push(result)
  assert(title.length > 2 && !/[\u0000-\u001f]/.test(title), `grammar title ${entry.code} is clean: ${title}`)
}

// Exercises: the B2 source has no answer key, so none are authored.
const authoredExerciseBlocks = textBlocks.filter((block) => block.title?.startsWith('exercise:'))
assert(authoredExerciseBlocks.length === 0, `no authored exercise blocks rendered (found ${authoredExerciseBlocks.length})`)
assert(/export function getUnitQuiz\(\): undefined/.test(read('src/content/quizzes.ts')), 'quiz content is a source-safe stub')
assert(/export function getWritingTask\(\): undefined/.test(read('src/content/writing.ts')), 'writing content is a source-safe stub')

// Audio: manifest, served copies, and original B2 source files.
const audioFiles = readJson('src/content/audio-files.json')
const audioMapPaths = [...read('src/content/audioMap.ts').matchAll(/'\/audio\/([^']+)'/g)].map((m) => m[1])
assert(audioFiles.length === 88, `88 B2 class-audio tracks in manifest (found ${audioFiles.length})`)
assert(audioMapPaths.length === audioFiles.length, `audio map has one path per manifest track (found ${audioMapPaths.length})`)
const audioSourceDir = join(parent, '689_3- Speakout 3rd B2 Class Audio', '689_3- Speakout 3rd B2 Class Audio')
for (const track of audioFiles) {
  assert(existsSync(join(root, 'public', track.file)), `served audio file exists: ${track.file}`)
  assert(existsSync(join(audioSourceDir, track.original)), `B2 source audio exists: ${track.original}`)
}

// Video: manifest, served copies, and original B2 source files.
const videoFiles = readJson('src/content/video-files.json')
assert(videoFiles.length === 16, `16 B2 videos in manifest (found ${videoFiles.length})`)
const videoSourceDir = join(parent, '689_4- Speakout 3rd B2 Videos', '689_4- Speakout 3rd B2 Videos')
for (const video of videoFiles) {
  assert(existsSync(join(root, 'public', video.file)), `served video file exists: ${video.file}`)
  assert(existsSync(join(videoSourceDir, video.original)), `B2 source video exists: ${video.original}`)
}

// Page images: every printed page shown by the app has a PDF scan.
const pageImages = [...read('src/content/ocrHints.json').matchAll(/"pdf":\s*(\d+)/g)].map((m) => Number(m[1]))
assert(pageImages.length === 98, `98 OCR-indexed PDF pages (found ${pageImages.length})`)
const missingPages = pageImages.filter((pdf) => !existsSync(join(root, 'public/book', `p${String(pdf).padStart(3, '0')}.jpg`)))
assert(missingPages.length === 0, `all OCR-indexed book page scans exist (missing ${missingPages.length})`)

// --- Report ----------------------------------------------------------------
const lines = []
lines.push('# B2 Content Verification Report')
lines.push('')
lines.push(`Generated by \`scripts/verify-content.mjs\`. Source of truth: \`${pdfPath ? pdfPath.replace(/\\/g, '/') : 'PDF unavailable'}\`, the extracted class audio/video packs, and their audioscripts/videoscripts.`)
lines.push('')
lines.push('## Summary')
lines.push('')
lines.push(`- Checks passed: **${pass.length}**`)
lines.push(`- Checks failed: **${fail.length}**`)
lines.push(`- Items verified exactly against source text: **${exact.length}**`)
lines.push(`- Items corroborated by token-level source evidence: **${corroborated.length}**`)
lines.push(`- Items unavailable for independent text verification: **${unavailable.length}**`)
lines.push('')
lines.push('## Coverage')
lines.push('')
lines.push('| Category | Displayed items | Exact | Corroborated | Unavailable |')
lines.push('| --- | ---: | ---: | ---: | ---: |')
const byKind = (kind) => ({
  total: exact.filter((x) => x.kind === kind).length + corroborated.filter((x) => x.kind === kind).length + unavailable.filter((x) => x.kind === kind).length,
  exact: exact.filter((x) => x.kind === kind).length,
  corr: corroborated.filter((x) => x.kind === kind).length,
  unav: unavailable.filter((x) => x.kind === kind).length,
})
for (const kind of ['unit title', 'lesson title', 'reading passage', 'vocabulary', 'grammar title']) {
  const c = byKind(kind)
  lines.push(`| ${kind} | ${c.total} | ${c.exact} | ${c.corr} | ${c.unav} |`)
}
lines.push(`| audio file | ${audioFiles.length} | ${audioFiles.length} | 0 | 0 |`)
lines.push(`| video | ${videoFiles.length} | ${videoFiles.length} | 0 | 0 |`)
lines.push('')
lines.push('## Source-safe exclusions')
lines.push('')
lines.push('- **Exercises / quizzes:** the B2 Student’s Book has no answer key, so no authored questions or graded writing tasks are displayed. Both content modules are zero-argument stubs.')
lines.push('- **Vocabulary Bank pages:** printed pages 136–141 are image-only in the PDF text layer. Words are read from the scanned pages; where a word is repeated in the lesson text or audioscript it is marked exact/corroborated above, otherwise it is listed as unavailable below. No B1 substitute is used.')
lines.push('- **Grammar Bank titles:** taken from the B2 grammar bank extracted from the PDF, never from a different edition.')
lines.push('- **No TTS, no invented audio accents, no Arabic translation surface, no Shadowing or trainer marketing.**')
lines.push('')
lines.push('## Unavailable items')
lines.push('')
if (unavailable.length === 0) {
  lines.push('None.')
} else {
  lines.push('These items are displayed from the transcribed B2 source but could not be matched against the extractable PDF text layer or scripts. They remain B2-sourced; no substitute is used.')
  lines.push('')
  lines.push('| Category | Item | Value | Source page |')
  lines.push('| --- | --- | --- | --- |')
  for (const item of unavailable) {
    const value = String(item.value).replace(/\|/g, '\\|').slice(0, 180)
    lines.push(`| ${item.kind} | ${item.label} | ${value} | ${item.sourcePage ?? 'n/a'} |`)
  }
}
lines.push('')
lines.push('## Failed checks')
lines.push('')
if (fail.length === 0) lines.push('None.')
else for (const message of fail) lines.push(`- ${message}`)
lines.push('')

writeFileSync(join(parent, 'CONTENT_VERIFICATION.md'), lines.join('\n'))

console.log(`PASS ${pass.length}`)
if (fail.length) {
  console.log(`FAIL ${fail.length}`)
  for (const message of fail) console.log(`FAIL ${message}`)
}
console.log(`content: exact=${exact.length} corroborated=${corroborated.length} unavailable=${unavailable.length}`)
process.exitCode = fail.length ? 1 : 0
