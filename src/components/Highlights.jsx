// import { posts } from '../data'
import PostCard from './PostCard'
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import matter from "gray-matter"
import { useEffect, useState } from "react"

const Highlights = () => {
      const ref = useRef(null)
      const isInView = useInView(ref, {
        once: true,
        margin: "-40% 0px -60% 0px"
      })
 const [posts, setPosts] = useState([])

  useEffect(() => {
    const loadPosts = async () => {
      const files = import.meta.glob("../posts/*.md", { as: "raw" }) // <-- note `as: "raw"`
      const selected = []

      for (const path in files) {
      const raw = await files[path]()  // raw is now a string
      const { data } = matter(raw)    // ✅ works now
      if (data.home) selected.push(data)
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
    {/* <PostCard key={1} post={frontmatter} className="card"/> */}
    {/* <PostCard key={2} post={posts[1]} className="card"/>
    <PostCard key={3} post={posts[2]} className="card"/>
    <PostCard key={4} post={posts[3]} className="card"/> */}
    {posts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
    </motion.div>
    </>
  )
}

export default Highlights