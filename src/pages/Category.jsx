import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard.jsx'
import './category.css'
import AutoButton from '../components/AutoButton.jsx'
import { loadPostsIndex } from '../lib/postsIndex.js'

const Category = () => {
  const { category } = useParams()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts = await loadPostsIndex()
      const selected = allPosts.filter((post) => post.category === category)
      setPosts(selected)
    }

    loadPosts()
  }, [category])
  const record = {
    tech: {
      banner: '/tech.jpg',
      name: 'Technology',
      n2: 'Tech Trends',
      quote:
        '“The people who are crazy enough to think they can change the world are the ones who actually do”',
      quoteAuthor: '– Big Steve',
      description:
        "I have always felt deeply fascinated by all kinds of technology, from a simple rubik's cube to the Quantum Computers. It feels like a calling to me to write about the latest trends in technology and how they can impact our lives. As I study Computer Engineering, a lot of interesting topics come up that I feel compelled to share with the world. From AI, to Quantum Computers, from Software Development to basic game development, I cover it all here. It's like a blank canvas where I can paint my thoughts and ideas about the ever-evolving world of technology. Through this blog, I aim to not only share my knowledge but also to inspire others to explore the fascinating world of technology. Whether you're a fellow tech enthusiast or just someone curious about the latest advancements, I hope my posts provide valuable insights and spark your interest in this exciting field.",
    },
    literature: {
      banner: '/literature1.jpg',
      name: 'Literature',
      n2: 'Books & Writings',
      quote: '“When I feel a lack of whimsy, I spell my threee with three e’s” ',
      quoteAuthor: '– Me 2025',
      description:
        "I like to read. While reading, I always come across interesting concepts, unexplored words begging to be questioned. There is meaning to be found in the simplest of texts and I feel like I could share my perspective on what I've read with all of you. Who knows maybe one day, I'll write something on my own. For now though, I wanted to use this space to share my thoughts for interesting books I've read, articles I've come across and complex ideas that struck me after pondering on someone's words. There's an archive of unread, unappreciated literature and I just hope that I am able to bring some of it to light. I hope you enjoy reading my musings as much as I enjoy writing them. Thank you for being a part of this literary journey with me. Keep reading, keep exploring, and keep finding joy in the world of words, I know I sure will.",
    },
    research: {
      banner: '/research1.jpg',
      name: 'Research',
      n2: 'In-depth Studies',
      quote:
        "“It doesn't matter how beautiful your guess is, it doesn't matter how smart you are, who made the guess, or what his name is—if it disagrees with experiment, it's wrong; that's all there is to it”",
      quoteAuthor: '– Richard Feynman',
      description:
        'Research has been and will always be the most exciting part of my life. Even if it includes going through decades old data points, reading papers just to be more perplexed than I was before, I love it. The sheer thought of working on something that lies just at the edge of what is known and what is unknown really excites me. As I am writing this the AI auto-complete keeps trying to keep guessing what I am saying next. I just find it fascinating as how we as humans somehow managed a way to train these models to predict thought. But nevertheless, I prefer writing about research on my own as I feel deeply about it. In this blog, I will be sharing research papers that I have personally written, research projects as well as discuss any interesting research papers that I come across. Just for context, I find Astronomy, Physics, Math, and Computer Science highly interesting, so most of my research topics will be around these fields. Thank you for joining me on this research journey, and I hope you as much fun reading this as I had researching.',
    },
    misc: {
      banner: '/miscellaneous.jpg',
      name: 'Miscellaneous',
      n2: 'Varied Topics',
      quote: '“You are what you post” ',
      quoteAuthor: '– Me 2025',
      description:
        "Sometimes, I write about things that don't fit into any specific category. These include, my life in general, entrepreneurship, chess tournament experiences, and any philisophical thoughts that enter my mind at 2 am. This section is dedicated to those blogs that are a bit all over the place but which I still feel like sharing. Afterall I am talking into a void, occupying my tiny bit of space in this vast internet universe. Why not be myself and write about anything random :> So definitely expect the unexpected here. Thank you for investing your time into reading my thoughts, I feel like the more we get to know the mental framework of other people in society, the better we are able to interpet their emotions and develop empathy. And empathy is a powerful emotion. Let's make the world a better place, one blog at a time.",
    },
  }

  const current = record[category]
  const description = current?.description ?? ''
  const firstLetter = description.slice(0, 1)
  const remainingDescription = description.slice(1)

    return (
    <div className="category-editorial-page">
      <section className="masthead panel-enter panel-enter--1">
        <p className="masthead-kicker">The Archive Dispatch</p>
        <h1 className="heading">{current?.name ?? 'Category'} Bulletin</h1>
        <p className="masthead-dateline">Est. 2026 · Mumbai · Daily Notes from the Margin</p>
      </section>

      <figure className="banner-frame panel-enter panel-enter--2">
        <img
          src={current?.banner}
          alt={`${current?.name ?? category} banner`}
          className="category-banner"
          width="1600"
          height="500"
          decoding="async"
        />
        <figcaption className="banner-caption">
          <span className="banner-caption-kicker">Front page quote</span>
          <h2>{current?.quote}</h2>
          <p>{current?.quoteAuthor}</p>
        </figcaption>
      </figure>

      <div className="decorative-rule" aria-hidden="true">
        <span>— ✦ —</span>
      </div>

      <section className="editorial-section panel-enter panel-enter--3">
        <p className="section-label">Why I Write</p>
        <h2 className="reason">Why I write about {current?.n2}</h2>
        <div className="story-grid">
          <article className="about-column">
            <p className="about-category">
              {firstLetter ? <span className="drop-cap">{firstLetter}</span> : null}
              {remainingDescription}
            </p>
          </article>
          <aside className="quote-column">
            <p className="quote-text">{current?.quote}</p>
            <p className="quote-author">{current?.quoteAuthor}</p>
          </aside>
        </div>
      </section>

      <div className="decorative-rule" aria-hidden="true">
        <span>— ✦ —</span>
      </div>

      <section className="latest-section panel-enter panel-enter--4">
        <p className="section-label">Latest Posts</p>
        <h2 className="reason">Latest Posts</h2>
        <div className="post-issue-grid">
          {posts.map((post, index) => (
            <div
              className={`post-slot ${index === 0 ? 'featured-post' : 'regular-post'}`}
              key={post.slug}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </section>

      <AutoButton />
    </div>
    )
    
}

export default Category