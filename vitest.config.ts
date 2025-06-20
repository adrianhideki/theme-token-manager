import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
    environment: "jsdom",
    watch: false,
    browser: {
      enabled: true,
      provider: "playwright",
      instances: [{ browser: "chromium" }],
    },
    coverage: {
      provider: "istanbul",
    },
  },
});
