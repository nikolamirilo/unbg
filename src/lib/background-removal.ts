import { convertToDecodableBlob } from "./image-convert";

export type ProgressCallback = (message: string) => void;

export async function removeImageBackground(
  blob: Blob,
  fileName: string,
  onProgress: ProgressCallback,
): Promise<string> {
  const { removeBackground } = await import("@imgly/background-removal");

  onProgress("Preparing image...");
  const decodable = await convertToDecodableBlob(blob, fileName);

  onProgress("Loading AI model...");

  const resultBlob = await removeBackground(decodable, {
    output: { format: "image/png", quality: 1.0 },
    progress: (key: string, current: number, total: number) => {
      if (key.includes("fetch")) {
        const pct = total > 0 ? Math.round((current / total) * 100) : 0;
        onProgress(`Downloading model... ${pct}%`);
      } else if (key.includes("compute") || key.includes("inference")) {
        onProgress("Removing background...");
      }
    },
  });

  return URL.createObjectURL(resultBlob);
}
