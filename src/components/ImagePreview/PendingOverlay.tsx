import type { ImageItem } from "@/types";

export default function PendingOverlay({ image }: { image: ImageItem }) {
  return (
    <div
      className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
      role="status"
      aria-label={`${image.name} is waiting in queue`}
    >
      <div className="relative">
        <img
          src={image.originalUrl}
          alt={`${image.name} - waiting to be processed`}
          className="w-full max-h-[56vh] sm:max-h-[60vh] lg:max-h-[56vh] object-contain opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-500 shadow">
            Waiting in queue...
          </div>
        </div>
      </div>
    </div>
  );
}
