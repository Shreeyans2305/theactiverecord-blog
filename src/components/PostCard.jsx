import { Link } from "react-router-dom"

function PostCard({ post }) {
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      <Link to={`/post/${post.slug}`}>Read more →</Link>
    </article>
  )
}

export default PostCard