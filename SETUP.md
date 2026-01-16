# GitHub Wrapped - Setup Guide

This guide will help you get GitHub Wrapped up and running on your local machine.

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git** (to clone the repository)

Check if you have Node.js installed:
```bash
node --version
npm --version
```

## Quick Start

### Option 1: Run Both Servers (Recommended)

1. **Clone the repository** (if you haven't already):
```bash
git clone https://github.com/Lerato-leo/Github-Wrapped.git
cd Github-Wrapped
```

2. **Install all dependencies**:
```bash
npm run install-all
```

3. **Start the backend** (in one terminal):
```bash
npm run backend:dev
```

You should see:
```
GitHub Wrapped API running on http://localhost:5000
```

4. **Start the frontend** (in another terminal):
```bash
npm run frontend
```

You should see output with:
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

5. **Open your browser** and navigate to: `http://localhost:5173`

### Option 2: Manual Setup

#### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Copy the example file
copy .env.example .env

# Edit .env and optionally add your GitHub token
# GITHUB_TOKEN=your_token_here (for higher rate limits)
```

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

#### Frontend Setup

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

4. Open `http://localhost:5173` in your browser

## Usage

### Landing Page
1. Enter a GitHub username or profile URL (examples):
   - Username: `torvalds`
   - Full URL: `https://github.com/torvalds`

2. Select a year (optional, defaults to current year)

3. Click "Generate Wrapped"

### Slide Navigation
- **Arrow buttons**: Use ← and → buttons at the bottom
- **Mouse scroll**: Scroll up/down to navigate
- **Next button**: Arrow on right
- **Previous button**: Arrow on left

### Exporting
- On the **Share Card** slide, click "Download Card" to save as image

## Adding GitHub Token (Optional but Recommended)

GitHub's API has rate limits. Adding a personal access token increases your limit from 60 to 5,000 requests per hour.

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Set:
   - **Token name**: GitHub Wrapped
   - **Expiration**: No expiration (or your preference)
   - **Scopes**: Only check `public_repo` (read-only)
4. Copy the generated token
5. Edit `backend/.env` and add:
```
GITHUB_TOKEN=your_copied_token_here
```
6. Restart the backend server

## Testing

### Test with Example Users

Try these GitHub users:
- `torvalds` - Linus Torvalds (Linux creator)
- `gvanrossum` - Guido van Rossum (Python creator)
- `bradleycarey` - Some active developer

### Mock Response

An example API response is provided in `EXAMPLE_RESPONSE.json` for reference.

## Troubleshooting

### Backend won't start
- **Port 5000 in use**: Change `PORT` in `backend/.env`
- **Node not found**: Ensure Node.js is installed
- **Module not found**: Run `npm install` in backend folder

### Frontend won't start
- **Port 5173 in use**: Vite will automatically try 5174, 5175, etc.
- **CORS errors**: Ensure backend is running on `http://localhost:5000`
- **Module not found**: Run `npm install` in frontend folder

### API requests failing
- Check backend console for errors
- Verify GitHub API is accessible: `curl https://api.github.com/users/torvalds`
- If rate limited, add a GitHub token to `.env`

### Data not loading
- Ensure user has public repositories
- Check browser console (F12) for errors
- Verify backend is returning data: visit `http://localhost:5000/health`

## Project Structure

```
Github-Wrapped/
├── backend/                    # Node.js + Express server
│   ├── src/
│   │   ├── index.js           # Server entry point
│   │   ├── middleware/        # Validation & error handling
│   │   └── services/          # GitHub API & data processing
│   ├── package.json
│   ├── .env                   # Configuration (create from .env.example)
│   └── .env.example           # Example configuration
│
├── frontend/                   # React + Vite app
│   ├── src/
│   │   ├── App.jsx            # Main app component
│   │   ├── pages/             # Landing & Wrapped pages
│   │   ├── components/        # Slide components
│   │   └── styles/            # CSS files
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── api/                        # Serverless API functions
│   ├── health.js              # Health check endpoint
│   └── wrapped.js             # Wrapped generation endpoint
│
├── vercel.json                # Vercel deployment config
├── package.json               # Root package.json with shortcuts
├── README.md                  # Project documentation
├── SETUP.md                   # This file
└── EXAMPLE_RESPONSE.json      # Example API response
```

## API Documentation

### Endpoint: GET `/wrapped/:username`

**Parameters:**
- `username` (required): GitHub username
- `year` (optional, query): Year to analyze (default: current year)

**Example:**
```bash
curl "http://localhost:5000/wrapped/torvalds?year=2024"
```

**Response:**
Contains user info, all slide data, metrics, and year comparison (see EXAMPLE_RESPONSE.json)

**Status Codes:**
- `200`: Success
- `400`: Invalid username
- `404`: User not found or no data
- `429`: Rate limited

## Production Build

To build the frontend for production:

```bash
cd frontend
npm run build
```

Output will be in `frontend/dist/` - ready to deploy to any static host.

## Vercel Deployment

GitHub Wrapped is optimized for deployment on Vercel with serverless backend functions.

### Prerequisites

- Vercel account (https://vercel.com)
- GitHub repository connected to Vercel
- GitHub personal access token (for higher API rate limits)

### Deployment Steps

1. **Connect your repository to Vercel**
   - Go to https://vercel.com
   - Click "Add New..." → "Project"
   - Import your GitHub repository

2. **Configure environment variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add: `GITHUB_TOKEN` = your GitHub personal access token
   - (Optional) Add: `CORS_ORIGIN` = your deployed domain

3. **Deploy**
   - Vercel automatically detects the configuration from `vercel.json`
   - Frontend builds to `frontend/dist/`
   - Backend API routes are deployed from `/api` directory
   - Deployment completes in 1-2 minutes

4. **Your deployment includes**
   - Frontend: Static site hosting
   - Backend: Serverless functions at `/api/wrapped` and `/api/health`
   - CORS: Enabled for all origins
   - GitHub Token: Available to API functions

### After Deployment

- Update frontend to call API from deployed domain (or use relative `/api/` paths)
- Test with: `https://your-domain.vercel.app`
- Share your GitHub Wrapped link!

### Troubleshooting Vercel Deployment

**Build fails:**
- Check Vercel logs for errors
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility (18.x recommended)

**API 500 errors:**
- Check function logs in Vercel dashboard
- Verify GITHUB_TOKEN is set correctly
- Check GitHub API rate limits

**CORS errors:**
- Ensure CORS_ORIGIN is set or use relative `/api/` paths
- Frontend build must use correct API endpoint

## Contributing

Feel free to fork and submit pull requests!

## License

MIT

## Support

For issues or questions:
1. Check the README.md
2. Review EXAMPLE_RESPONSE.json for expected data format
3. Check browser console (F12) for errors
4. For deployment issues, check Vercel dashboard logs

---

**Happy analyzing! 🚀**
