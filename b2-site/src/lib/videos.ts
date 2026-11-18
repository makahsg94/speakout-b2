import videoFiles from '../content/video-files.json'

// Every video in this registry is bundled in public/video/ from the B2 media pack.
export const BUNDLED_VIDEOS: ReadonlySet<string> = new Set(videoFiles.map((item) => item.file))

export function videoSrc(file: string): string {
  const clean = file.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${clean}`
}
