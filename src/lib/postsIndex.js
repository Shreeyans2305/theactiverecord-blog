import matter from 'gray-matter'

const getRawMarkdown = (loaded) => {
  if (typeof loaded === 'string') return loaded
  if (typeof loaded?.default === 'string') return loaded.default
  if (typeof loaded?.default?.default === 'string') return loaded.default.default
  return ''
}

let postsIndexPromise

export const loadPostsIndex = async () => {
  if (postsIndexPromise) return postsIndexPromise

  postsIndexPromise = (async () => {
    const files = import.meta.glob('../posts/*.md', { as: 'raw' })
    const entries = Object.entries(files)

    const parsed = await Promise.all(
      entries.map(async ([, loader]) => {
        try {
          const loaded = await loader()
          const raw = getRawMarkdown(loaded)
          if (!raw) return null

          const { data } = matter(raw)
          if (!data?.slug || !data?.title) return null

          return {
            slug: data.slug,
            title: data.title,
            excerpt: data.excerpt || '',
            cover: data.cover || '',
            date: data.date || '',
            readingTime: data.readingTime || '',
            keywords: Array.isArray(data.keywords) ? data.keywords : [],
            featured: Boolean(data.featured),
            order: Number.isFinite(Number(data.order)) ? Number(data.order) : Number.MAX_SAFE_INTEGER,
            category: data.category || ''
          }
        } catch {
          return null
        }
      })
    )

    return parsed.filter(Boolean)
  })()

  return postsIndexPromise
}
