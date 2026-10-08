import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Send,
  Mail,
  Heart,
  ExternalLink,
  Check,
  Shield,
} from "lucide-react";
import {
  LinkedinIcon as Linkedin,
  InstagramIcon as Instagram,
  GithubIcon as Github,
  YoutubeIcon as Youtube,
  DiscordIcon,
} from "./SocialIcons";
import { siteConfig } from "../data/siteConfig";
import { subscribeNewsletter } from "../services/firebaseService";
import logo from "../assets/logo.png";

export default function Footer({ onOpenJoinModal }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    setSubmitting(true);
    await subscribeNewsletter(email);
    setSubmitting(false);
    setSubscribed(true);
  };

  const navLinks = [
    { name: "About Chapter", href: "#about" },
    { name: "Events & Workshops", href: "#events" },
    { name: "Technology Domains", href: "#domains" },
    { name: "Lead Team", href: "#team" },
    { name: "Contact", href: "#contact" },
  ];

  const domainsList = [
    "Web Development",
    "Database Management",
    "UI/UX",
    "Version Control",
    "Cyber Security",
    "AI / ML",
    "Cloud Computing",
    "Data Science",
    "Social & Creative",
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c1017] text-slate-700 dark:text-slate-300 transition-colors">
      {/* Top Banner Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <img src={logo} alt="GDG AASC Logo" className="h-8 sm:h-10 w-auto object-contain" />
            </Link>
            <p className="text-xs font-semibold text-[#4285F4] dark:text-[#8ab4f8] uppercase tracking-wider">
              Google Developer Groups on Campus
            </p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Alpha Arts and Science College
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Empowering student developers to learn modern technologies, build real-world software, and innovate together through community-led peer workshops.
            </p>

          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 font-heading">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.slice(0, 5).map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    className="hover:text-[#4285F4] transition-colors"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Domains */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 font-heading">
              Key Domains
            </h4>
            <ul className="space-y-2 text-xs">
              {domainsList.map((d) => (
                <li key={d}>
                  <a href="#domains" className="hover:text-[#34A853] transition-colors">
                    {d}
                  </a>
                </li>
              ))}
            </ul>
          </div>


        </div>

        {/* Bottom Bar & Legal */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p className="text-center md:text-left">
            © 2026 GDG On Campus AASC. All rights reserved.
          </p>

          <p className="text-[11px] max-w-xl text-center md:text-right text-slate-400">
            {siteConfig.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
