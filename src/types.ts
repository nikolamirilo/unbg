export interface ImageItem {
  name: string;
  originalUrl: string;
  resultUrl: string | null;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

export type ImageStatus = ImageItem["status"];
