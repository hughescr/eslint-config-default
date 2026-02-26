@hughescr/eslint-config-default
================================

Shared ESLint flat config for JavaScript and TypeScript projects. Bundles a curated set of plugins and enforces consistent style, correctness, and type-safety rules out of the box.

- ESLint v10, ESM module
- BSD-3-Clause license

Installation
------------

`eslint` is included as a dependency, so you do not need to install it separately.

```bash
bun add -D @hughescr/eslint-config-default
```

Usage
-----

Create an `eslint.config.mjs` in your project root:

```js
import hughescrDefault from '@hughescr/eslint-config-default';
import { defineConfig } from 'eslint/config';

export default defineConfig(
    ...hughescrDefault,
    // your project-specific overrides here
);
```

The package exports a complete flat config array. Spread it into `defineConfig()` and add any project-specific overrides after it.

What's Included
---------------

The following plugins are bundled and pre-configured:

- `@eslint/js` — core ESLint rules
- `@stylistic/eslint-plugin` — formatting rules
- `typescript-eslint` — TypeScript support with type-checked rules
- `eslint-plugin-import-x` — import ordering and hygiene
- `eslint-plugin-unicorn` — opinionated best practices
- `eslint-plugin-sonarjs` — code quality and cognitive complexity
- `eslint-plugin-lodash` — Lodash usage patterns
- `eslint-plugin-n` — Node.js-specific rules
- `eslint-plugin-promise` — Promise best practices
- `eslint-plugin-regexp` — regular expression correctness
- `@eslint-community/eslint-plugin-eslint-comments` — lint comment hygiene
- `eslint-plugin-package-json` — `package.json` validation

Key Style Choices
-----------------

- 4-space indentation
- Single quotes, semicolons required
- Most rules use `warn` severity; `error` is reserved for critical correctness issues
- `eslint-disable` comments must include a description

TypeScript Support
------------------

TypeScript rules are applied automatically to `.ts`, `.tsx`, `.cts`, and `.mts` files using `typescript-eslint`'s type-checked configs. The `buildTypescriptExtensionRules` function automatically promotes applicable core ESLint rules to their `@typescript-eslint` equivalents.

Type-checked rules require a `tsconfig.json` in your project root. The config uses:

```js
parserOptions: {
    projectService: true,
    tsconfigRootDir: process.cwd(),
}
```

If your project has no `tsconfig.json`, TypeScript files will still be linted but type-aware rules will be skipped.

Developer
---------

To browse the full config interactively, inspect enabled/disabled rules, or find unconfigured rules:

```bash
bun rules-checkup
```
