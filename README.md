# Typescript Monorepo

Documentation:
[typescript-monorepo.codecompose.dev](https://typescript-monorepo.codecompose.dev)

## Introduction

This is a personal quest for the perfect Typescript monorepo setup.

> There is an accompanying article
> ["My quest for the perfect TS monorepo"](https://thijs-koerselman.medium.com/my-quest-for-the-perfect-ts-monorepo-62653d3047eb)
> I'd like you to read that for context. **Note: This article is now outdated
> and will be updated or rewritten for 2025 to reflect the current bundler-first
> architecture.**

My current projects are based on Node.js, Next.js, and Firebase, so that is what
I am focusing on. If you use a different stack, this can still be a great
reference, as the approach itself does not depend on it.

## Notable Features

- [Turborepo](https://turbo.build/) to orchestrate the build process and
  dependencies, including the v2 watch task.
- A web app based on Next.js with [ShadCN](https://ui.shadcn.com/) and
  [Tailwind CSS v4](https://tailwindcss.com/)
- Working IDE go-to-definition and go-to-type-definition using `.d.ts.map` files
- ESM everything
- Typescript path aliases (that get resolved in build output)
- Unified linting and formatting with Biome
- Minimal and strict TypeScript configuration via inheritance
- Vitest
- Multiple isolated Firebase deployments, using
  [firebase-tools-with-isolate](https://github.com/0x80/firebase-tools-with-isolate)
- Firebase emulators with hot reloading
- Clean, typed Firestore abstractions using
  [@typed-firestore/react](https://github.com/0x80/typed-firestore) and
  [@typed-firestore/server](https://github.com/0x80/typed-firestore-server)

## Getting Started

Install PNPM with `corepack`, which is part of modern Node.js versions:

- `corepack enable` (if you have not used it before)
- `corepack prepare pnpm@latest --activate`

Then run `pnpm install` from the repository root.

To get started, execute the following 3 scripts with `pnpm [script name]` from
the root of the monorepo:

| Script    | Description                                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------------------- |
| `watch`   | Continuously builds everything using the Turborepo watch task, except for the web app, which has its own dev server |
| `emulate` | Starts the Firebase emulators.                                                                                      |
| `dev`     | Starts the Next.js dev server to build the app on request.                                                          |

The web app should become available on http://localhost:3000, and the emulators
UI on http://localhost:4000.

For more details on the architecture, Firebase setup, tooling, and more, see the
[documentation](https://typescript-monorepo.codecompose.dev).
