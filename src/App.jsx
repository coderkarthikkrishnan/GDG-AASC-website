import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { ModalProvider, useModal } from "./context/ModalContext";

function MainLayout() {
  const { openJoinModal } = useModal();

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc] dark:bg-[#0a0c10] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar onOpenJoinModal={openJoinModal} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer onOpenJoinModal={openJoinModal} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <MainLayout />
      </ModalProvider>
    </ThemeProvider>
  );
}
