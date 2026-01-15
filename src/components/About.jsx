import { motion } from "motion/react"
import TiltedCard from "./TiltedCard"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}
const About = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Title */}
      <motion.h1
        className="subsection"
        style={{ padding: "none" }}
        variants={itemVariants}
      >
        About The Active Record.
      </motion.h1>

      {/* Image */}
      {/* <motion.img
        src="/Hello_From.png"
        alt="About The Active Record"
        className="hero-image"
        id="about-h"
        variants={itemVariants}
      /> */}

  <motion.div
    variants={itemVariants}
    style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "5px",
      marginBottom: "10px",
    }}
  >
    <TiltedCard
      imageSrc="/Hello_From.png"
      altText="tar - The Active Record"
      captionText={<h3>tar (The Active Record)</h3>}
      containerHeight="300px"
      containerWidth="600px"
      imageHeight="200px"
      imageWidth="300px"
      rotateAmplitude={12}
      scaleOnHover={1.15}
      showMobileWarning={false}
      showTooltip={true}
      displayOverlayContent={false}
    />
  </motion.div>


      {/* Intro */}
      <motion.p
        style={{ textAlign: "center", fontSize: "20px", marginTop: "10px", marginBottom: "5px" }}
        variants={itemVariants}
      >
        <b>Welcome to The Active Record (tar),</b>
      </motion.p>

      {/* Content */}
      <motion.ul className="about-text" variants={containerVariants} id="about">
        {[
          "This is a space where I like to share my thoughts, ideas, and knowledge about anything and everything that gets my dopamine going.",
          "From technology, literature to research and varied topics of interest, I cover it all here.",
          "Some of my interests include AI, Quantum Computing, Astronomy, Math, Physics, Chess, Books, Writing, and whatever is keeping my mind occupied at 2 am.",
          "I have a lot of stuff planned for The Active Record brand in the future including newsletters, merchandise, and more.",
          "I am an 18 year old college student studying Computer Engineering. If you want to find out more about me visit the contact section.",
          "Thank you for being a part of this journey with me. Peace out!",
        ].map((text, i) => (
          <motion.li key={i} variants={itemVariants}>
            {text}
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  )
}

export default About
