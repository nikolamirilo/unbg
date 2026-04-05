import { FAQS } from "../../../constants";

export default function Faq() {
  return (
    <section id="faq" className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="mt-12 divide-y divide-gray-100">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-gray-900">
                {faq.q}
                <svg
                  className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
