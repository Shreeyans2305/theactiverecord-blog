import { IoIosArrowRoundUp } from 'react-icons/io';
const AutoButton = () => {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth animation
    });
  };

  return (
      <button className="auto-button" onClick={goToTop}><IoIosArrowRoundUp className="uparr"/></button>
  )
}

export default AutoButton