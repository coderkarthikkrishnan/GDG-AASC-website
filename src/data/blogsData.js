export const blogCategories = [
  "All",
  "Technology Articles",
  "Event Recaps",
  "Student Experiences",
  "Project Tutorials",
  "GDG Announcements",
];

export const blogsData = [
  {
    id: "getting-started-gemini-api",
    title: "Building Your First AI App with Google Gemini 1.5 and React",
    category: "Project Tutorials",
    author: "Pooja Raman",
    authorRole: "AI/ML Lead",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    date: "February 18, 2026",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    color: "blue",
    snippet:
      "A step-by-step walkthrough of generating Gemini API keys, utilizing the Google Generative AI SDK, and streaming responses directly into a modern React component.",
    content: `
### Why Google Gemini 1.5?

The Gemini 1.5 model family introduces unprecedented multimodal reasoning and a context window of up to 1 million tokens. For student developers building apps like smart lecture summarizers or research code assistants, this opens immense possibilities without running expensive local hardware.

#### 1. Obtaining Your API Key
Head to **Google AI Studio** (aistudio.google.com), sign in with your Google account, and click **Create API Key**. Store this securely in your \`.env.local\` file:

\`\`\`bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

#### 2. Installing the Google Gen AI SDK
In your project terminal:
\`\`\`bash
npm install @google/genai
\`\`\`

#### 3. Generating Your First Prompt
Using the official SDK:
\`\`\`javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
const response = await ai.models.generateContent({
  model: "gemini-1.5-flash",
  contents: "Explain binary search in 2 simple sentences.",
});
console.log(response.text);
\`\`\`

#### 4. Tips from the AASC Workshop
- Always set system instructions to focus the model persona.
- Keep temperature around 0.2 for strict code answers, or 0.7 for creative brainstorming.
- Join our upcoming GDG AI Sprint to build a full campus assistant!
    `,
  },
  {
    id: "alphahack-2025-recap",
    title: "AlphaHack 2025 Recap: 24 Hours, 40 Teams, Infinite Caffeine",
    category: "Event Recaps",
    author: "Gowtham Raj",
    authorRole: "Events Lead",
    authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    date: "November 10, 2025",
    readTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    color: "red",
    snippet:
      "Looking back at our inaugural 24-hour campus hackathon at Alpha Arts and Science College — the standout hacks, mentorship moments, and the road ahead.",
    content: `
### A Milestone for AASC Developers

Over the weekend of October 25th, the Alpha Arts and Science College auditorium transformed into an electric hive of innovation. 160+ students grouped into 40 teams worked tirelessly through the night to build solutions addressing education, healthcare, and sustainability.

#### The Highlights
- **12 Industry Mentors:** Engineers and GDG leads joined on-site and virtually to review architectures, unblock Git merge conflicts, and refine pitch decks.
- **Midnight Pizza & Red Bull:** Energy remained high at 3:00 AM with our developer trivia round and impromptu algorithmic speed battles.
- **Winning Hack:** Team *AlphaDevs* took home the first prize with their smart energy monitoring IoT node and campus dashboard.

> "AlphaHack proved that talent exists in abundance at AASC; all students needed was the right stage, mentorship, and community backing." — Aakash B., Lead Organizer.
    `,
  },
  {
    id: "mastering-docker-and-cloud-run",
    title: "Zero-Downtime Deployments with Docker and Google Cloud Run",
    category: "Technology Articles",
    author: "Dinesh Kumar",
    authorRole: "Cloud Lead",
    authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    date: "January 14, 2026",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    color: "yellow",
    snippet:
      "Why manage virtual servers when you can deploy containerized microservices that scale to zero? A practical guide to Google Cloud Run for college projects.",
    content: `
### What is Serverless Containers?

Serverless compute allows you to run applications without managing the underlying virtual machines. Google Cloud Run takes this further: bring *any* language or binary packaged in a Docker container, and GCP handles automatic scaling from 0 to 1,000 instances in seconds.

#### The Secret Sauce: Multi-Stage Dockerfile
A common mistake student developers make is pushing 1GB heavy development images to the cloud. Here is how we build ultra-lean 50MB production containers:

\`\`\`dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runner stage
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
RUN npm install -g serve
EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
\`\`\`

#### Deploying in One Line
\`\`\`bash
gcloud run deploy aasc-portal --source . --region asia-south1 --allow-unauthenticated
\`\`\`

With Google Cloud's free tier offering 2 million requests per month, every AASC student can host their portfolio and capstone projects for free!
    `,
  },
  {
    id: "freshman-to-developer-journey",
    title: "From 'Hello World' to Shipping Production Code: A Freshman Journey",
    category: "Student Experiences",
    author: "Kavya Sridhar",
    authorRole: "Content Lead",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    date: "December 04, 2025",
    readTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    color: "green",
    snippet:
      "How joining the GDG On Campus AASC community transformed self-doubt into shipping real-world applications and landing open-source contributions.",
    content: `
### Day One Anxiety

When I first entered Alpha Arts and Science College, terminal commands and Git branches felt intimidating. Everyone online seemed to know multiple frameworks, while I was still trying to figure out why CSS flexbox was behaving unpredictably.

Then I attended the **GDG AASC Orientation**.

Instead of lecturing from slides, the leads sat down next to us, showed us their own early failed repositories, and gave us a clear, non-judgmental roadmap.

#### What Changed My Trajectory
1. **Peer Programming Circles:** Every Saturday, 4 to 5 of us sat in the lab building small micro-tools together.
2. **Mentorship Without Condescension:** Asking "silly" questions was celebrated, not mocked.
3. **Building for Real People:** Contributing to the AASC CampusConnect repository gave me my first experience collaborating via GitHub pull requests with real code reviews.

If you are a freshman wondering whether you belong here: **yes, you do.** Show up to our next session!
    `,
  },
  {
    id: "announcing-spring-2026-calendar",
    title: "Announcing the GDG On Campus AASC Spring 2026 Tech Roadmap",
    category: "GDG Announcements",
    author: "Aakash Balasubramanian",
    authorRole: "GDG Organizer",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    date: "February 01, 2026",
    readTime: "3 min read",
    coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    color: "blue",
    snippet:
      "An exciting semester awaits: 4 hands-on bootcamps, the Google Solution Challenge 2026 track, speaker sessions with Google Developer Experts, and AlphaHack 2.0.",
    content: `
### Welcome to Spring 2026 at GDG AASC!

We are thrilled to roll out our most ambitious schedule yet for Alpha Arts and Science College developers:

#### Key Dates
- **March 28:** Gemini API & Generative AI Build Sprint
- **April 04:** Google Cloud Fundamentals & Cloud Run Deep-Dive
- **April 18–19:** AlphaHack 2026 Flagship 24-Hour Campus Hackathon
- **May 02:** Flutter 101 Cross-Platform Mobile Apps
- **Weekly:** Algorithmic Code Jam practice every Wednesday evening.

Registration for all tracks is free for all AASC students. Let's build something wonderful together!
    `,
  },
];
