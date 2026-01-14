import { Buffer } from "buffer";
window.Buffer = Buffer;
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import matter from "gray-matter"
import { motion } from "motion/react"
import "./post.css"

const Post = () => {
  const { slug } = useParams()
  const [content, setContent] = useState("")
  const [frontmatter, setFrontmatter] = useState(null)

  useEffect(() => {
    fetch(`../posts/${slug}.md`)
      .then(res => res.text())
      .then(text => {
        const { data, content } = matter(text)
        setFrontmatter(data)
        setContent(content)
      })
  }, [slug])

  if (!frontmatter) return null

  return (
    <article className="post-wrapper">
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
    </article>
  )
}

export default Post
