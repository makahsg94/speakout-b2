// Scanned pages are served from public/book/pNNN.jpg.
// Printed book page = PDF page - 2 for this edition.
const base = import.meta.env.BASE_URL

export function pageImageUrl(pdf: number): string {
  return `${base}book/p${String(pdf).padStart(3, '0')}.jpg`
}

export const pageImageCount = 179
