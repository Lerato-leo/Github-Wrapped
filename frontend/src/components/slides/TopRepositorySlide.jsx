export default function TopRepositorySlide({ data }) {
  return (
    <div className="slide-content repo-slide">
      <h2 className="slide-label">Top Repository</h2>
      <div className="repo-name">{data.repository}</div>
      <p className="commits-display">{data.commits} commits</p>
      <p className="slide-description">{data.text}</p>
    </div>
  )
}
