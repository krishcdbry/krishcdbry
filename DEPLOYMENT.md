# Deployment Guide

This portfolio website is ready to be deployed on GitHub Pages or Vercel.

## GitHub Pages Deployment

### Option 1: Automatic (Recommended)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Update portfolio website"
   git push origin main
   ```

2. Go to your repository on GitHub
3. Click on **Settings** > **Pages**
4. Under "Source", select **main** branch
5. Click **Save**
6. Your site will be published at: `https://yourusername.github.io/repository-name/`

### Option 2: Using GitHub Actions

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to main.

**That's it!** Your portfolio will be live within a few minutes.

---

## Vercel Deployment

### Option 1: Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts and your site will be live!

### Option 2: Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"New Project"**
4. Import your GitHub repository
5. Click **"Deploy"**

**Your site will be live instantly!** Vercel will provide you with a URL like: `https://your-portfolio.vercel.app`

---

## Custom Domain

### For GitHub Pages:

1. Add a file named `CNAME` with your domain name:
   ```
   yourdomain.com
   ```

2. Configure DNS:
   - Add an A record pointing to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or add a CNAME record pointing to: `yourusername.github.io`

### For Vercel:

1. Go to your project settings
2. Click on **"Domains"**
3. Add your custom domain
4. Follow the DNS configuration instructions

---

## Local Testing

Before deploying, test your website locally:

1. **Using Python:**
   ```bash
   python -m http.server 8000
   ```

2. **Using Node.js:**
   ```bash
   npx serve
   ```

3. **Using Live Server (VS Code extension):**
   - Install "Live Server" extension
   - Right-click on `index.html`
   - Select "Open with Live Server"

Then open your browser and go to `http://localhost:8000`

---

## Performance Tips

Your portfolio is already optimized, but here are some additional tips:

1. **Image Optimization**: Compress images before uploading
2. **CDN**: Both GitHub Pages and Vercel use CDN by default
3. **Caching**: Already configured with proper cache headers
4. **Minification**: Consider minifying CSS/JS for production

---

## Troubleshooting

### GitHub Pages shows 404
- Make sure `index.html` is in the root directory
- Check if GitHub Pages is enabled in repository settings
- Wait a few minutes after enabling

### Vercel deployment fails
- Ensure `vercel.json` is in the root directory
- Check that all files are committed to git
- Verify your Vercel account is connected to GitHub

### Styles not loading
- Check file paths in `index.html`
- Ensure all files are in the correct directories
- Clear browser cache

---

## Updates and Maintenance

To update your portfolio:

1. Make changes to your files
2. Test locally
3. Commit changes:
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push
   ```

Your changes will be automatically deployed!

---

## Support

For issues or questions:
- GitHub Pages: [GitHub Pages Documentation](https://docs.github.com/en/pages)
- Vercel: [Vercel Documentation](https://vercel.com/docs)

---

**Happy deploying! 🚀**
