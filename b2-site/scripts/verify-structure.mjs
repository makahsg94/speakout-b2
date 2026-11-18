import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const src = join(root, 'src')
const fail = []
const ok = []

function assert(condition, message) {
  if (condition) ok.push(message)
  else fail.push(message)
}

function read(rel) {
  const path = join(root, rel)
  return existsSync(path) ? readFileSync(path, 'utf8') : ''
}

function allFiles(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    return entry.isDirectory() ? allFiles(path) : [path]
  })
}

// Original Book 2 application layer that must be present.
const required = [
  'src/components/BackToTop.tsx',
  'src/components/BookProgress.tsx',
  'src/components/CoverStack.tsx',
  'src/components/Layout.tsx',
  'src/components/LineMap.tsx',
  'src/components/Media.tsx',
  'src/components/MiniPlayer.tsx',
  'src/components/PageFigure.tsx',
  'src/components/PrevNext.tsx',
  'src/pages/HomePage.tsx',
  'src/pages/BookPage.tsx',
  'src/pages/UnitPage.tsx',
  'src/pages/LessonPage.tsx',
  'src/pages/PageView.tsx',
  'src/pages/BankPage.tsx',
  'src/types/content.ts',
  'src/lib/appContext.tsx',
  'src/lib/toast.tsx',
  'src/lib/search.ts',
  'src/config/sites.ts',
  'src/content/audioMap.ts',
  'src/content/helpers.ts',
]
for (const rel of required) assert(existsSync(join(root, rel)), `required file missing: ${rel}`)

// Explicit exclusions.
const excluded = [
  'src/pages/ShadowingPage.tsx',
  'src/pages/TrainerPage.tsx',
  'src/pages/AccountPage.tsx',
  'src/pages/AdminPage.tsx',
  'src/components/EchoLab.tsx',
  'src/components/SponsorBar.tsx',
  'src/components/TrainerOfferModal.tsx',
  'src/content/shadowing.ts',
  'src/content/trainer.ts',
  'src/assets/trainer',
]
for (const rel of excluded) assert(!existsSync(join(root, rel)), `excluded path still present: ${rel}`)

const sourceFiles = allFiles(src)
for (const path of sourceFiles) {
  const text = readFileSync(path, 'utf8')
  for (const word of ['Shadowing', 'shadowing', 'TrainerOffer', 'sponsor']) {
    assert(!text.includes(word), `excluded term ${word} found in ${path.replace(root + '\\', '')}`)
  }
}

// B2 content integrity.
const audio = JSON.parse(read('src/content/audio-files.json') || '[]')
const video = JSON.parse(read('src/content/video-files.json') || '[]')
const transcripts = JSON.parse(read('src/content/transcripts.json') || '{}')
assert(audio.length === 88, `expected 88 audio files, got ${audio.length}`)
assert(video.length === 16, `expected 16 video files, got ${video.length}`)
assert(Object.keys(transcripts.audio ?? {}).length >= 60, 'audio transcript count below source extraction')
assert(Object.keys(transcripts.video ?? {}).length >= 16, 'video transcript count below source extraction')

const book = read('src/content/book.ts')
assert(book.includes("level: 'B2'") || book.includes('level: "B2"'), 'book level is not B2')
assert(/unit-01|unit01Blocks|unit1Blocks/.test(book), 'B2 unit blocks are not connected to book data')

const home = read('src/pages/HomePage.tsx')
assert(home.includes('LineMap'), 'homepage does not restore original LineMap section')
assert(home.includes('title-page'), 'homepage does not restore original title page styling')
assert(!home.includes('useAuth'), 'homepage still depends on account gate')
assert(!home.includes('trainer'), 'homepage still contains trainer marketing')

const app = read('src/App.tsx')
assert(!app.includes('AccountGate'), 'App still contains account gate')
assert(!app.includes('ShadowingPage'), 'App still routes to Shadowing')
assert(!app.includes('TrainerPage'), 'App still routes to Trainer')
assert(app.includes('HashRouter'), 'App must keep HashRouter routing')

const vite = read('vite.config.ts')
assert(vite.includes("process.env.VITE_BASE || '/'"), 'vite base must match original reference')

const index = read('index.html')
assert(index.includes('favicon.svg'), 'index.html must restore reference favicon')
assert(index.includes('viewport-fit=cover'), 'index.html must restore reference viewport')

// Source-safe application layer: remove Book3/B1 leftovers and invented surfaces.
const orphanedModules = [
  'src/components/AudioPlayer.tsx',
  'src/components/Exercise.tsx',
  'src/components/LessonCard.tsx',
  'src/components/PageHeader.tsx',
  'src/components/PageText.tsx',
  'src/components/PageViewer.tsx',
  'src/components/Quiz.tsx',
  'src/content/lesson-practice.ts',
  'src/lib/assets.ts',
  'src/pages/GrammarBankPage.tsx',
  'src/pages/MediaPage.tsx',
  'src/pages/NotFoundPage.tsx',
  'src/pages/ScriptsPage.tsx',
  'src/pages/SearchPage.tsx',
  'src/pages/VocabularyBankPage.tsx',
  'src/types.ts',
]
for (const rel of orphanedModules) {
  assert(!existsSync(join(root, rel)), `orphaned Book3 module still present: ${rel}`)
}

const activeUi = [
  'src/components/Blocks.tsx',
  'src/pages/ReviewPage.tsx',
  'src/pages/UnitPage.tsx',
  'src/pages/LessonPage.tsx',
  'src/components/Header.tsx',
  'src/components/Sidebar.tsx',
]
const removedImport = /from\s+['"][^'"]*(GrammarVideos|EchoLab|lib\/speech|content\/review|lib\/auth|lib\/sync)['"]/
for (const rel of activeUi) {
  const text = read(rel)
  assert(!removedImport.test(text), `${rel} still imports a removed B1 module`)
  assert(!/from\s+['"]\.\.\/types['"]/.test(text), `${rel} still imports the Book3 content model`)
  assert(!text.includes('dir="rtl"') && !text.includes('lang="ar"'), `${rel} still renders Arabic translation text`)
  assert(!/sayWord|useSpeech|speak\(/.test(text), `${rel} still renders browser speech`)
}

const contentTypes = read('src/types/content.ts')
assert(!/Speakout B1|B1 Student|A2 Student/.test(contentTypes), 'content model still describes B1/A2')
assert(!/\bar\??:\s*string/.test(contentTypes), 'content model still has Arabic fields')

for (const rel of ['src/lib/theme.ts', 'src/lib/sounds.ts', 'src/lib/shareCard.ts', 'src/lib/progress.ts', 'src/lib/milestones.ts']) {
  assert(!read(rel).includes('speakout-b1.'), `${rel} still uses a B1 storage key`)
}
for (const rel of ['src/pages/UnitPage.tsx', 'src/pages/LessonPage.tsx']) {
  const text = read(rel)
  assert(!/getUnitQuiz\(\s*[^)]/.test(text), `${rel} still calls getUnitQuiz with arguments`)
  assert(!/getWritingTask\(\s*[^)]/.test(text), `${rel} still calls getWritingTask with arguments`)
}

console.log(`PASS ${ok.length}`)
for (const line of fail) console.error(`FAIL ${line}`)
if (fail.length) process.exit(1)
