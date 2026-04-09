import { useParams, Link } from 'react-router-dom'
import { loadCaseStudies } from '../data/caseStudyLoader'

const projects = loadCaseStudies()

function CaseStudy() {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)

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

  return (
    <div className="case-study">
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

      {caseStudy.images && caseStudy.images.length > 0 && (
        <section className="case-study-images">
          {caseStudy.images.map((image, index) => (
            <figure key={index} className="case-study-figure">
              <img src={image.src} alt={image.caption} />
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
    </div>
  )
}

export default CaseStudy
