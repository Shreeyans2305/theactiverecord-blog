import PostCard from './PostCard'
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { loadPostsIndex } from '../lib/postsIndex'

const Highlights = () => {
 const [posts, setPosts] = useState([])
 const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await loadPostsIndex()
        const selected = allPosts
          .filter((post) => post.featured)
          .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER))

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
    {posts.length > 0 ? posts.map((post, index) => (
        <PostCard
          key={post.slug}
          post={post}
          imageLoading={index < 2 ? "eager" : "lazy"}
          imageFetchPriority={index === 0 ? "high" : "auto"}
        />
      )) : <p>{isLoading ? "Loading latest entries…" : "No featured entries found."}</p>}
    </motion.div>
    </>
  )
}

export default Highlights