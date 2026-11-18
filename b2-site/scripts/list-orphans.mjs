// Diagnostic: list src modules not reachable from the app entry point.
// tsc -b compiles every file under src, so orphaned modules still break the build.
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'

const root = process.cwd()
const src = join(root, 'src')

function allFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    return entry.isDirectory() ? allFiles(path) : [path]
  })
}

const files = allFiles(src).filter((path) => /\.(ts|tsx)$/.test(path))
const ext = ['', '.ts', '.tsx', '.json', '/index.ts', '/index.tsx']

function resolveImport(from, spec) {
  if (!spec.startsWith('.')) return null
  const base = resolve(dirname(from), spec)
  for (const suffix of ext) {
    const candidate = base + suffix
    if (existsSync(candidate)) return candidate
  }
  return null
}

function importsOf(file) {
  const text = readFileSync(file, 'utf8')
  const specs = [...text.matchAll(/(?:from\s+|import\s*\(\s*)['"](\.[^'"]+)['"]/g)].map((m) => m[1])
  return specs.map((spec) => resolveImport(file, spec)).filter(Boolean)
}

const reachable = new Set()
const queue = [join(src, 'main.tsx')]
while (queue.length) {
  const file = queue.shift()
  if (!file || reachable.has(file)) continue
  reachable.add(file)
  queue.push(...importsOf(file))
}

const orphans = files.filter((file) => !reachable.has(file)).map((file) => relative(root, file).replace(/\\/g, '/'))
console.log(`reachable ${reachable.size} / ${files.length}`)
console.log(orphans.join('\n'))
