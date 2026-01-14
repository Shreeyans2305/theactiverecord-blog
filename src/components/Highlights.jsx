import React from 'react'
import { posts } from '../data'
import PostCard from './PostCard'
import { motion, useInView } from "motion/react"
import { useRef } from "react"
const Highlights = () => {
      const ref = useRef(null)
    
      const isInView = useInView(ref, {
        once: true,
        margin: "-40% 0px -60% 0px"
      })
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
    <PostCard key={1} post={posts[0]} pw="280px" ph="200px"/>
    <PostCard key={2} post={posts[1]} pw="280px" ph="200px"/>
    <PostCard key={3} post={posts[2]} pw="280px" ph="200px"/>
    </motion.div>
    </>
  )
}

export default Highlights