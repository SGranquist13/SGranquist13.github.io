# 🚀 Deploy Your CLI Portfolio to GitHub Pages

## Quick Setup (5 Minutes)

### Step 1: Create GitHub Repository
1. Go to **github.com** and sign in
2. Click the **+** icon (top right) → **New repository**
3. Repository name: `portfolio` (or `YOUR_USERNAME.github.io` for cleaner URL)
4. Keep it **Public**
5. **Don't** check any initialize options
6. Click **Create repository**

### Step 2: Push Your Code

Open Terminal and run these commands:

```bash
# Go to your portfolio folder
cd /Users/sg/Desktop/portfolio

# Initialize git
git init

# Stage all files
git add .

# Create first commit
git commit -m "Initial commit: CLI portfolio"

# Set main branch
git branch -M main

# Link to GitHub (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on **github.com**
2. Click **Settings** (top navigation)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source**: Deploy from a branch
   - **Branch**: Select `main` and `/ (root)`
   - Click **Save**

### Step 4: View Your Site

Your portfolio will be live in 1-2 minutes at:

**If named "portfolio":**
`https://YOUR_USERNAME.github.io/portfolio/`

**If named "YOUR_USERNAME.github.io":**
`https://YOUR_USERNAME.github.io/`

GitHub will display the URL at the top of the Pages settings.

---

## 🔄 Updating Your Site

After making changes:

```bash
git add .
git commit -m "Update portfolio content"
git push
```

Changes appear live in 30-60 seconds.

---

## ✏️ Customizing Content

Edit these sections in `script.js`:

- **Personal info**: Update `about`, `contact`, `social` commands
- **Experience**: Modify the `experience` command
- **Projects**: Update the `projects` command
- **Skills**: Edit the `skills` command

---

## 🎨 Changing Theme Colors

Edit `styles.css` CSS variables:

```css
:root {
    --accent-cyan: #00ffff;    /* Change primary color */
    --accent-green: #39ff14;   /* Change secondary color */
}
```

---

## 🆘 Troubleshooting

**Site not showing up?**
- Wait 2-3 minutes after enabling Pages
- Check Settings → Pages for the published URL
- Ensure repository is Public

**404 Error?**
- Verify the correct URL format
- Check that `index.html` exists in the root directory

**Need to update content?**
- All content is in `script.js` - edit and push changes

---

## 💡 Pro Tips

- **Custom domain**: Add in Settings → Pages → Custom domain
- **SEO**: Update meta tags in `index.html`
- **Analytics**: Add Google Analytics code before `</body>` tag
- **Updates**: No build process needed - just edit and push!

---

**Questions?** Check the full README.md for detailed documentation.

