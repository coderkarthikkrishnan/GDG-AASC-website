import { X, Calendar, Clock, User, Share2, Bookmark, Check } from "lucide-react";
import { useState } from "react";

export default function BlogModal({ blog, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !blog) return null;

  const handleShare = () => {
    try {
      if (navigator.share) {
        navigator.share({
          title: blog.title,
          text: blog.snippet,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-[#121824] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover Image banner */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-slate-900">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#4285F4] text-white mb-2 shadow-sm">
              {blog.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white leading-tight">
              {blog.title}
            </h2>
          </div>
        </div>

        {/* Author / Metadata strip */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <img
              src={blog.authorAvatar}
              alt={blog.author}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
            />
            <div>
              <p className="font-semibold text-slate-900 dark:text-white leading-none">
                {blog.author}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">{blog.authorRole}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {blog.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {blog.readTime}
            </span>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Share Article"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Post Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
          <p className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200 italic border-l-4 border-[#4285F4] pl-4 py-1">
            {blog.snippet}
          </p>

          <div className="prose dark:prose-invert max-w-none pt-2">
            {blog.content.split("\n\n").map((block, idx) => {
              if (block.startsWith("### ")) {
                return (
                  <h3 key={idx} className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-6 mb-2">
                    {block.replace("### ", "")}
                  </h3>
                );
              }
              if (block.startsWith("#### ")) {
                return (
                  <h4 key={idx} className="text-base font-bold text-slate-800 dark:text-slate-100 mt-4 mb-1">
                    {block.replace("#### ", "")}
                  </h4>
                );
              }
              if (block.startsWith("> ")) {
                return (
                  <blockquote key={idx} className="border-l-2 border-[#FBBC04] pl-4 italic text-slate-600 dark:text-slate-300 my-3">
                    {block.replace("> ", "")}
                  </blockquote>
                );
              }
              if (block.startsWith("```")) {
                const lines = block.split("\n");
                const code = lines.slice(1, -1).join("\n");
                return (
                  <pre key={idx} className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono overflow-x-auto my-3 border border-slate-800">
                    <code>{code}</code>
                  </pre>
                );
              }
              return (
                <p key={idx} className="my-2 leading-relaxed text-slate-600 dark:text-slate-300">
                  {block}
                </p>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex items-center justify-between text-xs text-slate-500">
          <span>GDG On Campus AASC Developer Publications</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
