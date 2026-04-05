import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Background - Processing Your Images",
  description:
    "AI is removing backgrounds from your images. Download high-quality transparent PNGs for free.",
  robots: { index: false, follow: true },
};

export default function RemoveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
