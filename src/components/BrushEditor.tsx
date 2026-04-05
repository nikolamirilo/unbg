"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type BrushMode = "erase" | "restore";

interface BrushEditorProps {
  originalUrl: string;
  resultUrl: string;
  onDone: (editedBlobUrl: string) => void;
  onCancel: () => void;
}

export default function BrushEditor({
  originalUrl,
  resultUrl,
  onDone,
  onCancel,
}: BrushEditorProps) {
  const [mode, setMode] = useState<BrushMode>("erase");
  const [brushSize, setBrushSize] = useState(30);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(
    null,
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalImgRef = useRef<HTMLImageElement | null>(null);
  const resultImgRef = useRef<HTMLImageElement | null>(null);
  const isPaintingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const scaleRef = useRef(1);

  // Load both images into memory
  useEffect(() => {
    const origImg = new Image();
    origImg.crossOrigin = "anonymous";
    origImg.src = originalUrl;

    const resImg = new Image();
    resImg.crossOrigin = "anonymous";
    resImg.src = resultUrl;

    let loaded = 0;
    const onLoad = () => {
      loaded++;
      if (loaded === 2) {
        originalImgRef.current = origImg;
        resultImgRef.current = resImg;
        initCanvas();
      }
    };

    origImg.onload = onLoad;
    resImg.onload = onLoad;
  }, [originalUrl, resultUrl]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const resImg = resultImgRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !resImg || !wrapper) return;

    // Set canvas to full image resolution
    canvas.width = resImg.naturalWidth;
    canvas.height = resImg.naturalHeight;

    // Calculate display scale
    const wrapperW = wrapper.clientWidth;
    const aspect = resImg.naturalWidth / resImg.naturalHeight;
    const displayW = wrapperW;
    const displayH = wrapperW / aspect;
    const maxH = Math.min(window.innerHeight * 0.56, 500);

    if (displayH > maxH) {
      canvas.style.width = `${maxH * aspect}px`;
      canvas.style.height = `${maxH}px`;
      scaleRef.current = resImg.naturalWidth / (maxH * aspect);
    } else {
      canvas.style.width = `${displayW}px`;
      canvas.style.height = `${displayH}px`;
      scaleRef.current = resImg.naturalWidth / displayW;
    }

    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(resImg, 0, 0);
  }, []);

  // Resize handler
  useEffect(() => {
    const handleResize = () => initCanvas();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initCanvas]);

  const getCanvasPos = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * scaleRef.current,
      y: (clientY - rect.top) * scaleRef.current,
    };
  };

  const paint = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      const origImg = originalImgRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d")!;

      const r = brushSize * scaleRef.current;

      if (mode === "erase") {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (mode === "restore" && origImg) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(origImg, 0, 0);
        ctx.restore();
      }
    },
    [mode, brushSize],
  );

  const paintLine = useCallback(
    (from: { x: number; y: number }, to: { x: number; y: number }) => {
      const dist = Math.hypot(to.x - from.x, to.y - from.y);
      const steps = Math.max(1, Math.floor(dist / 3));
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = from.x + (to.x - from.x) * t;
        const y = from.y + (to.y - from.y) * t;
        paint(x, y);
      }
    },
    [paint],
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    isPaintingRef.current = true;
    const pos = getCanvasPos(e.clientX, e.clientY);
    if (pos) {
      lastPosRef.current = pos;
      paint(pos.x, pos.y);
    }
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    if (!isPaintingRef.current) return;
    const pos = getCanvasPos(e.clientX, e.clientY);
    if (pos && lastPosRef.current) {
      paintLine(lastPosRef.current, pos);
      lastPosRef.current = pos;
    }
  };

  const handlePointerUp = () => {
    isPaintingRef.current = false;
    lastPosRef.current = null;
  };

  const handleDone = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        onDone(url);
      }
    }, "image/png");
  };

  // Keyboard shortcuts for brush size and mode
  const handleCanvasKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "[") {
      setBrushSize((s) => Math.max(5, s - 5));
    } else if (e.key === "]") {
      setBrushSize((s) => Math.min(100, s + 5));
    } else if (e.key === "e") {
      setMode("erase");
    } else if (e.key === "r") {
      setMode("restore");
    }
  };

  return (
    <div className="space-y-3" role="region" aria-label="Brush editor">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 rounded-xl border border-gray-200 bg-white px-3 sm:px-4 py-2.5 shadow-sm">
        {/* Mode toggle */}
        <fieldset className="flex rounded-lg bg-gray-100 p-0.5">
          <legend className="sr-only">Brush mode</legend>
          <button
            onClick={() => setMode("erase")}
            aria-pressed={mode === "erase"}
            className={`cursor-pointer flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-all min-h-[44px] ${
              mode === "erase"
                ? "bg-white text-red-600 shadow-sm"
                : "text-gray-600 hover:text-gray-700"
            }`}
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.374-6.375a1.125 1.125 0 010-1.59L9.42 4.83a1.125 1.125 0 011.59 0l6.375 6.375a1.125 1.125 0 010 1.59L10.83 19.17a1.125 1.125 0 01-1.59 0z"
              />
            </svg>
            Erase
          </button>
          <button
            onClick={() => setMode("restore")}
            aria-pressed={mode === "restore"}
            className={`cursor-pointer flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-all min-h-[44px] ${
              mode === "restore"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-600 hover:text-gray-700"
            }`}
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
              />
            </svg>
            Restore
          </button>
        </fieldset>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-200 hidden sm:block" aria-hidden="true" />

        {/* Brush size */}
        <div className="flex items-center gap-2.5">
          <label htmlFor="brush-size" className="sr-only">
            Brush size
          </label>
          <svg
            className="h-4 w-4 text-gray-400"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
          </svg>
          <input
            id="brush-size"
            type="range"
            min={5}
            max={100}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="h-1.5 w-28 sm:w-32 cursor-pointer accent-indigo-600"
          />
          <svg
            className="h-4 w-4 text-gray-400"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="8" />
          </svg>
          <span
            className="text-[10px] font-medium text-gray-400 w-6 text-right tabular-nums"
            aria-live="polite"
          >
            {brushSize}
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <button
          onClick={onCancel}
          className="cursor-pointer rounded-lg px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors min-h-[44px]"
        >
          Cancel
        </button>
        <button
          onClick={handleDone}
          className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors min-h-[44px]"
        >
          Apply
        </button>
      </div>

      {/* Canvas area */}
      <div
        ref={wrapperRef}
        className="relative rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden checkerboard flex items-center justify-center"
        style={{ cursor: "none" }}
      >
        <canvas
          ref={canvasRef}
          tabIndex={0}
          aria-label={`Drawing canvas. Current mode: ${mode}. Brush size: ${brushSize}. Press E for erase, R for restore, [ and ] to change brush size.`}
          onKeyDown={handleCanvasKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={() => {
            handlePointerUp();
            setCursorPos(null);
          }}
          className="block touch-none"
        />

        {/* Custom brush cursor */}
        {cursorPos && (
          <div
            className="pointer-events-none absolute rounded-full border-2"
            aria-hidden="true"
            style={{
              width: brushSize * 2,
              height: brushSize * 2,
              left: cursorPos.x - brushSize,
              top: cursorPos.y - brushSize,
              borderColor:
                mode === "erase"
                  ? "rgba(239,68,68,0.7)"
                  : "rgba(99,102,241,0.7)",
              backgroundColor:
                mode === "erase"
                  ? "rgba(239,68,68,0.08)"
                  : "rgba(99,102,241,0.08)",
            }}
          />
        )}
      </div>
    </div>
  );
}
