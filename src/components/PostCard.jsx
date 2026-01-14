import { Link } from "react-router-dom"
import { motion } from "motion/react"
function PostCard({ post,pw,ph}) {
  return (
    <motion.div className="tile">
    <article>
      <img src="/Hero.png" alt={post.title} style={{width:pw,height:ph}}/>
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      <Link to={`/post/${post.slug}`}>Read more →</Link>
    </article>
    </motion.div>
  )
}

export default PostCard