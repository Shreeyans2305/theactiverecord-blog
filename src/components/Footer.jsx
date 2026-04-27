import { useEffect, useState } from "react"
import { FaGithub } from "react-icons/fa";
import { MdOutgoingMail } from "react-icons/md";
import { FaMedium } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { BsSubstack } from "react-icons/bs";

import "./footer.css"

const words = ["thoughts?", "reviews?", "questions?"]

const Footer = () => {
  const [word, setWord] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const tallySrc = "https://tally.so/embed/rj0vBX?alignLeft=1&transparentBackground=1&dynamicHeight=1"


  useEffect(() => {
    const current = words[wordIndex]
    const speed = isDeleting ? 50 : 80

    const timeout = setTimeout(() => {
      setWord(prev =>
        isDeleting
          ? current.substring(0, prev.length - 1)
          : current.substring(0, prev.length + 1)
      )

      if (!isDeleting && word === current) {
        setTimeout(() => setIsDeleting(true), 1000)
      } else if (isDeleting && word === "") {
        setIsDeleting(false)
        setWordIndex((wordIndex + 1) % words.length)
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [word, isDeleting, wordIndex])

  useEffect(() => {
    const scriptSrc = "https://tally.so/widgets/embed.js"

    const mountEmbeds = () => {
      if (window.Tally?.loadEmbeds) {
        window.Tally.loadEmbeds()
        return
      }

      document
        .querySelectorAll("iframe[data-tally-src]:not([src])")
        .forEach((iframe) => {
          iframe.src = iframe.dataset.tallySrc
        })
    }

    const existing = document.querySelector(`script[src="${scriptSrc}"]`)
    if (existing) {
      mountEmbeds()
      return
    }

    const script = document.createElement("script")
    script.src = scriptSrc
    script.async = true
    script.onload = mountEmbeds
    script.onerror = mountEmbeds
    document.body.appendChild(script)
  }, [])

  return (
    <>
    <h1 className="subsection">Contact</h1>
    <div className="effect">
    <h2 className="typewriter">
      Got any <span className="dynamic">{word}</span>
      <span className="cursor">|</span>
      <br />
      <span className="subtext">Feel free to reach out through the Socials or Fill the Form below!!</span>
    </h2>
    <div className="feedback-form-wrap">
      <iframe
        src={tallySrc}
        data-tally-src={tallySrc}
        className="feedback-form-iframe"
        loading="lazy"
        width="100%"
        height="860"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        scrolling="no"
        title="Reach Out!!"
      ></iframe>
      <noscript>
        <a href={tallySrc} target="_blank" rel="noreferrer">Open contact form</a>
      </noscript>
    </div>
    </div>
    <div className="footer-socials" id="contact">
    <a href="https://github.com/Shreeyans2305" target="_blank" rel="noreferrer" className="link"><FaGithub /></a>
    <a href="https://shreeyansvichare.substack.com/" target="_blank" rel="noreferrer" className="link"><BsSubstack /></a>
    <a href="mailto:theactiverecord@gmail.com" target="_blank" rel="noreferrer" className="link"><MdOutgoingMail /></a>
    <a href="https://medium.com/@theactiverecord" target="_blank" rel="noreferrer" className="link"><FaMedium /></a>
    <a href="https://www.instagram.com/theactiverecord/" target="_blank" rel="noreferrer" className="link"><FaInstagram /></a>
    <a href="https://www.linkedin.com/in/shreeyans-vichare/" target="_blank" rel="noreferrer" className="link"><FaLinkedin /></a>
    <a href="https://shreeyans2305.github.io/" target="_blank" rel="noreferrer" className="link"><IoPerson /></a>

    </div>
    <p className="footer-note">© 2026 The Active Record. All rights reserved.</p>

    </>
  )
}

export default Footer
