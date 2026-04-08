import type { Metadata } from "next";
import { BLOG_POSTS } from "../../../constants/blog";
import BlogPostCard from "@/components/blog/BlogPostCard";
import Breadcrumbs from "@/components/blog/Breadcrumbs";

export const metadata: Metadata = {
  title: "Blog - Background Removal Tips & Guides",
  description:
    "Learn how to remove backgrounds from images for e-commerce, social media, photography, and more. Free tutorials, comparisons, and guides from unbg.",
  alternates: {
    canonical: "https://unbg.tech/blog",
  },
};

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Background Removal Tips & Guides
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Tutorials, comparisons, and guides to help you get the most out of
          free background removal for your photos.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
