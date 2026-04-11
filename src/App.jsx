import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/Layout.jsx'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './index.css'

const Home = lazy(() => import('./pages/Home.jsx'))
const Post = lazy(() => import('./pages/Post.jsx'))
const About = lazy(() => import('./components/About.jsx'))
const Category = lazy(() => import('./pages/Category.jsx'))

function App() {
  return (
    <>
    <Layout>
    <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/post/:slug" element={<Post/>} />
      <Route path="/category/:category" element={<Category />} />
    </Routes>
    </Suspense>
    </Layout>
    <Analytics />
    <SpeedInsights />
    </>
  )
}

export default App