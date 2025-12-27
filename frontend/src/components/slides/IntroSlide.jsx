export default function IntroSlide({ data }) {
  return (
    <div className="slide-content intro-slide">
      <h1 className="slide-title">GitHub Wrapped</h1>
      <h2 className="slide-year">{data.year}</h2>
      <p className="slide-username">{data.username}</p>
    </div>
  )
}
