import EventsSection from "../sections/EventsSection";
import CtaSection from "../sections/CtaSection";
import { useModal } from "../context/ModalContext";

export default function Events() {
  const { openRegisterModal, openJoinModal } = useModal();

  return (
    <div className="w-full pt-4">
      <EventsSection onRegisterEvent={openRegisterModal} />
      <CtaSection onOpenJoinModal={openJoinModal} />
    </div>
  );
}
