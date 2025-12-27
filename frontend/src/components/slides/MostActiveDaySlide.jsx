export default function MostActiveDaySlide({ data }) {
  return (
    <div className="slide-content active-day-slide">
      <h2 className="slide-label">Most Active Day</h2>
      <div className="weekday-display">{data.name}</div>
      <p className="commits-display">{data.count} commits</p>
      <p className="slide-description">{data.text}</p>
    </div>
  )
}
