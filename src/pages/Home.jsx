import Highlights from "../components/Highlights.jsx"
import Hero from "../components/Hero.jsx"
import Categories from "../components/Categories.jsx"
import ComingSoon from "../components/ComingSoon.jsx"
import { IoIosArrowRoundUp } from "react-icons/io";
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import About from "../components/About.jsx";
import AutoButton from "../components/AutoButton.jsx";
function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }
  }, [hash])
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
      <About />
      <AutoButton />
    </div>
  )
}

export default Home
