import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles, ChevronRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../authContext";
import { siteConfig } from "../data/siteConfig";
import logo from "../assets/logo.png";

export default function Navbar({ onOpenJoinModal }) {
  const { theme } = useTheme();
  const { user, isAdmin, signIn, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "#top" },
    { name: "About", href: "#about" },
    { name: "Events", href: "#events" },
    { name: "Domains", href: "#domains" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" },
  ];

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (location.pathname === "/") {
        const sections = [
          "top",
          "about",
          "events",
          "domains",
          "team",
          "contact",
        ];
        const scrollPosition = window.scrollY + 120;

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sectionId === "top" ? "home" : sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleNavClick = (e, href) => {
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      // If we are on a subpage, navigate to root with hash
      return;
    }
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 py-4 ${
          scrolled
            ? "glass-panel shadow-sm border-b border-slate-200/80 dark:border-slate-800/80"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setActiveSection("home");
              }}
            >
              <div className="flex items-center gap-3">
                <img src={logo} alt="GDG AASC Logo" className="h-8 sm:h-10 w-auto object-contain" />
                <span className="font-bold text-lg sm:text-xl font-heading text-slate-900 dark:text-white tracking-tight">GDG AASC</span>
              </div>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                On Campus
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive =
                  activeSection ===
                  (link.href === "#top" ? "home" : link.href.replace("#", ""));
                return (
                  <a
                    key={link.name}
                    href={location.pathname === "/" ? link.href : `/${link.href}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      isActive
                        ? "text-[#4285F4] bg-[#4285F4]/10 dark:bg-[#4285F4]/15"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Join Community CTA (Hidden if logged in) */}
              {!user ? (
                <button
                  onClick={signIn}
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 shadow-sm transition-all group border border-slate-200 dark:border-slate-700"
                >
                  Sign in with Google
                </button>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#4285F4] to-[#34A853] hover:opacity-90 transition-opacity shadow-sm"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/resources"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    Resources
                  </Link>
                  <button
                    onClick={signOut}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white dark:bg-[#121824] p-6 shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 animate-slideLeft">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold text-base font-heading text-slate-900 dark:text-white">
                  GDG AASC Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col space-y-1.5">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={location.pathname === "/" ? link.href : `/${link.href}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-[#4285F4] transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <a
                href="https://chat.whatsapp.com/GWnf9o4Q0wED4Kc9RboBuc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#4285F4] to-[#34A853] flex items-center justify-center gap-2 shadow"
              >
                <Sparkles className="w-4 h-4" />
                Become a GDG Member
              </a>

              <div className="text-center text-[11px] text-slate-400">
                Alpha Arts and Science College • Chennai
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
