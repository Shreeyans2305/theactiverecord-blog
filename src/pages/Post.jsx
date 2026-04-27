import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { motion, useScroll, useSpring } from "motion/react"
import "./post.css"
import AutoButton from "../components/AutoButton";
import { parseLoadedPost } from "../lib/postMeta"
import GiscusComments from "../components/GiscusComments"

const cleanHeadingText = (value = "") =>
  value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .trim()

const slugifyHeading = (text = "") =>
  cleanHeadingText(text)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

const extractTocFromMarkdown = (markdown = "") => {
  const lines = markdown.split("\n")
  const used = new Map()
  const toc = []
  let inFence = false

  for (const line of lines) {
    const trimmed = line.trim()

    if (/^(```|~~~)/.test(trimmed)) {
      inFence = !inFence
      continue
    }

    if (inFence) continue

    const match = trimmed.match(/^##\s+(.+?)\s*#*\s*$/)
    if (!match) continue

    const text = cleanHeadingText(match[1])
    const base = slugifyHeading(text) || "section"
    const count = (used.get(base) || 0) + 1
    used.set(base, count)
    const id = count === 1 ? base : `${base}-${count}`

    toc.push({ text, id })
  }

  return toc
}

const flattenChildrenText = (children) => {
  if (typeof children === "string") return children
  if (typeof children === "number") return String(children)
  if (Array.isArray(children)) return children.map(flattenChildrenText).join("")
  if (children && typeof children === "object" && "props" in children) {
    return flattenChildrenText(children.props?.children)
  }
  return ""
}

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
  const [activeTocId, setActiveTocId] = useState("")

  useEffect(() => {
    const files = import.meta.glob("/src/posts/*.md", { query: "?raw", import: "default" })
    const loadPost = async () => {
      const matchKey = Object.keys(files).find(key => key.endsWith(`${slug}.md`))
      if (!matchKey) return
      const loaded = await files[matchKey]()
      const parsed = parseLoadedPost(loaded)
      if (!parsed) return
      const toc = extractTocFromMarkdown(parsed.content)
      setPost({ ...parsed, toc })
    }
    loadPost()
  }, [slug])

  useEffect(() => {
    if (!post?.toc?.length) {
      setActiveTocId("")
      return
    }

    const headingIds = post.toc.map((item) => item.id)
    const getHeadings = () => headingIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    let rafId = null
    const updateActive = () => {
      const headings = getHeadings()
      if (!headings.length) return

      const offset = 150
      let currentId = headings[0].id

      for (const heading of headings) {
        if (heading.getBoundingClientRect().top - offset <= 0) {
          currentId = heading.id
        } else {
          break
        }
      }

      setActiveTocId((prev) => (prev === currentId ? prev : currentId))
    }

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        updateActive()
        rafId = null
      })
    }

    updateActive()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [post])

  if (!post) return <p>Loading...</p>

  const { frontmatter, content, toc, readingTime } = post

  if (!frontmatter) return null

  let headingIndex = 0


  return (
    <>
      <div className={`post-layout ${toc?.length >= 3 ? 'has-toc' : 'no-toc'}`}>
        {toc?.length >= 3 ? (
          <aside className="post-toc" aria-label="Table of contents">
            <p className="post-toc-title">On this page</p>
            <nav>
              <ul>
                {toc.map((item) => (
                  <li key={item.id} className={activeTocId === item.id ? "active" : ""}>
                    <a
                      href={`#${item.id}`}
                      className={activeTocId === item.id ? "active" : ""}
                      aria-current={activeTocId === item.id ? "location" : undefined}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        ) : null}

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
            {frontmatter.date} · {readingTime}
          </p>

          {/* Markdown */}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ node, ...props }) => (
                <motion.img
                  {...props}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                />
              ),
              h2: ({ node, children, ...props }) => {
                const fallback = slugifyHeading(flattenChildrenText(children)) || `section-${headingIndex + 1}`
                const currentHeading = toc?.[headingIndex]
                const id = currentHeading?.id || fallback
                headingIndex += 1

                return (
                  <motion.h2
                    {...props}
                    id={id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    {children}
                  </motion.h2>
                )
              }
            }}
          >
            {content}
          </ReactMarkdown>

          <motion.div
            className="reading-progress"
            style={{ scaleX }}
          />

          <GiscusComments term={frontmatter.slug || slug} />
        </article>
      </div>

      <AutoButton />
    </>
  )
}

export default Post
