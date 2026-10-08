import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Sparkles, User, Edit, Trash2 } from "lucide-react";
import { LinkedInIcon as Linkedin, GithubIcon as Github } from "../components/SocialIcons";
import { useAuth } from "../authContext";
import { getTeam, deleteTeamMember } from "../services/firebaseService";

export default function TeamSection() {
  const [filter, setFilter] = useState("all");
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getTeam();
        setTeamMembers(data.sort((a, b) => (a.order || 0) - (b.order || 0)));
      } catch (error) {
        console.error("Failed to fetch team:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    if (!confirm('Are you sure you want to remove this team member?')) return;
    
    try {
      await deleteTeamMember(id);
      setTeamMembers(prev => prev.filter(member => member.id !== id));
    } catch (error) {
      alert("Error removing team member: " + error.message);
    }
  };

  const filterTabs = [
    { label: "All Leads", key: "all" },
    { label: "Organizer & Tech", key: "core" },
    { label: "Engineering Leads", key: "tech" },
    { label: "Creative & Media", key: "creative" },
    { label: "Operations & Outreach", key: "operations" },
  ];

  const filteredMembers = teamMembers.filter((member) => {
    if (filter === "all") return true;
    if (filter === "core") return member.category === "organizer" || member.category === "tech";
    return member.category === filter;
  });

  return (
    <section id="team" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-wider text-[#4285F4] dark:text-[#8ab4f8] mb-2">
            // THE PEOPLE BEHIND THE MOVEMENT
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Meet the Core Team.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 mb-6">
            Student organizers, technical mentors, and domain heads driving technology learning at Alpha Arts and Science College.
          </p>
          
          {isAdmin && (
            <Link 
                to="/admin/team"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4285F4]/10 hover:bg-[#4285F4]/20 border border-[#4285F4]/30 text-[#4285F4] rounded-xl font-bold transition-all"
            >
                <User className="w-4 h-4" /> Add New Team Member
            </Link>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                filter === tab.key
                  ? "bg-[#4285F4] text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Team Cards Grid */}
        {loading ? (
          <div className="text-center py-12 text-slate-400">Loading team members...</div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-12 text-slate-400">No team members found in this category.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl p-5 glass-card border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center group hover:border-[#4285F4]/50 transition-all duration-300 relative overflow-hidden"
              >
                {/* Profile Photo with Google ring */}
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#34A853] group-hover:scale-105 transition-transform duration-300 shadow-md">
                    <img
                      src={member.photoUrl || member.avatar}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover bg-slate-200 dark:bg-slate-800"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=4285f4,ea4335,fbbc04,34a853`;
                      }}
                    />
                  </div>
                </div>

                {/* Name & Role */}
                <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white group-hover:text-[#4285F4] transition-colors leading-snug">
                  {member.name}
                </h3>

                <div className="mt-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-[#4285F4] dark:text-[#8ab4f8] border border-slate-200 dark:border-slate-700/80">
                    {member.role}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed flex-grow">
                  {member.bio}
                </p>

                {/* Social Connections */}
                <div className="flex items-center space-x-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 w-full justify-center">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#4285F4] hover:bg-[#4285F4]/10 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} GitHub`}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Admin Actions */}
                {isAdmin && (
                  <div className="w-full flex gap-2 mt-4 pt-4 border-t border-slate-800">
                    <Link 
                      to={`/admin/team/${member.id}`}
                      className="flex-1 flex justify-center items-center gap-1.5 py-1.5 rounded-md text-[10px] font-bold bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    >
                      <Edit className="w-3 h-3" /> Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(member.id)}
                      className="flex-1 flex justify-center items-center gap-1.5 py-1.5 rounded-md text-[10px] font-bold bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
