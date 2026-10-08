import {
  Globe,
  Brain,
  Cloud,
  Smartphone,
  Palette,
  Code2,
  GitBranch,
  Cpu,
  Database,
  ShieldCheck,
  BarChart2,
  Megaphone,
  ArrowUpRight,
  User,
} from "lucide-react";
import { domainsData, mentorData } from "../data/domainsData";

// ─── icon registry ─────────────────────────────────────────────────────────
const ICON_MAP = {
  Globe,
  Brain,
  Cloud,
  Smartphone,
  Palette,
  Code2,
  GitBranch,
  Cpu,
  Database,
  ShieldCheck,
  BarChart2,
  Megaphone,
};

// ─── colour tokens ─────────────────────────────────────────────────────────
const COLOR_CONFIG = {
  blue: {
    accent: "text-[#4285F4]",
    borderHover: "hover:border-[#4285F4]/60",
    bgHover: "group-hover:bg-[#4285F4]/10",
    glow: "hover:shadow-[0_0_30px_-5px_rgba(66,133,244,0.25)]",
    badge: "bg-[#4285F4]/10 text-[#4285F4] dark:bg-[#4285F4]/20",
    coLeadBadge: "bg-[#4285F4]/5 text-[#4285F4]/80 dark:bg-[#4285F4]/10",
  },
  red: {
    accent: "text-[#EA4335]",
    borderHover: "hover:border-[#EA4335]/60",
    bgHover: "group-hover:bg-[#EA4335]/10",
    glow: "hover:shadow-[0_0_30px_-5px_rgba(234,67,53,0.25)]",
    badge: "bg-[#EA4335]/10 text-[#EA4335] dark:bg-[#EA4335]/20",
    coLeadBadge: "bg-[#EA4335]/5 text-[#EA4335]/80 dark:bg-[#EA4335]/10",
  },
  yellow: {
    accent: "text-amber-500 dark:text-[#FBBC04]",
    borderHover: "hover:border-amber-400 dark:hover:border-[#FBBC04]/60",
    bgHover: "group-hover:bg-amber-500/10 dark:group-hover:bg-[#FBBC04]/10",
    glow: "hover:shadow-[0_0_30px_-5px_rgba(251,188,4,0.25)]",
    badge: "bg-amber-100/90 text-amber-800 dark:bg-[#FBBC04]/20 dark:text-[#FBBC04]",
    coLeadBadge: "bg-amber-50 text-amber-700 dark:bg-[#FBBC04]/10 dark:text-[#FBBC04]/80",
  },
  green: {
    accent: "text-[#34A853]",
    borderHover: "hover:border-[#34A853]/60",
    bgHover: "group-hover:bg-[#34A853]/10",
    glow: "hover:shadow-[0_0_30px_-5px_rgba(52,168,83,0.25)]",
    badge: "bg-[#34A853]/10 text-[#34A853] dark:bg-[#34A853]/20",
    coLeadBadge: "bg-[#34A853]/5 text-[#34A853]/80 dark:bg-[#34A853]/10",
  },
};

export default function DomainsSection({ onOpenJoinModal }) {
  return (
    <section id="domains" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#34A853] dark:text-[#6ee7a0] mb-2">
              // WHERE THE WORK HAPPENS
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
              Nine Specialized Domains.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-xl">
              Every domain runs regular hands-on workshops, build sprints, and peer coding jams led by dedicated student leads and co-leads.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="https://chat.whatsapp.com/GWnf9o4Q0wED4Kc9RboBuc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4285F4] dark:text-[#8ab4f8] hover:underline"
            >
              Ready to be part of the community? Join us →
            </a>
          </div>
        </div>

        {/* ── Domain Cards Grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domainsData.map((domain) => {
            const Icon = ICON_MAP[domain.icon] || Globe;
            const theme = COLOR_CONFIG[domain.color] || COLOR_CONFIG.blue;

            return (
              <div
                key={domain.id}
                className={`group relative p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col justify-between ${theme.borderHover} ${theme.glow}`}
              >
                <div>
                  {/* ── Icon ──────────────────────────────────── */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center mb-4 transition-all ${theme.bgHover}`}
                  >
                    <Icon className={`w-6 h-6 ${theme.accent} transition-transform group-hover:scale-110`} />
                  </div>

                  {/* ── Domain name ──────────────────────────── */}
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white group-hover:text-[#4285F4] transition-colors">
                    {domain.name}
                  </h3>

                  {/* ── Description ──────────────────────────── */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {domain.shortDescription}
                  </p>
                </div>

                {/* ── Lead / Co-Lead + Tags ─────────────────── */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                  {/* Lead & Co-Lead badges */}
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${theme.badge}`}>
                      <User className="w-3 h-3" />
                      Lead: {domain.lead}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium ${theme.coLeadBadge} border border-slate-100 dark:border-slate-800`}>
                      Co-Lead: {domain.coLead}
                    </span>
                  </div>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {domain.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Join CTA */}
                  <a
                    href="https://chat.whatsapp.com/GWnf9o4Q0wED4Kc9RboBuc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-1 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors"
                  >
                    <span>Join this domain</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Mentor Card ───────────────────────────────────────────────── */}
        <div className="mt-10 p-6 rounded-2xl border border-[#4285F4]/30 bg-[#4285F4]/5 dark:bg-[#4285F4]/10 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#34A853] flex items-center justify-center shrink-0 shadow-md">
            <User className="w-7 h-7 text-white" />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#4285F4] dark:text-[#8ab4f8] mb-1">
              Faculty Mentor
            </p>
            <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
              {mentorData.name}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-lg">
              {mentorData.bio}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
