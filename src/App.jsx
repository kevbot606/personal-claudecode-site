import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import resumeData from './data/resume.json'
import Resume from './components/Resume'
import Portfolio from './components/Portfolio'
import CaseStudy from './components/CaseStudy'
import About from './components/About'

function App() {
  const { name, bio, contact } = resumeData

  return (
    <BrowserRouter>
      <div className="portfolio">
        <nav className="navbar">
          <div className="navbar-content">
            <NavLink to="/" className="logo">Logo</NavLink>
            <ul className="nav-links">
              <li><NavLink to="/">Resume</NavLink></li>
              <li><NavLink to="/portfolio">Portfolio</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
            </ul>
          </div>
        </nav>

        <aside className="sidebar">
          <h1>{name}</h1>
          <p className="bio">{bio}</p>
          <div className="contact">
            <h3>Contact</h3>
            <ul>
              <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
              <li><a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Resume />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<CaseStudy />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
