# GitHub Wrapped - Developer Guide

This guide is for developers who want to understand, modify, or extend GitHub Wrapped.

## Project Overview

GitHub Wrapped is a full-stack application that:
1. Takes a GitHub username as input
2. Fetches all public repository data from GitHub API
3. Analyzes commit patterns and activity
4. Generates a beautiful 12-slide "Wrapped" experience
5. Allows export of results as an image

## Architecture

### Backend Architecture

```
GitHub API
    ↓
githubApi.js (API calls)
    ↓
dataAggregation.js (Data processing)
    ↓
wrappedService.js (Result composition)
    ↓
middleware (Validation & errors)
    ↓
Express Server → JSON Response
```

### Frontend Architecture

```
Landing Page (Input)
    ↓
Wrapped Page (Slide Viewer)
    ↓
Slide Components (12 different types)
    ↓
Dark Theme UI + Animations
```

## Code Organization

### Backend

#### `backend/src/index.js`
- Express server setup
- CORS configuration
- Route definition (`GET /wrapped/:username`)
- Error handling middleware

#### `backend/src/middleware/index.js`
- `validateUsername()`: Validates GitHub username format
- `errorHandler()`: Centralized error handling

#### `backend/src/services/githubApi.js`
- `getUser(username)`: Fetch user profile
- `getUserRepos(username)`: Fetch all repos with pagination
- `getRepoCommits(owner, repo, year)`: Fetch commits for specific year
- `getRepoLanguages(owner, repo)`: Fetch language statistics

#### `backend/src/services/dataAggregation.js`
- `aggregateUserData(username, year)`: Main aggregation function
  - Builds 4D commit distribution (daily, hourly, weekday, by repo)
  - Calculates all metrics
  - Classifies personality
  - Returns structured metrics object

- Helper functions:
  - `calculateBiggestDay()`: Most commits on single day
  - `calculateMostActiveHour()`: Hour with most commits
  - `calculateMostActiveWeekday()`: Weekday with most commits
  - `calculateLongestInactiveStreak()`: Longest gap without commits
  - `classifyPersonality()`: Personality classification logic
  - `getTopLanguages()`: Language aggregation
  - `getTopRepository()`: Top repo finder

- `calculateYearComparison()`: Year-over-year analysis

#### `backend/src/services/wrappedService.js`
- `getWrapped(username, year)`: Main service function
  - Orchestrates all data fetching and aggregation
  - Composes final wrapped response
  - Formats all slide data
  - Returns complete response

### Frontend

#### `frontend/src/App.jsx`
- Main application component
- Manages state: `wrapped`, `loading`, `error`
- Handles switching between Landing and Wrapped pages
- Manages API calls to backend

#### `frontend/src/pages/Landing.jsx`
- Input form component
- Username/URL input field
- Year selection dropdown
- Form submission handling
- Error display

#### `frontend/src/pages/Wrapped.jsx`
- Slide viewer container
- Slide management (current slide state)
- Navigation handlers (next, prev, scroll)
- Slide component rendering
- Controls (arrows, counter, reset button)

#### `frontend/src/components/Slide.jsx`
- Base wrapper component for all slides
- Provides consistent structure

#### `frontend/src/components/slides/`
Each slide component:
- Receives props from wrapped data
- Renders specific insight
- Handles animations
- Responsive design

Key implementations:
- `TotalCommitsSlide`: Animated counter
- `TopLanguagesSlide`: Bar chart visualization
- `PersonalitySlide`: Emoji animations
- `YearComparisonSlide`: Trend indicators
- `ShareCardSlide`: Download functionality

### Styling

#### `frontend/src/styles/index.css`
- Global styles
- Root variables
- Body styling
- Reset styles

#### `frontend/src/styles/Landing.css`
- Landing page specific styles
- Form styling
- Input and button styles
- Animation keyframes

#### `frontend/src/styles/Wrapped.css`
- Wrapped page layout
- All 12 slide styles
- Control buttons styling
- Responsive breakpoints
- Animation definitions

## Data Flow

### Request Flow
```
User Input
  ↓
Landing.jsx → App.jsx → axios.get(/wrapped/username)
  ↓
Express Backend
  ↓
githubApi.js (fetch repos, commits, languages)
  ↓
dataAggregation.js (process & calculate)
  ↓
wrappedService.js (compose response)
  ↓
JSON Response
  ↓
App.jsx sets state
  ↓
Wrapped.jsx renders slides
```

### Slide Navigation Flow
```
User clicks next/prev/scrolls
  ↓
Wrapped.jsx currentSlide state updates
  ↓
SlideComponent re-renders
  ↓
Animations play (slideInFade)
```

## Key Algorithms

### Personality Classification
```javascript
1. Calculate night commits ratio (8PM-6AM)
   - If > 30% → Night Owl
2. Calculate weekend ratio (Sat-Sun)
   - If > 35% → Weekend Warrior
3. Calculate top repo ratio
   - If > 60% → One-Repo Loyalist
4. Calculate active days ratio
   - If > 50% → Consistent Contributor
   - Else → Dedicated Debugger
```

### Longest Inactive Streak
```javascript
1. Sort all commit dates
2. Calculate gaps between consecutive dates
3. Find maximum gap (days without commits)
4. Also check gap from last commit to year end
5. Return maximum
```

