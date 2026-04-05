const ITEMS = [
  "No sign-up needed",
  "Full-resolution output",
  "Zero data collection",
  "Works on any device",
];

export default function SocialProof() {
  return (
    <section className="border-y border-gray-100 bg-white py-8" aria-label="Key benefits">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 text-sm text-gray-500">
        {ITEMS.map((t) => (
          <div key={t} className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-emerald-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            {t}
          </div>
        ))}
      </div>
    </section>
  );
}
