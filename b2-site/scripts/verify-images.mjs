// Verify rendered book page scans: correct 1-based naming, count and resolution.
// Run: node scripts/verify-images.mjs
import { existsSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = process.cwd()
const dir = process.env.BOOK_DIR ? resolve(root, process.env.BOOK_DIR) : join(root, 'public/book')
const pass = []
const fail = []
const assert = (condition, message) => (condition ? pass : fail).push(message)

function jpegSize(file) {
  const buf = readFileSync(file)
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null
  let i = 2
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) { i++; continue }
    const marker = buf[i + 1]
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue }
    const len = buf.readUInt16BE(i + 2)
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) }
    }
    i += 2 + len
  }
  return null
}

assert(!existsSync(join(dir, 'p000.jpg')), 'page scans use 1-based PDF page numbering (no p000.jpg)')

const missing = []
const small = []
const unreadable = []
let totalBytes = 0
for (let pdf = 1; pdf <= 179; pdf++) {
  const name = `p${String(pdf).padStart(3, '0')}.jpg`
  const file = join(dir, name)
  if (!existsSync(file)) { missing.push(name); continue }
  totalBytes += statSync(file).size
  const size = jpegSize(file)
  if (!size) { unreadable.push(name); continue }
  if (size.width < 1600 || size.height < 2200) small.push(`${name} ${size.width}x${size.height}`)
}
assert(missing.length === 0, `all 179 PDF page scans exist (missing ${missing.length})`)
assert(unreadable.length === 0, `all page scans are valid JPEGs (unreadable ${unreadable.length})`)
assert(small.length === 0, `page scans are at least 200 DPI / 1600px wide (small ${small.length})`)
assert(totalBytes > 30 * 1024 * 1024, `high-resolution page scans are present (${(totalBytes / 1024 / 1024).toFixed(1)} MB)`)

console.log(`PASS ${pass.length}`)
if (fail.length) {
  console.log(`FAIL ${fail.length}`)
  for (const message of fail) console.log(`FAIL ${message}`)
}
if (small.length) console.log(`sample small: ${small.slice(0, 4).join(', ')}`)
if (missing.length) console.log(`sample missing: ${missing.slice(0, 4).join(', ')}`)
process.exitCode = fail.length ? 1 : 0
