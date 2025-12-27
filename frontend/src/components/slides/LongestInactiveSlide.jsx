export default function LongestInactiveSlide({ data }) {
  return (
    <div className="slide-content inactive-slide">
      <h2 className="slide-label">Longest Inactive Period</h2>
      <div className="large-number">{data.days}</div>
      <p className="unit-label">days</p>
      <p className="slide-description">{data.text}</p>
    </div>
  )
}
