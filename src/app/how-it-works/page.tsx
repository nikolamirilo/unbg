import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/blog/Breadcrumbs";

export const metadata: Metadata = {
  title: "How It Works - Remove Background from Image in 3 Steps",
  description:
    "Learn how unbg removes image backgrounds in seconds. Upload your image, AI processes it in your browser, and download a transparent PNG - completely free, no sign-up needed.",
  keywords: [
    "how to remove background from image",
    "remove background steps",
    "background remover how it works",
    "AI background removal process",
    "browser based background removal",
    "free background remover tutorial",
  ],
  alternates: {
    canonical: "https://unbg.tech/how-it-works",
  },
  openGraph: {
    title: "How It Works - Remove Background from Image in 3 Steps",
    description:
      "Learn how unbg removes image backgrounds in seconds. Upload, AI processes in your browser, download transparent PNG - free, no sign-up.",
    url: "https://unbg.tech/how-it-works",
    type: "website",
  },
};

export default function HowItWorksPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Remove Background from an Image for Free",
    description:
      "Remove image backgrounds instantly using unbg. AI-powered, browser-based, free, and private.",
    totalTime: "PT30S",
    tool: {
      "@type": "HowToTool",
      name: "unbg - Free AI Background Remover",
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Upload Your Images",
        text: "Drag and drop or click to upload any PNG, JPG, or WebP images. You can upload multiple files at once. Maximum file size is 20MB per image.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "AI Removes the Background",
        text: "unbg's AI model processes your images directly in your browser. The neural network detects edges, hair, and complex subjects with precision. No data is sent to any server - your images stay on your device.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Download Your Transparent PNG",
        text: "Download your high-quality transparent PNG instantly. No watermark, no quality loss, no limits. The output is full-resolution and ready to use.",
      },
    ],
  };

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "How It Works" }]}
          />

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            How to Remove Background from an Image
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            unbg makes background removal simple, free, and private. Here is
            exactly how it works - from upload to download in under 30 seconds.
          </p>

          {/* Step 1 */}
          <div className="mt-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-200">
                <span className="text-lg font-bold text-white">1</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Upload Your Images
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-3">
              Open{" "}
              <Link href="/" className="text-indigo-600 hover:underline">
                unbg.tech
              </Link>{" "}
              and drag your images onto the upload area, or click to browse your
              files. You can upload multiple images at once.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1.5">
              <li>
                <strong>Supported formats:</strong> PNG, JPG, JPEG, WebP, and
                HEIC
              </li>
              <li>
                <strong>Max file size:</strong> 20MB per image
              </li>
              <li>
                <strong>Multiple files:</strong> Upload as many images as you
                need - they are processed one at a time for best quality
              </li>
              <li>
                <strong>Mobile friendly:</strong> Works on phones and tablets
                too - take a photo and upload directly
              </li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="mt-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-200">
                <span className="text-lg font-bold text-white">2</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                AI Removes the Background
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-3">
              Once uploaded, unbg&apos;s AI model runs directly in your browser.
              The neural network analyzes your image and precisely separates the
              subject from the background.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1.5">
              <li>
                <strong>100% browser-based:</strong> The AI model runs locally
                using WebAssembly - your images never leave your device
              </li>
              <li>
                <strong>First-time setup:</strong> On the first use, the AI
                model (~80MB) downloads and caches in your browser. Subsequent
                uses are much faster
              </li>
              <li>
                <strong>Smart edge detection:</strong> Handles hair, fur,
                transparent objects, and complex edges with precision
              </li>
              <li>
                <strong>No internet needed after setup:</strong> Once the model
                is cached, you can use unbg even without an internet connection
              </li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="mt-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-200">
                <span className="text-lg font-bold text-white">3</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Download Your Transparent PNG
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-3">
              Your processed image is ready instantly. Download it as a
              high-quality transparent PNG - ready for use in e-commerce
              listings, social media, presentations, or any design project.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1.5">
              <li>
                <strong>Full resolution:</strong> No quality loss or downscaling
                - you get the same resolution as your original
              </li>
              <li>
                <strong>No watermarks:</strong> Unlike other tools, unbg never
                adds watermarks to your images
              </li>
              <li>
                <strong>Transparent PNG:</strong> Industry-standard format
                supported everywhere
              </li>
              <li>
                <strong>Unlimited downloads:</strong> No credit system, no daily
                limits, no restrictions
              </li>
            </ul>
          </div>

          {/* Why it's different */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900">
              Why unbg Is Different
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Most background removal tools upload your images to their servers
              for processing. unbg takes a fundamentally different approach -
              the AI runs entirely in your browser.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="h-5 w-5 text-indigo-600"
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
                  <h3 className="font-semibold text-gray-900">
                    Complete Privacy
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  Your images are processed locally and never uploaded to any
                  server. Ideal for sensitive photos like ID documents, passport
                  photos, or confidential product images.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="h-5 w-5 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H4.5a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-13.5h17.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H3.375c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125Z"
                    />
                  </svg>
                  <h3 className="font-semibold text-gray-900">Truly Free</h3>
                </div>
                <p className="text-sm text-gray-500">
                  No credit system, no daily limits, no premium tiers. Every
                  feature is available to everyone at no cost - full resolution,
                  no watermarks, unlimited usage.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="h-5 w-5 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  </svg>
                  <h3 className="font-semibold text-gray-900">
                    Fast & Offline-Ready
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  After the initial model download, processing takes just a few
                  seconds. The cached model even works without an internet
                  connection.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="h-5 w-5 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                    />
                  </svg>
                  <h3 className="font-semibold text-gray-900">
                    Works Everywhere
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  Works on any modern browser - Chrome, Firefox, Safari, Edge -
                  on desktop, tablet, or mobile. No app to install.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ specific to how it works */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900">
              Common Questions
            </h2>
            <div className="mt-6 divide-y divide-gray-100">
              <details className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-gray-900">
                  Why is the first use slower?
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
                  On your first visit, unbg downloads the AI model (~80MB) to
                  your browser. This is automatically cached so future visits
                  are much faster. Think of it like installing a tiny app in
                  your browser.
                </p>
              </details>

              <details className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-gray-900">
                  Does it work on mobile?
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
                  Yes. unbg works on any modern mobile browser. You can take a
                  photo with your phone camera and upload it directly.
                  Processing may be slightly slower on older devices.
                </p>
              </details>

              <details className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-gray-900">
                  Is it really private?
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
                  Absolutely. The AI model runs using WebAssembly in your
                  browser. Your images are never sent to any server. You can
                  verify this by checking your browser&apos;s network tab - no
                  image data leaves your device.
                </p>
              </details>

              <details className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-gray-900">
                  What image quality can I expect?
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
                  unbg outputs full-resolution transparent PNGs with no quality
                  loss. The AI handles complex edges including hair, fur, and
                  semi-transparent objects. Results are comparable to premium
                  tools like remove.bg.
                </p>
              </details>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Ready to Try It?
            </h2>
            <p className="mt-3 text-gray-600 max-w-lg mx-auto">
              Remove backgrounds from your images in seconds - completely free,
              no sign-up required.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Remove Background Now
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
      </main>
      <Footer />
    </>
  );
}
