import { useState } from "react";
import { X, MessageSquare, Send, CheckCircle, ExternalLink, Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { siteConfig } from "../data/siteConfig";
import { joinCommunity } from "../services/firebaseService";

export default function JoinCommunityModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "Computer Science",
    year: "1st Year",
    interests: ["Web Development", "AI & ML"],
  });
  const [submitting, setSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);

  if (!isOpen) return null;

  const handleInterestToggle = (domain) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(domain)
        ? prev.interests.filter((i) => i !== domain)
        : [...prev.interests, domain],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    setSubmitting(true);
    await joinCommunity(formData);
    setSubmitting(false);
    setJoined(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#4285F4", "#EA4335", "#FBBC04", "#34A853"],
      });
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#121824] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-2 w-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853]" />

        <div className="flex items-start justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#34A853]">
                Member Onboarding
              </span>
            </div>
            <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Join GDG On Campus AASC
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Connect with 100+ student builders, designers, and innovators at Alpha Arts and Science College.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {joined ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-[#34A853]/10 text-[#34A853] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                Welcome to the Family! 🚀
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                You're now an official student member of <strong className="text-slate-900 dark:text-white">GDG On Campus AASC</strong>. Join our official chat channels below to start collaborating:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={siteConfig.links.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 font-semibold text-xs transition-colors border border-[#25D366]/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Group
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
                <a
                  href={siteConfig.links.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#5865F2]/10 text-[#5865F2] hover:bg-[#5865F2]/20 font-semibold text-xs transition-colors border border-[#5865F2]/20"
                >
                  <Send className="w-4 h-4" />
                  Discord Server
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  Close & Explore
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Quick Channels */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={siteConfig.links.communityPortal}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 hover:border-[#4285F4] transition-all group flex flex-col items-start"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#4285F4]">Official RSVP</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white mt-1 group-hover:text-[#4285F4] flex items-center gap-1">
                    Google Portal <ExternalLink className="w-3 h-3" />
                  </span>
                </a>

                <a
                  href={siteConfig.links.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 hover:border-[#34A853] transition-all group flex flex-col items-start"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#34A853]">Direct Chat</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white mt-1 group-hover:text-[#34A853] flex items-center gap-1">
                    WhatsApp <ExternalLink className="w-3 h-3" />
                  </span>
                </a>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-slate-400">or sign up directly</span>
                <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              </div>

              {/* Direct Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vignesh R."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    College Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@alphaarts.edu.in"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Department
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="BCA">BCA</option>
                      <option value="Information Technology">IT</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Year
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="PG">PG</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Domains of Interest
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {["Web Dev", "AI & ML", "Google Cloud", "Android", "UI/UX", "CP & DSA", "Open Source"].map(
                      (domain) => {
                        const selected = formData.interests.includes(domain);
                        return (
                          <button
                            type="button"
                            key={domain}
                            onClick={() => handleInterestToggle(domain)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                              selected
                                ? "bg-[#4285F4] text-white"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                            }`}
                          >
                            {domain}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#4285F4] to-[#34A853] hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-md"
                  >
                    {submitting ? (
                      <span>Joining...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Join Community
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
