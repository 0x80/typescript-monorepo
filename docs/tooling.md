# Tooling

## Linting and Formatting

This monorepo uses the Rust-based [oxc](https://oxc.rs/) toolchain:

- [**oxlint**](https://oxc.rs/docs/guide/usage/linter) for linting, with the
  `typescript`, `import`, and `unicorn` plugins enabled.
- [**oxfmt**](https://oxc.rs/docs/guide/usage/formatter) for formatting.

Both are dramatically faster than the Prettier + ESLint or Biome alternatives I
used previously, and oxlint provides reliable type-aware rules (notably
`typescript/no-misused-promises` and `typescript/no-explicit-any`).

Configuration lives in:

- `.oxlintrc.json`
- `.oxfmtrc.jsonc` and `.oxfmtignore`

### Scripts

| Script         | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| `lint`         | Run oxlint in type-aware mode with the import plugin            |
| `lint:fix`     | Same as `lint`, applying autofixes                              |
| `format`       | Run oxfmt (writes changes)                                      |
| `check-format` | Run oxfmt in check mode                                         |
| `check-lint`   | Build all packages first, then run oxlint (CI-equivalent check) |

Type-aware lint requires the built `.d.ts` files of dependencies to be present,
which is why `check-lint` builds first. Day-to-day you can just run `lint` — the
IDE integration will have already warmed the caches.

### Circular imports

Circular imports are caught by the `import/no-cycle` oxlint rule, so there is no
separate `madge` pass. If you ever introduce a cycle, it will surface as a lint
error at the root.

## Git Hooks

Pre-commit hooks are managed by [lefthook](https://lefthook.dev/). The config in
`lefthook.yml` runs two steps in parallel on staged files:

1. **format** — `oxfmt` with `stage_fixed: true`, so format corrections are
   automatically added to the commit.
2. **lint** — `oxlint --import-plugin --type-aware`, which will block the commit
   if there are lint errors.

The hook is installed automatically on `pnpm install` via the root `prepare`
script (`lefthook install`). There is nothing else to configure.

Type checking and tests are not run pre-commit — they live in CI, where they can
take the time they need. The pre-commit hook is intentionally kept fast enough
to feel invisible.

## Testing

This monorepo uses [Vitest](https://vitest.dev/) for testing. Tests can be run
with:

```bash
pnpm test
```

A workspace configuration (`vitest.workspace.ts`) at the root ensures tests are
discovered across all packages.

## Build Orchestration

[Turborepo](https://turbo.build/) orchestrates all tasks across the workspace.
Task definitions live in `turbo.jsonc`. The main tasks are `build`,
`check-types`, `test`, and `clean`; each declares its dependencies on upstream
builds so Turborepo can schedule and cache correctly.

See [Architecture](./architecture) for how these tasks fit together with the
TypeScript project references used in the hybrid build approach.

## Node Runtime

The Node version is pinned via `.nvmrc` and `engines.node` in the root
`package.json` (currently Node 24). CI and the Firebase Functions runtimes are
aligned to the same version.
