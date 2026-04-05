import type { ImageItem } from "@/types";

export default function ProcessingOverlay({
  image,
  progress,
}: {
  image: ImageItem;
  progress: string;
}) {
  return (
    <div
      className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
      role="status"
      aria-label={`Processing ${image.name}: ${progress}`}
    >
      <div className="relative">
        <img
          src={image.originalUrl}
          alt={`Processing ${image.name}`}
          className="w-full max-h-[56vh] sm:max-h-[60vh] lg:max-h-[56vh] object-contain"
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
              <div
                className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"
                aria-hidden="true"
              />
            </div>
            <div className="text-center" aria-live="polite">
              <p className="text-sm font-semibold text-gray-800">{progress}</p>
              <p className="mt-1 text-xs text-gray-400">
                Processing locally in your browser
              </p>
            </div>
            <div
              className="w-48 h-1 rounded-full bg-gray-200 overflow-hidden"
              role="progressbar"
              aria-label="Processing progress"
            >
              <div className="h-full w-1/4 rounded-full bg-indigo-500 animate-indeterminate" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 text-center">
        <p className="text-xs text-gray-400">{image.name}</p>
      </div>
    </div>
  );
}
