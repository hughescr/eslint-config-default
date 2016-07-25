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
