export default function PersonalitySlide({ data }) {
  const getPersonalityEmoji = (label) => {
    const emojis = {
      'Night Owl': '🦉',
      'Weekend Warrior': '⚔️',
      'One-Repo Loyalist': '❤️',
      'Consistent Contributor': '💪',
      'Dedicated Debugger': '🐛'
    }
    return emojis[label] || '⭐'
  }

  return (
    <div className="slide-content personality-slide">
      <h2 className="slide-label">Your Coding Personality</h2>
      <div className="personality-emoji">{getPersonalityEmoji(data.label)}</div>
      <p className="personality-label">{data.label}</p>
      <p className="slide-description">{data.text}</p>
    </div>
  )
}
