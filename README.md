# CLI-Style Portfolio Website

An ultra-modern, dark-themed portfolio website with an interactive terminal interface inspired by Claude Code and ChatGPT CLI. Built with vanilla HTML, CSS, and JavaScript for maximum compatibility and zero maintenance on GitHub Pages.

## 🚀 Features

- **Interactive CLI Interface** - Type commands to explore the portfolio
- **Beautiful Dark Theme** - Modern design with neon accents and smooth animations
- **Command History** - Navigate previous commands with ↑/↓ arrow keys
- **Tab Completion** - Auto-complete commands by pressing Tab
- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- **Zero Dependencies** - Pure HTML/CSS/JS, no build process required
- **GitHub Pages Ready** - Deploy in minutes with no configuration

## 🎨 Available Commands

- `help` - Show all available commands
- `about` - Learn about Steven Granquist
- `skills` - View technical expertise and skills
- `experience` - Professional work history
- `projects` - Showcase of notable projects
- `contact` - Get in touch
- `social` - Social media and professional links
- `clear` - Clear the terminal screen
- `banner` - Display welcome banner

## 🛠️ Customization

### Update Your Information

**All portfolio content is now configured in `config.json`!** This makes it easy to update your information without touching any code.

#### Editing config.json

Simply open `config.json` and edit the relevant sections:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title"
  },
  "about": {
    "position": "Your Position",
    "summary": ["Your bio paragraphs..."],
    "philosophy": "Your philosophy..."
  },
  "contact": {
    "email": "your.email@example.com",
    "github": "github.com/yourusername",
    "location": "Your City, Country"
  }
}
```

**Configuration Sections:**
- `personal` - Your name, title, and meta information
- `banner` - ASCII art and welcome message
- `about` - Professional summary and philosophy
- `skills` - Technical skills organized by category
- `experience` - Work history with detailed responsibilities
- `projects` - Portfolio projects and achievements
- `contact` - Contact information and availability
- `social` - Social media links

**Tips for Editing:**
- Use a JSON validator to ensure syntax is correct (missing commas are common!)
- Keep placeholder values like `<PLACEHOLDER>` until you're ready to fill them in
- Array items need commas between them (but not after the last item)
- Test changes by refreshing your browser

**Common Edits:**

Adding a new project:
```json
"projects": {
  "items": [
    {
      "title": "My Awesome Project",
      "description": "Built a cloud-native application using AWS Lambda, API Gateway, and DynamoDB. Achieved 99.9% uptime and reduced costs by 40%."
    }
  ]
}
```

Adding a skill category:
```json
{
  "icon": "🚀",
  "title": "New Category",
  "items": [
    "Skill 1",
    "Skill 2"
  ]
}
```

Updating contact info:
```json
"contact": {
  "email": "me@example.com",
  "github": "github.com/myusername",
  "location": "San Francisco, CA"
}
```

### Update Meta Tags for SEO

Don't forget to update the meta tags in `index.html` for better SEO:

```html
<meta name="description" content="Your Name - Your Title">
<meta name="author" content="Your Name">
<title>Your Name - Your Title</title>
```

These need to be updated manually in the HTML file since they're used by search engines before JavaScript loads.

### Change Theme Colors

Edit `styles.css` and modify the CSS variables at the top:

```css
:root {
    --bg-primary: #0a0e27;        /* Main background */
    --accent-cyan: #00ffff;        /* Primary accent color */
    --accent-green: #39ff14;       /* Secondary accent color */
    /* ... more variables ... */
}
```

## 📦 Deployment to GitHub Pages

### Option 1: Quick Deploy

1. Create a new GitHub repository (e.g., `portfolio`)
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CLI portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```
3. Go to Settings → Pages
4. Under "Source", select `main` branch and `/ (root)` folder
5. Click Save
6. Your site will be live at `https://YOUR_USERNAME.github.io/portfolio/`

### Option 2: Custom Domain

1. Follow steps 1-5 from Option 1
2. Add a `CNAME` file in the root directory with your domain:
   ```
   yourdomain.com
   ```
3. Configure your domain's DNS settings:
   - Add an A record pointing to GitHub's IP addresses
   - Or add a CNAME record pointing to `YOUR_USERNAME.github.io`
4. In GitHub Settings → Pages, enter your custom domain
5. Enable "Enforce HTTPS"

## 🔧 Local Development

Simply open `index.html` in your browser. No build process or local server required!

For a better development experience with live reload:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Best Practices

### Keep It Updated
- Regularly update your experience, projects, and skills
- Add new commands as your portfolio grows
- Keep content concise and impactful

### Optimize for Performance
- The site is already optimized with no dependencies
- All assets are inline (no external requests)
- Smooth animations using CSS transforms

### SEO Considerations
- Update meta tags in `index.html` with your information
- Add relevant keywords to the description
- Consider adding an `og:image` for social sharing

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize it for your own use!

## 📄 License

Free to use for personal portfolios. Attribution appreciated but not required.

## 🌟 Features Roadmap

- [ ] Theme switcher (light/dark/custom)
- [ ] Sound effects for typing
- [ ] More ASCII art variations
- [ ] Command aliases
- [ ] Session save/restore
- [ ] Easter eggs and hidden commands

## 💡 Tips

1. **Personalize the ASCII art** - Use tools like [patorjk.com](https://patorjk.com/software/taag/) to create custom ASCII text
2. **Add more commands** - Easily extend functionality by adding to the `commands` object
3. **Customize animations** - Adjust timing and effects in `styles.css`
4. **Mobile optimization** - Test on various devices to ensure great UX

## 📞 Support

For issues or questions about this template:
- Create an issue on GitHub
- Check the code comments for implementation details
- Customize freely - it's your portfolio!

---

**Built with** ❤️ **and** ☕ **by Steven Granquist**

*Last updated: October 2025*



