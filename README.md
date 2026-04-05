# unbg - AI Background Removal

A free, privacy-focused web app that removes image backgrounds instantly using AI - entirely in your browser. No uploads, no sign-ups, no watermarks, no limits.

## How It Works

### Client-Side AI Pipeline

All processing happens locally in your browser. No image data ever leaves your device.

1. **Upload** - Drop one or more images (PNG, JPG, WebP, up to 20MB each) onto the landing page.
2. **Inference** - The app loads a pre-trained semantic segmentation model via [ONNX Runtime Web](https://onnxruntime.ai/), which runs the neural network using WebAssembly and (where available) WebGPU/WebGL acceleration. On first use, the model files (~80 MB) are downloaded and cached by the browser.
3. **Segmentation** - The model classifies every pixel as foreground or background, producing an alpha matte.
4. **Compositing** - The matte is applied to the original image, yielding a transparent PNG at full resolution.
5. **Refinement** - An optional brush editor lets you manually erase or restore regions using canvas compositing (`destination-out` / clipping from the original).

The heavy lifting is done by [`@imgly/background-removal`](https://github.com/nicjac/background-removal-js), which orchestrates model loading, tiling, and inference through ONNX Runtime.

### Why SharedArrayBuffer?

The app sets `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy` headers so it can use `SharedArrayBuffer`, which ONNX Runtime needs for multi-threaded WASM execution.

## Tech Stack

- **Next.js 16** / React 19 / TypeScript
- **@imgly/background-removal** + **onnxruntime-web** - ML inference
- **Tailwind CSS 4** - styling
- **Lottie** - micro-animations
