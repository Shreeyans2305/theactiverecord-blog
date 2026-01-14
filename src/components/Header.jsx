import { useState } from "react"
import Sidebar from "./Sidebar"
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  }
  return (
    <>
    <div className="top-bar">
    <nav className='navigation'>
      <img src='/tar.jpeg' alt="tar logo" className='hello' onClick={handleButtonClick}></img>
      <button className='nav-button' onClick={() => setIsOpen(true)}>☰ Menu</button>
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </nav>
    </div>
    </>
  )
}

export default Header