# Portfolio

My personal portfolio site, live at [tahmidankur.dev](https://www.tahmidankur.dev). It's plain HTML, CSS and JavaScript with no framework and no build step, deployed on Vercel.

## Projects on the site

| Project | What it is | Links |
|---|---|---|
| Mini SIEM | Log-based intrusion detection tool (Python, SQLite, Streamlit) | [code](https://github.com/tahmidankur/mini-siem) · [live](https://mini-siem-xup9tgpprnay5uk8fs8kof.streamlit.app) |
| Divine Mood | Matches your mood to Quran and Bible verses | [code](https://github.com/tahmidankur/DivineMood) · [live](https://divine-mood.vercel.app) |
| Far Care | One-tap "I'm okay" check-ins for family abroad | [code](https://github.com/tahmidankur/FarCare) · [live](https://far-care.vercel.app) |
| StudyForge | Study planner with tasks, a Pomodoro timer and progress tracking | [code](https://github.com/tahmidankur/StudyForge) · [live](https://study-forge-ecru.vercel.app) |
| Fair Share | Android app for splitting chores and expenses with roommates | [code](https://github.com/tahmidankur/Fair-Share-Android) |
| World Cup 2026 Analysis | pandas, SQLite and SQL analysis of real 2026 World Cup player and match data (projects page only) | [code](https://github.com/tahmidankur/fifa-wc2026-analysis) · [live](https://tahmidankur.github.io/fifa-wc2026-analysis/) |

## Files

- `index.html` - home page (about, featured projects, skills, timeline, contact)
- `projects.html` - full project list
- `style.css` - all styles
- `script.js` - navbar state, mobile menu, scroll reveal
- `images/` - profile photo

## Adding a project

Copy one of the `<article class="project-card">` blocks in `index.html` (and `projects.html` if it should be on both pages) and change the text and links. The grid has two columns. A card with the extra `wide` class spans the full row, which helps when the number of cards is odd.

## Running locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server
```

Every push to `main` redeploys the site on Vercel.
