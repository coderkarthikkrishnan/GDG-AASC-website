import AboutSection from "../sections/AboutSection";
import StatsSection from "../sections/StatsSection";
import TeamSection from "../sections/TeamSection";
import CtaSection from "../sections/CtaSection";
import { useModal } from "../context/ModalContext";

export default function About() {
  const { openJoinModal } = useModal();

  return (
    <div className="w-full pt-4">
      <AboutSection onOpenJoinModal={openJoinModal} />
      <StatsSection />
      <TeamSection />
      <CtaSection onOpenJoinModal={openJoinModal} />
    </div>
  );
}
