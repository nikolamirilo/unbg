"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { filterValidImages } from "@/lib/files";
import { storeFiles } from "@/lib/image-store";
import { warmModelCache } from "@/lib/model-cache";

export default function Dropzone() {
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();

  // Hover, focus or a drag all mean an upload is likely. Start pulling the
  // model now so the first removal does not open with a download.
  const warm = useCallback(() => {
    void warmModelCache();
  }, []);

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const valid = filterValidImages(files);
      if (valid.length === 0) return;
      storeFiles(valid);
      router.push("/remove");
    },
    [router],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label
        onDrop={handleDrop}
        onPointerEnter={warm}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
          warm();
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        className={`block cursor-pointer rounded-2xl border-2 border-dashed p-8 sm:p-12 md:p-16 text-center transition-all duration-200 ${
          isDragging
            ? "border-indigo-500 bg-indigo-50 scale-[1.02]"
            : "border-gray-300 bg-white hover:border-indigo-400 hover:bg-indigo-50/50"
        }`}
      >
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          multiple
          onFocus={warm}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0)
              handleFiles(e.target.files);
            e.target.value = "";
          }}
          className="sr-only"
        />

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100">
          <svg
            className="h-8 w-8 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>

        <p className="text-lg font-semibold text-gray-800">
          Upload images or drag & drop
        </p>
        <p className="mt-1 text-sm text-gray-400">
          PNG, JPG, WEBP up to 20MB &middot; Multiple files supported
        </p>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md">
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
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>
          Upload Images
        </span>
      </label>
    </form>
  );
}
