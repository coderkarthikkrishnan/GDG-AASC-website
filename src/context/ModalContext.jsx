import { createContext, useContext, useState } from "react";
import JoinCommunityModal from "../components/JoinCommunityModal";
import EventRegisterModal from "../components/EventRegisterModal";

const ModalContext = createContext({
  openJoinModal: () => {},
  closeJoinModal: () => {},
  openRegisterModal: () => {},
  closeRegisterModal: () => {},
});

export function ModalProvider({ children }) {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [registerEvent, setRegisterEvent] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openJoinModal = () => setIsJoinModalOpen(true);
  const closeJoinModal = () => setIsJoinModalOpen(false);

  const openRegisterModal = (event) => {
    setRegisterEvent(event);
    setIsRegisterModalOpen(true);
  };
  const closeRegisterModal = () => {
    setRegisterEvent(null);
    setIsRegisterModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        openJoinModal,
        closeJoinModal,
        openRegisterModal,
        closeRegisterModal,
      }}
    >
      {children}
      {/* Global Modals */}
      <JoinCommunityModal
        isOpen={isJoinModalOpen}
        onClose={closeJoinModal}
      />
      <EventRegisterModal
        event={registerEvent}
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
      />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
