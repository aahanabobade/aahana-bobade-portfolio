# Aahana Bobade — Portfolio

VS Code themed developer portfolio built with **React + Vite + Tailwind CSS v3**.

## 📁 Project Structure

```
src/
├── components/
│   ├── TitleBar.jsx       # macOS-style window chrome
│   ├── MenuBar.jsx        # File / Edit / View… menu
│   ├── ActivityBar.jsx    # Left icon bar
│   ├── Sidebar.jsx        # Flat file list
│   ├── TabBar.jsx         # Open file tabs
│   ├── Breadcrumb.jsx     # Path display
│   ├── Terminal.jsx       # Interactive terminal with real commands
│   ├── StatusBar.jsx      # Bottom status bar
│   ├── CommandPalette.jsx # Ctrl+P file search
│   └── Toast.jsx          # Notification toasts
├── pages/
│   ├── HomePage.jsx       # Landing with typewriter
│   ├── AboutPage.jsx      # Bio + links
│   ├── ProjectsPage.jsx   # Project cards
│   ├── ExperiencePage.jsx # Timeline
│   ├── ContactPage.jsx    # Contact form + links
│   └── ReadmePage.jsx     # Markdown-style README
├── hooks/
│   ├── useTypewriter.js   # Typewriter effect hook
│   ├── useClock.js        # Live clock hook
│   └── useReveal.js       # Scroll reveal hook
├── data/
│   └── index.js           # All your data in one place
├── icons/
│   └── index.jsx          # All SVG icons as React components
├── App.jsx                # Main orchestrator
├── main.jsx               # React entry point
└── index.css              # Tailwind directives + custom CSS
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🖥 Terminal Commands (try in the built-in terminal!)

Open the terminal via the **Terminal** menu or the status bar, then try:

```
help              # see all commands
ls                # list files
cat projects.js   # open a file in editor
open about.html   # same as cat
whoami            # show your info
git log           # see recent commits
python --version  # Python 3.11.0
clear             # clear terminal
```

## 📦 Deploy

### Vercel (recommended)
```bash
npm i -g vercel && vercel
```

### Netlify
```bash
npm run build
# Drag dist/ to netlify.com/drop
```

### GitHub Pages
```bash
# In vite.config.js add: base: '/repo-name/'
npm run build
# Push dist/ to gh-pages branch
```

## ✏️ Customisation

All your data lives in `src/data/index.js`. Update:
- `ME` — your name, role, email, social links
- `PROJECTS` — your project cards
- `EXPERIENCE` — your timeline
- `TYPEWRITER_LINES` — the animated text on the home page
