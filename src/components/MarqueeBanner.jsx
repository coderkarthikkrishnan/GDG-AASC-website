import { Zap, Star, Heart, Snowflake, Rocket, Sparkles, Code2, Globe } from "lucide-react";

export default function MarqueeBanner() {
  const items = [
    { text: "BUILD", icon: Zap, color: "text-[#4285F4]" },
    { text: "SHIP", icon: Rocket, color: "text-[#EA4335]" },
    { text: "LEARN", icon: Heart, color: "text-[#FBBC04]" },
    { text: "HACK", icon: Snowflake, color: "text-[#34A853]" },
    { text: "REPEAT", icon: Star, color: "text-[#4285F4]" },
    { text: "INNOVATE", icon: Sparkles, color: "text-[#EA4335]" },
    { text: "COLLABORATE", icon: Globe, color: "text-[#FBBC04]" },
    { text: "CODE", icon: Code2, color: "text-[#34A853]" },
  ];

  return (
    <div
      className="w-full overflow-hidden border-y border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 py-3 select-none backdrop-blur-sm"
      aria-label="Build, Ship, Learn, Hack, Repeat"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Track 1 */}
        <div className="flex items-center space-x-8 px-4">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={`t1-${idx}`} className="flex items-center space-x-3 text-sm font-bold tracking-widest font-heading text-slate-700 dark:text-slate-300">
                <span>{item.text}</span>
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>
            );
          })}
        </div>
        {/* Track 2 for seamless loop */}
        <div className="flex items-center space-x-8 px-4" aria-hidden="true">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={`t2-${idx}`} className="flex items-center space-x-3 text-sm font-bold tracking-widest font-heading text-slate-700 dark:text-slate-300">
                <span>{item.text}</span>
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>
            );
          })}
        </div>
        {/* Track 3 for seamless ultra-wide loop */}
        <div className="flex items-center space-x-8 px-4" aria-hidden="true">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={`t3-${idx}`} className="flex items-center space-x-3 text-sm font-bold tracking-widest font-heading text-slate-700 dark:text-slate-300">
                <span>{item.text}</span>
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
