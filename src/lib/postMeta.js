import matter from 'gray-matter'

const WORDS_PER_MINUTE = 220

export const getRawMarkdown = (loaded) => {
  if (typeof loaded === 'string') return loaded
  if (typeof loaded?.default === 'string') return loaded.default
  if (typeof loaded?.default?.default === 'string') return loaded.default.default
  return ''
}

const stripMarkdownForReading = (markdown = '') =>
  markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/~~~[\s\S]*?~~~/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^\)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^\)]*\)/g, ' $1 ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^[#>-]\s+/gm, ' ')
    .replace(/[\*_~|]/g, ' ')

export const computeReadingTime = (markdownContent = '', wordsPerMinute = WORDS_PER_MINUTE) => {
  const cleaned = stripMarkdownForReading(markdownContent)
  const words = cleaned.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute))
  return `${minutes} min read`
}

export const normalizePostData = (data = {}, content = '') => {
  const readingTime = computeReadingTime(content)

  return {
    slug: data.slug || '',
    title: data.title || '',
    excerpt: data.excerpt || '',
    cover: data.cover || '',
    date: data.date || '',
    readingTime,
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    featured: Boolean(data.featured),
    order: Number.isFinite(Number(data.order)) ? Number(data.order) : Number.MAX_SAFE_INTEGER,
    category: data.category || '',
    frontmatter: { ...data, readingTime },
    content,
  }
}

export const parseRawPost = (raw = '') => {
  if (!raw) return null
  const { data, content } = matter(raw)
  return normalizePostData(data, content)
}

export const parseLoadedPost = (loaded) => {
  const raw = getRawMarkdown(loaded)
  return parseRawPost(raw)
}
