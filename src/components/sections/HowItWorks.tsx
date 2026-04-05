import { STEPS } from "../../../constants";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-gray-500">
            Remove any image background in three simple steps
          </p>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.num} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
                <svg
                  className="h-7 w-7 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {step.icon}
                </svg>
              </div>
              <div className="mt-1 text-xs font-bold text-indigo-600">
                Step {step.num}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
