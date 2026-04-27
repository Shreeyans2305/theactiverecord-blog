import { useState, useEffect, useMemo, useRef } from "react"
import Sidebar from "./Sidebar"
import { useNavigate } from 'react-router-dom'
import { loadPostsIndex } from "../lib/postsIndex"
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [allPosts, setAllPosts] = useState([])
  const [query, setQuery] = useState("")
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const navigate = useNavigate();
  const searchWrapRef = useRef(null)
  const searchInputRef = useRef(null)

  const normalizedQuery = query.trim().toLowerCase()
  const isSearching = isSearchExpanded || normalizedQuery.length > 0

  const results = useMemo(() => {
    if (!normalizedQuery) return []

    const scored = allPosts
      .map((post) => {
        const title = (post.title || "").toLowerCase()
        const excerpt = (post.excerpt || "").toLowerCase()

        let score = -1
        if (title.startsWith(normalizedQuery)) score = 3
        else if (title.includes(normalizedQuery)) score = 2
        else if (excerpt.includes(normalizedQuery)) score = 1

        return { post, score }
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((entry) => entry.post)

    return scored
  }, [allPosts, normalizedQuery])

  useEffect(() => {
    const checkDarkMode = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDarkMode(theme === 'dark');
    };

    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!searchWrapRef.current?.contains(event.target)) {
        setIsFocused(false)
        setHighlightedIndex(-1)
        setQuery("")
        setIsSearchExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (!normalizedQuery) {
      setHighlightedIndex(-1)
    }
  }, [normalizedQuery])

  const handleButtonClick = () => {
    navigate('/');
  }

  const ensureSearchIndex = async () => {
    if (allPosts.length > 0) return
    const posts = await loadPostsIndex()
    setAllPosts(posts)
  }

  const handleSearchFocus = async () => {
    if (isOpen) setIsOpen(false)
    setIsSearchExpanded(true)
    setIsFocused(true)
    await ensureSearchIndex()
  }

  const handleSearchToggle = async () => {
    if (isSearchExpanded) {
      setQuery("")
      setHighlightedIndex(-1)
      setIsFocused(false)
      setIsSearchExpanded(false)
      searchInputRef.current?.blur()
      return
    }

    if (isOpen) setIsOpen(false)
    setIsSearchExpanded(true)
    setIsFocused(true)
    await ensureSearchIndex()
    requestAnimationFrame(() => searchInputRef.current?.focus())
  }

  const openPost = (slug) => {
    navigate(`/post/${slug}`)
    setQuery("")
    setHighlightedIndex(-1)
    setIsFocused(false)
    setIsSearchExpanded(false)
    searchInputRef.current?.blur()
  }

  const handleSearchKeyDown = (event) => {
    if (!isFocused || normalizedQuery.length === 0) return

    if (event.key === "ArrowDown") {
      event.preventDefault()
      setHighlightedIndex((prev) => {
        const next = prev + 1
        return next >= results.length ? 0 : next
      })
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      setHighlightedIndex((prev) => {
        const next = prev - 1
        return next < 0 ? results.length - 1 : next
      })
    }

    if (event.key === "Enter") {
      event.preventDefault()
      if (results.length === 0) return
      const target = highlightedIndex >= 0 ? results[highlightedIndex] : results[0]
      if (target?.slug) openPost(target.slug)
    }

    if (event.key === "Escape") {
      setQuery("")
      setHighlightedIndex(-1)
      setIsFocused(false)
      setIsSearchExpanded(false)
      searchInputRef.current?.blur()
    }
  }

  const logoImage = isDarkMode ? '/tar3.jpg' : '/tar.jpeg';

  return (
    <>
    <div className="top-bar">
    <nav className='navigation'>
      <img
        src={logoImage}
        alt="tar logo"
        className='hello'
        width="100"
        height="100"
        decoding="async"
        fetchPriority="auto"
        onClick={handleButtonClick}
      />
      <div className="header-controls">
        {!isSearching && (
          <button className='nav-button' onClick={() => setIsOpen(true)}><GiHamburgerMenu /></button>
        )}
        <div className={`header-search-wrap ${isSearchExpanded ? 'expanded' : ''}`} ref={searchWrapRef}>
          <button
            type="button"
            className="header-search-toggle"
            onClick={handleSearchToggle}
            aria-label={isSearchExpanded ? "Close search" : "Open search"}
          >
            {isSearchExpanded ? '✕' : <FaSearch />}
          </button>
          <input
            ref={searchInputRef}
            className="header-search-input"
            type="text"
            placeholder="Search posts by title or excerpt"
            value={query}
            disabled={!isSearchExpanded}
            onFocus={handleSearchFocus}
            onChange={(event) => {
              const next = event.target.value
              setQuery(next)
              if (next.trim().length > 0 && isOpen) setIsOpen(false)
            }}
            onKeyDown={handleSearchKeyDown}
            aria-label="Search blog posts"
          />

          {isSearchExpanded && isFocused && normalizedQuery.length > 0 && (
            <div className="header-search-results" role="listbox" aria-label="Search results">
              {results.length > 0 ? (
                results.map((post, index) => (
                  <button
                    key={post.slug}
                    type="button"
                    className={`header-search-item ${highlightedIndex === index ? 'active' : ''}`}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => openPost(post.slug)}
                  >
                    <span className="header-search-title">{post.title}</span>
                    <span className="header-search-excerpt">{post.excerpt}</span>
                  </button>
                ))
              ) : (
                <p className="header-search-empty">No results found.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </nav>
    </div>
    </>
  )
}

export default Header
