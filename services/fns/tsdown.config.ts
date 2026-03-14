import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "src/index.ts",
  format: ["esm"],
  target: "es2022",
  sourcemap: true,
  treeshake: true,
  dts: true,
  exports: true,
  platform: "node",
  logLevel: "error",
});
