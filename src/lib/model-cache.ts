/**
 * Client side half of the model asset cache.
 *
 * Registering the worker is what makes the cache readable, since the library
 * only ever calls fetch(). Asking for persistent storage is what keeps it
 * alive on mobile, where the plain HTTP cache is evicted under pressure and
 * a user silently loses the whole model.
 */

// Keep in sync with CACHE_NAME in public/sw.js
const CACHE_NAME = "unbg-model-cache-v1";

// Data package version the library resolves to. Used only to warm the cache
// ahead of time, so drift after a dependency bump costs nothing more than a
// skipped warm up. Bump it together with @imgly/background-removal.
const DATA_VERSION = "1.7.0";
const PUBLIC_PATH = `https://staticimgly.com/@imgly/background-removal-data/${DATA_VERSION}/dist/`;

// The resources one removal actually needs, per the library's inference.ts
// and onnx.ts. Its own preload() is no use here, it walks every key in
// resources.json and pulls down all three model variants.
const REQUIRED_RESOURCES = [
  "/models/isnet_fp16",
  "/onnxruntime-web/ort-wasm-simd-threaded.wasm",
  "/onnxruntime-web/ort-wasm-simd-threaded.mjs",
];

const SLOW_CONNECTIONS = ["slow-2g", "2g", "3g"];

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

let registering: Promise<void> | null = null;
let warming: Promise<void> | null = null;

/** Installs the worker and asks the browser to keep our storage. Idempotent. */
export function registerModelCache(): Promise<void> {
  if (!registering) registering = register();
  return registering;
}

async function register(): Promise<void> {
  if (typeof navigator === "undefined") return;
  if (!("serviceWorker" in navigator)) return;

  try {
    await navigator.serviceWorker.register("/sw.js", { scope: "/" });
    await navigator.serviceWorker.ready;
    await requestPersistence();
  } catch {
    // The cache is an optimisation. Removal still works without it.
  }
}

async function requestPersistence(): Promise<void> {
  if (!navigator.storage?.persist) return;

  try {
    if (await navigator.storage.persisted()) return;
    await navigator.storage.persist();
  } catch {
    // Refused or unsupported. Nothing to fall back to.
  }
}

/**
 * Downloads the model before the user commits to an image, so the first
 * removal does not start with a wait. Safe to call repeatedly, the work
 * happens once per page.
 */
export function warmModelCache(): Promise<void> {
  if (!warming) warming = warm();
  return warming;
}

async function warm(): Promise<void> {
  if (typeof window === "undefined" || !("caches" in window)) return;
  if (!shouldWarm()) return;

  try {
    await registerModelCache();

    const cache = await caches.open(CACHE_NAME);

    for (const url of await resolveChunkUrls()) {
      const cached = await cache.match(url, { ignoreVary: true });
      if (cached) continue;

      // add() streams straight into the cache, so nothing large is held in
      // page memory. Sequential on purpose, parallel multi MB streams are
      // rough on weaker phones.
      await cache.add(url);
    }
  } catch {
    // Best effort. A failure only means the model downloads on first use.
  }
}

/** Reads resources.json and expands the resources we need into chunk URLs. */
async function resolveChunkUrls(): Promise<string[]> {
  const response = await fetch(new URL("resources.json", PUBLIC_PATH).toString());
  if (!response.ok) return [];

  const manifest = await response.json();
  const urls: string[] = [];

  for (const key of REQUIRED_RESOURCES) {
    const chunks = manifest?.[key]?.chunks;
    // A missing key means DATA_VERSION no longer matches the installed
    // library. Skip quietly rather than warm the wrong version.
    if (!Array.isArray(chunks)) return [];

    for (const chunk of chunks) {
      urls.push(new URL(chunk.name, PUBLIC_PATH).toString());
    }
  }

  return urls;
}

/** Never spend tens of megabytes on a metered or slow connection. */
function shouldWarm(): boolean {
  const connection = (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
  if (!connection) return true;
  if (connection.saveData) return false;

  return !(
    connection.effectiveType && SLOW_CONNECTIONS.includes(connection.effectiveType)
  );
}
