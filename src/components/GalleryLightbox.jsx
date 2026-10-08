import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";

export default function GalleryLightbox({
  images = [],
  currentIndex = 0,
  isOpen = false,
  onClose,
  onPrev,
  onNext,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;
  const current = images[currentIndex];
  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Center Image Container */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-h-[70vh] flex items-center justify-center bg-black">
          <img
            src={current.image}
            alt={current.title}
            className="max-h-[70vh] w-auto max-w-full object-contain select-none"
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center max-w-xl text-white">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#4285F4] text-white">
              {current.category}
            </span>
            <span className="text-xs text-white/60">
              {currentIndex + 1} of {images.length}
            </span>
          </div>
          <h3 className="text-lg font-bold font-heading">{current.title}</h3>
          <p className="text-xs text-white/80 mt-1">{current.description}</p>
          <div className="flex items-center justify-center gap-4 mt-2 text-[11px] text-white/60">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#FBBC04]" />
              {current.date}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#EA4335]" />
              {current.location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
