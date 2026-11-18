const trimSlash = (url: string) => url.replace(/\/+$/, '')

export const BOOK_2_URL = trimSlash(
  import.meta.env.VITE_BOOK_2_URL || 'https://the-book-2.pages.dev',
)
