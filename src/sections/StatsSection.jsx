import { useEffect, useRef, useState } from "react";
import { statsData } from "../data/statsData";
import { Users, Calendar, Layers, FolderGit2 } from "lucide-react";

const ICON_MAP = {
  members: Users,
  events: Calendar,
  domains: Layers,
  projects: FolderGit2,
};

const COLOR_MAP = {
  blue: {
    text: "text-[#4285F4]",
    bg: "bg-[#4285F4]/10",
    border: "hover:border-[#4285F4]/40",
  },
  red: {
    text: "text-[#EA4335]",
    bg: "bg-[#EA4335]/10",
    border: "hover:border-[#EA4335]/40",
  },
  yellow: {
    text: "text-[#FBBC04]",
    bg: "bg-[#FBBC04]/10",
    border: "hover:border-[#FBBC04]/40",
  },
  green: {
    text: "text-[#34A853]",
    bg: "bg-[#34A853]/10",
    border: "hover:border-[#34A853]/40",
  },
};

function CounterItem({ stat, isVisible }) {
  const [count, setCount] = useState(0);
  const Icon = ICON_MAP[stat.id] || Users;
  const color = COLOR_MAP[stat.color] || COLOR_MAP.blue;

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = stat.number;
    const duration = 1600;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 20));

    return () => clearInterval(timer);
  }, [isVisible, stat.number]);

  return (
    <div
      className={`relative p-6 sm:p-7 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 transition-all ${color.border} group`}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl ${color.bg} ${color.text} flex items-center justify-center transition-transform group-hover:scale-110 duration-200`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          AASC Milestone
        </span>
      </div>

      <div className="flex items-baseline space-x-1">
        <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
          {count}
        </span>
        <span className={`text-2xl sm:text-3xl font-bold font-heading ${color.text}`}>
          {stat.suffix}
        </span>
      </div>

      <h3 className="text-base font-bold font-heading text-slate-800 dark:text-slate-100 mt-2">
        {stat.label}
      </h3>

      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
        {stat.subtext}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-wider text-[#4285F4] dark:text-[#8ab4f8] mb-1">
            // OUR IMPACT IN NUMBERS
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
            Growing Together Every Single Day
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsData.map((stat) => (
            <CounterItem key={stat.id} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
