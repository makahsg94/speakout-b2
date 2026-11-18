import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const content = join(root, 'src', 'content')

const audio = JSON.parse(readFileSync(join(content, 'audio-files.json'), 'utf8'))
const pageText = JSON.parse(readFileSync(join(content, 'page-text.json'), 'utf8'))

function label(track) {
  if (track.startsWith('VB')) return `VB ${track.slice(2).replace('_', '.')}`
  if (track.startsWith('MB')) return `MB ${track.slice(2).replace('_', '.')}`
  if (track.startsWith('GB')) return `GB ${track.slice(2).replace('_', '.')}`
  if (track.startsWith('R')) return `R${track.slice(1).replace('_', '.')}`
  return track.replace('_', '.')
}

// Printed track label -> bundled B2 recording.
const lines = [
  '// Generated from the B2 class-audio pack. Labels are the printed track numbers.',
  'export const AUDIO: Record<string, string> = {',
]
for (const item of audio) {
  lines.push(`  '${label(item.track)}': '${item.file}',`)
}
lines.push('}', '')
writeFileSync(join(content, 'audioMap.ts'), lines.join('\n'))

// Printed page -> PDF scan page. Printed page = PDF page - 2.
const hints = Object.entries(pageText)
  .map(([printed, entry]) => {
    const bookPage = Number(printed)
    const text = String(entry.text ?? '')
    return {
      pdf: bookPage + 2,
      bookPage,
      label: text.replace(/\s+/g, ' ').slice(0, 72).trim(),
      text,
    }
  })
  .sort((a, b) => a.pdf - b.pdf)
writeFileSync(join(content, 'ocrHints.json'), `${JSON.stringify(hints, null, 2)}\n`)

console.log(`generated audioMap.ts (${audio.length} tracks) and ocrHints.json (${hints.length} pages)`)
