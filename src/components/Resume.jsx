import resumeData from '../data/resume.json'

function Resume() {
  const { experience, education, skills } = resumeData

  return (
    <>
      <section className="section">
        <h2>Experience</h2>
        {experience.map((job, index) => (
          <div className="job" key={index}>
            <div className="job-header">
              <span className="job-title">{job.title}</span>
              <span className="job-date">{job.duration}</span>
            </div>
            <div className="job-company">
              {job.url ? (
                <a href={job.url} target="_blank" rel="noopener noreferrer">{job.company}</a>
              ) : (
                job.company
              )}
              {job.location && <span className="job-location"> · {job.location}</span>}
            </div>
            <div className="job-description">
              {job.highlights && job.highlights.length > 0 && (
                <ul>
                  {job.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </section>

      <section className="section">
        <h2>Education</h2>
        {education.map((edu, index) => (
          <div className="job" key={index}>
            <div className="job-header">
              <span className="job-title">{edu.degree}</span>
              <span className="job-date">{edu.startDate} - {edu.endDate}</span>
            </div>
            <div className="job-company">{edu.institution}</div>
          </div>
        ))}
      </section>

      <section className="section">
        <h2>Skills</h2>
        <div className="job-description">
          <p>{skills.join(', ')}</p>
        </div>
      </section>
    </>
  )
}

export default Resume
