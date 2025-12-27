# GitHub Wrapped

A full-stack web application that generates Spotify Wrapped–style annual summaries of GitHub user activity. Enter a GitHub username or profile link to see commits, coding habits, top languages, productivity trends, and year-to-year comparisons.

## Features

### 🎯 Core Features
- **No Authentication Required**: Works with public GitHub data only
- **Username or URL Input**: Accept raw usernames or full GitHub profile links
- **Spotify Wrapped Style UI**: Beautiful slide-based vertical experience with dark theme and vibrant colors
- **Year Selection**: Compare activity across different years
- **Real-time Generation**: Instant processing using GitHub's public REST API

### 📊 Insights Included
1. **Intro Slide** - Username and selected year
2. **Total Commits** - Animated commit count
3. **Biggest Coding Day** - Date with highest commits
4. **Coding Time Habit** - Most active time of day (Morning/Afternoon/Evening/Night)
5. **Most Active Day** - Most productive weekday
6. **Top Programming Languages** - Language distribution with percentages
7. **Top Repository** - Repository with most commits
8. **Coding Personality** - Label like "Night Owl", "Weekend Warrior", etc.
9. **Longest Inactive Period** - Longest streak without commits
10. **Year Summary** - Quick stats overview
11. **Year Comparison** - VS previous year with trends
12. **Share Card** - Downloadable image with key stats

## Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **API**: GitHub REST API v3
- **Styling**: Custom CSS with animations
- **Data Processing**: Real-time aggregation and analysis

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
copy .env.example .env
```

4. (Optional) Add a GitHub token for higher API rate limits:
   - Generate a token at https://github.com/settings/tokens
   - Add to `.env`: `GITHUB_TOKEN=your_token_here`

5. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### GET `/wrapped/:username`

Generates complete wrapped data for a GitHub user.

**Parameters:**
- `username` (path, required): GitHub username
- `year` (query, optional): Year to generate wrapped for (default: current year)

**Example:**
```
GET http://localhost:5000/wrapped/torvalds?year=2024
```

## Usage

1. **Start both servers** (backend on port 5000, frontend on port 5173)

2. **Visit the frontend** at `http://localhost:5173`

3. **Enter a GitHub username or profile URL**:
   - Just username: `torvalds`
   - Full URL: `https://github.com/torvalds`

4. **Select a year** (optional, defaults to current year)

5. **Click "Generate Wrapped"**

6. **Navigate through slides** using:
   - Arrow buttons (← →)
   - Mouse scroll/wheel

7. **Download Share Card** to save results as an image

## Features Implemented

✅ Full-stack architecture with React frontend and Express backend
✅ GitHub REST API integration with pagination
✅ 12 slide-based UI (Spotify Wrapped style)
✅ Dark theme with vibrant accent colors
✅ Animated transitions and number counts
✅ Year selection and comparison logic
✅ Personality classification algorithm
✅ Language aggregation and analysis
✅ Input validation and error handling
✅ Responsive design for mobile
✅ Share card with download capability
✅ No authentication required

## License

MIT
