import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Post from './pages/Post.jsx'
import About from './pages/About.jsx'
import Layout from './components/Layout.jsx'
import './index.css'
function App() {
  return (
    <Layout>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/post/:slug" element={<Post/>} />
    </Routes>
    </Layout>
  )
}

export default App