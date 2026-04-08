import Breadcrumbs from "./Breadcrumbs";
import BlogCta from "./BlogCta";

interface BlogPostLayoutProps {
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: string;
  slug: string;
  children: React.ReactNode;
}

const categoryColors: Record<string, string> = {
  comparison: "bg-amber-100 text-amber-700",
  tutorial: "bg-emerald-100 text-emerald-700",
  guide: "bg-indigo-100 text-indigo-700",
};

export default function BlogPostLayout({
  title,
  description,
  date,
  category,
  readingTime,
  slug,
  children,
}: BlogPostLayoutProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Organization",
      name: "unbg",
      url: "https://unbg.tech",
    },
    publisher: {
      "@type": "Organization",
      name: "unbg",
      url: "https://unbg.tech",
      logo: {
        "@type": "ImageObject",
        url: "https://unbg.tech/logo.png",
      },
    },
    url: `https://unbg.tech/blog/${slug}`,
    mainEntityOfPage: `https://unbg.tech/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: title },
          ]}
        />

        <header className="mb-10">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[category] || "bg-gray-100 text-gray-700"}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
            <time dateTime={date}>
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span aria-hidden="true">&middot;</span>
            <span>{readingTime}</span>
          </div>
        </header>

        <div className="prose prose-gray prose-indigo max-w-none [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-3 [&>p]:text-gray-600 [&>p]:leading-relaxed [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul>li]:text-gray-600 [&>ul>li]:mb-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>ol>li]:text-gray-600 [&>ol>li]:mb-2 [&>table]:w-full [&>table]:border-collapse [&>table]:mb-6 [&>table_th]:border [&>table_th]:border-gray-200 [&>table_th]:bg-gray-50 [&>table_th]:px-4 [&>table_th]:py-2 [&>table_th]:text-left [&>table_th]:text-sm [&>table_th]:font-semibold [&>table_td]:border [&>table_td]:border-gray-200 [&>table_td]:px-4 [&>table_td]:py-2 [&>table_td]:text-sm [&>table_td]:text-gray-600">
          {children}
        </div>

        <BlogCta />
      </article>
    </>
  );
}
