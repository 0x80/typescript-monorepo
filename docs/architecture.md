# Monorepo Architecture

## Design Philosophy

This monorepo is designed around a **hybrid approach** that prioritizes:

- **Production-ready output**: Optimized, deployable packages
- **Clear separation of concerns**: Bundlers handle compilation, TypeScript
  handles type checking
- **Efficient caching**: Build artifacts can be cached and reused
- **Modern tooling**: Leveraging the best of both bundlers and TypeScript

## Hybrid Approach: Project References + Bundlers

This monorepo uses a hybrid approach that combines the best of both worlds:

1. **TypeScript project references** for development workflow and IDE support
2. **Bundlers (tsdown)** to compile shared packages into optimized dist files
   (with `.d.ts` and source maps)
3. **Turborepo** to orchestrate build dependencies and ensure proper ordering

### Why this hybrid approach?

- **Project references** provide excellent IDE support and eliminate the need for
  watch tasks during development
- **Bundlers** provide better optimization, tree-shaking, and multiple modules
  format support for production
- **Clear dependency flow** makes the build process more predictable and
  maintainable

### Evolution from TypeScript-only to Hybrid

In the previous setup, we relied on TypeScript's `tsc` command to generate
`.d.ts` files for shared packages. This approach:

- Generated `tsconfig.tsbuildinfo` files for incremental compilation
- Required running `tsc --build` to rebuild dependencies
- Created compilation artifacts that needed cleanup

The current hybrid approach eliminates these issues:

- **Bundlers (tsdown)** generate all build artifacts including `.d.ts` files
- **No `tsconfig.tsbuildinfo` files** are generated since TypeScript isn't
  compiling
- **Project references** are used purely for type resolution and IDE features
- **Cleaner build process** with fewer artifacts to manage

## Package Dependencies

```
@repo/common (shared utilities)
    ↓
@repo/core (server-side logic)
    ↓
@repo/web, @repo/api, @repo/fns (consumers)
```

## Build & Type Checking Strategy

The build process follows this sequence:

1. **Shared packages build first** (`@repo/common`, `@repo/core`)
   - Create optimized dist files with `.d.ts` and `.d.ts.map`
   - Enable bundler optimizations (tree-shaking, minification, etc.)

2. **Consumer packages check types** (`@repo/web`, `@repo/api`, `@repo/fns`)
   - TypeScript reads from built dist files
   - Project references ensure proper dependency tracking and IDE support

3. **Turborepo orchestrates** the entire process
   - Ensures proper dependency ordering
   - Caches build artifacts for faster subsequent runs

### tsdown Configuration

Each buildable package contains a `tsdown.config.ts` that defines entries and
output behavior. Examples:

```typescript
// packages/common/tsdown.config.ts
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "src/index.ts",
  outDir: "dist",
  target: "es2022",
  sourcemap: true,
  dts: true,
});
```

```typescript
// packages/core/tsdown.config.ts
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
```

### Key Commands

- `pnpm build` - Builds all packages with proper dependency ordering using
  tsdown configs
- `pnpm check-types` - Runs type checking after ensuring dependencies are built
- `pnpm watch` - Continuously rebuilds packages as they change

## Why Project References Matter for Development

In our hybrid setup, project references serve a specific purpose: they enable the
IDE to understand the relationship between packages without requiring TypeScript
compilation. This is crucial because:

Without project references, developers would need to run a watch task
continuously for the IDE to pick up changes to shared packages during local
development. This is cumbersome because:

- **Watch tasks consume resources** and can slow down the development machine
- **IDE lag** - changes in shared packages aren't immediately reflected in
  consuming packages
- **Manual restarts** - often requiring restarting dev servers or clearing caches
- **Poor developer experience** - developers lose the "instant feedback" that
  make modern development enjoyable

With project references:

- **Instant IDE updates** - changes in shared packages are immediately reflected
- **No watch tasks needed** - the IDE automatically tracks dependencies
- **Better IntelliSense** - go-to-definition and autocomplete work seamlessly
  across packages
- **Improved developer productivity** - the development workflow feels natural
  and responsive
- **No compilation artifacts** - since TypeScript isn't compiling, no
  `tsconfig.tsbuildinfo` files are generated