### Language Aggregation
```javascript
1. For each repo:
   - Fetch languages endpoint (returns byte count)
   - Accumulate bytes per language
2. Sort by bytes descending
3. Take top 5
4. Calculate percentages
```

### Year Comparison
```javascript
1. Aggregate current year
2. Aggregate previous year
3. Calculate deltas:
   - Absolute: current - previous
   - Percentage: (delta / previous) * 100
4. Determine trend (up/down/same)
```

## Common Tasks

### Adding a New Slide

1. **Create slide component** in `frontend/src/components/slides/`
```jsx
export default function MySlide({ data }) {
  return (
    <div className="slide-content my-slide">
      <h2 className="slide-label">My Slide Title</h2>
      {/* Content here */}
    </div>
  )
}
```

2. **Add styles** to `frontend/src/styles/Wrapped.css`
```css
.my-slide {
  /* Your styles */
}
```

3. **Add to Wrapped.jsx** in slides array
```jsx
{ component: MySlide, props: { data: data.slides.mySlide } }
```

4. **Add data to backend** in `wrappedService.js`
```jsx
mySlide: {
  type: 'mySlide',
  // Your data
}
```

5. **Add calculation** in `dataAggregation.js` if needed

### Modifying Data Calculation

1. Edit `backend/src/services/dataAggregation.js`
2. Modify the aggregation function or add helper
3. Update return value to include new metric
4. Update `wrappedService.js` to include in response
5. Create/update frontend component to display

### Changing Colors

Edit `frontend/src/styles/Wrapped.css`:
```css
/* Primary colors */
#FF006E  /* Pink */
#FB5607  /* Orange */
#8338EC  /* Purple */
#3A86FF  /* Blue */
#FFBE0B  /* Gold */

/* Background colors */
#0a0a0a  /* Black */
#1a1a2e  /* Dark Blue */
#0f3460  /* Medium Blue */
```

### Adjusting Animations

Edit the keyframes in CSS files:
```css
@keyframes slideInFade {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

## Testing

### Manual Testing

1. **Test with different users**
   - Active developers (many commits)
   - Inactive developers (few commits)
   - Users with large repos
   - Users with many small repos

2. **Test edge cases**
   - Users with no commits in year
   - New users (joined recently)
   - Year comparison when no previous data
   - URL parsing variations

3. **Test UI**
   - All slide transitions
   - Scroll navigation
   - Arrow button navigation
   - Responsive on different screen sizes
   - Image download functionality

### Debugging

**Backend Debugging:**
```bash
# Enable more detailed logging
NODE_ENV=development npm run dev

# Check API responses
curl http://localhost:5000/wrapped/torvalds
```

**Frontend Debugging:**
- Open browser DevTools (F12)
- Check Console for errors
- Use React DevTools extension
- Check Network tab for API calls

## Performance Optimization Ideas

1. **Caching**
   - Cache results for 24 hours
   - Reduce API calls to GitHub

2. **GraphQL Migration**
   - Use GitHub GraphQL API instead of REST
   - More efficient data fetching

3. **Lazy Loading**
   - Load slides on demand
   - Reduce initial bundle size

4. **Database**
   - Store historical data
   - Track changes over time

5. **Image Processing**
   - Server-side image generation
   - Faster export functionality

## Extension Ideas

1. **Social Features**
   - Share to Twitter
   - Generate shareable links
   - Compare with friends

2. **Advanced Analytics**
   - Collaboration metrics
   - Contribution graph
   - PR and issue stats

3. **Customization**
   - Custom colors
   - Theme selection
   - Language preferences

4. **History**
   - View all wrapped years
   - Track progress over time
   - Career timeline

5. **Integrations**
   - GitLab support
   - Bitbucket support
   - Team analytics

## Troubleshooting Development

### Port Already in Use
```bash
# Change port in backend .env
PORT=5001

# Vite auto-selects next available port
```

### Rate Limited by GitHub
```bash
# Add personal access token to .env
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx

# Increases limit from 60 to 5000 requests/hour
```

### Module Not Found
```bash
# Reinstall dependencies
cd backend && npm install && cd ../frontend && npm install
```

### CORS Errors
- Ensure backend running on :5000
- Ensure frontend configured to proxy /wrapped
- Check CORS_ORIGIN in backend .env

### Stale Data
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Clear node_modules and reinstall

## Best Practices

### Code Style
- Use meaningful variable names
- Comment complex logic
- Keep functions focused
- Avoid nested callbacks (use async/await)

### Error Handling
- Validate all inputs
- Handle API failures gracefully
- Provide user-friendly error messages
- Log errors for debugging

### Performance
- Minimize re-renders
- Optimize images
- Lazy load when possible
- Avoid unnecessary API calls

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast

## Useful Commands

```bash
# Start everything
npm run install-all
npm run backend:dev  # Terminal 1
npm run frontend     # Terminal 2

# Build for production
npm run frontend:build

# Check for vulnerabilities
npm audit
npm audit fix

# Clear cache
rm -r node_modules package-lock.json
npm install
```

## Resources

- [GitHub API Documentation](https://docs.github.com/en/rest)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Express.js Documentation](https://expressjs.com)

## Support & Contribution

For issues or improvements:
1. Create detailed bug reports
2. Submit pull requests with improvements
3. Follow existing code style
4. Test thoroughly before submitting

---

Happy coding! 🚀
