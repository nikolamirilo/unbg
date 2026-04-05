"use client";

import { useCallback, useEffect, useRef } from "react";

export default function BeforeAfterSlider({
  originalUrl,
  resultUrl,
  sliderPos,
  setSliderPos,
  isRevealing,
}: {
  originalUrl: string;
  resultUrl: string;
  sliderPos: number;
  setSliderPos: (pos: number) => void;
  isRevealing: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const handleSliderMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current || !isDraggingRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPos(pct);
    },
    [setSliderPos],
  );

  const handleMouseDown = useCallback(() => {
    isDraggingRef.current = true;
  }, []);

  useEffect(() => {
    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };
    const handleMouseMove = (e: MouseEvent) => handleSliderMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) =>
      handleSliderMove(e.touches[0].clientX);

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleSliderMove]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPos(Math.max(0, sliderPos - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPos(Math.min(100, sliderPos + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSliderPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderPos(100);
    }
  };

  const transition = isRevealing
    ? "0.9s cubic-bezier(0.4,0,0.2,1)"
    : "none";

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-label="Before and after comparison. Use arrow keys to adjust."
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPos)}
      aria-valuetext={`Showing ${Math.round(sliderPos)}% original, ${Math.round(100 - sliderPos)}% background removed`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`relative rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden select-none cursor-ew-resize${isRevealing ? " slider-reveal" : ""}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      <div className="relative">
        <div className="checkerboard">
          <img
            src={resultUrl}
            alt="Image with background removed"
            className="block w-full max-h-[56vh] sm:max-h-[60vh] lg:max-h-[56vh] object-contain"
            draggable={false}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            transition: isRevealing ? `clip-path ${transition}` : "none",
          }}
        >
          <img
            src={originalUrl}
            alt="Original image"
            className="block w-full max-h-[56vh] sm:max-h-[60vh] lg:max-h-[56vh] object-contain"
            draggable={false}
          />
        </div>
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]"
        style={{
          left: `${sliderPos}%`,
          transition: isRevealing ? `left ${transition}` : "none",
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200">
          <svg
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12L3 12m0 0l3.75-3.75M3 12l3.75 3.75M17.25 12L21 12m0 0l-3.75-3.75M21 12l-3.75 3.75"
            />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div
        aria-hidden="true"
        className="absolute top-3 left-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white uppercase tracking-wider"
      >
        Original
      </div>
      <div
        aria-hidden="true"
        className="absolute top-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white uppercase tracking-wider"
      >
        Removed
      </div>
    </div>
  );
}
