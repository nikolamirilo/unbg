const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export function filterValidImages(files: FileList | File[]): File[] {
  return Array.from(files).filter(
    (f) => ACCEPTED_TYPES.some((t) => f.type === t) && f.size <= MAX_FILE_SIZE,
  );
}

export function readFilesAsDataUrls(
  files: File[],
): Promise<{ name: string; data: string }[]> {
  return Promise.all(
    files.map(
      (file) =>
        new Promise<{ name: string; data: string }>((resolve) => {
          const reader = new FileReader();
          reader.onload = () =>
            resolve({ name: file.name, data: reader.result as string });
          reader.readAsDataURL(file);
        }),
    ),
  );
}
