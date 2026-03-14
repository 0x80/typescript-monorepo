# Tooling

## Prettier + ESLint vs Biome

I have switched from using Prettier + ESLint to Biome, because it is much
faster, but it is not a full replacement yet.

Biome (as of v2.2) does not have the type-aware rules that typescript-eslint
provides. I find those rules the most valuable, and this is holding me back from
using Biome on a large codebase.

Most notably, the `noFloatingPromises` rule does not seem to be working reliably
yet.

Things I miss from Prettier are:

- Markdown formatting
- JSDoc formatting (via plugin)

For this reason, I have kept prettier for markdown formatting. For JSDoc
formatting, I have no solution yet.

If you want to see a working (shared) ESLint configuration, hop back a few
commits to before Biome was introduced.

## Vitest

This monorepo uses [Vitest](https://vitest.dev/) for testing. Tests can be run
with:

```bash
pnpm test
```

A workspace configuration (`vitest.workspace.ts`) at the root ensures tests are
discovered across all packages.
