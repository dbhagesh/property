# GitHub Pages Deployment Guide

Your website is now configured for GitHub Pages deployment! 🎉

## What Was Done

### 1. Next.js Configuration
- Configured `next.config.mjs` for static export with `output: 'export'`
- Set up image optimization for static hosting
- Added base path support for GitHub Pages

### 2. GitHub Actions Workflow
- Created `.github/workflows/deploy.yml` for automatic deployment
- Builds and deploys on every push to the `main` branch
- Can also be triggered manually from GitHub Actions tab

### 3. Build Configuration
- Added deployment scripts to `package.json`
- Created `.nojekyll` file to prevent Jekyll processing
- Fixed all TypeScript build errors

### 4. Build Results
✓ Successfully built static pages for:
- Home page
- About page
- Contact page
- Deals pages (4 areas)
- Privacy & Terms pages
- Search page
- Sitemap

## How to Deploy

### Option 1: Automatic Deployment (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**
   - The site will automatically build and deploy

3. **Access your site:**
   - Your site will be available at: `https://yourusername.github.io/repo-name/`
   - Or your custom domain if configured

### Option 2: Manual Deployment

```bash
# Test the build locally
npm run deploy

# This will show you if the build succeeds
```

## Important Notes

### API Routes
⚠️ **API routes have been moved to `/api-backup`** because GitHub Pages only supports static hosting (no server-side code).

**Affected features:**
- Blog functionality (`/app-blog-backup`)
- Properties listing (`/app-properties-backup`)
- Contact form submission
- Search API

**Solutions:**
1. **Use a third-party service** for forms (like Formspree, Netlify Forms, or Web3Forms)
2. **Convert to static data** - Use JSON files instead of API routes
3. **Deploy to Vercel/Netlify** instead - They support API routes

### Configuration Updates Needed

Update these values in `next.config.mjs` based on your repository:

```javascript
// If your repo is yourusername.github.io (root domain)
basePath: '',
assetPrefix: '',

// If your repo is yourusername.github.io/repo-name (subfolder)
basePath: '/repo-name',
assetPrefix: '/repo-name',
```

Also update the `SITE_URL` in the same file:
```javascript
env: {
  SITE_NAME: 'Mahadev Real Estate',
  SITE_URL: 'https://yourusername.github.io/repo-name',
}
```

## Testing Locally

```bash
# Build the static site
npm run build

# The output will be in the /out directory
# You can serve it locally with:
npx serve out
```

## Troubleshooting

### Build fails on GitHub Actions
- Check the Actions tab for error logs
- Ensure all dependencies are in `package.json`
- Verify that `DATABASE_URL` and other env vars aren't required

### Pages not loading correctly
- Check if `basePath` is configured correctly
- Ensure all links use the Next.js `Link` component
- Check browser console for errors

### Images not displaying
- Verify images exist in `/public` directory
- Check image paths are relative (start with `/`)
- Images are already set to `unoptimized: true`

## Simple Update Script

To update your site:

```bash
# Make your changes
# Then run:
git add .
git commit -m "Update website content"
git push origin main

# GitHub Actions will automatically rebuild and deploy!
```

## Next Steps

1. **Test your build:** `npm run build`
2. **Push to GitHub:** Follow the deployment steps above
3. **Configure GitHub Pages:** Enable GitHub Actions as the source
4. **Add a custom domain** (optional): Set up in GitHub Settings → Pages

## Restoring Blog and Properties

If you want to restore the blog and properties pages, you'll need to:

1. Move them back: `mv app-blog-backup app/blog` and `mv app-properties-backup app/properties`
2. Convert them to use static data instead of API routes
3. Or deploy to a platform that supports server-side rendering (Vercel, Netlify, etc.)

For help with this, feel free to ask!
