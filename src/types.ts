export interface ImageItem {
  name: string;
  originalUrl: string;
  originalBlob: Blob;
  resultUrl: string | null;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

export type ImageStatus = ImageItem["status"];
