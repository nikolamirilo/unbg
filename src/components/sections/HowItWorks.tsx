import { STEPS } from "../../../constants";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-gradient-to-b from-white to-slate-50 py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 tracking-wide uppercase">
            Simple & Fast
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-lg text-gray-500 max-w-xl mx-auto">
            Remove any image background in three simple steps - no sign-up, no
            software to install.
          </p>
        </div>

        <div className="mt-16 relative">
          {/* Connector line (desktop only) */}
          <div
            className="hidden sm:block absolute top-[3.25rem] left-[calc(16.67%+1.75rem)] right-[calc(16.67%+1.75rem)] h-px"
            aria-hidden="true"
          >
            <div className="h-full w-full border-t-2 border-dashed border-indigo-200" />
          </div>

          <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative text-center group">
                {/* Step number badge */}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-200 group-hover:shadow-indigo-300 group-hover:scale-110 transition-all duration-300">
                  <svg
                    className="h-7 w-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    {step.icon}
                  </svg>
                </div>

                {/* Step label */}
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-600">
                  Step {step.num}
                  {i < STEPS.length - 1 && (
                    <svg
                      className="h-3 w-3 sm:hidden text-indigo-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  )}
                </div>

                <h3 className="mt-3 text-lg font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500 max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/#hero"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300"
          >
            Try It Now - It&apos;s Free
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
      </div>
    </section>
  );
}
