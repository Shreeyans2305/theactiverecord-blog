import { motion, AnimatePresence } from "motion/react"
import { IoCloseSharp } from "react-icons/io5";

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
  return (
    <AnimatePresence>
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
            <nav className="sidebar-nav">
              <h2>Home</h2>
              <h2>Categories</h2>
              <h2>Shop?</h2>
              <h2>Contact</h2>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default Sidebar
