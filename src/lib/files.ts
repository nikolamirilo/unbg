const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export function filterValidImages(files: FileList | File[]): File[] {
  return Array.from(files).filter((f) => {
    // Check MIME type first; fall back to extension if browser reports empty
    const typeMatch = ALLOWED_TYPES.includes(f.type.toLowerCase());
    const extMatch = /\.(png|jpe?g|webp)$/i.test(f.name);
    return (typeMatch || (f.type === "" && extMatch)) && f.size <= MAX_FILE_SIZE;
  });
}
