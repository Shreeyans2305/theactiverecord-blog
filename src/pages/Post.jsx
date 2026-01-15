import { Buffer } from "buffer";
window.Buffer = Buffer;
import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import matter from "gray-matter"
import { motion, useScroll, useSpring } from "motion/react"
import "./post.css"
import AutoButton from "../components/AutoButton";

const Post = () => {

  const articleRef =  useRef(null);
  const { scrollYProgress } = useScroll({
  target: articleRef,
  offset: ["start start", "end end"],
})

const scaleX = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
})

  const { slug } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    const files = import.meta.glob("/src/posts/*.md", { as: "raw" })
    const loadPost = async () => {
      const matchKey = Object.keys(files).find(key => key.endsWith(`${slug}.md`))
      if (!matchKey) return
      const raw = await files[matchKey]()
      const { data, content } = matter(raw)
      setPost({ frontmatter: data, content })
    }
    loadPost()
  }, [slug])

  if (!post) return <p>Loading...</p>

  const { frontmatter, content } = post

  if (!frontmatter) return null


  return (
    <>
    <article ref={articleRef} className="post-wrapper">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {frontmatter.title}
      </motion.h1>

      {/* Meta */}
      <p className="post-meta">
        {frontmatter.date} · {frontmatter.readingTime}
      </p>

      {/* Markdown */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ node, ...props }) => (
            <motion.img
              {...props}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            />
          ),
          h2: ({ node, ...props }) => (
            <motion.h2
              {...props}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            />
          )
        }}
      >
        {content}
      </ReactMarkdown>
      <motion.div
  className="reading-progress"
  style={{ scaleX }}
/>
    </article>
    <AutoButton />
    </>

  )
}

export default Post
