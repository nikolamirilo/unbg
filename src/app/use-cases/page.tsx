import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/blog/Breadcrumbs";

export const metadata: Metadata = {
  title: "Background Removal Use Cases - unbg",
  description:
    "Discover how to use free background removal for e-commerce, social media, photography, marketing, real estate, and more.",
  keywords: [
    "background removal use cases",
    "remove background for ecommerce",
    "product photo background remover",
    "social media background removal",
    "real estate photo editing",
    "passport photo background",
    "print on demand transparent background",
    "free background remover",
  ],
  alternates: {
    canonical: "https://unbg.tech/use-cases",
  },
  openGraph: {
    title: "Background Removal Use Cases - unbg",
    description:
      "Discover how to use free background removal for e-commerce, social media, photography, marketing, real estate, and more.",
    url: "https://unbg.tech/use-cases",
    type: "website",
  },
};

function UseCaseSection({
  title,
  description,
  bullets,
  link,
}: {
  title: string;
  description: string;
  bullets: string[];
  link?: { href: string; label: string };
}) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <p className="mt-3 text-gray-600 leading-relaxed">{description}</p>
      <ul className="mt-4 list-disc pl-6 text-gray-600 space-y-1.5">
        {bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {link && (
        <p className="mt-4">
          <Link
            href={link.href}
            className="text-indigo-600 font-medium hover:underline"
          >
            {link.label} &rarr;
          </Link>
        </p>
      )}
    </section>
  );
}

