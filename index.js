'use strict';

module.exports = {
    parserOptions: {
        ecmaVersion: 9,
    },

    env: {
        es6: true,
        node: true,
        browser: true,
    },

    'extends': ['eslint:recommended', 'plugin:node/recommended'],

    plugins: [
        'promise',
        'node',
    ],
    rules: {
        'promise/catch-or-return':     'warn',
        'promise/always-return':       'warn',
        'promise/param-names':         'warn',

        'node/exports-style':          ['warn', 'module.exports'],

        'array-bracket-spacing':       ['warn', 'never', { arraysInArrays: false, objectsInArrays: false }],
        'array-callback-return':       'warn',
        'arrow-spacing':               ['warn', { before: true, after: true }],
        'block-scoped-var':            'error',
        'block-spacing':               ['warn', 'always'],
        'brace-style':                 ['warn', '1tbs', { allowSingleLine: true }],
        'callback-return':             ['error', ['callback', 'cb', 'next', 'done']],
        'comma-dangle':                ['warn', 'always-multiline'],
        'comma-spacing':               ['warn', { before: false, after: true }],
        'comma-style':                 ['error', 'last'],
        complexity:                    ['warn', 15],
        curly:                         ['warn', 'all'],
        'dot-notation':                'warn',
        'eol-last':                    'warn',
        'handle-callback-err':         'warn',
        'keyword-spacing':             ['warn', {
            before: true,
            after:  true,
            overrides:
            {
                'if':       { after: false },
                'for':      { after: false },
                'while':    { after: false },
                'continue': { after: false },
                'catch':    { after: false },
                'switch':   { after: false },
            },
        }],
        'linebreak-style':             ['warn', 'unix'],
        'no-bitwise':                  'warn',
        'no-confusing-arrow':          'warn',
        'no-console' :                 'warn',
        'no-const-assign':             'error',
        'no-control-regex':            'off',
        'no-delete-var':               'error',
        'no-dupe-args':                'warn',
        'no-dupe-keys':                'warn',
        'no-duplicate-case':           'warn',
        'no-eval':                     'warn',
        'no-fallthrough':              'warn',
        'no-implied-eval':             'warn',
        'no-loop-func':                'error',
        'no-negated-in-lhs':           'warn',
        'no-nested-ternary':           'error',
        'no-param-reassign':           ['warn', { props: false }],
        'no-path-concat':              'error',
        'no-redeclare':                ['error', { builtinGlobals: true }],
        'no-return-assign':            ['error', 'always'],
        'no-self-compare':             'error',
        'no-sequences':                'error',
        'no-spaced-func':              'warn',
        'no-sync':                     'warn',
        'no-trailing-spaces':          'warn',
        'no-unexpected-multiline':     'error',
        'no-unmodified-loop-condition':'error',
        'no-unneeded-ternary':         'error',
        'no-unreachable':              'error',
        'no-unused-expressions':       ['error', { allowShortCircuit: true, allowTernary: true }],
        'no-unused-vars':              ['warn', { args: 'after-used' }],
        'no-use-before-define':        ['error', 'nofunc'],
        'no-useless-call':             'error',
        'no-useless-concat':           'error',
        'no-useless-escape':           'error',
        'no-var':                      'warn',
        'no-warning-comments':         ['warn', { terms: ['todo', 'fixme', 'xxx'], location: 'anywhere' }],
        'object-curly-spacing':        ['warn', 'always', { arraysInObjects: true }],
        'padded-blocks':               ['warn', 'never'],
        'prefer-arrow-callback':       ['warn', { allowNamedFunctions: true }],
        'prefer-const':                'warn',
        'quote-props':                 ['warn', 'as-needed', { keywords: true, numbers: true }],
        quotes:                        ['warn', 'single', 'avoid-escape'],
        semi:                          ['error', 'always'],
        'semi-spacing':                ['error', { before: false, after: true }],
        'space-before-blocks':         ['warn', { functions: 'always', keywords: 'always' }],
        'space-before-function-paren': ['warn', { anonymous: 'never', named: 'never', asyncArrow: 'always' }],
        'space-in-parens':             ['warn', 'never'],
        'space-infix-ops':             'warn',
        'space-unary-ops':             ['warn', { words: true, nonwords: false }],
        strict:                        ['warn', 'global'],
        'use-isnan':                   'error',
        'valid-typeof':                'warn',
    },
};
