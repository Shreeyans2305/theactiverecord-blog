import { Link } from 'react-router-dom';
import { useState } from "react"
import Sidebar from "./Sidebar"
const Header = () => {
  const pr = () => {
    console.log("hello");
  }
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
    <div className="top-bar">
    <nav className='navigation'>
      <img src='/tar.jpeg' alt="tar logo" className='hello'></img>
      <button className='nav-button' onClick={() => setIsOpen(true)}>☰ Menu</button>
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </nav>
    </div>
    </>
  )
}

export default Header