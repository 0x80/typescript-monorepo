import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "src/index.ts",
  outDir: "dist",
  target: "es2022",
  sourcemap: true,
  dts: true,
  platform: "node",
});