export default function UseCasesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Background Removal Use Cases",
    description:
      "Discover how to use free background removal for e-commerce, social media, photography, marketing, real estate, and more.",
    url: "https://unbg.tech/use-cases",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "E-commerce & Product Photos",
          url: "https://unbg.tech/blog/background-removal-ecommerce-guide",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Social Media Content",
          url: "https://unbg.tech/blog/youtube-thumbnails-transparent-background",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Professional Photography",
          url: "https://unbg.tech/blog/remove-background-headshot-photos",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Marketing & Design",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Real Estate",
          url: "https://unbg.tech/blog/background-remover-real-estate",
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Print-on-Demand",
          url: "https://unbg.tech/blog/print-on-demand-transparent-background",
        },
        {
          "@type": "ListItem",
          position: 7,
          name: "Passport & ID Photos",
          url: "https://unbg.tech/blog/passport-photo-background-remover",
        },
      ],
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
            items={[{ label: "Home", href: "/" }, { label: "Use Cases" }]}
          />

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Background Removal Use Cases
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            From product photography to passport photos, background removal is
            one of the most common image editing tasks. unbg handles all of
            these for free, directly in your browser, with no uploads and no
            watermarks.
          </p>

          {/* 1. E-commerce & Product Photos */}
          <UseCaseSection
            title="E-commerce & Product Photos"
            description="Clean product images with white or transparent backgrounds are essential for online stores. Marketplaces like Amazon, eBay, and Etsy require plain backgrounds, and professional-looking listings consistently drive higher conversion rates."
            bullets={[
              "Create white-background product photos that meet Amazon and eBay listing requirements",
              "Batch-process inventory images for Shopify, WooCommerce, or BigCommerce stores",
              "Prepare transparent PNGs for product catalogs and comparison pages",
              "Remove cluttered backgrounds from flat-lay or lifestyle product shots",
            ]}
            link={{
              href: "/blog/background-removal-ecommerce-guide",
              label: "Read the e-commerce background removal guide",
            }}
          />
          <p className="mt-2">
            <Link
              href="/blog/remove-background-product-photos-amazon"
              className="text-indigo-600 text-sm hover:underline"
            >
              Also: How to remove backgrounds for Amazon product photos
            </Link>
          </p>

          {/* 2. Social Media Content */}
          <UseCaseSection
            title="Social Media Content"
            description="Stand out in crowded feeds with cutout images, custom thumbnails, and eye-catching visuals. Transparent backgrounds let you composite subjects onto branded templates or colorful gradients in seconds."
            bullets={[
              "Design scroll-stopping YouTube thumbnails with clean subject cutouts",
              "Create Instagram stickers and cutout-style story graphics",
              "Build TikTok and Reels overlays with transparent subjects",
              "Produce professional LinkedIn banners and profile images",
            ]}
            link={{
              href: "/blog/youtube-thumbnails-transparent-background",
              label:
                "Learn how to create YouTube thumbnails with transparent backgrounds",
            }}
          />
          <p className="mt-2">
            <Link
              href="/blog/instagram-cutout-stickers-from-photos"
              className="text-indigo-600 text-sm hover:underline"
            >
              Also: How to make Instagram cutout stickers from your photos
            </Link>
          </p>

          {/* 3. Professional Photography */}
          <UseCaseSection
            title="Professional Photography"
            description="Photographers use background removal for headshots, portraits, and composite work. unbg handles hair, fur, and semi-transparent edges with AI precision, saving hours of manual masking in Photoshop."
            bullets={[
              "Process corporate headshots for company websites and directories",
              "Create clean portraits for acting portfolios and modeling composites",
              "Remove distracting backgrounds from event and conference photos",
              "Prepare images for photo compositing and creative retouching",
            ]}
            link={{
              href: "/blog/remove-background-headshot-photos",
              label: "Guide: Remove backgrounds from headshot photos",
            }}
          />

          {/* 4. Marketing & Design */}
          <UseCaseSection
            title="Marketing & Design"
            description="Marketing teams and graphic designers rely on transparent assets for flyers, banners, presentations, and brand materials. Having isolated subjects on transparent backgrounds makes it easy to drop them into any layout or template."
            bullets={[
              "Create assets for digital ads, social banners, and email campaigns",
              "Build pitch decks and presentations with clean product or team photos",
              "Design brochures, flyers, and posters without background distractions",
              "Prepare transparent logos and brand elements for multi-channel use",
            ]}
          />

          {/* 5. Real Estate */}
          <UseCaseSection
            title="Real Estate"
            description="Real estate agents and property managers use background removal to enhance listing photos. Replacing overcast skies, cleaning up exterior shots, and isolating architectural details all start with removing the existing background."
            bullets={[
              "Replace dull skies in exterior property photos with clear blue alternatives",
              "Isolate properties from cluttered surroundings for clean listing images",
              "Create composite images for virtual staging and marketing materials",
              "Prepare transparent property cutouts for flyers and social media ads",
            ]}
            link={{
              href: "/blog/background-remover-real-estate",
              label: "How real estate professionals use background removal",
            }}
          />

          {/* 6. Print-on-Demand */}
          <UseCaseSection
            title="Print-on-Demand"
            description="Print-on-demand sellers need transparent PNG files to place designs on t-shirts, mugs, phone cases, and other products. Clean edges and proper transparency are critical for professional-looking merchandise."
            bullets={[
              "Prepare artwork with transparent backgrounds for t-shirt printing",
              "Create sticker designs with clean cutouts and no white edges",
              "Isolate illustrations and hand-drawn art for mug and tote bag products",
              "Process bulk designs for platforms like Redbubble, Merch by Amazon, and Printful",
            ]}
            link={{
              href: "/blog/print-on-demand-transparent-background",
              label: "Print-on-demand transparent background guide",
            }}
          />

          {/* 7. Passport & ID Photos */}
          <UseCaseSection
            title="Passport & ID Photos"
            description="Many countries require specific background colors for passport and visa photos. unbg lets you remove the existing background and replace it with the required white or light-colored backdrop, and since processing happens entirely in your browser, your identity documents stay private."
            bullets={[
              "Create compliant passport photos with white or plain backgrounds",
              "Process visa application photos to meet embassy requirements",
              "Prepare ID badge photos for corporate or institutional use",
              "Keep sensitive identity documents private with 100% browser-based processing",
            ]}
            link={{
              href: "/blog/passport-photo-background-remover",
              label: "Passport photo background removal guide",
            }}
          />

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Try It Free - No Sign-Up Required
            </h2>
            <p className="mt-3 text-gray-600 max-w-lg mx-auto">
              Remove backgrounds from your images in seconds. Works right in
              your browser with no uploads, no watermarks, and no limits.
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
