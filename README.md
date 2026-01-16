# GitHub Wrapped

A full-stack web application that generates Spotify Wrapped–style annual summaries of GitHub user activity. Enter a GitHub username to see commits, coding habits, top languages, productivity trends, and year-to-year comparisons.

## 🎯 Features

- **No Authentication Required** - Works with public GitHub data only
- **Username or URL Input** - Accept raw usernames or full GitHub profile links
- **Spotify Wrapped Style UI** - Beautiful slide-based vertical experience with dark theme and vibrant colors
- **Year Selection** - Compare activity across different years
- **Real-time Generation** - Instant processing using GitHub's public REST API
- **12 Interactive Slides** - Insights from intro to downloadable share card
- **Responsive Design** - Works seamlessly on desktop and mobile

## 📊 12 Slides

1. **Intro** - Title with username and selected year
2. **Total Commits** - Animated commit count
3. **Biggest Day** - Date with highest commits
4. **Coding Time Habit** - Most active period (Morning/Afternoon/Evening/Night)
5. **Most Active Day** - Weekday with most commits
6. **Top Languages** - Language distribution with percentages
7. **Top Repository** - Repository with highest activity
8. **Coding Personality** - Label (Night Owl, Weekend Warrior, etc.)
9. **Longest Inactive** - Longest streak without commits
10. **Year Summary** - Key statistics overview
11. **Year Comparison** - Current vs previous year trends
12. **Share Card** - Downloadable summary image

## 🚀 Quick Start

```bash
# 1. Install all dependencies
npm run install-all

# 2. Terminal 1 - Start backend (port 5000)
npm run backend:dev

# 3. Terminal 2 - Start frontend (port 5173)
npm run frontend

# 4. Open browser
http://localhost:5173
```

## 💻 Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **API**: GitHub REST API v3
- **Styling**: Custom CSS with animations
- **Deployment**: Vercel serverless functions

## 📖 Documentation

- **[SETUP.md](SETUP.md)** - Detailed installation and configuration guide
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Architecture and development guide

## 📝 Usage

1. Enter a GitHub username or profile URL
   - Username: `torvalds`
   - URL: `https://github.com/torvalds`

2. Select a year (optional, defaults to current year)

3. Click "Generate Wrapped"

4. Navigate slides using:
   - Arrow buttons (← →)
   - Mouse scroll/wheel

5. Download the share card on the final slide

## 🔧 API Endpoint

```bash
GET http://localhost:5000/wrapped/:username?year=YYYY
```

**Example:**
```bash
curl "http://localhost:5000/wrapped/torvalds?year=2024"
```

## ✨ Features Implemented

✅ Full-stack React + Node.js architecture
✅ GitHub REST API integration with pagination
✅ 12 slide-based UI with smooth animations
✅ Dark theme with vibrant accent colors
✅ Personality classification algorithm
✅ Year-over-year comparison logic
✅ Language aggregation and analysis
✅ Input validation and error handling
✅ Image export functionality
✅ Responsive mobile design

## License

MIT
