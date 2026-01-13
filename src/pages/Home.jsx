import { posts } from "../data"
import PostCard from "../components/PostCard"
import Hero from "../components/Hero.jsx"
function Home() {
  return (
    <div>
      <Hero />
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Home
