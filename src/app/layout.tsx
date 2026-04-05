import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://unbg.tech";
const SITE_NAME = "unbg";
const SITE_DESCRIPTION =
  "Remove image backgrounds instantly for free. No sign-up, no upload to servers - runs 100% in your browser with AI. Download high-quality transparent PNGs.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Remove Background from Image for Free - ${SITE_NAME}`,
    template: `%s - ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "remove background",
    "remove background from image",
    "remove background from image free",
    "background remover",
    "free background remover",
    "transparent background",
    "make image transparent",
    "remove bg",
    "remove image background",
    "background eraser",
    "AI background removal",
    "transparent PNG",
    "remove background online",
    "image background remover free",
    "photo background remover",
    "automatic background removal",
    "unbg",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `Remove Background from Image for Free - ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "unbg - Free AI Background Remover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Remove Background from Image for Free - ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "mask-icon",
        url: "/logo.png",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Remove image backgrounds",
      "AI-powered background removal",
      "Download transparent PNG",
      "100% browser-based processing",
      "No sign-up required",
      "Free unlimited use",
      "Multiple image processing",
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is unbg really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, unbg is completely free with no limits. There are no hidden fees, no sign-up required, and no watermarks on your images.",
        },
      },
      {
        "@type": "Question",
        name: "Are my images uploaded to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. unbg processes everything directly in your browser using AI. Your images never leave your device, ensuring complete privacy.",
        },
      },
      {
        "@type": "Question",
        name: "What image formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "unbg supports PNG, JPG, JPEG, and WebP images up to 20MB. Results are always downloaded as high-quality transparent PNGs.",
        },
      },
      {
        "@type": "Question",
        name: "How does unbg compare to remove.bg?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Unlike remove.bg, unbg is 100% free with no credit limits, no watermarks, and no image uploads to external servers. Your images stay on your device while still getting professional-quality background removal.",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white text-gray-900 antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
