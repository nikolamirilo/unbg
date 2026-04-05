import { FEATURES } from "../../../constants";

// Map the string keys to SVG paths
const icons = {
  gift: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H4.5a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-13.5h17.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H3.375c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125Z"
    />
  ),
  shield: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
    />
  ),
  sparkles: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.456-2.455L18 2.25l.259 1.036a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.456 2.455Z"
    />
  ),
  "user-minus": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M22 10.5h-6m-2.25-1.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM1.5 18.75a6.75 6.75 0 1 1 13.5 0v1.125c0 .621-.504 1.125-1.125 1.125H2.625C2.004 21 1.5 20.496 1.5 19.875v-1.125Z"
    />
  ),
  cpu: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5m-15 7.5H3m18 0h-1.5m-15 4.5V21m3-18v1.5m4.5-1.5v1.5m4.5-1.5v1.5m4.5-1.5v1.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  ),
  layers: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 7.125 11.25 12.15l9-5.025L11.25 2.1l-9 5.025Z M2.25 12.6l9 5.025 9-5.025M2.25 18l9 5.025 9-5.025"
    />
  ),
};

const Icon = ({ name }: { name: keyof typeof icons }) => {
  return (
    <svg
      className="h-5 w-5 text-indigo-600"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
};

export default function Features() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose unbg
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A truly free background remover with no strings attached.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-indigo-300 hover:shadow-md"
            >
              <div className="flex items-center gap-x-3 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 transition-colors">
                  {/* The icon turns white on card hover for an extra nice touch */}
                  <div className="group-hover:text-white text-indigo-600 transition-colors">
                    <Icon name={f.icon as keyof typeof icons} />
                  </div>
                </div>
                <h3 className="text-base font-bold text-gray-900 leading-tight">
                  {f.title}
                </h3>
              </div>
              <p className="text-sm leading-6 text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
