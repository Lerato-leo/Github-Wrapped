export default function CodingTimeHabitSlide({ data }) {
  const getHourEmoji = (hour) => {
    if (hour >= 6 && hour < 12) return '🌅'
    if (hour >= 12 && hour < 18) return '☀️'
    if (hour >= 18 && hour < 24) return '🌆'
    return '🌙'
  }

  return (
    <div className="slide-content coding-habit-slide">
      <h2 className="slide-label">Coding Time Habit</h2>
      <div className="habit-emoji">{getHourEmoji(data.hour)}</div>
      <p className="habit-time">{data.timeOfDay}</p>
      <p className="slide-description">{data.text}</p>
    </div>
  )
}
