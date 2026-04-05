import type { ImageItem } from "@/types";

export function downloadImage(img: ImageItem): void {
  if (!img.resultUrl) return;
  const a = document.createElement("a");
  a.href = img.resultUrl;
  const baseName = img.name.replace(/\.[^.]+$/, "");
  a.download = `${baseName}_no_bg.png`;
  a.click();
}

export function downloadAllImages(images: ImageItem[]): void {
  images
    .filter((img) => img.status === "done" && img.resultUrl)
    .forEach((img) => downloadImage(img));
}
