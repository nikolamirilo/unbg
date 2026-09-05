"use client";

import { useEffect } from "react";
import { registerModelCache } from "@/lib/model-cache";

/**
 * Installs the model cache worker. Renders nothing, mounted on the pages
 * that lead into background removal.
 */
export default function ModelCacheProvider() {
  useEffect(() => {
    void registerModelCache();
  }, []);

  return null;
}
