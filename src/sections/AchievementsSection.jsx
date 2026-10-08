import { achievementsData } from "../data/achievementsData";
import { Trophy, Award, Users, GitPullRequest, Star, Sparkles } from "lucide-react";

const ICON_MAP = {
  Trophy,
  Award,
  Users,
  GitPullRequest,
  Star,
  Sparkles,
};

const COLOR_MAP = {
  yellow: {
    accent: "text-[#FBBC04]",
    bg: "bg-[#FBBC04]/10",
    border: "hover:border-[#FBBC04]/50",
    badge: "bg-[#FBBC04]/10 text-[#d97706] dark:text-[#FBBC04] border-[#FBBC04]/20",
  },
  blue: {
    accent: "text-[#4285F4]",
    bg: "bg-[#4285F4]/10",
    border: "hover:border-[#4285F4]/50",
    badge: "bg-[#4285F4]/10 text-[#4285F4] border-[#4285F4]/20",
  },
  green: {
    accent: "text-[#34A853]",
    bg: "bg-[#34A853]/10",
    border: "hover:border-[#34A853]/50",
    badge: "bg-[#34A853]/10 text-[#34A853] border-[#34A853]/20",
  },
  red: {
    accent: "text-[#EA4335]",
    bg: "bg-[#EA4335]/10",
    border: "hover:border-[#EA4335]/50",
    badge: "bg-[#EA4335]/10 text-[#EA4335] border-[#EA4335]/20",
  },
};

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-wider text-[#34A853] dark:text-[#6ee7a0] mb-2">
            // EXCELLENCE & RECOGNITION
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Milestones & Accolades
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
            Celebrating our students' triumphs in hackathons, certifications, and global open-source impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.map((item) => {
            const Icon = ICON_MAP[item.icon] || Trophy;
            const theme = COLOR_MAP[item.color] || COLOR_MAP.yellow;

            return (
              <div
                key={item.id}
                className={`p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 ${theme.border}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${theme.bg} ${theme.accent} flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold border ${theme.badge}`}
                    >
                      {item.stat}
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {item.category} • {item.date}
                  </span>

                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white mt-1 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Awarded to:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[190px]">
                    {item.recipient}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
