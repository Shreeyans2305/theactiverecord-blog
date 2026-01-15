import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Post from './pages/Post.jsx'
import About from './components/About.jsx'
import Layout from './components/Layout.jsx'
import Category from './pages/Category.jsx'
import './index.css'
function App() {
  return (
    <Layout>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/post/:slug" element={<Post/>} />
      <Route path="/category/:category" element={<Category />} />
    </Routes>
    </Layout>
  )
}

export default App