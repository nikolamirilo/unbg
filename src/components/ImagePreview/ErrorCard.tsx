import type { ImageItem } from "@/types";

export default function ErrorCard({ image }: { image: ImageItem }) {
  return (
    <div
      className="rounded-2xl border border-red-200 bg-white p-10 text-center shadow-sm"
      role="alert"
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <svg
          className="h-6 w-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
      </div>
      <p className="mt-4 font-medium text-red-700">{image.error}</p>
      <p className="mt-1 text-sm text-gray-400">{image.name}</p>
    </div>
  );
}
