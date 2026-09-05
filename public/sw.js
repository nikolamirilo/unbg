/**
 * Keeps the background removal model and the ONNX WASM runtime in Cache
 * Storage so they survive across sessions.
 *
 * @imgly/background-removal fetches its assets with a plain fetch() and gives
 * no cache hook, so intercepting here is the only way to reuse them without
 * forking the package. Asset URLs carry the data package version and are
 * therefore immutable, which makes cache first safe with no invalidation.
 *
 * Only those assets are touched. Navigations, app code and user images are
 * left alone and never enter the cache.
 */

// Keep in sync with CACHE_NAME in src/lib/model-cache.ts
const CACHE_NAME = "unbg-model-cache-v1";
const CACHE_PREFIX = "unbg-model-cache-";
const ASSET_PATH_PREFIX = "/@imgly/background-removal-data/";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
          .map((name) => caches.delete(name)),
      );
      await self.clients.claim();
    })(),
  );
});

function isModelAsset(url) {
  return url.pathname.startsWith(ASSET_PATH_PREFIX);
}

/** /@imgly/background-removal-data/1.7.0/dist/resources.json -> "1.7.0" */
function assetVersion(url) {
  return url.pathname.split("/")[3] || null;
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  let url;
  try {
    url = new URL(event.request.url);
  } catch {
    return;
  }

  if (!isModelAsset(url)) return;

  event.respondWith(serveModelAsset(event.request, url));
});

async function serveModelAsset(request, url) {
  const cache = await caches.open(CACHE_NAME);

  // Match the bare URL and ignore Vary, so an entry written by the warm up
  // still hits when the library later asks for it with different headers.
  const cached = await cache.match(url.href, { ignoreVary: true });
  if (cached) return cached;

  const response = await fetch(request);
  if (!response.ok) return response;

  // put() consumes the whole stream and rejects if the transfer breaks, so a
  // truncated download never lands in the cache. That matters here: the
  // library compares every chunk against the size in resources.json and
  // throws on a mismatch, which a cached partial would make permanent.
  cache
    .put(url.href, response.clone())
    .then(() => dropOtherVersions(cache, assetVersion(url)))
    .catch(() => {});

  return response;
}

/**
 * Drops assets left over from an earlier data package version. Runs only
 * after something new was cached, which is when a version bump shows up.
 */
async function dropOtherVersions(cache, currentVersion) {
  if (!currentVersion) return;

  const requests = await cache.keys();
  await Promise.all(
    requests.map(async (request) => {
      const version = assetVersion(new URL(request.url));
      if (version && version !== currentVersion) await cache.delete(request);
    }),
  );
}
