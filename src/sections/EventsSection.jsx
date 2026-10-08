import { useState, useEffect } from "react";
import { getEvents } from "../services/firebaseService";
import { eventCategories } from "../data/eventsData"; // Keep categories static or we can extract dynamically
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  CheckCircle,
  Filter,
  Zap,
  Trash2,
  Edit
} from "lucide-react";
import { useAuth } from "../authContext";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// Reusable EventCard for upcoming events
// ─────────────────────────────────────────────────────────────────────────────
function EventCard({ event, onRegister, isAdmin, onDelete }) {
  return (
    <div className="rounded-2xl overflow-hidden glass-card border border-slate-200 dark:border-slate-800 flex flex-col justify-between group hover:border-[#4285F4]/50 transition-all duration-300">
      <div>
        {/* Event Banner */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
          <img
            src={event.imageUrl || event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#4285F4] text-white shadow-sm">
              {event.category}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-sm text-white">
              {event.mode}
            </span>
          </div>

          {/* Bottom overlay info */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90">
            <span className="font-semibold text-[#FBBC04]">{event.domain}</span>
            <span className="text-white/70">{event.seatsRemaining} seats left</span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white group-hover:text-[#4285F4] transition-colors leading-snug">
            {event.title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#4285F4]" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#FBBC04]" />
              <span>{event.time}</span>
            </div>
            <div className="col-span-1 sm:col-span-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#EA4335]" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed line-clamp-3">
            {event.description}
          </p>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-400">
            <span>Lead / Speaker: </span>
            <strong className="text-slate-700 dark:text-slate-300 font-semibold">
              {event.speaker}
            </strong>
          </div>
        </div>
      </div>

      {/* Register CTA */}
      <div className="px-6 pb-6 space-y-3">
        <button
          type="button"
          onClick={() => onRegister(event)}
          className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853] hover:opacity-95 shadow-md flex items-center justify-center gap-2 group-hover:shadow-lg transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Register for Event (Free)
        </button>

        {isAdmin && (
          <div className="flex gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <Link 
                to={`/events/edit/${event.id}`}
                className="flex-1 flex justify-center items-center gap-2 py-2 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:bg-slate-700 transition-colors"
            >
                <Edit className="w-3.5 h-3.5" /> Edit
            </Link>
            <button 
                onClick={() => onDelete(event.id)}
                className="flex-1 flex justify-center items-center gap-2 py-2 rounded-lg text-xs font-bold bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
            >
                <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Reusable PastEventCard
// ─────────────────────────────────────────────────────────────────────────────
function PastEventCard({ item, isAdmin, onDelete }) {
  return (
    <div className="rounded-2xl overflow-hidden glass-card border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
      <div>
        <div className="relative h-40 w-full overflow-hidden bg-slate-900">
          <img
            src={item.imageUrl || item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <span className="absolute bottom-3 left-3 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#34A853] text-white">
            Completed
          </span>
          <span className="absolute bottom-3 right-3 text-[11px] font-semibold text-white/90">
            {item.attendees}
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
            <span>{item.date}</span>
            <span>•</span>
            <span className="text-[#4285F4]">{item.domain}</span>
          </div>

          <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white leading-snug">
            {item.title}
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            {item.description || item.summary}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 text-xs font-semibold text-[#34A853] flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Successfully Concluded</span>
        </div>
        
        {isAdmin && (
          <div className="flex gap-2">
            <Link 
                to={`/events/edit/${item.id}`}
                className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-[#4285F4] transition-colors"
            >
                <Edit className="w-3.5 h-3.5" />
            </Link>
            <button 
                onClick={() => onDelete(item.id)}
                className="p-1.5 rounded-md bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
            >
                <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main EventsSection
// ─────────────────────────────────────────────────────────────────────────────
export default function EventsSection({ onRegisterEvent }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewTab, setViewTab] = useState("upcoming"); // 'upcoming' | 'past'
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const handleDeleteEvent = async (id) => {
    if (!isAdmin) return;
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      // Import on the fly to avoid circular dependencies or massive bundle
      const { deleteEvent } = await import('../services/firebaseService');
      await deleteEvent(id);
      setEvents(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      alert("Failed to delete event: " + error.message);
      console.error("Delete Event Error:", error);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = [];
  const pastEvents = [];

  events.forEach((e) => {
    // Convert YYYY-MM-DD or standard date strings to a Date object
    const eventDate = new Date(e.date);
    
    // If it's a valid date and is before today, it's a past event
    if (!isNaN(eventDate) && eventDate < today) {
      pastEvents.push(e);
    } else {
      upcomingEvents.push(e);
    }
  });

  const filteredUpcoming = upcomingEvents.filter(
    (ev) => activeCategory === "All" || ev.category === activeCategory
  );

  const filteredPast = pastEvents.filter(
    (ev) => activeCategory === "All" || ev.category === activeCategory
  );

  return (
    <section id="events" className="py-16 sm:py-24 relative overflow-hidden">
      {/* subtle bg glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4285F4]/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#34A853]/8 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Hero Stats Banner ────────────────────────────────────────── */}
        <div className="mb-12 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0d1526] to-slate-900 dark:from-[#0a0d17] dark:via-[#0d1526] dark:to-[#0a0d17] border border-slate-700/60 p-8 sm:p-12 text-center relative overflow-hidden">
          {/* colour blobs inside banner */}
          <div className="absolute top-0 left-1/4 w-64 h-32 bg-[#4285F4]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-[#34A853]/15 rounded-full blur-3xl pointer-events-none" />
          {/* top rainbow bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853]" />

          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8ab4f8] mb-4">
              // CAMPUS EVENTS & WORKSHOPS
            </p>

            {/* Giant "20+" */}
            <div className="flex items-end justify-center gap-3 mb-4">
              <span className="text-7xl sm:text-9xl font-extrabold font-heading leading-none bg-gradient-to-br from-[#4285F4] via-[#EA4335] to-[#FBBC04] bg-clip-text text-transparent">
                20+
              </span>
              <div className="text-left mb-3 sm:mb-5">
                <p className="text-2xl sm:text-3xl font-extrabold font-heading text-white leading-tight">
                  Hands-on
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold font-heading text-white leading-tight">
                  Events
                </p>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              From code-alongs and cloud workshops to 24-hour hackathons — every session puts real tools in your hands.
            </p>

            {/* Quick stat chips */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {[
                { label: "Workshops", color: "bg-[#4285F4]" },
                { label: "Hackathons", color: "bg-[#EA4335]" },
                { label: "Tech Talks", color: "bg-[#FBBC04]" },
                { label: "Coding Sessions", color: "bg-[#34A853]" },
              ].map((chip) => (
                <span
                  key={chip.label}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/90 bg-white/10 backdrop-blur-sm border border-white/10"
                >
                  <span className={`w-2 h-2 rounded-full ${chip.color}`} />
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tab Switcher & Filters ───────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Campus Events & Workshops
          </h2>

          {/* Upcoming / Past Toggle */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 self-start md:self-auto">
            <button
              onClick={() => setViewTab("upcoming")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                viewTab === "upcoming"
                  ? "bg-white dark:bg-[#121824] text-[#4285F4] shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Upcoming ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setViewTab("past")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                viewTab === "past"
                  ? "bg-white dark:bg-[#121824] text-[#4285F4] shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Past Highlights ({pastEvents.length})
            </button>
          </div>
        </div>

        {/* ── Category Filter Pills ────────────────────────────────────── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 pr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>
          {eventCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-[#4285F4] text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Upcoming Events ──────────────────────────────────────────── */}
        {viewTab === "upcoming" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loading ? (
              <div className="col-span-2 py-12 text-center text-slate-500">Loading events...</div>
            ) : filteredUpcoming.length === 0 ? (
              <div className="col-span-2 py-12 text-center text-slate-500">
                No upcoming events in this category right now. Check back soon!
              </div>
            ) : (
              filteredUpcoming.map((event) => (
                <EventCard key={event.id} event={event} onRegister={onRegisterEvent} isAdmin={isAdmin} onDelete={handleDeleteEvent} />
              ))
            )}
          </div>
        )}

        {/* ── Past Events ──────────────────────────────────────────────── */}
        {viewTab === "past" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPast.map((item) => (
              <PastEventCard key={item.id} item={item} isAdmin={isAdmin} onDelete={handleDeleteEvent} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
