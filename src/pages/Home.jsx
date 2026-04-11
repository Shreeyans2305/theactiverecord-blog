import Hero from "../components/Hero.jsx"
import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import AutoButton from "../components/AutoButton.jsx";

const Highlights = lazy(() => import("../components/Highlights.jsx"))
const Categories = lazy(() => import("../components/Categories.jsx"))
const ComingSoon = lazy(() => import("../components/ComingSoon.jsx"))
const About = lazy(() => import("../components/About.jsx"))

const DeferredSection = ({ minHeight = 400, children }) => {
  const holderRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = holderRef.current
    if (!node || isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "300px 0px" }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [isVisible])

  return (
    <section ref={holderRef} style={{ minHeight }}>
      {isVisible ? children : <div style={{ minHeight }} aria-hidden="true" />}
    </section>
  )
}

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

  return (
    <div className="home-page">
      <Hero />
      <Suspense fallback={<div style={{ minHeight: 380 }} />}>
        <Highlights />
      </Suspense>
      <DeferredSection minHeight={650}>
        <Suspense fallback={<div style={{ minHeight: 650 }} />}>
          <Categories />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight={650}>
        <Suspense fallback={<div style={{ minHeight: 650 }} />}>
          <ComingSoon />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight={520}>
        <Suspense fallback={<div style={{ minHeight: 520 }} />}>
          <About />
        </Suspense>
      </DeferredSection>
      <AutoButton />
    </div>
  )
}

export default Home
