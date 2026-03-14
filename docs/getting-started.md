# Getting Started

## Install

In the main branch of this repo, packages are managed with PNPM.

There is also a branch for
[NPM](https://github.com/0x80/mono-ts/tree/use-npm).

I recommend using `pnpm` over `npm` or `yarn`. Apart from being fast and
efficient, PNPM has better support for monorepos.

You can install PNPM with `corepack`, which is part of modern Node.js versions:

- `corepack enable` (if you have not used it before)
- `corepack prepare pnpm@latest --activate`

Then run `pnpm install` from the repository root.

## Usage

To get started, execute the following 3 scripts with `pnpm [script name]` from
the root of the monorepo:

| Script    | Description                                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------------------- |
| `watch`   | Continuously builds everything using the Turborepo watch task, except for the web app, which has its own dev server |
| `emulate` | Starts the Firebase emulators.                                                                                      |
| `dev`     | Starts the Next.js dev server to build the app on request.                                                          |

The web app should become available on http://localhost:3000, and the emulators
UI on http://localhost:4000.

You should now have a working local setup, in which code changes to any package
are picked up.

## Namespace

Often in a monorepo, you will never publish the shared packages to NPM or some
other registry, and because of that, the namespace you use to prefix your package
names do not matter, and you might as well pick a standard one that you can be
reused in every project.

At first, I used `@mono`, and later I switched to `@repo` when I encountered
that in the Turborepo examples. I like both, because they are equally short and
clear, but I went with `@repo` because I expect it might become a standard
sooner.

## Packages

- [common](https://github.com/0x80/typescript-monorepo/tree/main/packages/common)
  Code that is shared across both front-end and back-end environments
  simultaneously. Built with tsdown for optimal output.
- [core](https://github.com/0x80/typescript-monorepo/tree/main/packages/core)
  Code that is only shared between server environments, like cloud functions,
  containing mostly "core" business logic. Depends on common.

A standard name for a package that is only shared between client-side apps is
`ui`. Besides sharing UI components, I also use it to share other things that are
solely relevant to the clients.

## Apps

- [web](https://github.com/0x80/typescript-monorepo/tree/main/apps/web) A
  NextJs-based web application configured to use Tailwind CSS and ShadCN
  components, and consumes built packages from common and core.

## Services

- [fns](https://github.com/0x80/typescript-monorepo/tree/main/services/fns)
  Various Firebase functions that execute on document writes, pubsub events, and
  consume built packages from common and core.
- [api](https://github.com/0x80/typescript-monorepo/tree/main/services/api) A
  2nd gen Firebase function (based on Cloud Run) serving as an API endpoint. This
  package also illustrates how to use secrets.
