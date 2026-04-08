// In-memory store for transferring files between pages.
// Survives client-side navigation (SPA) but not hard reloads - which is fine
// since the files would need to be re-picked anyway.

let pending: File[] | null = null;

export function storeFiles(files: File[]): void {
  pending = files;
}

export function consumeFiles(): File[] | null {
  const files = pending;
  pending = null;
  return files;
}
