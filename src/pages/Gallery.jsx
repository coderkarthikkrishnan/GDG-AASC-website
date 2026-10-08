import GallerySection from "../sections/GallerySection";
import AchievementsSection from "../sections/AchievementsSection";
import CtaSection from "../sections/CtaSection";
import { useModal } from "../context/ModalContext";

export default function Gallery() {
  const { openJoinModal } = useModal();

  return (
    <div className="w-full pt-4">
      <GallerySection />
      <AchievementsSection />
      <CtaSection onOpenJoinModal={openJoinModal} />
    </div>
  );
}
