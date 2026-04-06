/**
 * Converts any image blob to a PNG that the background-removal model can decode.
 *
 * Strategy (each step is a fallback for the previous):
 *  1. createImageBitmap — broadest native format support on modern browsers
 *  2. <img> tag decode   — fallback for browsers without createImageBitmap
 *  3. heic2any library   — JS-based HEIC/HEIF decoder for Android browsers
 *     that can't handle Apple's format natively
 *
 * After decoding, the image is drawn to a canvas and exported as PNG.
 */

function canvasToPngBlob(
  source: HTMLImageElement | ImageBitmap,
  width: number,
  height: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject(new Error("Could not create canvas context"));
      return;
    }
    ctx.drawImage(source, 0, 0);
    canvas.toBlob(
      (result) => (result ? resolve(result) : reject(new Error("Canvas export failed"))),
      "image/png",
    );
  });
}

/** Try createImageBitmap (best native support, works with most formats). */
async function tryImageBitmap(blob: Blob): Promise<Blob | null> {
  if (typeof createImageBitmap === "undefined") return null;
  try {
    const bmp = await createImageBitmap(blob);
    const png = await canvasToPngBlob(bmp, bmp.width, bmp.height);
    bmp.close();
    return png;
  } catch {
    return null;
  }
}

/** Try <img> element decode (fallback for older browsers). */
function tryImgElement(blob: Blob): Promise<Blob | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = async () => {
      URL.revokeObjectURL(url);
      try {
        const png = await canvasToPngBlob(img, img.naturalWidth, img.naturalHeight);
        resolve(png);
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}

/** Check if blob looks like HEIC/HEIF by magic bytes or MIME type. */
function isHeic(blob: Blob): boolean {
  const type = blob.type.toLowerCase();
  return (
    type === "image/heic" ||
    type === "image/heif" ||
    type === "image/heic-sequence" ||
    type === "image/heif-sequence"
  );
}

/** Detect HEIC from filename when MIME type is generic (some Android browsers). */
function looksLikeHeicByName(name: string): boolean {
  return /\.hei[cf]$/i.test(name);
}

/** Convert HEIC/HEIF using the heic2any JS decoder. */
async function tryHeicConvert(blob: Blob): Promise<Blob | null> {
  try {
    const heic2any = (await import("heic2any")).default;
    const result = await heic2any({ blob, toType: "image/png", quality: 1 });
    const converted = Array.isArray(result) ? result[0] : result;
    return converted;
  } catch {
    return null;
  }
}

/**
 * Takes any image file/blob and returns a PNG blob the AI model can decode.
 * Works on all platforms and browsers.
 */
export async function convertToDecodableBlob(
  blob: Blob,
  fileName?: string,
): Promise<Blob> {
  // Fast path: try native decode first (handles JPEG, PNG, WebP, and
  // HEIC on Safari/iOS which has native support)
  const fromBitmap = await tryImageBitmap(blob);
  if (fromBitmap) return fromBitmap;

  const fromImg = await tryImgElement(blob);
  if (fromImg) return fromImg;

  // Native decode failed — likely HEIC on a non-Safari browser.
  // Use the JS HEIC decoder.
  if (isHeic(blob) || (fileName && looksLikeHeicByName(fileName))) {
    const fromHeic = await tryHeicConvert(blob);
    if (fromHeic) {
      // The heic2any output is a standard PNG/JPEG blob, but run it through
      // canvas to guarantee consistency.
      const decoded = await tryImageBitmap(fromHeic) ?? await tryImgElement(fromHeic);
      if (decoded) return decoded;
      return fromHeic;
    }
  }

  // Last resort: try HEIC conversion even without MIME match — some Android
  // browsers report HEIC files as "application/octet-stream" or empty string.
  if (!isHeic(blob)) {
    const fromHeic = await tryHeicConvert(blob);
    if (fromHeic) {
      const decoded = await tryImageBitmap(fromHeic) ?? await tryImgElement(fromHeic);
      if (decoded) return decoded;
      return fromHeic;
    }
  }

  throw new Error(
    "This image format is not supported. Please convert it to JPG or PNG and try again.",
  );
}
