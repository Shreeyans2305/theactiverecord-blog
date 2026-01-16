
---

# The Active Record (tar)

> A personal, evolving digital journal — documenting ideas, learning, and curiosity.

**The Active Record** is my personal blog and digital space where I document my journey through technology, research, writing, and everything that keeps my brain awake at 2 AM.
This project is not just a blog — it’s an archive of growth, curiosity, and experimentation.

---

## 🌐 Live Site

🔗 [https://theactiverecord.vercel.app](https://theactiverecord.vercel.app/)

---

## Why I made a blog

* I wanted a place where I could express my thoughts that felt personal
* I really wanted to make a serious ***website*** with React
* It lets me learn by **building everything myself**

This repository documents that journey — technically and personally.

---

## What You’ll Find Here

* Articles written in **Markdown**
* Topics ranging from:

  * Technology & Software Engineering
  * AI, Math, Physics, Astronomy
  * Writing, books, and personal reflections
  * Experiments and ideas-in-progress
* A handcrafted UI focused on **reading experience**

---

## Tech Stack

### Frontend

* React (Vite)
* React Router
* Framer Motion (animations & micro-interactions)
* React Markdown + `remark-gfm`
* CSS (no UI framework)

### Content

* Markdown files (`.md`)
* Frontmatter via `gray-matter`

### State & UX

* Custom reading progress bar
* Smooth page transitions
* Responsive layout
* Dark Mode (CSS variables + persistence)

---


---

## Writing Posts

Posts live in:

```
/src/posts/
```

Each post is a Markdown file with frontmatter:

```
---
title: "My First Post"
date: "2026-01-10"
readingTime: "5 min read"
---

# Hello World

This is my first post on The Active Record.
```

Routing is automatically handled using the filename as the slug.

---

##  Features

### Implemented

* Markdown-based blog system
* Automatic Layout managment upon adding blogs in markdown(.md) files.
* Animated page transitions
* Scroll-based reading progress bar (article-only)
* Responsive design
* Dark / Light mode toggle
* Tilted card interactions
* Typewriter footer animation

### Planned

* Article likes with backend persistence
* Comment system
* Newsletter integration
* Search & tag system
* Reading analytics
* Writing dashboard

---

##  Dark Mode

Dark mode is implemented using CSS variables and persisted with `localStorage`.

* Light theme via `:root`
* Dark theme via `[data-theme="dark"]`

Toggle available globally via UI.

---


## Lessons Learned (So Far)

* Routing markdown dynamically is a overpowered
* Small animations make a *huge* UX difference
* Reading experience matters more than visuals
* CSS is everything
* Building your own tools teaches you more than using abstractions

---

## How you can play around with the code
* Clone the repository
* Go through src/posts to learn about the structure of the posts
* See the pages and routing to figure out the specifics

---


## 📜 License

MIT License

---

> *“The record isn’t about perfection — it’s about presence.”*


