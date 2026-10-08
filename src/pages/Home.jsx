import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import HeroSection from "../sections/HeroSection";
import MarqueeBanner from "../components/MarqueeBanner";
import StatsSection from "../sections/StatsSection";
import AboutSection from "../sections/AboutSection";
import DomainsSection from "../sections/DomainsSection";
import EventsSection from "../sections/EventsSection";
import TeamSection from "../sections/TeamSection";
import CtaSection from "../sections/CtaSection";

export default function Home() {
  const { openJoinModal, openRegisterModal } = useModal();
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 120);
      }
    }
  }, [hash]);

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Marquee Ticker */}
      <MarqueeBanner />

      {/* 3. Statistics Section */}
      <StatsSection />

      {/* 4. About Chapter */}
      <AboutSection onOpenJoinModal={openJoinModal} />

      {/* 5. Events & Workshops */}
      <EventsSection onRegisterEvent={openRegisterModal} />

      {/* 6. Domains Section */}
      <DomainsSection onOpenJoinModal={openJoinModal} />

      {/* 7. Team / Domain Leadership */}
      <TeamSection />

      {/* 8. Community Final CTA */}
      <CtaSection onOpenJoinModal={openJoinModal} />
    </div>
  );
}
