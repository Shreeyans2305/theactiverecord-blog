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
            <source media="(max-width: 768px)" className="hero-image-mobile" srcSet="/Hero3.png" />
            <source media="(max-width: 1200px)" className="hero-image" srcSet="/Hero4.png" />
          <img src="/Hero.png" alt="Hero" className="hero-image" />
          </picture>
        </motion.div>
    </>
  )
}

export default Hero