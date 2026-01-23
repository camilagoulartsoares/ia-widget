import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/embed/widget-entry.tsx"],
  format: ["iife"],
  globalName: "IAWidget",          // ✅ aqui
  outDir: "public",
  minify: true,
  splitting: false,
  clean: false,
  target: "es2018",
  platform: "browser",
  define: {
    "process.env.NODE_ENV": '"production"',
    "process.env": "{}",
    "process": "{}",
  },
  outExtension() {
    return { js: ".iife.js" };
  },
});
