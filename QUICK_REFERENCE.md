# GitHub Wrapped - Quick Reference

## 🚀 Quick Start (2 minutes)

```bash
# 1. Install everything
npm run install-all

# 2. Terminal 1 - Start backend
npm run backend:dev

# 3. Terminal 2 - Start frontend
npm run frontend

# 4. Open browser
http://localhost:5173
```

## 📝 Input Examples

- **Username**: `torvalds`, `gvanrossum`, `bradleycarey`
- **Profile URL**: `https://github.com/torvalds`
- **Year**: Select 2023, 2024, etc. (defaults to current)

## 🎯 12 Slides in Order

1. Intro - Username & Year
2. Total Commits - Animated count
3. Biggest Day - Date with most commits
4. Coding Time - Most active hours
5. Active Day - Most productive weekday
6. Top Languages - Language distribution
7. Top Repository - Most commits repo
8. Personality - Label (Night Owl, etc.)
9. Longest Inactive - Days without commits
10. Year Summary - Quick stats overview
11. Year Comparison - VS previous year
12. Share Card - Downloadable image

## 🎮 Controls

| Action | How |
|--------|-----|
| Next slide | Click → or scroll down |
| Previous slide | Click ← or scroll up |
| Download card | Click button on slide 12 |
| New wrapped | Click "Generate Another" |

## 📦 Project Structure

```
Github-Wrapped/
├── backend/          # Node.js + Express
├── frontend/         # React + Vite  
├── README.md         # Documentation
├── SETUP.md          # Installation guide
├── DEVELOPMENT.md    # Developer guide
└── IMPLEMENTATION.md # What was built
```

## 🔧 Backend Endpoints

```
GET /wrapped/:username?year=YYYY
```

**Example:**
```bash
curl "http://localhost:5000/wrapped/torvalds?year=2024"
```

## 🎨 Key Technologies

| Component | Tech |
|-----------|------|
| Frontend | React 18, Vite, CSS3 |
| Backend | Node.js, Express, Axios |
| Data Source | GitHub REST API v3 |
| Styling | Dark theme, animations |

## 📊 Data Metrics

Backend calculates:
- Total commits in year
- Commits per day/hour/weekday
- Languages used (bytes)
- Personality classification
- Longest inactive streak
- Year-over-year comparison

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Pink | #FF006E | Primary accent |
| Orange | #FB5607 | Secondary accent |
| Purple | #8338EC | Personality, secondary |
| Blue | #3A86FF | Weekday accent |
| Gold | #FFBE0B | Language accent |
| Dark | #0a0a0a | Background |
| Navy | #1a1a2e | Card background |

## 📋 Personality Types

| Type | Condition |
|------|-----------|
| Night Owl | >30% commits 8PM-6AM |
| Weekend Warrior | >35% commits on weekends |
| One-Repo Loyalist | >60% commits in one repo |
| Consistent Contributor | >50% days with commits |
| Dedicated Debugger | Default |

## 🔐 Setup

### Backend .env
```
GITHUB_API_URL=https://api.github.com
GITHUB_TOKEN=your_token_here  # Optional, for higher rate limit
PORT=5000
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### Get GitHub Token
1. https://github.com/settings/tokens
2. Generate new token (classic)
3. Scopes: Check `public_repo` only
4. Copy and add to `.env`

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Port 5000 taken | Change PORT in `.env` |
| Port 5173 taken | Vite auto-selects next port |
| Rate limited | Add GitHub token to `.env` |
| Module not found | Run `npm install` in folder |
| CORS errors | Ensure backend running on :5000 |
| No data loading | User needs public commits |

## 📱 Responsive Breakpoints

- Desktop: Full experience
- Tablet: Adjusted padding, smaller text
- Mobile: Single column, optimized buttons

## 🚢 Production Build

```bash
cd frontend
npm run build
```

Output in `frontend/dist/` - Deploy anywhere static files work!

## 📚 Documentation Files

| File | Content |
|------|---------|
| README.md | Full project overview |
| SETUP.md | Installation & setup guide |
| DEVELOPMENT.md | Architecture & code guide |
| IMPLEMENTATION.md | What was built summary |
| EXAMPLE_RESPONSE.json | Sample API response |

## 🔗 Links

- [GitHub API Docs](https://docs.github.com/en/rest)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Express Docs](https://expressjs.com)

## 💡 Tips

- Check browser console (F12) for errors
- Check backend terminal for server logs
- Add `?year=2023` to test year comparison
- Try users like `torvalds`, `gvanrossum`
- Test with your own GitHub username!

## 📞 Need Help?

1. Check SETUP.md for installation issues
2. Check DEVELOPMENT.md for code questions
3. Review EXAMPLE_RESPONSE.json for data format
4. Check browser console for errors
5. Check backend terminal for logs

---

**Version**: 1.0.0 | **Status**: Production Ready ✨
