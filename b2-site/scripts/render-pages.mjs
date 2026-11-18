// Re-render the authoritative B2 PDF into public/book as 1-based page scans.
//
//   node scripts/render-pages.mjs [--out <dir>] [--dpi <n>] [--quality <n>]
//
// Defaults: DPI 200, JPEG quality 75, output public/book.
// Requires Ghostscript (set GS_EXE or place gswin64c.exe on PATH).
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = process.cwd()
const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`)
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback
}

const outDir = resolve(root, arg('out', 'public/book'))
const dpi = Number(arg('dpi', '200'))
const quality = Number(arg('quality', '75'))
const pdf = resolve(
  root,
  arg('pdf', "../689_1- Speakout 3rd B2 Student's Book_2022.pdf"),
)
const pages = Number(arg('pages', '179'))
const gs =
  process.env.GS_EXE ||
  (process.platform === 'win32' ? 'D:\\Downloads\\gs10.08.0\\bin\\gswin64c.exe' : 'gs')

if (!existsSync(pdf)) {
  console.error(`PDF not found: ${pdf}`)
  process.exit(1)
}

mkdirSync(outDir, { recursive: true })

// Remove only files matching the page-scan naming convention.
for (const name of readdirSync(outDir)) {
  if (/^p\d{3}\.jpg$/i.test(name)) rmSync(join(outDir, name))
}

const pattern = join(outDir, 'p%03d.jpg')
const result = spawnSync(
  gs,
  [
    '-q',
    '-dNOPAUSE',
    '-dBATCH',
    '-dSAFER',
    '-sDEVICE=jpeg',
    `-r${dpi}`,
    `-dJPEGQ=${quality}`,
    `-dFirstPage=1`,
    `-dLastPage=${pages}`,
    `-sOutputFile=${pattern}`,
    pdf,
  ],
  { stdio: 'inherit' },
)

if (result.status !== 0) {
  console.error(`Ghostscript exited with status ${result.status}`)
  process.exit(result.status || 1)
}

const names = readdirSync(outDir).filter((n) => /^p\d{3}\.jpg$/i.test(n)).sort()
let bytes = 0
let bad = 0
for (let p = 1; p <= pages; p++) {
  const file = join(outDir, `p${String(p).padStart(3, '0')}.jpg`)
  if (!existsSync(file)) {
    console.error(`missing rendered page: ${file}`)
    bad++
    continue
  }
  const buf = readFileSync(file)
  if (buf[0] !== 0xff || buf[1] !== 0xd8) {
    console.error(`invalid JPEG: ${file}`)
    bad++
    continue
  }
  bytes += statSync(file).size
}

console.log(
  `rendered ${names.length}/${pages} pages at ${dpi} DPI Q${quality} into ${outDir} (${(bytes / 1024 / 1024).toFixed(1)} MB)`,
)
if (bad || names.length !== pages) process.exit(1)
