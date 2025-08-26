import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    "db-refs": "src/db-refs.ts",
    firebase: "src/firebase.ts",
    "utils/index": "src/utils/index.ts",
  },
  outDir: "dist",
  target: "es2022",
  sourcemap: true,
  dts: true,
  platform: "node",
});
