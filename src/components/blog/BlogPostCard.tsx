import Link from "next/link";
import type { BlogPost } from "../../../constants/blog";

const categoryColors: Record<BlogPost["category"], string> = {
  comparison: "bg-amber-100 text-amber-700",
  tutorial: "bg-emerald-100 text-emerald-700",
  guide: "bg-indigo-100 text-indigo-700",
};

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-6 hover:border-indigo-300 hover:shadow-md transition-all"
    >
      <span
        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[post.category]}`}
      >
        {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
      </span>
      <h2 className="mt-3 text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
        {post.title}
      </h2>
      <p className="mt-2 text-sm text-gray-500 line-clamp-2">
        {post.description}
      </p>
      <div className="mt-4 flex items-center gap-3 text-xs text-gray-400">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span aria-hidden="true">&middot;</span>
        <span>{post.readingTime}</span>
      </div>
    </Link>
  );
}
