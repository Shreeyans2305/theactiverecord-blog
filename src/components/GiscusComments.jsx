import { useEffect, useMemo, useRef } from 'react'

const resolveGiscusTheme = () => {
  const siteTheme = document.documentElement.getAttribute('data-theme')
  return siteTheme === 'dark' ? 'dark' : 'light'
}

const GiscusComments = ({ term }) => {
  const containerRef = useRef(null)

  const config = useMemo(
    () => ({
      repo: import.meta.env.VITE_GISCUS_REPO,
      repoId: import.meta.env.VITE_GISCUS_REPO_ID,
      category: import.meta.env.VITE_GISCUS_CATEGORY,
      categoryId: import.meta.env.VITE_GISCUS_CATEGORY_ID,
    }),
    []
  )

  const isConfigured = Boolean(config.repo && config.repoId && config.category && config.categoryId)

  useEffect(() => {
    if (!isConfigured || !containerRef.current || !term) return

    containerRef.current.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'

    script.setAttribute('data-repo', config.repo)
    script.setAttribute('data-repo-id', config.repoId)
    script.setAttribute('data-category', config.category)
    script.setAttribute('data-category-id', config.categoryId)
    script.setAttribute('data-mapping', 'specific')
    script.setAttribute('data-term', term)
    script.setAttribute('data-strict', '1')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', resolveGiscusTheme())
    script.setAttribute('data-lang', 'en')
    script.setAttribute('data-loading', 'lazy')

    containerRef.current.appendChild(script)
  }, [config, isConfigured, term])

  useEffect(() => {
    if (!isConfigured || !containerRef.current) return

    const syncThemeToGiscus = () => {
      const iframe = containerRef.current?.querySelector('iframe.giscus-frame')
      if (!iframe?.contentWindow) return

      iframe.contentWindow.postMessage(
        {
          giscus: {
            setConfig: {
              theme: resolveGiscusTheme(),
            },
          },
        },
        'https://giscus.app'
      )
    }

    const onFrameLoad = () => {
      syncThemeToGiscus()
    }

    const observer = new MutationObserver(syncThemeToGiscus)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    const frame = containerRef.current.querySelector('iframe.giscus-frame')
    if (frame) {
      frame.addEventListener('load', onFrameLoad)
    } else {
      requestAnimationFrame(syncThemeToGiscus)
      setTimeout(syncThemeToGiscus, 500)
    }

    syncThemeToGiscus()

    return () => {
      observer.disconnect()
      const currentFrame = containerRef.current?.querySelector('iframe.giscus-frame')
      currentFrame?.removeEventListener('load', onFrameLoad)
    }
  }, [isConfigured, term])

  if (!isConfigured) {
    return (
      <section className="giscus-wrap" aria-label="Comments">
        <h3 className="giscus-title">Comments & Likes</h3>
        <p className="giscus-note">
          Comments are not configured yet. Add your Giscus settings in environment variables to enable this section.
        </p>
      </section>
    )
  }

  return (
    <section className="giscus-wrap" aria-label="Comments">
      <h3 className="giscus-title">Comments & Likes</h3>
      <div ref={containerRef} />
    </section>
  )
}

export default GiscusComments
