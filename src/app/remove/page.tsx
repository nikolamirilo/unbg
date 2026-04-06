"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ImageItem } from "@/types";
import { filterValidImages } from "@/lib/files";
import { downloadImage, downloadAllImages } from "@/lib/download";
import { consumeFiles } from "@/lib/image-store";
import { useImageProcessor } from "@/hooks/useImageProcessor";
import Logo from "@/components/Logo";
import ProgressBar from "@/components/ProgressBar";
import ComparisonSlider from "@/components/ComparisonSlider";
import ImageCards from "@/components/ImageCards";
import BrushEditor from "@/components/BrushEditor";
import Donate from "@/components/ImagePreview/Donate";

export default function RemovePage() {
  const router = useRouter();
  const [images, setImages] = useState<ImageItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const initRef = useRef(false);
  const imagesRef = useRef(images);
  imagesRef.current = images;

  const {
    progress,
    revealIndex,
    sliderPos,
    setSliderPos,
    processNext,
    isRevealing,
  } = useImageProcessor(images);

  // Load images from in-memory store
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const files = consumeFiles();
    if (!files || files.length === 0) {
      router.push("/");
      return;
    }

    setImages(
      files.map((f) => ({
        name: f.name,
        originalUrl: URL.createObjectURL(f),
        originalBlob: f,
        resultUrl: null,
        status: "pending",
      })),
    );
  }, [router]);

  // Update a single image by index
  const updateImage = useCallback((idx: number, patch: Partial<ImageItem>) => {
    setImages((prev) => {
      const arr = [...prev];
      arr[idx] = { ...arr[idx], ...patch };
      return arr;
    });
  }, []);

  // Trigger processing when pending images exist
  useEffect(() => {
    if (images.length > 0 && images.some((img) => img.status === "pending")) {
      processNext(() => imagesRef.current, updateImage);
    }
  }, [images.length, processNext, updateImage]);

  // Add more images
  const handleAddImages = useCallback((files: FileList | File[]) => {
    const valid = filterValidImages(files);
    if (valid.length === 0) return;
    const newItems: ImageItem[] = valid.map((f) => ({
      name: f.name,
      originalUrl: URL.createObjectURL(f),
      originalBlob: f,
      resultUrl: null,
      status: "pending",
    }));
    setImages((prev) => [...prev, ...newItems]);
  }, []);

  const handleCardSelect = useCallback(
    (i: number) => {
      setEditingIndex(null);
      setActiveIndex(i);
      setSliderPos(50);
    },
    [setSliderPos],
  );

  const handleDelete = useCallback(
    (i: number) => {
      const remaining = images.filter((_, idx) => idx !== i);

      if (remaining.length === 0) {
        setImages([]);
        router.push("/");
        return;
      }

      setEditingIndex(null);
      if (activeIndex >= remaining.length) {
        setActiveIndex(remaining.length - 1);
      } else if (i < activeIndex) {
        setActiveIndex(activeIndex - 1);
      }
      setImages(remaining);
    },
    [images, activeIndex, router],
  );

  const handleBrushDone = useCallback(
    (editedBlobUrl: string) => {
      updateImage(activeIndex, { resultUrl: editedBlobUrl });
      setEditingIndex(null);
    },
    [activeIndex, updateImage],
  );

  const active = images[activeIndex];
  const doneCount = images.filter((img) => img.status === "done").length;
  const totalCount = images.length;

  if (images.length === 0) return null;

  return (
    <>
      <header className="border-b border-gray-100 bg-white">
        <nav aria-label="Remove page navigation" className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            {doneCount > 1 && (
              <button
                onClick={() => downloadAllImages(images)}
                className="cursor-pointer rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100 transition-colors"
              >
                Download all ({doneCount})
              </button>
            )}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              New session
            </Link>
          </div>
        </nav>
      </header>

      <main id="main-content" className="flex flex-1 flex-col bg-gray-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
          <div className="mx-auto w-full lg:max-w-4xl">
            <ProgressBar doneCount={doneCount} totalCount={totalCount} />
            <Donate />
            {active && editingIndex === activeIndex && active.resultUrl && (
              <BrushEditor
                originalUrl={active.originalUrl}
                resultUrl={active.resultUrl}
                onDone={handleBrushDone}
                onCancel={() => setEditingIndex(null)}
              />
            )}

            {active && editingIndex !== activeIndex && (
              <ComparisonSlider
                active={active}
                progress={progress}
                sliderPos={sliderPos}
                setSliderPos={setSliderPos}
                isRevealing={revealIndex === activeIndex}
                onDownload={() => downloadImage(active)}
                onEdit={() => setEditingIndex(activeIndex)}
              />
            )}

            <ImageCards
              images={images}
              activeIndex={activeIndex}
              onSelect={handleCardSelect}
              onDelete={handleDelete}
              onAddImages={handleAddImages}
            />
          </div>
        </div>
      </main>
    </>
  );
}
