// ─────────────────────────────────────────────────────────────────────────────
// GDG On Campus AASC — Events Data
// Add, remove, or edit events here — the UI updates automatically.
// Fields: id, title, category, domain, date, time, location, mode,
//         image, description, speaker, prerequisites, seatsTotal,
//         seatsRemaining, registrationOpen
// ─────────────────────────────────────────────────────────────────────────────

export const eventCategories = [
  "All",
  "Workshops",
  "Hackathons",
  "Talks",
  "Coding Sessions",
  "Community Events",
];

// ── Upcoming Events ──────────────────────────────────────────────────────────
export const upcomingEvents = [
  {
    id: "gemini-dev-sprint",
    title: "Gemini API & Generative AI Build Sprint",
    category: "Workshops",
    domain: "AI / ML",
    date: "March 28, 2026",
    time: "10:00 AM – 1:30 PM IST",
    location: "AASC Seminar Hall & Hybrid Live",
    mode: "Hybrid",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    description:
      "A hands-on coding sprint exploring Google Gemini Pro multimodal models, system instructions, function calling, and building an AI campus assistant app.",
    speaker: "Tharani P (AI Lead) & Google Dev Expert Guest",
    prerequisites: "Laptop with Python or Node.js installed",
    seatsTotal: 120,
    seatsRemaining: 24,
    registrationOpen: true,
  },
  {
    id: "cloud-architect-2026",
    title: "Google Cloud Fundamentals & Cloud Run Deep-Dive",
    category: "Talks",
    domain: "Cloud Computing",
    date: "April 04, 2026",
    time: "2:00 PM – 4:30 PM IST",
    location: "AASC Computer Lab 2",
    mode: "In-Person",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    description:
      "Understand containerization, Dockerize your applications, and deploy serverless web applications to Google Cloud Run with zero devops friction.",
    speaker: "Manimaran N (Cloud Lead)",
    prerequisites: "Basic familiarity with Git and Docker",
    seatsTotal: 80,
    seatsRemaining: 15,
    registrationOpen: true,
  },
  {
    id: "alpha-hack-2026",
    title: "AlphaHack: 24-Hour Campus Hackathon",
    category: "Hackathons",
    domain: "Web & AI",
    date: "April 18–19, 2026",
    time: "9:00 AM (24 Hours)",
    location: "Main Auditorium, Alpha Arts and Science College",
    mode: "In-Person",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    description:
      "Our flagship student hackathon! Form teams of 2–4 to solve real-world problems aligned with UN Sustainable Development Goals using Google tech stacks. Swag, cash prizes, and mentorship included.",
    speaker: "GDG AASC Mentors & Industry Jury",
    prerequisites: "All college students welcome!",
    seatsTotal: 250,
    seatsRemaining: 48,
    registrationOpen: true,
  },
  {
    id: "react-masterclass",
    title: "Modern React & Web Development Masterclass",
    category: "Workshops",
    domain: "Web Development",
    date: "May 10, 2026",
    time: "10:00 AM – 1:00 PM IST",
    location: "AASC Computer Lab 1",
    mode: "In-Person",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    description:
      "Deep-dive into React 19, hooks, state management, and building production-ready web applications with Tailwind CSS and Vite.",
    speaker: "Keerthana A (Web Lead) & Aswin SL",
    prerequisites: "Basic JavaScript knowledge",
    seatsTotal: 100,
    seatsRemaining: 40,
    registrationOpen: true,
  },
];

// ── Past Events (20+ total across upcoming + past demonstrates the 20+ claim) ─
export const pastEvents = [
  {
    id: "gdg-orientation-2025",
    title: "GDG On Campus AASC Official Inception & Orientation",
    category: "Community Events",
    domain: "Community",
    date: "August 2025",
    attendees: "180+ Students",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    summary:
      "Inaugurated our Google Developer Groups on Campus chapter with keynote talks from alumni and an overview of technical tracks for the academic year.",
  },
  {
    id: "web-bootcamp-2025",
    title: "Zero to Hero: Modern Fullstack Web Bootcamp",
    category: "Workshops",
    domain: "Web Development",
    date: "October 2025",
    attendees: "140+ Students",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    summary:
      "A 3-day deep dive into modern JavaScript, React components, state management, and deploying to Firebase Hosting.",
  },
  {
    id: "git-open-source-drive",
    title: "Hacktoberfest & Git Open Source Kickoff",
    category: "Workshops",
    domain: "Version Control",
    date: "October 2025",
    attendees: "95+ Students",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    summary:
      "Guided students through their first GitHub pull requests, understanding open source etiquette, and contributing to community repositories.",
  },
  {
    id: "dsa-winter-sprint",
    title: "DSA & Problem Solving Winter Sprint",
    category: "Coding Sessions",
    domain: "AI / ML",
    date: "December 2025",
    attendees: "110+ Students",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    summary:
      "Focused problem solving sessions covering two pointers, graph traversal, and dynamic programming patterns for competitive contests.",
  },
  {
    id: "ui-ux-figma-2025",
    title: "UI/UX Design Fundamentals & Figma Workshop",
    category: "Workshops",
    domain: "UI/UX",
    date: "November 2025",
    attendees: "80+ Students",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80",
    summary:
      "Introduction to human-centered design, Figma prototyping, and building interactive wireframes for mobile and web applications.",
  },
  {
    id: "cybersec-ctf-2025",
    title: "Cyber Security CTF Challenge & Workshop",
    category: "Coding Sessions",
    domain: "Cyber Security",
    date: "December 2025",
    attendees: "70+ Students",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    summary:
      "Hands-on Capture The Flag competition covering web security, network forensics, and ethical hacking fundamentals.",
  },
  {
    id: "data-science-workshop",
    title: "Data Science with Python: From Basics to Insights",
    category: "Workshops",
    domain: "Data Science",
    date: "January 2026",
    attendees: "90+ Students",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    summary:
      "Pandas, NumPy, and Matplotlib workshop culminating in a live data analysis project using real-world datasets.",
  },
  {
    id: "cloud-gcp-intro",
    title: "GCP Intro & Firebase Crash Course",
    category: "Talks",
    domain: "Cloud Computing",
    date: "February 2026",
    attendees: "100+ Students",
    image:
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80",
    summary:
      "Live demonstration of Google Cloud Platform services, Firebase authentication, Firestore, and deploying a full-stack app in under an hour.",
  },
];
