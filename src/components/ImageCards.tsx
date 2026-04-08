"use client";

import type { ImageItem } from "@/types";

export default function ImageCards({
  images,
  activeIndex,
  onSelect,
  onDelete,
  onAddImages,
}: {
  images: ImageItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onDelete: (index: number) => void;
  onAddImages: (files: FileList | File[]) => void;
}) {
  return (
    <div
      role="listbox"
      aria-label="Uploaded images"
      className="grid mt-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2"
    >
      {images.map((img, i) => {
        const statusLabel =
          img.status === "processing"
            ? "Processing"
            : img.status === "done"
              ? "Done"
              : img.status === "error"
                ? "Error"
                : "Pending";

        return (
          <div key={i} className="relative group/card">
            <button
              role="option"
              aria-selected={i === activeIndex}
              aria-label={`${img.name} - ${statusLabel}`}
              onClick={() => onSelect(i)}
              className={`cursor-pointer relative w-full aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                i === activeIndex
                  ? "border-indigo-500 shadow-md ring-2 ring-indigo-500/20"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img
                src={img.originalUrl}
                alt=""
                className="w-full h-full object-cover"
              />
              {img.status === "processing" && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div
                    className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"
                    role="status"
                    aria-label="Processing"
                  />
                </div>
              )}
              {img.status === "done" && (
                <div className="absolute top-1.5 right-1.5" aria-hidden="true">
                  <svg
                    className="h-5 w-5 drop-shadow"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <circle cx="10" cy="10" r="8" fill="#34d399" />
                    <path
                      d="M6.5 10.5l2.5 2.5 4.5-5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
              {img.status === "error" && (
                <div className="absolute inset-0 bg-red-500/30 flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              )}
              {img.status === "pending" && (
                <div className="absolute inset-0 bg-black/20" />
              )}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-2 pb-1.5 pt-4">
                <p className="text-[10px] text-white truncate">{img.name}</p>
              </div>
            </button>

            {/* Delete button - visible on hover (desktop) or always on touch */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(i);
              }}
              aria-label={`Remove ${img.name}`}
              className="absolute -top-1.5 -right-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-white shadow-md sm:opacity-0 sm:group-hover/card:opacity-100 sm:focus:opacity-100 transition-opacity active:bg-red-600 sm:hover:bg-red-600"
            >
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        );
      })}

      <label className="cursor-pointer aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/50 flex flex-col items-center justify-center gap-2 transition-all">
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          multiple
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              onAddImages(e.target.files);
              e.target.value = "";
            }
          }}
          className="sr-only"
        />
        <svg
          className="h-7 w-7 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <span className="text-xs font-medium text-gray-400">Add more</span>
      </label>
    </div>
  );
}
