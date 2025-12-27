import { useState } from 'react'
import '../styles/Landing.css'

export default function Landing({ onGenerate, loading, error }) {
  const [input, setInput] = useState('')
  const [year, setYear] = useState(new Date().getFullYear())

  const extractUsername = (input) => {
    // Handle GitHub profile URL
    const urlMatch = input.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9-]+)/i)
    if (urlMatch) {
      return urlMatch[1]
    }
    // Return raw username
    return input.trim()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const username = extractUsername(input)
    onGenerate(username, year)
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i)

  return (
    <div className="landing">
      <div className="landing-content">
        <h1 className="landing-title">GitHub Wrapped</h1>
        <p className="landing-subtitle">
          Discover your coding story in {year}
        </p>

        <form onSubmit={handleSubmit} className="landing-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter GitHub username or profile URL"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="landing-input"
              disabled={loading}
              autoFocus
            />
          </div>

          <div className="year-select">
            <label htmlFor="year">Select Year:</label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              disabled={loading}
              className="year-dropdown"
            >
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={loading} className="landing-button">
            {loading ? 'Generating...' : 'Generate Wrapped'}
          </button>
        </form>

        {error && (
          <div className="landing-error">
            <p>{error}</p>
          </div>
        )}

        <p className="landing-disclaimer">
          Generated from public GitHub data • No authentication required
        </p>
      </div>
    </div>
  )
}
