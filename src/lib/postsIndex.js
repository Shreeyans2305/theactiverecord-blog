import { parseLoadedPost } from './postMeta'

let postsIndexPromise

export const loadPostsIndex = async () => {
  if (postsIndexPromise) return postsIndexPromise

  postsIndexPromise = (async () => {
    const files = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default' })
    const entries = Object.entries(files)

    const parsed = await Promise.all(
      entries.map(async ([, loader]) => {
        try {
          const loaded = await loader()
          const post = parseLoadedPost(loaded)
          if (!post?.slug || !post?.title) return null

          const { frontmatter, content, ...meta } = post
          return meta
        } catch {
          return null
        }
      })
    )

    return parsed.filter(Boolean)
  })()

  return postsIndexPromise
}
