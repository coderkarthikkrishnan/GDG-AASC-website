# GDG On Campus – Alpha Arts and Science College (AASC)
> **Tagline:** Learn. Build. Innovate. Together.  
> **Official Website:** GDG On Campus AASC

A modern, responsive, high-performance web platform built for the **Google Developer Groups on Campus (GDG On Campus) chapter at Alpha Arts and Science College (AASC)**.

Inspired by developer-first aesthetics (clean typography, glassmorphism, Google colors, marquee tickers, and interactive cards), this project is crafted from scratch for AASC with an easily customizable architecture and Firebase-ready service layer.

---

## 🌟 Key Features

1. **Sticky Responsive Navigation:**
   - Google brackets branding (`<GDG AASC />`)
   - Dark/Light mode toggle with `localStorage` persistence and system preference sync
   - Active section scroll spy
   - Mobile animated drawer menu with quick contact access

2. **Hero Section:**
   - Tagline: *"Learn. Build. Innovate. Together."*
   - Interactive developer terminal simulating real AASC code deployment
   - Google color glow accents (Blue, Red, Yellow, Green)
   - Sticker badges (`beginner friendly ✳`, `backed by Google Developers`)

3. **Marquee Ticker Banner:**
   - Infinite looping ticker with Google colored icons: `BUILD ⚡ SHIP 🚀 LEARN ♥ HACK ❄ REPEAT ★`

4. **Animated Statistics Counter:**
   - 100+ Community Members, 10+ Events, 8+ Domains, 10+ Projects
   - Auto-animates on viewport scroll
   - Configurable from a single file: `src/data/statsData.js`

5. **About Chapter:**
   - Overview of the student developer ecosystem at Alpha Arts and Science College
   - 9 core focus areas matrix
   - 4 core community principles (*Learn by doing, Beginner friendly, Globally connected, Built by students*)

6. **8 Technology Domains:**
   - Web Development, AI & Machine Learning, Google Cloud, Android / App Dev, UI/UX & Design, Competitive Programming, Open Source, and Emerging Tech
   - Each card features icons, lead names, tags, and interactive hover glows

7. **Events & Workshops:**
   - Upcoming Events & Past Events toggle
   - Category filtering (*Workshops, Hackathons, Talks, Coding Sessions, Community Events*)
   - Interactive **Event Registration Modal** with validation and confetti celebration
   - Connects to Firebase Firestore or persists locally

8. **Built by Our Community (Projects):**
   - Showcase cards with tech badges, GitHub repository links, and live demo buttons
   - Easily editable via `src/data/projectsData.js`

9. **Interactive Event Gallery:**
   - Responsive masonry/grid layout
   - Fullscreen **Lightbox Modal** with caption, keyboard arrow navigation, and date badges

10. **Milestones & Achievements:**
    - Hackathon championships, Google Cloud certifications, community milestones, and open-source contributions

11. **Core Team Directory:**
    - Organizer, Technical Lead, Web Dev Lead, AI/ML Lead, Cloud Lead, Design Lead, Publicity Lead, Outreach Lead, Events Lead, Content Lead
    - Filterable by domain/role with direct LinkedIn & GitHub links

12. **Developer Blog & Stories:**
    - Filterable developer articles, tutorials, recaps, and announcements
    - Interactive **Blog Reader Modal** with markdown-styled content and share utilities

13. **Final Community CTA & Footer:**
    - Direct WhatsApp, Discord, and Google Developer portal links
    - Newsletter subscription input
    - Official Google community disclaimer and copyright 2026

---

## 🛠️ Tech Stack

- **Frontend:** React 19, JavaScript (ES2024)
- **Tooling:** Vite 7
- **Styling:** Tailwind CSS, Vanilla CSS animations, Glassmorphism
- **Typography:** Space Grotesk, Plus Jakarta Sans, JetBrains Mono
- **Icons:** Lucide React, Custom SVG Brand Icons
- **Effects:** Canvas Confetti
- **Backend Ready:** Firebase Firestore / Auth architecture with resilient mock fallback

---

## 📂 Project Structure

```
src/
├── assets/                 # Brand images and logos
├── components/             # Reusable UI components
│   ├── EventRegisterModal.jsx
│   ├── JoinCommunityModal.jsx
│   ├── BlogModal.jsx
│   ├── GalleryLightbox.jsx
│   ├── MarqueeBanner.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── SocialIcons.jsx
├── context/                # Theme and Modal contexts
│   ├── ThemeContext.jsx
│   └── ModalContext.jsx
├── data/                   # Centralized data files (EASY TO EDIT!)
│   ├── siteConfig.js       # Organization info, links, socials
│   ├── statsData.js        # Counter numbers
│   ├── domainsData.js      # 8 technology domains
│   ├── teamData.js         # Core team members & leads
│   ├── eventsData.js       # Upcoming & past events
│   ├── projectsData.js     # Community projects
│   ├── galleryData.js      # Photos & captions
│   ├── achievementsData.js # Milestones & awards
│   └── blogsData.js        # Articles & tutorials
├── pages/                  # Page routes
│   ├── Home.jsx            # Master landing page
│   ├── About.jsx           # Dedicated about view
│   ├── Events.jsx          # Dedicated events view
│   ├── Gallery.jsx         # Dedicated gallery view
│   └── NotFound.jsx        # 404 page
├── sections/               # Modular landing page sections
│   ├── HeroSection.jsx
│   ├── StatsSection.jsx
│   ├── AboutSection.jsx
│   ├── DomainsSection.jsx
│   ├── EventsSection.jsx
│   ├── ProjectsSection.jsx
│   ├── GallerySection.jsx
│   ├── AchievementsSection.jsx
│   ├── TeamSection.jsx
│   ├── BlogSection.jsx
│   └── CtaSection.jsx
├── services/               # Firebase & storage service layer
│   └── firebaseService.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Development Server
Start the local Vite dev server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
Generate an optimized production build and sitemap:
```bash
npm run build
```

---

## ⚙️ Content Customization

You don't need to dig into complex JSX code to update information! All data is separated in `src/data/`:

- **Change stats:** Edit `src/data/statsData.js`
- **Add or edit an event:** Add an entry in `src/data/eventsData.js`
- **Update team leads:** Add/remove members in `src/data/teamData.js`
- **Showcase a new project:** Add an object in `src/data/projectsData.js`
- **Publish a blog post:** Add an article in `src/data/blogsData.js`
- **Add gallery photos:** Add images to `src/data/galleryData.js`

---

## 🔥 Optional Firebase Integration

The site is 100% functional out of the box using built-in local persistence. When you're ready to connect live Firebase Firestore:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Add a web app to your Firebase project.
3. Create a `.env.local` file in the root folder:
```properties
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```
4. `src/services/firebaseService.js` will automatically detect the keys and route registrations directly to your Firestore collections!

---

## 📜 License & Community Disclaimer

GDG On Campus AASC is an independent student group; activities and the opinions expressed here should not in any way be reflected as official Google statements or operations.

© 2026 GDG On Campus AASC. All rights reserved.
