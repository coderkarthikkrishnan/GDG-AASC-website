import {
  Code,
  Laptop,
  Globe2,
  Users2,
  Sparkles,
  Cpu,
  Workflow,
  Share2,
  BookOpen,
  Trophy,
} from "lucide-react";

export default function AboutSection({ onOpenJoinModal }) {
  const focusAreas = [
    { title: "Technology Learning", icon: BookOpen, color: "text-[#4285F4]" },
    { title: "Hands-on Workshops", icon: Laptop, color: "text-[#EA4335]" },
    { title: "Coding Sessions", icon: Code, color: "text-[#FBBC04]" },
    { title: "Google Technologies", icon: Sparkles, color: "text-[#34A853]" },
    { title: "AI and Cloud", icon: Cpu, color: "text-[#4285F4]" },
    { title: "Open-source Contribution", icon: Workflow, color: "text-[#EA4335]" },
    { title: "Hackathons", icon: Trophy, color: "text-[#FBBC04]" },
    { title: "Real-world Projects", icon: Globe2, color: "text-[#34A853]" },
    { title: "Networking & Collaboration", icon: Users2, color: "text-[#4285F4]" },
  ];

  const pillars = [
    {
      title: "Learn by doing",
      desc: "Every session concludes with code running on your laptop or a tool you deployed live.",
      color: "text-[#4285F4]",
      border: "border-[#4285F4]/30",
      bg: "bg-[#4285F4]/5",
    },
    {
      title: "Globally connected",
      desc: "Part of the worldwide Google Developer Groups network spanning universities in 100+ countries.",
      color: "text-[#FBBC04]",
      border: "border-[#FBBC04]/30",
      bg: "bg-[#FBBC04]/5",
    },
    {
      title: "Built by students",
      desc: "Run by Alpha Arts and Science College students, designed directly for student developer aspirations.",
      color: "text-[#34A853]",
      border: "border-[#34A853]/30",
      bg: "bg-[#34A853]/5",
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-[#EA4335] dark:text-[#ff7a6b]">
              // ABOUT THE CHAPTER
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
              What is GDG On Campus?
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#4285F4] to-[#EA4335] rounded-full" />
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal pt-2">
              <strong className="text-slate-900 dark:text-white">GDG On Campus – Alpha Arts and Science College (AASC)</strong> is a university-based community group supported by Google Developers. We create a welcoming environment for students interested in technology to bridge the gap between classroom theory and real-world software engineering.
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Whether you are writing your first line of code or building distributed machine learning models, our chapter offers peer-to-peer workshops, mentorship circles, hackathons, and community projects that empower you to launch ideas into reality.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenJoinModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:opacity-90 transition-opacity shadow-sm"
              >
                Become a Community Member →
              </button>
            </div>
          </div>

          {/* Interactive Feature Matrix / Visual */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4285F4]/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#34A853]/10 rounded-full blur-2xl" />

              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 font-heading">
                Core Focus Areas
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {focusAreas.map((area, idx) => {
                  const Icon = area.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-[#171f2e] border border-slate-200/80 dark:border-slate-800 flex items-center gap-2.5 transition-all hover:border-[#4285F4]/50 hover:shadow-xs group"
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${area.color} group-hover:scale-110 transition-transform`} />
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {area.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>Alpha Arts & Science College</span>
                <span className="text-[#34A853] font-bold">Open to All Streams</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 ${pillar.bg} transition-all hover:-translate-y-1`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-current opacity-80" />
                <h3 className={`text-lg font-bold font-heading ${pillar.color}`}>
                  {pillar.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
