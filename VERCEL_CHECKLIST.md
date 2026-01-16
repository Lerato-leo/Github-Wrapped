# Vercel Deployment Checklist

Quick reference for deploying GitHub Wrapped to Vercel.

## Pre-Deployment

- [ ] All code committed to git
- [ ] GitHub Wrapped token created (https://github.com/settings/tokens)
- [ ] Vercel account created (https://vercel.com/signup)
- [ ] Repository pushed to GitHub

## Deployment Steps

1. **Connect Repository**
   - Go to https://vercel.com/dashboard
   - Click "Add New" → "Project"
   - Import your GitHub Wrapped repository

2. **Set Environment Variables**
   - Project Settings → Environment Variables
   - Add: `GITHUB_TOKEN` = (your token)
   - Save

3. **Deploy**
   - Vercel reads `vercel.json` automatically
   - Build starts automatically
   - Deployment completes in 1-2 minutes

4. **Verify**
   - Test at: `https://your-project.vercel.app`
   - Enter a GitHub username
   - Verify wrapped data loads

## URLs After Deployment

| Item | URL |
|------|-----|
| Frontend | `https://your-project.vercel.app` |
| Health Check | `https://your-project.vercel.app/api/health` |
| Wrapped API | `https://your-project.vercel.app/api/wrapped?username=torvalds` |

## Troubleshooting

**Build fails?**
- Check Vercel Logs (Deployments tab)
- Verify all dependencies installed locally first

**API returns 500?**
- Check Function Logs in Vercel dashboard
- Verify GITHUB_TOKEN is set correctly

**Frontend loads, API fails?**
- Open browser DevTools (F12)
- Check Network tab for `/api/wrapped` requests
- Verify environment variables

## Key Files

| File | Purpose |
|------|---------|
| `vercel.json` | Deployment configuration |
| `.vercelignore` | Files to ignore during build |
| `api/*.js` | Serverless function endpoints |
| `DEPLOYMENT.md` | Detailed deployment guide |

## Commands

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy from project directory
vercel --prod

# View logs
vercel logs

# Redeploy
vercel --prod
```

---

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed guide.
