import { useEffect, useState } from 'react'

export default function TotalCommitsSlide({ data }) {
  const [displayCount, setDisplayCount] = useState(0)

  useEffect(() => {
    let current = 0
    const target = data.count
    const increment = Math.ceil(target / 30)
    
    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setDisplayCount(target)
        clearInterval(interval)
      } else {
        setDisplayCount(current)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [data.count])

  return (
    <div className="slide-content commits-slide">
      <h2 className="slide-label">Total Commits</h2>
      <div className="large-number">{displayCount}</div>
      <p className="slide-description">{data.text}</p>
    </div>
  )
}
