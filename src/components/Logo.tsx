import Link from "next/link";
import { Manrope } from "next/font/google";

const font = Manrope({ subsets: ["latin"], weight: "800" });

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "text-xl", md: "text-2xl", lg: "text-3xl" };

  return (
    <Link
      href="/"
      aria-label="unbg - Home"
      className={`${font.className} ${sizes[size]} tracking-tight text-slate-900`}
    >
      un<span className="text-indigo-600">bg</span>
    </Link>
  );
}
