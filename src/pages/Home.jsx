import Highlights from "../components/Highlights.jsx"
import Hero from "../components/Hero.jsx"
import Categories from "../components/Categories.jsx"
import ComingSoon from "../components/ComingSoon.jsx"
function Home() {
  return (
    <div>
      <Hero />
      {/* {posts.map(post => (
        <PostCard key={post.id} post={post} w="300px" h="400px" pw="280px" ph="200px" />
      ))} */}
      <Highlights />
      <Categories />
      <ComingSoon />
    </div>
  )
}

export default Home
