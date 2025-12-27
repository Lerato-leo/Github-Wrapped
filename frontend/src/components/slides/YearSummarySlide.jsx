export default function YearSummarySlide({ data }) {
  return (
    <div className="slide-content summary-slide">
      <h2 className="slide-label">Year Summary</h2>
      
      <div className="summary-grid">
        <div className="summary-item">
          <div className="summary-value">{data.totalCommits}</div>
          <div className="summary-label">Total Commits</div>
        </div>
        
        <div className="summary-item">
          <div className="summary-value">{data.topLanguage}</div>
          <div className="summary-label">Top Language</div>
        </div>
        
        <div className="summary-item">
          <div className="summary-value">{data.topRepository}</div>
          <div className="summary-label">Top Repository</div>
        </div>
        
        <div className="summary-item">
          <div className="summary-value">{data.personality}</div>
          <div className="summary-label">Personality</div>
        </div>
      </div>
    </div>
  )
}
