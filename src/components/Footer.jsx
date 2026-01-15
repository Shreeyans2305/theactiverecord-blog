import { useEffect, useState } from "react"
import { FaGithub } from "react-icons/fa";
import { MdOutgoingMail } from "react-icons/md";
import { FaMedium } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import "./footer.css"

const words = ["thoughts?", "reviews?", "questions?"]

const Footer = () => {
  const [word, setWord] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")


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



  return (
    <>
    <h1 className="subsection">Contact</h1>
    <div className="effect">
    <h2 className="typewriter">
      Got any <span className="dynamic">{word}</span>
      <span className="cursor">|</span>
      <br />
      <span className="subtext">Feel free to reach out through the Socials</span>
    </h2>

    </div>
    <div className="footer-socials" id="contact">
    <a href="https://github.com/Shreeyans2305" target="_blank" rel="noreferrer" className="link"><FaGithub /></a>
    <a href="https://twitter.com/yourusername" target="_blank" rel="noreferrer" className="link"><MdOutgoingMail /></a>
    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="link"><FaMedium /></a>
    <a href="https://instagram.com/yourusername" target="_blank" rel="noreferrer" className="link"><FaInstagram /></a>
    </div>
    <p className="footer-note">© 2026 The Active Record. All rights reserved.</p>

    </>
  )
}

export default Footer
