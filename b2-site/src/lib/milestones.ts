// Small celebration milestones surfaced as toasts when unlocked for the first
// time. Persisted locally so each milestone fires only once per browser.

import { BOOK } from '../content/book'
import type { ProgressState } from './progress'
import type { ToastOptions } from './toast'

interface Milestone extends ToastOptions {
  id: string
}

const MILESTONES_KEY = 'speakout-b2.milestones.v1'

const ALL: Milestone[] = [
  { id: 'first-lesson', title: 'First lesson completed', body: 'Great start — keep the momentum!', tone: 'success' },
  { id: 'five-lessons', title: '5 lessons done', body: 'You’re getting into the rhythm.', tone: 'celebration' },
  { id: 'first-unit', title: 'Unit complete', body: 'Every lesson in the unit is done.', tone: 'celebration' },
  { id: 'all-units', title: 'Whole book explored', body: 'You have completed every unit.', tone: 'celebration' },
]

function counts(state: ProgressState) {
  const lessonsDone = Object.values(state.lessons).filter((lesson) => lesson.completed).length
  let unitsDone = 0
  for (const unit of BOOK.units) {
    if (unit.lessons.length > 0 && unit.lessons.every((lesson) => state.lessons[lesson.id]?.completed)) {
      unitsDone += 1
    }
  }
  return { lessonsDone, unitsDone }
}

function readSeen(): Set<string> {
  try {
    const raw = localStorage.getItem(MILESTONES_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((item): item is string => typeof item === 'string'))
  } catch {
    return new Set()
  }
}

export function checkMilestones(state: ProgressState): ToastOptions[] {
  const seen = readSeen()
  const c = counts(state)
  const hit: Record<string, boolean> = {
    'first-lesson': c.lessonsDone >= 1,
    'five-lessons': c.lessonsDone >= 5,
    'first-unit': c.unitsDone >= 1,
    'all-units': BOOK.units.length > 0 && c.unitsDone >= BOOK.units.length,
  }
  const fresh = ALL.filter((milestone) => hit[milestone.id] && !seen.has(milestone.id))
  if (fresh.length === 0) return []
  for (const milestone of fresh) seen.add(milestone.id)
  try {
    localStorage.setItem(MILESTONES_KEY, JSON.stringify([...seen]))
  } catch {
    /* storage unavailable - ignore */
  }
  return fresh.map(({ title, body, tone }) => ({ title, body, tone }))
}
