import { defineConfig } from "tsup";

const env = process.env.NODE_ENV;

export default defineConfig({
  entry: ["src/index.ts", "src/**/*.(ts|tsx|css)", "!src/**/*.spec.(ts|tsx)"],
  clean: true, // clean up the dist folder
  dts: true, // generate dts files
  format: ["cjs", "esm"], // generate cjs and esm files
  minify: true,
  bundle: true,
  skipNodeModulesBundle: true,
  entryPoints: ["src/index.ts"],
  target: "esnext",
  outDir: "dist",
  treeshake: true,
  splitting: false,
  loader: {
    ".css": "copy",
  },
});
