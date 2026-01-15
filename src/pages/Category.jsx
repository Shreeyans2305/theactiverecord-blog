import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from "react"
import PostCard from '../components/PostCard.jsx'
import matter from 'gray-matter'
import "./category.css"
import AutoButton from '../components/AutoButton.jsx'
const Category = () => {
      const { category } = useParams()
      const [posts, setPosts] = useState([])

  useEffect(() => {
    const loadPosts = async () => {
      const files = import.meta.glob("../posts/*.md", { as: "raw" }) 
      const selected = []

      for (const path in files) {
      const raw = await files[path]() 
      const { data } = matter(raw)    
      if (data.category === category) selected.push(data)
      }
      setPosts(selected)
    }
    loadPosts()
  }, [category])
const record = {
    "tech" : {
        banner : "/tech.jpg",
        name : "Technology",
        n2: "Tech Trends",
        quote: "“The people who are crazy enough to think they can change the world are the ones who actually do”",
        quoteAuthor: "– Big Steve",
        description : "I have always felt deeply fascinated by all kinds of technology, from a simple rubik's cube to the Quantum Computers. It feels like a calling to me to write about the latest trends in technology and how they can impact our lives. As I study Computer Engineering, a lot of interesting topics come up that I feel compelled to share with the world. From AI, to Quantum Computers, from Software Development to basic game development, I cover it all here. It's like a blank canvas where I can paint my thoughts and ideas about the ever-evolving world of technology. Through this blog, I aim to not only share my knowledge but also to inspire others to explore the fascinating world of technology. Whether you're a fellow tech enthusiast or just someone curious about the latest advancements, I hope my posts provide valuable insights and spark your interest in this exciting field.",
    },
    "literature" : {
        banner : "/literature1.jpg",
        name : "Literature",
        n2: "Books & Writings",
        quote: "“When I feel a lack of whimsy, I spell my threee with three e’s” ",
        quoteAuthor: "– Me 2025",
        description : "I like to read. While reading, I always come across interesting concepts, unexplored words begging to be questioned. There is meaning to be found in the simplest of texts and I feel like I could share my perspective on what I've read with all of you. Who knows maybe one day, I'll write something on my own. For now though, I wanted to use this space to share my thoughts for interesting books I've read, articles I've come across and complex ideas that struck me after pondering on someone's words. There's an archive of unread, unappreciated literature and I just hope that I am able to bring some of it to light. I hope you enjoy reading my musings as much as I enjoy writing them. Thank you for being a part of this literary journey with me. Keep reading, keep exploring, and keep finding joy in the world of words, I know I sure will.",
    },
    "research" : {
        banner : "/research1.jpg",
        name : "Research",
        n2: "In-depth Studies",
        quote: "“It doesn't matter how beautiful your guess is, it doesn't matter how smart you are, who made the guess, or what his name is—if it disagrees with experiment, it's wrong; that's all there is to it”",
        quoteAuthor: "– Richard Feynman",
        description : "Research has been and will always be the most exciting part of my life. Even if it includes going through decades old data points, reading papers just to be more perplexed than I was before, I love it. The sheer thought of working on something that lies just at the edge of what is known and what is unknown really excites me. As I am writing this the AI auto-complete keeps trying to keep guessing what I'm saying next. I just find it fascinating as how we as humans somehow managed a way to train these models to predict thought. But nevertheless, I prefer writing about research on my own as I feel deeply about it. In this blog, I will be sharing research papers that I have personally written, research projects as well as discuss any interesting research papers that I come across. Just for context, I find Astronomy, Physics, Math, and Computer Science highly interesting, so most of my research topics will be around these fields. Thank you for joining me on this research journey, and I hope you as much fun reading this as I had researching.",
    },
    "misc" : {
        banner : "/miscellaneous.jpg",
        name : "Miscellaneous",
        n2: "Varied Topics",
        quote: "“You are what you post” ",
        quoteAuthor: "– Me 2025",
        description : "Sometimes, I write about things that don't fit into any specific category. These include, my life in general, entrepreneurship, chess tournament experiences, and any philisophical thoughts that enter my mind at 2 am. This section is dedicated to those blogs that are a bit all over the place but which I still feel like sharing. Afterall I am talking into a void, occupying my tiny bit of space in this vast internet universe. Why not be myself and write about anything random :> So definitely expect the unexpected here. Thank you for investing your time into reading my thoughts, I feel like the more we get to know the mental framework of other people in society, the better we are able to interpet their emotions and develop empathy. And empathy is a powerful emotion. Let's make the world a better place, one blog at a time.",
    }
}
    return (
        <>
        <h2 className='heading'>{record[category]?.name} Blogs</h2>
        <img src={record[category]?.banner} alt={`${category} banner`} className="category-banner" />
        
        <h2 className='reason'>Why I write about {record[category]?.n2}</h2>
        <p className='quote-text'>{record[category]?.quote}</p>
        <p className='quote-author'>{record[category]?.quoteAuthor}</p>
        <div className='spacer-20'>
        <p className='about-category'>{record[category]?.description}</p>
        </div>
        <h2 className='reason'>Latest Posts</h2>
        <div className='post-container'>
        {posts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
      </div>
      <AutoButton />
        
    </>
    )
    
}

export default Category