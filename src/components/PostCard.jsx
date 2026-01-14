import { Link } from "react-router-dom"
import { motion } from "motion/react"
function PostCard({ post}) {
  return (
    <motion.div className="tile" whileHover={{ scale: 1.05, backgroundColor:"#eaff00" }}>
    <article>
      <img src="/Hero.png" alt={post.title} className="ipostcard"/>
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      <Link to={`/post/${post.slug}`}>Read more →</Link>
    </article>
    </motion.div>
  )
}

export default PostCard