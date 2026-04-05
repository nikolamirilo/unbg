"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { ImageItem } from "@/types";
import { removeImageBackground } from "@/lib/background-removal";

interface RevealState {
  index: number | null;
  sliderPos: number;
}

export function useImageProcessor(images: ImageItem[]) {
  const [progress, setProgress] = useState("");
  const [reveal, setReveal] = useState<RevealState>({
    index: null,
    sliderPos: 50,
  });
  const processingRef = useRef(false);

  const processNext = useCallback(
    async (
      getImages: () => ImageItem[],
      updateImage: (idx: number, patch: Partial<ImageItem>) => void,
    ) => {
      if (processingRef.current) return;
      processingRef.current = true;

      const current = getImages();
      const idx = current.findIndex((img) => img.status === "pending");
      if (idx === -1) {
        processingRef.current = false;
        return;
      }

      updateImage(idx, { status: "processing" });

      try {
        const resultUrl = await removeImageBackground(
          current[idx].originalUrl,
          setProgress,
        );

        setProgress("");
        setReveal({ index: idx, sliderPos: 0 });
        updateImage(idx, { resultUrl, status: "done" });

        // Animate slider from 0 to 50
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setReveal({ index: idx, sliderPos: 50 });
            setTimeout(
              () => setReveal({ index: null, sliderPos: 50 }),
              900,
            );
          });
        });
      } catch (err) {
        updateImage(idx, {
          status: "error",
          error: err instanceof Error ? err.message : "Processing failed.",
        });
      }

      processingRef.current = false;

      // Check for more pending
      setTimeout(() => {
        const latest = getImages();
        if (latest.some((img) => img.status === "pending")) {
          processNext(getImages, updateImage);
        }
      }, 100);
    },
    [],
  );

  return {
    progress,
    revealIndex: reveal.index,
    sliderPos: reveal.sliderPos,
    setSliderPos: (pos: number) =>
      setReveal((prev) => ({ ...prev, sliderPos: pos })),
    processNext,
    isRevealing: reveal.index !== null,
  };
}
