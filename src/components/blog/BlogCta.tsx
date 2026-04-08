import Link from "next/link";

export default function BlogCta() {
  return (
    <div className="mt-12 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900">
        Ready to Remove Backgrounds?
      </h2>
      <p className="mt-3 text-gray-600 max-w-lg mx-auto">
        Try unbg for free - no sign-up, no watermarks, no uploads to servers.
        Your images stay on your device.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
      >
        Try unbg Free
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
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </Link>
    </div>
  );
}
