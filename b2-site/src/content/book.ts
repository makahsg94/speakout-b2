import type { AudioTrack, Book, ContentBlock, Lesson, Unit, VideoRef } from '../types/content'
import { unitSeeds } from './b2-source'
import { au, img } from './helpers'
import ocrHints from './ocrHints.json'
import audioFiles from './audio-files.json'
import videoFiles from './video-files.json'
import { grammarByCode, grammarRefs } from './grammar'
import { vocabByCode, vocabGroups } from './vocabulary'
import {
  unit1Blocks,
  unit2Blocks,
  unit3Blocks,
  unit4Blocks,
  unit5Blocks,
  unit6Blocks,
  unit7Blocks,
  unit8Blocks,
} from './units/index'

/** Unit titles as printed in the B2 contents pages. */
const UNIT_TITLES: Record<number, string> = {
  1: 'Identity',
  2: 'Different Worlds',
  3: 'Showtime',
  4: 'Lifestyle',
  5: 'Work',
  6: 'Psychology',
  7: 'Talent',
  8: 'Community',
}

const BLOCK_SETS: Record<number, Record<string, unknown[]>> = {
  1: unit1Blocks,
  2: unit2Blocks,
  3: unit3Blocks,
  4: unit4Blocks,
  5: unit5Blocks,
  6: unit6Blocks,
  7: unit7Blocks,
  8: unit8Blocks,
}

const VIDEO_TITLES: Record<string, string> = {
  streetint: 'BBC Street Interviews',
  vlogs: 'Unit vlog',
  programmes: 'BBC Programmes',
}

function trackLabel(track: string): string {
  if (track.startsWith('VB')) return `VB ${track.slice(2).replace('_', '.')}`
  if (track.startsWith('MB')) return `MB ${track.slice(2).replace('_', '.')}`
  if (track.startsWith('GB')) return `GB ${track.slice(2).replace('_', '.')}`
  if (track.startsWith('R')) return `R${track.slice(1).replace('_', '.')}`
  return track.replace('_', '.')
}

function audioFor(code: string, page: number): AudioTrack[] {
  const labels = (audioFiles as { code: string; track: string }[])
    .filter((item) => item.code === code)
    .map((item) => trackLabel(item.track))
  return au(labels, page)
}

function videosFor(unitNumber: number, page: number): VideoRef[] {
  return (videoFiles as { file: string; unit: number; kind: string }[])
    .filter((item) => item.unit === unitNumber)
    .map((item) => ({
      title: VIDEO_TITLES[item.kind] ?? 'Unit video',
      file: item.file,
      page,
    }))
}

function textBlocksFor(unitNumber: number, code: string): ContentBlock[] {
  const raw = BLOCK_SETS[unitNumber]?.[code] ?? []
  return raw
    .filter((block): block is { type: 'text'; title?: string; paragraphs: string[] } => {
      if (!block || typeof block !== 'object') return false
      const candidate = block as { type?: unknown; paragraphs?: unknown }
      return candidate.type === 'text' && Array.isArray(candidate.paragraphs)
    })
    .map((block) => ({
      type: 'text',
      title: block.title,
      paragraphs: block.paragraphs.map(String),
    }))
}

function bankPageFromIntro(intro?: string): number | undefined {
  const match = intro?.match(/page\s+(\d+)/i)
  return match ? Number(match[1]) : undefined
}

function lessonBlocks(seed: (typeof unitSeeds)[number]['lessons'][number], unitNumber: number): ContentBlock[] {
  const blocks: ContentBlock[] = textBlocksFor(unitNumber, seed.code)

  const vocab = vocabByCode[seed.code]
  if (vocab) {
    const bankPage = bankPageFromIntro(vocab.intro)
    blocks.push({
      type: 'vocab',
      title: `Vocabulary: ${vocab.title}`,
      source: bankPage ? `Vocabulary Bank, page ${bankPage}` : 'Vocabulary Bank',
      items: vocab.items,
    })
  }

  const grammar = grammarByCode[seed.code]
  if (grammar) {
    blocks.push({
      type: 'grammar',
      title: grammar.title,
      explanation: grammar.paragraphs.join('\n'),
      bankPage: grammar.pdf - 2,
    })
  }

  const tracks = audioFor(seed.code, seed.pages[0])
  if (tracks.length > 0) {
    blocks.push({ type: 'audio', title: 'Class audio', tracks })
  }

  const images = []
  for (let printed = seed.pages[0]; printed <= seed.pages[1]; printed += 1) {
    images.push(img(printed + 2, `Book page ${printed}`, `Scanned book page ${printed}`))
  }
  if (images.length > 0) blocks.push({ type: 'pages', images })

  return blocks
}

