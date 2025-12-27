export default function BiggestDaySlide({ data }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="slide-content biggest-day-slide">
      <h2 className="slide-label">Biggest Coding Day</h2>
      <div className="date-display">{formatDate(data.date)}</div>
      <p className="commits-display">{data.count} commits</p>
      <p className="slide-description">{data.text}</p>
    </div>
  )
}
