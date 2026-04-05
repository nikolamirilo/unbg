import Dropzone from "@/components/Dropzone";
import LottieAnimation from "@/components/LottieAnimation";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white"
    >
      <div className="mx-auto max-w-4xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
            Free &middot; Simple &middot; Secure &middot; Fast &middot;
            AI-powered
          </span>

          <div className="relative inline-block">
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              Remove Image Background
              <br />
              <span className="text-indigo-600">Instantly & for Free</span>
            </h1>
          </div>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Drop your images below and get transparent PNGs in seconds. Powered
            by AI that runs in your browser - your images never leave your
            device.
          </p>
        </div>

        <div className="mt-10">
          <Dropzone />
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          No sign-up &middot; No watermark &middot; Full resolution &middot;
          Multiple images supported
        </p>
      </div>
    </section>
  );
}
