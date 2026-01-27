import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import portfolioData from '../data/portfolio.json'

function Portfolio() {
  const { projects } = portfolioData
  const [activeFilter, setActiveFilter] = useState('All')

  const allTags = useMemo(() => {
    const tags = new Set()
    projects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag))
    })
    return ['All', ...Array.from(tags).sort()]
  }, [projects])

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter(project => project.tags.includes(activeFilter))
  }, [projects, activeFilter])

  return (
    <section className="section">
      <h2>Portfolio</h2>
      <div className="filter-bar">
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`filter-tag ${activeFilter === tag ? 'active' : ''}`}
            onClick={() => setActiveFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="portfolio-grid">
        {filteredProjects.map((project) => (
          <Link to={`/portfolio/${project.slug}`} className="project-card" key={project.id}>
            <div className="project-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, index) => (
                  <span className="tag" key={index}>{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Portfolio
