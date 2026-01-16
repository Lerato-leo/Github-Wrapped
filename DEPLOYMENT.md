# GitHub Wrapped - Deployment Guide

This guide covers deploying GitHub Wrapped to production using Vercel.

## Architecture Overview

GitHub Wrapped is a serverless-ready full-stack application:

```
Frontend (React + Vite)
    ↓
Static Files (vercel.com CDN)

Backend (Node.js Express)
    ↓
Serverless Functions (Vercel)
    ↓
GitHub API
```

## Prerequisites

- **Vercel Account** - Free tier sufficient (https://vercel.com/signup)
- **GitHub Account** - Repo with GitHub Wrapped code
- **GitHub Personal Access Token** - For higher API rate limits
  - Generate at: https://github.com/settings/tokens
  - Scopes needed: `public_repo` (read-only)

## Deployment Steps

### 1. Prepare Repository

Ensure your repository is clean and ready:

```bash
# Make sure all changes are committed
git status

# Verify vercel.json exists in root
ls vercel.json

# Verify .vercelignore exists
ls .vercelignore
```

### 2. Connect to Vercel

**Option A: Via Vercel Dashboard**

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select "Import Git Repository"
4. Choose your GitHub repository
5. Click "Import"

**Option B: Via Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
cd Github-Wrapped
vercel

# Follow the prompts
```

### 3. Configure Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

**Required:**
```
GITHUB_TOKEN = your_github_personal_access_token
```

**Optional:**
```
CORS_ORIGIN = https://your-domain.vercel.app
NODE_ENV = production
```

Click "Save" after each addition.

### 4. Configure Build & Deploy

Vercel automatically detects configuration from `vercel.json`:

**Build Command:**
```
npm run build
```

**Output Directory:**
```
frontend/dist
```

**Install Command:**
```
npm install && cd backend && npm install && cd ../frontend && npm install
```

These are already configured in `vercel.json` - no changes needed unless you have custom requirements.

### 5. Deploy

```bash
# Via Vercel CLI (from project root)
vercel --prod

# Or use dashboard - commits to main trigger auto-deploy
git push origin main
```

### 6. Verify Deployment

1. Visit your Vercel deployment URL
2. Test the wrapped generator:
   - Enter a GitHub username
   - Select a year
   - Click "Generate Wrapped"
3. Verify API calls are working (F12 → Network tab)

## Post-Deployment

### Update Frontend API Endpoint

If using a custom domain, update API calls:

**Option 1: Use Relative Paths (Recommended)**
- Frontend automatically calls `/api/wrapped`
- Works for both local and production

**Option 2: Set Environment Variable**
- Create `.env.production` in `frontend/` folder:
  ```
  VITE_API_URL=https://your-domain.vercel.app/api
  ```

### Monitor Deployment

**Vercel Dashboard:**
- View logs: Dashboard → Function Logs
- Check analytics: Dashboard → Analytics
- Monitor errors: Dashboard → Error Tracking

**Useful Commands:**
```bash
# View live logs
vercel logs

# Redeploy latest commit
vercel --prod

# Show deployment status
vercel inspect
```

## Performance & Optimization

### Cold Start Times

Serverless functions may have cold start delays (~1-2s):
- First request to API slower than subsequent
- Not noticeable for typical usage

### Rate Limiting

GitHub API has rate limits:
- **Without token:** 60 requests/hour
- **With token:** 5,000 requests/hour

The deployment automatically uses the GITHUB_TOKEN for higher limits.

### Caching

Consider implementing caching for frequently requested users:

```bash
# Add cache headers to responses (future enhancement)
res.set('Cache-Control', 'public, max-age=3600')
```

## Troubleshooting

### Build Fails

**Error: "npm: command not found"**
- Vercel uses Node.js 18.x by default
- Go to Settings → Node.js Version → select 18.x

**Error: "module not found"**
- Check all dependencies in `backend/package.json`
- Run `npm install` locally to verify
- Commit package-lock.json

**Error: "Cannot find module '../backend/...'"**
- API functions use ES6 imports
- Ensure `"type": "module"` in `backend/package.json`

### Runtime Errors

**API 500 Errors**
- Check Function Logs in Vercel dashboard
- Verify GITHUB_TOKEN is set and valid
- Check GitHub API rate limit: `curl https://api.github.com/rate_limit -H "Authorization: token YOUR_TOKEN"`

**CORS Errors**
- Ensure frontend calls `/api/wrapped` (relative path)
- Or set CORS_ORIGIN environment variable
- Check browser Console for exact error

**API Timeout**
- GitHub API is slow for users with many repos
- Increase function timeout (edit in `vercel.json`):
  ```json
  "functions": {
    "api/*.js": {
      "memory": 1024,
      "maxDuration": 60
    }
  }
  ```

### Frontend Not Loading

**Blank page or 404**
- Check build output: Vercel Logs → Build tab
- Verify `frontend/dist` is created
- Check `outputDirectory` in `vercel.json`

**API Calls Failing**
- Open browser DevTools (F12)
- Go to Network tab
- Check request URL - should be `/api/wrapped?username=...`
- Check response status and body

## Custom Domain Setup

1. In Vercel Dashboard → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update CORS_ORIGIN environment variable to your domain

## Rollback

To revert to previous deployment:

1. Vercel Dashboard → Deployments
2. Find the deployment you want
3. Click "..." → "Promote to Production"
4. Verify the rollback

## Continuous Deployment

Automatic deployments trigger on:
- Push to main branch
- Pull request (creates preview deployment)

To disable, go to Settings → Git → Deployment trigger

## Production Checklist

- [ ] GitHub Token configured
- [ ] Environment variables set
- [ ] vercel.json reviewed
- [ ] Frontend tested locally
- [ ] Backend API tested locally
- [ ] Deployment successful
- [ ] API endpoints responding
- [ ] Images loading correctly
- [ ] Slide navigation working
- [ ] Share card download working

## Support

For deployment issues:
1. Check Vercel Function Logs
2. Review GitHub API status: https://www.githubstatus.com
3. Verify GitHub token scopes and expiration
4. Check GITHUB_TOKEN environment variable
5. Contact Vercel support: https://vercel.com/support

---

Happy deploying! 🚀
