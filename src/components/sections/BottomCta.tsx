export default function BottomCta() {
  return (
    <section className="bg-gradient-to-b from-indigo-600 to-indigo-700 py-16 text-center text-white">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Ready to Remove Backgrounds?
        </h2>
        <p className="mt-3 text-indigo-200">
          It&apos;s free, private, and takes seconds. No account needed.
        </p>
        <a
          href="#hero"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-600 shadow-lg hover:bg-indigo-50 transition-colors"
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
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload Images Now
        </a>
      </div>
    </section>
  );
}
