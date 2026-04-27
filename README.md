
---

# The Active Record (tar)

> A personal, evolving digital journal — documenting ideas, learning, and curiosity.

![Welcome](/public/preview.png)

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

![NewsBulletin](/public/preview3.png)

This repository documents that journey — technically and personally.

---

## What You’ll Find Here

* Articles written in **Markdown**

![PostPreview](/public/preview2.png)

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
---

# Hello World

This is my first post on The Active Record.
```

`readingTime` is now auto-calculated from the markdown content, so you don't need to add it manually.

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

## Comments & Likes (Giscus)

This project uses Giscus for both:

* Comments
* Likes (via GitHub reactions)

### Setup steps

1. Enable **GitHub Discussions** in your repository settings.
2. Install the **Giscus GitHub App** for your repository.
3. Create a Discussions category (for example: `Comments`).
4. Go to [https://giscus.app](https://giscus.app) and generate values for:
  * `repo`
  * `repoId`
  * `category`
  * `categoryId`
5. Add these to your `.env` file:

```
VITE_GISCUS_REPO=owner/repo
VITE_GISCUS_REPO_ID=R_kgDOxxxxxx
VITE_GISCUS_CATEGORY=Comments
VITE_GISCUS_CATEGORY_ID=DIC_kwDOxxxxxx
```

6. Restart the dev server after updating `.env`.

Without these variables, posts will show a configuration hint instead of the embed.

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


