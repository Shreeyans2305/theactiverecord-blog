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
    const posts = []

    for (const path in files) {
      try {
        const loaded = await files[path]()
        const raw = getRawMarkdown(loaded)
        if (!raw) continue

        const { data } = matter(raw)
        if (!data?.slug || !data?.title) continue

        posts.push({
          slug: data.slug,
          title: data.title,
          excerpt: data.excerpt || '',
          cover: data.cover || '',
          date: data.date || '',
          readingTime: data.readingTime || '',
          keywords: Array.isArray(data.keywords) ? data.keywords : []
        })
      } catch {
        continue
      }
    }

    return posts
  })()

  return postsIndexPromise
}
