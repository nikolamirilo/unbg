"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type BrushMode = "erase" | "restore" | "move";

interface BrushEditorProps {
  originalUrl: string;
  resultUrl: string;
  onDone: (editedBlobUrl: string) => void;
  onCancel: () => void;
}

const ZOOM_MIN = 1;
const ZOOM_MAX = 5;
const ZOOM_STEP = 0.5;

export default function BrushEditor({
  originalUrl,
  resultUrl,
  onDone,
  onCancel,
}: BrushEditorProps) {
  const [mode, setMode] = useState<BrushMode>("erase");
  const [brushSize, setBrushSize] = useState(30);
  const [zoom, setZoom] = useState(1);
  const zoomRef = useRef(1);
  const [grabbing, setGrabbing] = useState(false);
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
  // Fit-to-wrapper display size at zoom 1; zoomed size is this times `zoom`.
  const baseDisplayRef = useRef({ w: 0, h: 0 });
  // Canvas translation (in screen px) within the wrapper, used while panning.
  const panRef = useRef({ x: 0, y: 0 });
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

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

  // Clamp a pan offset so the (centered) canvas can't be dragged off-screen.
  const clampPan = useCallback((x: number, y: number, z: number) => {
    const wrapper = wrapperRef.current;
    const base = baseDisplayRef.current;
    if (!wrapper) return { x: 0, y: 0 };
    const maxX = Math.max(0, (base.w * z - wrapper.clientWidth) / 2);
    const maxY = Math.max(0, (base.h * z - wrapper.clientHeight) / 2);
    return {
      x: Math.min(maxX, Math.max(-maxX, x)),
      y: Math.min(maxY, Math.max(-maxY, y)),
    };
  }, []);

  // Apply the current zoom + pan to the canvas without touching pixel data,
  // so edits survive zoom changes. Recomputes the display->image scale too.
  const applyView = useCallback(() => {
    const canvas = canvasRef.current;
    const base = baseDisplayRef.current;
    if (!canvas || base.w === 0) return;

    const dispW = base.w * zoom;
    const dispH = base.h * zoom;
    canvas.style.width = `${dispW}px`;
    canvas.style.height = `${dispH}px`;
    scaleRef.current = canvas.width / dispW;

    const clamped = clampPan(panRef.current.x, panRef.current.y, zoom);
    panRef.current = clamped;
    canvas.style.transform = `translate(${clamped.x}px, ${clamped.y}px)`;
  }, [zoom, clampPan]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const resImg = resultImgRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !resImg || !wrapper) return;

    // Set canvas to full image resolution
    canvas.width = resImg.naturalWidth;
    canvas.height = resImg.naturalHeight;

    // Calculate fit-to-wrapper display size (zoom 1)
    const wrapperW = wrapper.clientWidth;
    const aspect = resImg.naturalWidth / resImg.naturalHeight;
    const displayW = wrapperW;
    const displayH = wrapperW / aspect;
    const maxH = Math.min(window.innerHeight * 0.56, 500);

    let baseW: number;
    let baseH: number;
    if (displayH > maxH) {
      baseW = maxH * aspect;
      baseH = maxH;
    } else {
      baseW = displayW;
      baseH = displayH;
    }
    baseDisplayRef.current = { w: baseW, h: baseH };

    // Pin the wrapper height so zooming overflows it (giving room to pan into)
    // instead of growing the page.
    wrapper.style.height = `${baseH}px`;

    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(resImg, 0, 0);

    applyView();
  }, [applyView]);

  // Reapply the view whenever the zoom level changes, and mirror zoom into a
  // ref so the (once-attached) wheel listener always sees the latest value.
  useEffect(() => {
    zoomRef.current = zoom;
    applyView();
  }, [zoom, applyView]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => initCanvas();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initCanvas]);

  // Mouse-wheel / trackpad zoom, centered on the pointer. Registered as a
  // non-passive native listener so it can preventDefault — React's onWheel is
  // passive and can't. At the zoom limits it does nothing and lets the page
  // scroll normally.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onWheel = (e: WheelEvent) => {
      const z0 = zoomRef.current;
      const factor = Math.exp(-e.deltaY * 0.0015);
      const z1 = Math.min(
        ZOOM_MAX,
        Math.max(ZOOM_MIN, Math.round(z0 * factor * 100) / 100),
      );
      if (z1 === z0) return;
      e.preventDefault();

      // Keep the image point under the cursor fixed while zooming. C is the
      // cursor offset from the wrapper center; the canvas is centered then
      // translated by pan, so the new pan that pins that point is:
      //   pan' = C - (C - pan) * (z1 / z0)
      const rect = wrapper.getBoundingClientRect();
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;
      const ratio = z1 / z0;
      panRef.current = {
        x: cx - (cx - panRef.current.x) * ratio,
        y: cy - (cy - panRef.current.y) * ratio,
      };
      setZoom(z1);
    };

    wrapper.addEventListener("wheel", onWheel, { passive: false });
    return () => wrapper.removeEventListener("wheel", onWheel);
  }, []);

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
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    if (mode === "move") {
      isPanningRef.current = true;
      setGrabbing(true);
      panStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        panX: panRef.current.x,
        panY: panRef.current.y,
      };
      return;
    }

    isPaintingRef.current = true;
    const pos = getCanvasPos(e.clientX, e.clientY);
    if (pos) {
      lastPosRef.current = pos;
      paint(pos.x, pos.y);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Pan: translate the canvas, leaving its pixels untouched.
    if (isPanningRef.current) {
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      const clamped = clampPan(
        panStartRef.current.panX + dx,
        panStartRef.current.panY + dy,
        zoom,
      );
      panRef.current = clamped;
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.style.transform = `translate(${clamped.x}px, ${clamped.y}px)`;
      }
      return;
    }

    // Position the brush cursor relative to the wrapper, since the cursor
    // element is absolutely positioned within it. The canvas may be centered
    // (with horizontal/vertical gaps) inside the wrapper, so measuring against
    // the canvas would offset the visible cursor from the actual pointer.
    const rect = wrapper.getBoundingClientRect();
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
    isPanningRef.current = false;
    setGrabbing(false);
    lastPosRef.current = null;
  };

  const zoomIn = () =>
    setZoom((z) => Math.min(ZOOM_MAX, Math.round((z + ZOOM_STEP) * 10) / 10));
  const zoomOut = () =>
    setZoom((z) => Math.max(ZOOM_MIN, Math.round((z - ZOOM_STEP) * 10) / 10));
  const resetZoom = () => {
    panRef.current = { x: 0, y: 0 };
    setZoom(1);
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

  // Keyboard shortcuts for brush size, mode and zoom
  const handleCanvasKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "[") {
      setBrushSize((s) => Math.max(5, s - 5));
    } else if (e.key === "]") {
      setBrushSize((s) => Math.min(100, s + 5));
    } else if (e.key === "e") {
      setMode("erase");
    } else if (e.key === "r") {
      setMode("restore");
    } else if (e.key === "h") {
      setMode("move");
    } else if (e.key === "+" || e.key === "=") {
      zoomIn();
    } else if (e.key === "-" || e.key === "_") {
      zoomOut();
    } else if (e.key === "0") {
      resetZoom();
    }
  };

  return (
    <div className="space-y-3" role="region" aria-label="Brush editor">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 rounded-xl border border-gray-200 bg-white px-3 sm:px-4 py-2.5 shadow-sm">
        {/* Mode toggle */}
        <fieldset className="flex rounded-lg bg-gray-100 p-0.5">
          <legend className="sr-only">Tool</legend>
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
          <button
            onClick={() => setMode("move")}
            aria-pressed={mode === "move"}
            className={`cursor-pointer flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-all min-h-[44px] ${
              mode === "move"
                ? "bg-white text-gray-900 shadow-sm"
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
                d="M7.5 4.5L9 9M3.75 12h4.5m-4.5 0L9 15m-5.25-3L9 9m11.25 3h-4.5m4.5 0L15 15m5.25-3L15 9M12 3.75L9 9m3-5.25L15 9m-3-5.25v16.5m0 0L9 15m3 5.25L15 15"
              />
            </svg>
            Move
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

        {/* Divider */}
        <div className="h-6 w-px bg-gray-200 hidden sm:block" aria-hidden="true" />

        {/* Zoom controls */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={zoomOut}
            disabled={zoom <= ZOOM_MIN}
            aria-label="Zoom out"
            className="cursor-pointer flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
            </svg>
          </button>
          <span
            className="text-[11px] font-medium text-gray-500 w-11 text-center tabular-nums"
            aria-live="polite"
          >
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={zoomIn}
            disabled={zoom >= ZOOM_MAX}
            aria-label="Zoom in"
            className="cursor-pointer flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
          <button
            onClick={resetZoom}
            disabled={zoom === 1 && panRef.current.x === 0 && panRef.current.y === 0}
            aria-label="Reset zoom"
            className="cursor-pointer flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
              />
            </svg>
          </button>
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
        style={{
          cursor:
            mode === "move" ? (grabbing ? "grabbing" : "grab") : "none",
        }}
      >
        <canvas
          ref={canvasRef}
          tabIndex={0}
          aria-label={`Drawing canvas. Current tool: ${mode}. Brush size: ${brushSize}. Zoom: ${Math.round(zoom * 100)} percent. Press E for erase, R for restore, H to move, [ and ] to change brush size, + and - to zoom, 0 to reset zoom, or scroll to zoom toward the pointer.`}
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
        {cursorPos && mode !== "move" && (
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
