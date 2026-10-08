import { Rocket, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="top" className="relative pt-6 pb-20 sm:pt-12 sm:pb-32 lg:pt-16 lg:pb-40 overflow-hidden bg-[#0a0c10] text-white selection:bg-[#4285F4]/30">

      {/* ── Refined Premium Background Glows ─────────────────────────────── */}
      {/* Soft Green Glow Left */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#34A853]/15 rounded-full blur-[140px] pointer-events-none z-0 mix-blend-screen" />
      {/* Soft Blue/White Glow Right */}
      <div className="absolute top-[5%] right-[-5%] w-[600px] h-[600px] bg-[#4285F4]/15 rounded-full blur-[160px] pointer-events-none z-0 mix-blend-screen" />
      {/* Soft Red Glow Center-Right */}
      <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] bg-[#EA4335]/15 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen" />

      {/* ── Premium Floating Organic Blob ────────────────────────────────── */}
      <div className="absolute top-40 right-10 lg:right-32 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-[#FBBC04] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-blob opacity-80 z-0" />

      {/* ── Floating Badges ────────────────────────────────────────────── */}
      <div className="absolute top-64 right-8 lg:right-[15%] z-20 hidden sm:block rotate-[-4deg] animate-float">
        <div className="px-4 py-1.5 rounded-full border border-[#34A853]/50 bg-[#0a0c10]/60 backdrop-blur-md text-[#34A853] text-sm font-semibold tracking-wide shadow-sm flex items-center gap-2">
          open to everyone <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      <div className="absolute bottom-20 right-[10%] lg:right-[20%] z-20 hidden sm:block rotate-[6deg] animate-float-delayed">
        <div className="px-5 py-2 rounded-full border border-[#4285F4]/50 bg-[#0a0c10]/60 backdrop-blur-md text-[#4285F4] text-sm font-semibold tracking-wide shadow-sm">
          250+ members
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-start text-left mt-0 lg:mt-4">


        {/* ── Main Heading ──────────────────────────────────────────── */}
        <h1 className="text-[3.5rem] sm:text-6xl md:text-[5.5rem] lg:text-[7rem] font-black font-heading leading-[1.05] tracking-tight mb-8">
          <div className="block text-slate-100">Where ideas <span className="text-[#8ab4f8]">ignite,</span></div>
          <div className="block text-slate-100">builders <span className="text-[#81c995]">rise,</span></div>
          <div className="block relative inline-block text-slate-100">
            <span className="text-[#f28b82]">& legends</span> ship
            {/* Smooth SVG Squiggly Line */}
            <div className="absolute -bottom-2 sm:-bottom-4 left-0 w-full overflow-hidden">
              <svg width="100%" height="20" viewBox="0 0 400 20" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10C20 10 20 18 40 18C60 18 60 2 80 2C100 2 100 10 120 10C140 10 140 18 160 18C180 18 180 2 200 2C220 2 220 10 240 10C260 10 260 18 280 18C300 18 300 2 320 2C340 2 340 10 360 10C380 10 380 18 400 18" stroke="#fdd663" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {/* Sparkle icon accent */}
            <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 text-[#fdd663] animate-pulse">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            </div>
          </div>
        </h1>

        {/* ── Subtitle ────────────────────────────────────────────── */}
        <p className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed mb-12 font-medium">
          Your launchpad at <strong className="text-slate-100 font-bold">Alpha Arts & Science College</strong> — 9 domains, 250+ builders, zero gatekeeping. Come for the workshops, stay for the community that ships real things.
        </p>

        {/* ── Buttons ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <a
            href="https://chat.whatsapp.com/GWnf9o4Q0wED4Kc9RboBuc"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-[15px] text-[#0a0c10] bg-[#a8c7fa] overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(168,199,250,0.3)] hover:shadow-[0_0_30px_rgba(168,199,250,0.5)] w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Rocket className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Become a GDG Member</span>
          </a>

          <a
            href="#domains"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("domains")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-[15px] text-slate-300 border border-slate-700 bg-white/5 hover:bg-white/10 hover:border-slate-500 hover:text-white transition-all duration-300 w-full sm:w-auto shadow-sm"
          >
            Explore Domains
          </a>
        </div>

      </div>
    </section>
  );
}
