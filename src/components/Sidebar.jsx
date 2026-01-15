import { motion, AnimatePresence } from "motion/react"
import { IoCloseSharp } from "react-icons/io5";
import { CgDarkMode } from "react-icons/cg";
import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

const sidebarVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" }
}


const backdropVariants = {
  hidden: { opacity: 0, x: "100%"},
  visible: { opacity: 0.4 },
  exit: { opacity: 0 }
}

const Sidebar = ({ isOpen, onClose }) => {
const navigate = useNavigate();

  const handleButtonClick = (destination) => {
    navigate(destination);
    onClose();
  }
  const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Smooth animation
  });
  };
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  return (
    <AnimatePresence className="sidebar-animate-presence">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            className="sidebar right"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{type: "spring",stiffness: 260,damping: 24}}
          >
            <IoCloseSharp onClick={onClose} className="close"/>
            <CgDarkMode className="darkmode-icon"/>
            <nav className="sidebar-nav">
            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }} className="sides">
              <li><h2 onClick={() => {handleButtonClick('/'); goToTop();}} className="side">Home</h2></li>
              <li>
  <button
    className="category-toggle"
    onClick={() => setCategoriesOpen(prev => !prev)}
    aria-expanded={categoriesOpen}
  >
    Categories
    <motion.span
      animate={{ rotate: categoriesOpen ? 90 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <HiOutlineChevronDoubleRight style={{paddingTop:"7.5px"}}/>
    </motion.span>
  </button>

  <AnimatePresence>
    {categoriesOpen && (
      <motion.ul
        className="category-dropdown"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <li><h3 onClick={() => {handleButtonClick("/category/tech"); goToTop();}} className="side">Tech</h3></li>
        <li><h3 onClick={() => {handleButtonClick("/category/literature"); goToTop();}} className="side">Literature</h3></li>
        <li><h3 onClick={() => {handleButtonClick("/category/research"); goToTop();}} className="side">Research</h3></li>
        <li><h3 onClick={() => {handleButtonClick("/category/misc"); goToTop();}} className="side">Miscellaneous</h3></li>
      </motion.ul>
    )}
  </AnimatePresence>
              </li>

              <li><h2 onClick={() => handleButtonClick('/#Shop')}>Shop?</h2></li>
              <li><h2 onClick={() => handleButtonClick('/#about')}>About</h2></li>
              <li><h2 onClick={() => handleButtonClick('/#contact')}>Reach Out</h2></li>
          </ul>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default Sidebar
