import { Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

export default function CtaSection({ onOpenJoinModal }) {
  return (
    <section id="contact" className="py-20 sm:py-32 relative overflow-hidden">
      {/* ── Background decoration ─────────────────────────────────────────── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#4285F4]/15 via-[#EA4335]/10 to-[#34A853]/15 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FBBC04]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#4285F4]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">

          {/* ── Top rainbow accent bar ─────────────────────────────────── */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853]" />

          {/* ── Subtle grid overlay ───────────────────────────────────── */}
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,#000 0,#000 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#000 0,#000 1px,transparent 1px,transparent 60px)",
            }}
          />

          {/* ── Content ───────────────────────────────────────────────── */}
          <div className="relative z-10 py-16 sm:py-24 px-8 sm:px-14 text-center">

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#34A853]/10 text-[#34A853] dark:bg-[#34A853]/20 border border-[#34A853]/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
              <span>GDG On Campus AASC · Alpha Arts and Science College</span>
            </div>

            {/* Main heading */}
            <h2 className="text-4xl sm:text-6xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-[1.1] max-w-3xl mx-auto">
              Ready to Build the{" "}
              <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853] bg-clip-text text-transparent">
                Future?
              </span>
            </h2>

            {/* Sub-tagline */}
            <p className="mt-5 text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300 tracking-tight">
              Learn. Build. Collaborate. Lead.
            </p>

            {/* Description */}
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              Join{" "}
              <strong className="text-slate-900 dark:text-white font-semibold">
                GDG On Campus AASC
              </strong>{" "}
              — a community of student developers, designers, and creators building real things together.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://chat.whatsapp.com/GWnf9o4Q0wED4Kc9RboBuc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853] hover:opacity-95 shadow-lg hover:shadow-xl transition-all group"
              >
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Become a GDG Member
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
              >
                Follow Us
                <ExternalLink className="w-4 h-4 opacity-70" />
              </a>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
