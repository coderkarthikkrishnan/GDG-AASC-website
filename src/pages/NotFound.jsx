import { Link } from "react-router-dom";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#EA4335]/10 text-[#EA4335]">
          <span>404 Error</span>
        </div>

        <h1 className="text-6xl sm:text-7xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
          Oops!
        </h1>

        <p className="text-base text-slate-600 dark:text-slate-300">
          The page or route you were looking for doesn't exist or has moved. Let's get you back to the campus community!
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#4285F4] to-[#34A853] hover:opacity-95 shadow-md"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
