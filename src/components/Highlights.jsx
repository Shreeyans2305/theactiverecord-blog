import PostCard from './PostCard'
import { motion } from "motion/react"
import matter from "gray-matter"
import { useEffect, useState } from "react"

const getRawMarkdown = (loaded) => {
  if (typeof loaded === "string") return loaded
  if (typeof loaded?.default === "string") return loaded.default
  if (typeof loaded?.default?.default === "string") return loaded.default.default
  return ""
}

const Highlights = () => {
 const [posts, setPosts] = useState([])
 const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const files = import.meta.glob("../posts/*.md", { as: "raw" })
        const selected = []

        for (const path in files) {
          try {
            const loaded = await files[path]()
            const raw = getRawMarkdown(loaded)
            if (!raw) continue
            const { data } = matter(raw)
            if (data.featured) selected.push(data)
          } catch {
            continue
          }
        }

        selected.sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER))
        setPosts(selected.slice(0, 4))
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [])
  return (
    <>
    <h2 className="subsection">Latest Blog Entries</h2>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut"
      }}
        className="post-container"
    >
    {posts.length > 0 ? posts.map(post => (
        <PostCard key={post.slug} post={post} />
      )) : <p>{isLoading ? "Loading latest entries…" : "No featured entries found."}</p>}
    </motion.div>
    </>
  )
}

export default Highlights