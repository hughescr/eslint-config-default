# CLAUDE.md — eslint-config-default

## Project Overview

`@hughescr/eslint-config-default` is a shared ESLint flat config package (v5.0.3) published to npm under the `@hughescr` scope with public access. It is an ESM module (`"type": "module"`) that exports a single entry point `index.mjs` and provides opinionated ESLint rules for both JavaScript and TypeScript projects. Licensed under BSD-3-Clause.

The source IS the distributable — there is no build step.

---

## Key Commands

```bash
# Visually inspect all configured rules in a browser UI
bun rules-checkup

# Bump version and trigger automated git-flow release
bun pm version --no-git-tag-version patch     # or minor, major
```

The `postversion` script automates the git-flow release cycle: it creates a release branch, finishes it, and merges to both `main` and `develop`.

There is NO test suite. The `test` script only echoes an error. Verify changes by running `rules-checkup` or by testing in a consuming project.

---

## Architecture

Everything lives in a single file: `index.mjs`.

### Structure of `index.mjs` (top to bottom)

1. **Plugin imports** — all ESLint plugin imports at the top
2. **`recommendedRules` object** — all custom rule overrides, organized by plugin namespace:
   - `eslint-comments`, `lodash`, `n`, `promise`, `regexp`
   - `@stylistic`, core ESLint, `unicorn`, `import-x`, `sonarjs`
3. **`buildTypescriptExtensionRules()` function** — dynamically maps core ESLint rules to their `@typescript-eslint` equivalents by introspecting `tseslint.plugin.rules` metadata. Adding a new core rule with a TS extension will be picked up automatically.
4. **`javascriptConfig`** — main config block applying to all JS/TS files; merges recommended configs from all plugins with custom overrides
5. **`packageJsonConfig`** — config block for linting `package.json` files
6. **TypeScript-specific config blocks**:
   - `typeCheckedConfigs`
   - `stylisticTypeCheckedConfigs`
   - `typescriptExtensionRules`
   - `typescriptOverrides`
7. **Default export** — composed via `defineConfig()` from all config blocks above

---

## Code Conventions

These conventions are enforced by this config on itself and on any consuming project:

| Convention | Setting |
|---|---|
| Indentation | 4 spaces |
| Quotes | Single quotes, `avoidEscape: true` |
| Semicolons | Required (error level) |
| Brace style | 1TBS |
| Keyword spacing | No space before parens in `if`, `for`, `while`, `catch`, `switch` |
| Trailing commas | Multiline objects/arrays only — never in function params, imports, or exports |
| Object key-value alignment | Colons aligned to value column (`key-spacing: align: 'value'`) |
| Rule severity | Default to `'warn'` — `'error'` reserved for critical issues |
| `eslint-disable` comments | Must include a description |

---

## Dependencies

- **ESLint v10** flat config with `defineConfig()`
- **Key plugins**: `@stylistic`, `typescript-eslint`, `import-x`, `unicorn`, `sonarjs`, `lodash`, `n`, `promise`, `regexp`, `eslint-comments`, `package-json`
- **`@eslint/compat`** `fixupPluginRules` is used for the `lodash` plugin, which does not yet support native flat config

Note: `eslint-disable` comments exist in `index.mjs` itself to suppress lodash plugin warnings (since the config file does not use lodash as a runtime dependency).

---

## Git Workflow

- **Git-flow model**: `develop` is the active working branch; `main` holds releases only
- **Versioning**: Run `bun pm version --no-git-tag-version patch|minor|major` — the `--no-git-tag-version` flag is required because bun has no global config equivalent to `.npmrc` where this can be set as a default. The `postversion` script calls `git flow release start/finish` automatically
- **Commit message convention for releases**: `"Bump package version to X.Y.Z"`
- **PRs should target `develop`**, not `main`

---

## Important Notes

- **No tests exist.** Validate changes by running `bun rules-checkup` or by testing in a project that consumes this config.
- **`buildTypescriptExtensionRules` is critical.** It dynamically generates TypeScript rule overrides by introspecting plugin metadata. Do not remove or simplify it.
- **This config is self-hosting.** The rules it exports also govern the formatting and style of `index.mjs` itself.
