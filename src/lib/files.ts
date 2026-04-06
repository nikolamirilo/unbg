const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export function filterValidImages(files: FileList | File[]): File[] {
  return Array.from(files).filter((f) => {
    // On mobile, some browsers report non-standard MIME types (e.g. image/jpg,
    // image/heic) or even empty strings for gallery picks. Accept any file whose
    // type starts with "image/" to handle these cases.
    const isImage = f.type.startsWith("image/") || /\.(png|jpe?g|webp|heic|heif)$/i.test(f.name);
    return isImage && f.size <= MAX_FILE_SIZE;
  });
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
