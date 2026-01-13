import { Link } from 'react-router-dom';
const Header = () => {
  const pr = () => {
    console.log("hello");
  }
  return (
    <>
    <div className="top-bar">
    <nav className='navigation'>
      <img src='/tar.jpeg' alt="tar logo" className='hello'></img>
      <button className='nav-button' onClick={pr}>☰ Menu</button>
    </nav>
    </div>
    </>
  )
}

export default Header