import { Link } from "react-router-dom"
import { motion } from "motion/react"
function PostCard({ post }) {
  return (
    <motion.div className="tile" whileHover={{ scale: 1.05, backgroundColor:"#eaff00" }}>
    <article>
      <img src={post.cover} alt={post.title} className="ipostcard"/>
      {post.keywords.map((keyword) => (
        <p className="hash" key={keyword}>{keyword}</p>
      ))}
      <p style={{color: "#888", marginBottom: "4px"}}>{post.date} · {post.readingTime}</p>
      <h2 className="hpreview">{post.title}</h2>
      <p>{post.excerpt}</p>
      <Link to={`/post/${post.slug}`}>Read more →</Link>
    </article>
    </motion.div>
  )
}

export default PostCard