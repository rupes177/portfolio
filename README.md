# Rupesh Poudyal — Cinematic Video Editor Portfolio

> **Cinematic, editorial, production-ready portfolio** for Rupesh Poudyal, a professional video editor and visual storyteller based in Kathmandu, Nepal.

Designed and developed with a distinctive cinematic aesthetic inspired by independent filmmaking portfolios, film festival visual identities, and high-end post-production studios.

---

## 🎞️ Live Architecture & Tech Stack

- **Framework:** React 18 + Vite 5
- **Styling:** Tailwind CSS with custom cinematic editorial configuration
- **Typography:**
  - *Playfair Display* (Editorial display serif)
  - *Plus Jakarta Sans* (Clean modern sans)
  - *JetBrains Mono* (Technical timecodes, telemetry, aspect ratios, and color science metadata)
- **Icons:** Lucide Icons
- **Performance:** Deferred iframe loading (zero background video requests on initial load), optimized local poster stills, sub-second TTFB, responsive layout.

---

## 📁 Project Structure

```text
rupesh-portfolio/
├── public/
│   ├── favicon.svg                 # Custom 35mm film slate SVG lettermark
│   └── images/
│       ├── rupesh-portrait-hd.jpg  # High-definition portrait (extracted & enhanced)
│       ├── rupesh-portrait.jpg     # Original crop from resume
│       ├── showreel-poster.jpg     # 4K master showreel poster frame
│       ├── wedding-film.jpg        # Master project: Himalayan Solitude & Vows (2.39:1)
│       ├── commercial.jpg          # Commercial: WorldLink UltraFi
│       ├── technology-video.jpg    # Tech: Xiaomi & Samsung Ecosystem Showcase
│       ├── promotional-film.jpg    # Promo: Soul of the Valley (Heritage & Rhythm)
│       ├── social-media.jpg        # Social: Vertical Velocity Short-Form Series
│       ├── color-grade.jpg         # Post: ACEScc Film Print Emulation Breakdown
│       └── og-cover.jpg            # Open Graph social sharing image (1200x630)
├── src/
│   ├── components/
│   │   ├── Navigation.jsx          # Understated editorial header + mobile menu
│   │   ├── Hero.jsx                # Editorial hero, live Kathmandu time (NPT), slate badge
│   │   ├── Showreel.jsx            # Dedicated screening feature with interactive player
│   │   ├── FeaturedWork.jsx        # Distinctive 6-project gallery with category filters
│   │   ├── VideoModal.jsx          # Accessible modal dialog (Esc dismissal, focus trap)
│   │   ├── About.jsx               # Editorial craft narrative & bio
│   │   ├── Services.jsx            # 6 structured post-production services with deliverables
│   │   ├── Experience.jsx          # Structured career history (BR Production, Omega, Gadgets In Nepal)
│   │   ├── Skills.jsx              # Software grid (Premiere, DaVinci, AE, PS, LR, Office)
│   │   ├── Education.jsx           # Education & certifications
│   │   └── Contact.jsx             # Direct contact + validated project brief form
│   ├── data/
│   │   ├── profile.js              # Centralized profile, showreel, bio & education config
│   │   ├── projects.js             # 6 curated projects data (video IDs, aspect ratios, tools)
│   │   ├── services.js             # Detailed service deliverables & software stack
│   │   ├── experience.js           # Exact verified career timeline & client highlights
│   │   └── skills.js               # Software tools & creative capabilities
│   ├── App.jsx                     # Root application coordinator
│   ├── index.css                   # Tailwind layers, custom scrollbars, cinema-scope styles
│   └── main.jsx                    # React DOM entry point
├── dist/                           # Production-ready compiled build
├── index.html                      # Semantic HTML5, SEO meta tags, OpenGraph, font preconnects
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Running the Project

### 1. Development Mode
```bash
npm run dev
```
Starts Vite dev server at `http://localhost:3000`.

### 2. Production Build
```bash
npm run build
```
Generates a minified, production-grade static bundle inside `dist/`.

### 3. Local Preview of Production Build
```bash
npm run preview
```

---

## 🎬 How to Connect Rupesh's Final Video Assets

All video links, showreel URLs, and project details are **centralized** in two easy-to-edit files:

### 1. Showreel Video ID
Edit `src/data/profile.js`:
```javascript
showreel: {
  heading: "A selection of moving images.",
  poster: "/images/showreel-poster.jpg",
  provider: "youtube", // or "vimeo"
  videoId: "YOUR_YOUTUBE_VIDEO_ID_HERE", // e.g. "EngW7tLk6R8"
  duration: "01:14",
  timecode: "TC 00:00:00:00 — 00:01:14:00",
}
```

### 2. Project Video IDs & Links
Edit `src/data/projects.js`:
```javascript
{
  id: "himalayan-solitude-vows",
  title: "Himalayan Solitude & Vows",
  category: "Wedding Films",
  categoryKey: "wedding",
  videoProvider: "youtube", // or "vimeo"
  videoId: "YOUR_PROJECT_VIDEO_ID",
  externalUrl: "https://www.youtube.com/watch?v=...",
  // ...
}
```

---

## 🌐 Deployment Instructions

The `dist/` directory is 100% self-contained static HTML/CSS/JS and can be deployed in seconds to:

### Vercel
```bash
npx vercel
```
*(Or connect the GitHub repository directly on vercel.com)*

### Netlify
```bash
npx netlify deploy --prod --dir=dist
```

### Cloudflare Pages
Deploy directory: `dist`  
Build command: `npm run build`

---

## 🔒 Verification & Compliance
- **Zero fake reviews or fabricated client testimonials.**
- Technology clients (*Xiaomi, Samsung, WorldLink*) are referenced strictly in the context of verified professional experience at *Gadgets In Nepal Pvt. Ltd.*
- Video players load **only on user interaction** (poster-first approach), protecting visitor privacy and maximizing Lighthouse performance.

