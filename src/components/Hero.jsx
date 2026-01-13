import React from 'react'
import { motion } from 'motion/react'
const Hero = () => {

  return (
    <>
      <div class="marquee-container">
      <div class="marquee-track">
        <p>PROCEED WITH CAUTION * </p>
        <p aria-hidden="true">PROCEED WITH CAUTION * </p>
        <p aria-hidden="true">PROCEED WITH CAUTION * </p>
        <p aria-hidden="true">PROCEED WITH CAUTION * </p>
      </div>
      </div>

        <motion.div className='img-container' 
          initial={{ opacity: 0.4, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }  
        }
        >
          <img src="/Hero.png" alt="Hero" className="hero-image" />
        </motion.div>
    </>
  )
}

export default Hero