const UNITS: Unit[] = unitSeeds.map((seed) => {
  const overviewPdf = seed.pages[0] + 2
  return {
    id: `unit-${seed.number}`,
    number: seed.number,
    title: UNIT_TITLES[seed.number] ?? seed.title,
    phrase: seed.phrase,
    overviewPage: seed.pages[0],
    overviewPdf,
    pages: seed.pages,
    intro: seed.intro,
    objectives: seed.objectives,
    video: videosFor(seed.number, seed.pages[0]),
    lessons: seed.lessons.map<Lesson>((lesson) => ({
      id: lesson.code.toLowerCase(),
      code: lesson.code,
      title: lesson.title,
      pages: lesson.pages,
      labels: lesson.labels,
      objectives: lesson.objectives,
      blocks: lessonBlocks(lesson, seed.number),
    })),
  }
})

/** Pages resolved from the extracted book text and the back-of-book banks. */
const EXTRA_PAGES = [
  ...grammarRefs.map((ref) => ({
    pdf: ref.pdf,
    bookPage: ref.pdf - 2,
    label: `Grammar Bank ${ref.code} · ${ref.title}`,
    text: ref.paragraphs.join('\n'),
  })),
  ...vocabGroups.flatMap((group) => {
    const printed = bankPageFromIntro(group.intro)
    if (printed === undefined) return []
    return [{
      pdf: printed + 2,
      bookPage: printed,
      label: `Vocabulary Bank ${group.lessonCode} · ${group.title}`,
      text: group.items.map((item) => [item.word, item.meaning, item.example].filter(Boolean).join(' — ')).join('\n'),
    }]
  }),
]

const searchablePages = [...ocrHints, ...EXTRA_PAGES]
  .filter((page, index, all) => all.findIndex((other) => other.pdf === page.pdf) === index)
  .sort((a, b) => a.pdf - b.pdf)

export const BOOK: Book = {
  id: 'speakout-b2',
  title: 'Speakout',
  subtitle: 'Student’s Book · B2',
  edition: '3rd Edition',
  level: 'B2',
  authors: [],
  description:
    'Course companion for the Speakout 3rd Edition B2 Student’s Book — every unit, review and reference bank with the book’s audio and video material.',
  coverPage: 0,
  units: UNITS,
  banks: [
    {
      id: 'grammar',
      title: 'Grammar Bank',
      description: 'Grammar reference and practice from the back of the B2 Student’s Book.',
      pages: [108, 135],
    },
    {
      id: 'vocabulary',
      title: 'Vocabulary Bank',
      description: 'Words and phrases grouped by lesson from the back of the B2 Student’s Book.',
      pages: [136, 141],
    },
    {
      id: 'writing',
      title: 'Writing Bank',
      description: 'Writing models and language from the back of the B2 Student’s Book.',
      pages: [104, 104],
    },
  ],
  searchablePages,
}

export const units = UNITS

export function getUnit(id: string): Unit | undefined {
  return UNITS.find((unit) => unit.id === id)
}

export function getLesson(unitId: string, lessonId: string): Lesson | undefined {
  return getUnit(unitId)?.lessons.find((lesson) => lesson.id === lessonId)
}

export interface FlatEntry {
  unit: Unit
  lesson: Lesson
}

export function flattenLessons(): FlatEntry[] {
  return UNITS.flatMap((unit) => unit.lessons.map((lesson) => ({ unit, lesson })))
}

export interface NavTarget {
  unitId?: string
  lessonId?: string
}

export function nav(unitId: string, lessonId: string): { prev?: NavTarget; next?: NavTarget } {
  const flat = flattenLessons()
  const index = flat.findIndex((entry) => entry.unit.id === unitId && entry.lesson.id === lessonId)
  if (index === -1) return {}
  return {
    prev: index > 0 ? { unitId: flat[index - 1].unit.id, lessonId: flat[index - 1].lesson.id } : undefined,
    next: index < flat.length - 1 ? { unitId: flat[index + 1].unit.id, lessonId: flat[index + 1].lesson.id } : undefined,
  }
}

export function pageInfo(pdf: number) {
  return BOOK.searchablePages.find((page) => page.pdf === pdf)
}

export function unitLabel(unit: Pick<Unit, 'number' | 'kind'>): string {
  if (unit.kind === 'review') return 'Final Review'
  return `Unit ${unit.number}`
}

export function unitGlyph(unit: Pick<Unit, 'number' | 'kind'>): string {
  if (unit.kind === 'review') return '★'
  return String(unit.number)
}
