import Highlights from "../components/Highlights.jsx"
import Hero from "../components/Hero.jsx"
import Categories from "../components/Categories.jsx"
import ComingSoon from "../components/ComingSoon.jsx"
import { IoIosArrowRoundUp } from "react-icons/io";
function Home() {
  const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Smooth animation
  });
};
  return (
    <div className="home-page">
      <Hero id="navup"/>
      {/* {posts.map(post => (
        <PostCard key={post.id} post={post} w="300px" h="400px" pw="280px" ph="200px" />
      ))} */}
      <Highlights />
      <Categories />
      <ComingSoon />
      <button className="auto-button" onClick={goToTop}><IoIosArrowRoundUp className="uparr"/></button>
    </div>
  )
}

export default Home
