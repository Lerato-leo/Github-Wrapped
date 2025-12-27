import { useRef } from 'react'

export default function ShareCardSlide({ data, wrappedData }) {
  const cardRef = useRef(null)

  const handleDownload = async () => {
    if (!cardRef.current) return

    try {
      // Dynamically import html2canvas
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#1a1a1a',
        scale: 2
      })
      
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = `github-wrapped-${data.username}-${data.year}.png`
      link.click()
    } catch (error) {
      console.error('Error generating image:', error)
      alert('Failed to generate image. Try again.')
    }
  }

  return (
    <div className="slide-content share-slide">
      <div ref={cardRef} className="share-card">
        <div className="share-card-content">
          <h1 className="share-card-title">GitHub Wrapped</h1>
          <div className="share-card-year">{data.year}</div>
          
          <div className="share-card-info">
            <p className="share-info-item">
              <span className="share-label">Developer:</span>
              <span className="share-value">{data.username}</span>
            </p>
            <p className="share-info-item">
              <span className="share-label">Commits:</span>
              <span className="share-value">{data.totalCommits}</span>
            </p>
            <p className="share-info-item">
              <span className="share-label">Personality:</span>
              <span className="share-value">{data.personality}</span>
            </p>
            <p className="share-info-item">
              <span className="share-label">Top Language:</span>
              <span className="share-value">{data.topLanguage}</span>
            </p>
          </div>
          
          <p className="share-card-footer">
            Generated from public GitHub data
          </p>
        </div>
      </div>

      <button className="share-button" onClick={handleDownload}>
        📥 Download Card
      </button>
    </div>
  )
}
