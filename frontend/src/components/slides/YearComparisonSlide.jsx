export default function YearComparisonSlide({ data }) {
  const getTrendIcon = (change) => {
    if (change > 0) return '📈'
    if (change < 0) return '📉'
    return '➡️'
  }

  const formatChange = (change) => {
    if (change > 0) return `+${change}`
    return change.toString()
  }

  return (
    <div className="slide-content comparison-slide">
      <h2 className="slide-label">{data.previousYear} vs {data.currentYear}</h2>
      
      <div className="comparison-grid">
        <div className="comparison-item">
          <div className="comparison-icon">{getTrendIcon(data.commitChange)}</div>
          <div className="comparison-value">
            {formatChange(data.commitChange)}
            <span className="comparison-percent">
              ({data.commitChangePercent > 0 ? '+' : ''}{data.commitChangePercent}%)
            </span>
          </div>
          <div className="comparison-label">Commits</div>
        </div>
        
        <div className="comparison-item">
          <div className="comparison-icon">{getTrendIcon(data.activeDaysChange)}</div>
          <div className="comparison-value">
            {formatChange(data.activeDaysChange)}
            <span className="comparison-percent">
              ({data.activeDaysChangePercent > 0 ? '+' : ''}{data.activeDaysChangePercent}%)
            </span>
          </div>
          <div className="comparison-label">Active Days</div>
        </div>
      </div>
    </div>
  )
}
