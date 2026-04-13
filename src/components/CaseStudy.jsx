import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { loadCaseStudies } from '../data/caseStudyLoader'

const projects = loadCaseStudies()

function CaseStudy() {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const images = project?.caseStudy?.images || []

  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') setLightboxIndex(i => (i - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') setLightboxIndex(i => (i + 1) % images.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, images.length])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  if (!project) {
    return (
      <section className="section">
        <h2>Project Not Found</h2>
        <p>The project you're looking for doesn't exist.</p>
        <Link to="/portfolio" className="back-link">Back to Portfolio</Link>
      </section>
    )
  }

  const { title, tags, caseStudy } = project
  const stripImages = images.slice(0, 4)

  const closeLightbox = () => setLightboxIndex(null)
  const goPrev = (e) => {
    e.stopPropagation()
    setLightboxIndex(i => (i - 1 + images.length) % images.length)
  }
  const goNext = (e) => {
    e.stopPropagation()
    setLightboxIndex(i => (i + 1) % images.length)
  }

  return (
    <div className="case-study">

      {/* Image strip — above title */}
      {stripImages.length > 0 && (
        <div className="case-study-image-strip">
          {stripImages.map((image, index) => (
            <button
              key={index}
              className="image-strip-item"
              onClick={() => setLightboxIndex(index)}
              aria-label={`View image: ${image.caption}`}
            >
              <img src={image.src} alt={image.caption} />
            </button>
          ))}
        </div>
      )}

      <Link to="/portfolio" className="back-link">Back to Portfolio</Link>

      <header className="case-study-header">
        <div className="case-study-tags">
          {tags.map((tag, index) => (
            <span className="tag" key={index}>{tag}</span>
          ))}
        </div>
        <h1 className="case-study-title">{title}</h1>
        <p className="case-study-overview">{caseStudy.overview}</p>
      </header>

      <div className="case-study-meta">
        <div className="meta-item">
          <h3>Role</h3>
          <p>{caseStudy.role}</p>
        </div>
        <div className="meta-item">
          <h3>Timeline</h3>
          <p>{caseStudy.timeline}</p>
        </div>
        <div className="meta-item">
          <h3>Team</h3>
          <p>{caseStudy.team}</p>
        </div>
      </div>

      <div className="case-study-hero">
        <img src={caseStudy.heroImage} alt={title} />
      </div>

      <section className="case-study-section">
        <h2>Objectives</h2>
        <ul className="objectives-list">
          {caseStudy.objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
      </section>

      <section className="case-study-section">
        <h2>The Challenge</h2>
        <p>{caseStudy.challenge}</p>
      </section>

      <section className="case-study-section">
        <h2>Approach</h2>
        <p>{caseStudy.approach}</p>
      </section>

      <section className="case-study-section">
        <h2>User Experience</h2>
        <p>{caseStudy.userExperience.description}</p>
        <div className="insights">
          <h3>Key Insights</h3>
          <ul>
            {caseStudy.userExperience.insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Solution</h2>
        <p>{caseStudy.solution}</p>
      </section>

      {stripImages.length > 0 && (
        <section className="case-study-images">
          {stripImages.map((image, index) => (
            <figure key={index} className="case-study-figure">
              <button
                className="case-study-figure-btn"
                onClick={() => setLightboxIndex(index)}
                aria-label={`View image: ${image.caption}`}
              >
                <img src={image.src} alt={image.caption} />
              </button>
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </section>
      )}

      <section className="case-study-section">
        <h2>Results</h2>
        <ul className="results-list">
          {caseStudy.results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </section>

      <div className="case-study-footer">
        <Link to="/portfolio" className="back-link">Back to Portfolio</Link>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {images.length > 1 && (
            <button className="lightbox-arrow lightbox-arrow-prev" onClick={goPrev} aria-label="Previous image">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="13,3 5,10 13,17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].caption}
            />
            {images[lightboxIndex].caption && (
              <p className="lightbox-caption">{images[lightboxIndex].caption}</p>
            )}
            <p className="lightbox-counter">{lightboxIndex + 1} / {images.length}</p>
          </div>

          {images.length > 1 && (
            <button className="lightbox-arrow lightbox-arrow-next" onClick={goNext} aria-label="Next image">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="7,3 15,10 7,17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default CaseStudy
