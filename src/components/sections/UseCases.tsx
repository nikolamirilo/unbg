const CASES = [
  {
    title: "E-commerce & Products",
    desc: "Clean, white-background product listings that sell. Perfect for Amazon, Shopify, Etsy, and eBay stores.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    ),
    tags: ["Amazon", "Shopify", "Etsy"],
  },
  {
    title: "Social Media & Content",
    desc: "Scroll-stopping posts, thumbnails, stories, reels, and profile pictures that stand out in any feed.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
      />
    ),
    tags: ["Instagram", "TikTok", "YouTube"],
  },
  {
    title: "Marketing & Design",
    desc: "Speed up your design workflow. Create composite images, banners, and presentations in seconds.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
      />
    ),
    tags: ["Figma", "Canva", "Slides"],
  },
  {
    title: "Photography & Portraits",
    desc: "Isolate subjects from any background. Great for headshots, passport photos, and creative composites.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
      />
    ),
    tags: ["Headshots", "Passport", "Studio"],
  },
  {
    title: "Print on Demand",
    desc: "Design merchandise-ready graphics for t-shirts, mugs, stickers, and phone cases with transparent backgrounds.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18.75 12h.008v.008h-.008V12Zm-2.25 0h.008v.008H16.5V12Z"
      />
    ),
    tags: ["Merch", "T-shirts", "Stickers"],
  },
  {
    title: "Real Estate & Interiors",
    desc: "Stage properties virtually by removing clutter, swapping backgrounds, or creating clean architectural visuals.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
      />
    ),
    tags: ["Zillow", "Staging", "Interiors"],
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="relative bg-gray-50 py-24 overflow-hidden">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
            Use Cases
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            One Tool, Endless Uses
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Whether you&apos;re selling products or creating content, unbg has
            you covered
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((uc) => (
            <div
              key={uc.title}
              className="group relative rounded-2xl bg-white p-px transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-gray-900/10"
            >
              {/* Border: gray → indigo on hover */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gray-200 to-gray-100 transition-all duration-500 group-hover:from-gray-200/0 group-hover:to-gray-200/0" />
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Card inner */}
              <div className="relative rounded-[15px] bg-white p-6 sm:p-7 h-full">
                {/* Glow orb behind icon */}
                <div className="absolute top-6 left-6 h-12 w-12 bg-indigo-500 rounded-full opacity-0 blur-2xl group-hover:opacity-15 transition-opacity duration-700" />

                {/* Icon */}
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 group-hover:bg-indigo-100 transition-colors duration-300">
                  <svg
                    className="h-5 w-5 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    {uc.icon}
                  </svg>
                </div>

                <h3 className="mt-5 text-[15px] font-semibold text-gray-900">
                  {uc.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {uc.desc}
                </p>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {uc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[11px] font-medium text-gray-500 transition-all duration-300 group-hover:border-indigo-100 group-hover:bg-indigo-50/50 group-hover:text-indigo-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow indicator on hover */}
                <div className="absolute bottom-6 right-6 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-indigo-50 transition-all duration-300">
                  <svg className="h-3.5 w-3.5 text-gray-400 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
