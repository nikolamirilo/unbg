export type ProgressCallback = (message: string) => void;

export async function removeImageBackground(
  imageUrl: string,
  onProgress: ProgressCallback,
): Promise<string> {
  const { removeBackground } = await import("@imgly/background-removal");

  onProgress("Loading AI model...");
  const resp = await fetch(imageUrl);
  const blob = await resp.blob();

  const resultBlob = await removeBackground(blob, {
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
