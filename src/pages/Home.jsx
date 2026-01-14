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
      <Hero />
      <Highlights />
      <Categories />
      <ComingSoon />
      <button className="auto-button" onClick={goToTop}><IoIosArrowRoundUp className="uparr"/></button>
    </div>
  )
}

export default Home
