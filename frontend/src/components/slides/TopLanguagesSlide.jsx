export default function TopLanguagesSlide({ data }) {
  const getTotalBytes = () => {
    return data.languages.reduce((sum, lang) => sum + lang.bytes, 0)
  }

  const getPercentage = (bytes) => {
    const total = getTotalBytes()
    return Math.round((bytes / total) * 100)
  }

  const colors = ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF']

  return (
    <div className="slide-content languages-slide">
      <h2 className="slide-label">Top Languages</h2>
      
      <div className="languages-list">
        {data.languages.map((lang, idx) => (
          <div key={lang.name} className="language-item">
            <div className="language-bar-container">
              <div 
                className="language-bar"
                style={{
                  width: `${getPercentage(lang.bytes)}%`,
                  backgroundColor: colors[idx % colors.length]
                }}
              />
            </div>
            <span className="language-name">{lang.name}</span>
            <span className="language-percent">{getPercentage(lang.bytes)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
