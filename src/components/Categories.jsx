import { useNavigate } from "react-router-dom"
import FlowingMenu from "./FlowingMenu"

const Categories = () => {
  const navigate = useNavigate()

  const demoItems = [
    {
      text: "Tech",
      image: "/tech.jpg",
      onClick: () => navigate("/category/tech"),
    },
    {
      text: "Literature",
      image: "/literature1.jpg",
      onClick: () => navigate("/category/literature"),
    },
    {
      text: "Research",
      image: "/research1.jpg",
      onClick: () => navigate("/category/research"),
    },
    {
      text: "Miscellaneous",
      image: "/miscellaneous.jpg",
      onClick: () => navigate("/category/misc"),
    },
  ]

  return (
    <>
      <h1 className="subsection">Browse Categories</h1>
      <div style={{ height: "600px", position: "relative" }}>
        <FlowingMenu items={demoItems} />
      </div>
    </>
  )
}

export default Categories
