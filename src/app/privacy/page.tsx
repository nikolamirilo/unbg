import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/blog/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy & Security - How unbg Protects Your Images",
  description:
    "unbg processes images 100% in your browser. Your photos never leave your device. Learn how our browser-based AI keeps your images private and secure.",
  keywords: [
    "image privacy",
    "browser based background removal",
    "no upload background remover",
    "private photo editing",
    "secure background removal",
    "offline background remover",
    "WebAssembly image processing",
    "client side AI",
  ],
  alternates: {
    canonical: "https://unbg.tech/privacy",
  },
  openGraph: {
    title: "Privacy & Security - How unbg Protects Your Images",
    description:
      "unbg processes images 100% in your browser. Your photos never leave your device. Learn how our browser-based AI keeps your images private and secure.",
    url: "https://unbg.tech/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy & Security - How unbg Protects Your Images",
    description:
      "unbg processes images 100% in your browser. Your photos never leave your device.",
    url: "https://unbg.tech/privacy",
    publisher: {
      "@type": "Organization",
      name: "unbg",
      url: "https://unbg.tech",
    },
    about: {
      "@type": "Thing",
      name: "Image Privacy and Browser-Based AI Processing",
    },
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
            items={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
          />

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Privacy &amp; Security
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            unbg was built with a simple principle: your images are yours. They
            never leave your device. Every step of the background removal
            process happens locally in your browser.
          </p>

          {/* Section 1 */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Your Images Never Leave Your Device
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Unlike most background removal tools that upload your images to
              remote servers for processing, unbg runs the entire AI model
              directly in your web browser. When you select an image, it is read
              from your local file system, processed in memory using
              WebAssembly, and the result is generated right on your machine.
            </p>
            <p className="mt-3 text-gray-600 leading-relaxed">
              No image data is transmitted over the internet. No copies are
              made on any server. The file goes from your device, through the
              in-browser AI, and back to you as a transparent PNG. That is the
              entire journey.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">
              How It Works Technically
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              unbg uses an ONNX-format neural network that runs inside your
              browser via a WebAssembly runtime. On your first visit, the model
              file (~80MB) is downloaded and cached by your browser. After
              that, everything happens locally.
            </p>
            <ul className="mt-4 list-disc pl-6 text-gray-600 space-y-1.5">
              <li>
                <strong>ONNX Runtime Web:</strong> The AI model executes inside
                a sandboxed WebAssembly environment with no access to your file
                system, network, or other browser tabs
              </li>
              <li>
                <strong>In-memory processing:</strong> Your image is decoded
                into pixel data in browser memory, processed by the neural
                network, and rendered as a transparent PNG, all without leaving
                the browser sandbox
              </li>
              <li>
                <strong>No server calls:</strong> After the initial model
                download, unbg makes zero network requests during image
                processing. It even works offline once the model is cached
              </li>
              <li>
                <strong>No persistent storage:</strong> Processed images are
                not saved to localStorage, IndexedDB, or any other browser
                storage. When you close the tab, the data is gone
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">
              What We Don&apos;t Collect
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              We believe the best way to protect your data is to never have it
              in the first place. Here is what unbg does not do:
            </p>
            <ul className="mt-4 list-disc pl-6 text-gray-600 space-y-1.5">
              <li>
                <strong>No image storage:</strong> Your images are never
                uploaded, stored, cached, or logged on any server
              </li>
              <li>
                <strong>No accounts or sign-ups:</strong> There is no user
                registration, no login, and no profile data collected
              </li>
              <li>
                <strong>No image content analytics:</strong> We do not analyze,
                classify, or track what is in your images
              </li>
              <li>
                <strong>No processing logs:</strong> There is no record of
                which images you process, how many, or when
              </li>
              <li>
                <strong>No third-party image sharing:</strong> Your images are
                never sent to third-party APIs, cloud services, or AI providers
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Why This Matters
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Privacy is not just a feature checkbox. There are real scenarios
              where uploading images to a third-party server creates genuine
              risk:
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-gray-900">
                  Passport &amp; ID Documents
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Identity documents contain sensitive personal data. Uploading
                  them to a background removal service means your photo and
                  identity details pass through third-party servers.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-gray-900">
                  Confidential Product Images
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Unreleased product photos uploaded to external servers could
                  be leaked or accessed before launch. Local processing
                  eliminates that risk entirely.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-gray-900">
                  Personal &amp; Family Photos
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Photos of children, family events, and private moments
                  deserve to stay private. There is no reason they should exist
                  on a company&apos;s server.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-gray-900">
                  Medical &amp; Sensitive Images
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Medical images and other sensitive visual data are subject to
                  strict privacy regulations. Browser-based processing avoids
                  compliance concerns entirely.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Compare With Other Tools
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Most popular background removal tools, including remove.bg,
              PhotoRoom, and Canva, upload your images to their cloud servers
              for processing. That means your photos travel across the internet,
              are processed on machines you do not control, and may be stored
              or used for model training according to their terms of service.
            </p>
            <p className="mt-3 text-gray-600 leading-relaxed">
              unbg takes a fundamentally different approach. The AI runs
              entirely in your browser. No upload. No server. No trust
              required.
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-900">
                      Feature
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-900">
                      unbg
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-900">
                      Server-Based Tools
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 text-gray-600">Processing</td>
                    <td className="px-4 py-3 text-gray-900">In your browser</td>
                    <td className="px-4 py-3 text-gray-500">
                      On their servers
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600">Image upload</td>
                    <td className="px-4 py-3 text-gray-900">None</td>
                    <td className="px-4 py-3 text-gray-500">Required</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600">Account needed</td>
                    <td className="px-4 py-3 text-gray-900">No</td>
                    <td className="px-4 py-3 text-gray-500">
                      Usually yes
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600">Watermarks</td>
                    <td className="px-4 py-3 text-gray-900">Never</td>
                    <td className="px-4 py-3 text-gray-500">
                      Often on free tier
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600">Works offline</td>
                    <td className="px-4 py-3 text-gray-900">
                      Yes, after first visit
                    </td>
                    <td className="px-4 py-3 text-gray-500">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              <Link
                href="/blog/remove-background-without-uploading"
                className="text-indigo-600 font-medium hover:underline"
              >
                Learn more about removing backgrounds without uploading &rarr;
              </Link>
            </p>
          </section>

          {/* Section 6 */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Verify It Yourself
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              You do not need to take our word for it. You can verify that unbg
              never uploads your images by using your browser&apos;s built-in
              developer tools:
            </p>
            <ol className="mt-4 list-decimal pl-6 text-gray-600 space-y-2">
              <li>
                Open{" "}
                <Link href="/" className="text-indigo-600 hover:underline">
                  unbg.tech
                </Link>{" "}
                in your browser
              </li>
              <li>
                Open Developer Tools (press F12 or Ctrl+Shift+I on Windows,
                Cmd+Option+I on Mac)
              </li>
              <li>Go to the Network tab and clear the log</li>
              <li>Process an image using unbg</li>
              <li>
                Review the Network tab: you will see no outgoing requests
                containing image data. The only network activity is the initial
                page load and model download on first use
              </li>
            </ol>
            <p className="mt-4 text-gray-600 leading-relaxed">
              This level of transparency is only possible because the AI runs
              entirely in your browser. There is nothing hidden and nothing to
              trust on faith.
            </p>
          </section>

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Try the Private Background Remover
            </h2>
            <p className="mt-3 text-gray-600 max-w-lg mx-auto">
              Remove backgrounds from your images with complete privacy. No
              uploads, no accounts, no tracking. Just AI that runs in your
              browser.
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
