import PostCard from './PostCard'
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import matter from "gray-matter"
import { useEffect, useState } from "react"

const Highlights = () => {
      const ref = useRef(null)
      const isInView = useInView(ref, {
        once: true,
        margin: "-10% 0px -20% 0px"
      })
 const [posts, setPosts] = useState([])

  useEffect(() => {
    const loadPosts = async () => {
      const files = import.meta.glob("../posts/*.md", { as: "raw" }) 
      const selected = []

      for (const path in files) {
      const raw = await files[path]()
      const { data } = matter(raw)    
      if (data.featured) selected.push(data)
      }

      selected.sort((a, b) => a.order - b.order)
      setPosts(selected.slice(0, 4))
    }

    loadPosts()
  }, [])
  return (
    <>
    <h2 className="subsection">Latest Blog Entries</h2>
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: "easeOut"
      }}
        className="post-container"
    >
    {posts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
    </motion.div>
    </>
  )
}

export default Highlights