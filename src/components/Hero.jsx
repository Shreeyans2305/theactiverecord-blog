import { motion } from 'motion/react'

const Hero = () => {

  return (
    <>
      <div className="marquee-container">
      <div className="marquee-track">
        <p>GET THE LATEST INSIGHTS RIGHT HERE!!</p>
        <p aria-hidden="true">GET THE LATEST INSIGHTS RIGHT HERE!!</p>
        <p aria-hidden="true">GET THE LATEST INSIGHTS RIGHT HERE!!</p>
        <p aria-hidden="true">GET THE LATEST INSIGHTS RIGHT HERE!!</p>
        <p aria-hidden="true">GET THE LATEST INSIGHTS RIGHT HERE!!</p>
        <p aria-hidden="true">GET THE LATEST INSIGHTS RIGHT HERE!!</p>
        <p aria-hidden="true">GET THE LATEST INSIGHTS RIGHT HERE!!</p>
      </div>
      </div>

        <motion.div className='img-container' 
          initial={{ opacity: 0.4, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }
        }
        >
          <picture>
            <source media="(max-width: 768px)" srcSet="/Hero3.png" />
            <source media="(max-width: 1200px)" srcSet="/Hero4.png" />
          <img
            src="/Hero.png"
            alt="Hero"
            className="hero-image"
            width="1200"
            height="675"
            decoding="async"
            fetchPriority="high"
          />
          </picture>
        </motion.div>
    </>
  )
}

export default Hero