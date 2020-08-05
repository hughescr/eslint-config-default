Overview
========

This is a default configuration set-up for how I like my ESLint to be set up.

```
npm install eslint-config-default eslint eslint-plugin-promise
```

Then put this in .eslintrc:

```
'use strict';

module.exports = {
    'extends': '@hughescr/eslint-config-default',
};
```

Developer
---------

If you want to know which new rules might exist out there which aren't specified:

```
yarn omitted-rules
```

These rules are turned off:

```
yarn disabled-rules
```

Errors:

```
yarn error-rules
```

and warnings:

```
yarn warn-rules
```
