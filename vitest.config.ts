import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom", // ✅ Ensures DOM functions are available
    setupFiles: "./src/tests/setup.js", // ✅ Ensure setup file is executed before tests

  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});