import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Post from './pages/Post.jsx'
import About from './components/About.jsx'
import Layout from './components/Layout.jsx'
import Category from './pages/Category.jsx'
import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './index.css'

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <>
    <Layout>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/post/:slug" element={<Post/>} />
      <Route path="/category/:category" element={<Category />} />
    </Routes>
    </Layout>
    <Analytics />
    <SpeedInsights />
    </>
  )
}

export default App