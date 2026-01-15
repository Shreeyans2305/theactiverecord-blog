import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const checkDarkMode = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDarkMode(theme === 'dark');
    };

    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    
    return () => observer.disconnect();
  }, []);

  const handleButtonClick = () => {
    navigate('/');
  }

  const logoImage = isDarkMode ? '/tar3.jpg' : '/tar.jpeg';

  return (
    <>
    <div className="top-bar">
    <nav className='navigation'>
      <img src={logoImage} alt="tar logo" className='hello' onClick={handleButtonClick}></img>
      <button className='nav-button' onClick={() => setIsOpen(true)}>☰</button>
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </nav>
    </div>
    </>
  )
}

export default Header