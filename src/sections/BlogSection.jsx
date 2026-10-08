import { useState } from "react";
import { blogsData, blogCategories } from "../data/blogsData";
import BlogModal from "../components/BlogModal";
import { Calendar, Clock, ArrowRight, BookOpen, User } from "lucide-react";

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredBlogs = blogsData.filter((b) => {
    if (activeCategory === "All") return true;
    return b.category === activeCategory;
  });

  const handleOpenBlog = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  return (
    <section id="blog" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#EA4335] dark:text-[#ff7a6b] mb-2">
              // WRITTEN BY STUDENT BUILDERS
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
              Developer Blog & Stories.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-xl">
              Tutorials, architectural breakdowns, hackathon reflections, and announcements from the GDG AASC community.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <BookOpen className="w-4 h-4 text-[#EA4335]" />
            <span>Curated by Content Lead</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-[#EA4335] text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="rounded-2xl overflow-hidden glass-card border border-slate-200 dark:border-slate-800 flex flex-col justify-between group hover:border-[#EA4335]/50 transition-all duration-300"
            >
              <div>
                {/* Cover Image */}
                <div
                  className="relative h-48 w-full overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => handleOpenBlog(blog)}
                >
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#EA4335] text-white shadow-sm">
                    {blog.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta info */}
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#4285F4]" />
                      {blog.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#FBBC04]" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3
                    onClick={() => handleOpenBlog(blog)}
                    className="text-lg font-bold font-heading text-slate-900 dark:text-white group-hover:text-[#EA4335] transition-colors leading-snug cursor-pointer line-clamp-2"
                  >
                    {blog.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed line-clamp-3">
                    {blog.snippet}
                  </p>
                </div>
              </div>

              {/* Author & Read More button */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={blog.authorAvatar}
                    alt={blog.author}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                  />
                  <div className="text-[11px] leading-tight">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                      {blog.author}
                    </span>
                    <span className="text-slate-400 text-[10px]">{blog.authorRole}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenBlog(blog)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#EA4335] hover:text-red-600 transition-colors"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      <BlogModal
        blog={selectedBlog}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
