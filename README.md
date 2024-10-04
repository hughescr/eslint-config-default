Overview
========

This is a default configuration set-up for how I like my ESLint to be set up.

```
yarn add -D @hughescr/eslint-config-default eslint
```

Then put this in `eslint.config.mjs`:

```
import defaultConfig from '@hughescr/eslint-config-default';

export default [
    defaultConfig.configs.recommended,
];
```

Developer
---------

If you want to browse the config, find un-configured rules, etc:

```
yarn rules-checkup
```
