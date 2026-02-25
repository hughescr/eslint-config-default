import { defineConfig } from 'eslint/config';
import js            from '@eslint/js';
import n             from 'eslint-plugin-n';
import lodash        from 'eslint-plugin-lodash';
import promise       from 'eslint-plugin-promise';
import comments      from '@eslint-community/eslint-plugin-eslint-comments';
import { fixupPluginRules } from '@eslint/compat';
import regexp        from 'eslint-plugin-regexp';
import stylistic     from '@stylistic/eslint-plugin';
import packageJson   from 'eslint-plugin-package-json';
import tseslint      from 'typescript-eslint';
import globals       from 'globals';

const recommendedRules = {
    '@eslint-community/eslint-comments/disable-enable-pair':   ['warn', { allowWholeFile: true }],
    '@eslint-community/eslint-comments/no-aggregating-enable': 'off',
    '@eslint-community/eslint-comments/no-duplicate-disable':  'warn',
    '@eslint-community/eslint-comments/no-restricted-disable': 'off',
    '@eslint-community/eslint-comments/no-unlimited-disable':  'warn',
    '@eslint-community/eslint-comments/no-unused-disable':     'warn',
    '@eslint-community/eslint-comments/no-unused-enable':      'warn',
    '@eslint-community/eslint-comments/no-use':                ['warn', { allow: ['eslint-disable', 'eslint-enable', 'eslint-disable-line', 'eslint-disable-next-line'] }],
    '@eslint-community/eslint-comments/require-description':   'warn',

    'lodash/callback-binding':        'warn',
    'lodash/chain-style':             ['warn', 'as-needed'],
    'lodash/chaining':                ['warn', 'always', 2],
    'lodash/collection-method-value': 'warn',
    'lodash/collection-ordering':     'warn',
    'lodash/collection-return':       'warn',
    'lodash/consistent-compose':      ['warn', 'flow'],
    'lodash/identity-shorthand':      ['warn', 'always'],
    'lodash/import-scope':            'off',
    'lodash/matches-prop-shorthand':  'warn',
    'lodash/matches-shorthand':       ['warn', 'always', 3],
    'lodash/no-commit':               'warn',
    'lodash/no-double-unwrap':        'warn',
    'lodash/no-extra-args':           'warn',
    'lodash/no-unbound-this':         'warn',
    'lodash/path-style':              ['warn', 'as-needed'],
    'lodash/prefer-compact':          'warn',
    'lodash/prefer-constant':         'warn',
    'lodash/prefer-filter':           'warn',
    'lodash/prefer-find':             'warn',
    'lodash/prefer-flat-map':         'warn',
    'lodash/prefer-get':              'warn',
    'lodash/prefer-immutable-method': 'warn',
    'lodash/prefer-includes':         ['warn', { includeNative: true }],
    'lodash/prefer-invoke-map':       'warn',
    'lodash/prefer-is-nil':           'off',
    'lodash/prefer-lodash-chain':     'warn',
    'lodash/prefer-lodash-method':    ['warn', { ignoreMethods: ['includes'] }],
    'lodash/prefer-lodash-typecheck': 'warn',
    'lodash/prefer-map':              'warn',
    'lodash/prefer-matches':          ['warn', 3],
    'lodash/prefer-noop':             'warn',
    'lodash/prefer-over-quantifier':  'off',
    'lodash/prefer-reject':           'off',
    'lodash/prefer-some':             ['warn', { includeNative: true }],
    'lodash/prefer-startswith':       'warn',
    'lodash/prefer-thru':             'warn',
    'lodash/prefer-times':            'warn',
    'lodash/prefer-wrapper-method':   'warn',
    'lodash/preferred-alias':         'warn',
    'lodash/prop-shorthand':          ['warn', 'always'],
    'lodash/unwrap':                  'warn',

    'n/callback-return':      ['error', ['callback', 'cb', 'next', 'done']],
    'n/handle-callback-err':  'warn',
    'n/no-extraneous-import': 'off',
    'n/no-path-concat':       'error',
    'n/no-sync':              'warn',

    'promise/always-return':   'warn',
    'promise/catch-or-return': 'warn',
    'promise/param-names':     'warn',

    'regexp/match-any':                          'warn',
    'regexp/no-dupe-characters-character-class': 'warn',
    'regexp/no-empty-group':                     'warn',
    'regexp/no-empty-lookarounds-assertion':     'warn',
    'regexp/no-escape-backspace':                'warn',
    'regexp/no-invisible-character':             'warn',
    'regexp/no-octal':                           'warn',
    'regexp/no-useless-backreference':           'off', // This rule is a copy of the ESLint core no-useless-backreference rule so useless
    'regexp/no-useless-two-nums-quantifier':     'warn',
    'regexp/prefer-d':                           'warn',
    'regexp/prefer-plus-quantifier':             'warn',
    'regexp/prefer-question-quantifier':         'warn',
    'regexp/prefer-star-quantifier':             'warn',
    'regexp/prefer-w':                           'warn',

    '@stylistic/array-bracket-spacing': ['warn', 'never', { arraysInArrays: false, objectsInArrays: false }],
    '@stylistic/arrow-spacing':         ['warn', { before: true, after: true }],
    '@stylistic/block-spacing':         ['warn', 'always'],
    '@stylistic/brace-style':           ['warn', '1tbs', { allowSingleLine: true }],
    '@stylistic/comma-dangle':          ['warn', { objects: 'only-multiline', arrays: 'only-multiline', functions: 'never', imports: 'never', exports: 'never' }],
    '@stylistic/comma-spacing':         ['warn', { before: false, after: true }],
    '@stylistic/eol-last':              'warn',
    '@stylistic/function-call-spacing': 'warn',
    '@stylistic/indent':                ['warn', 4, { SwitchCase: 1, MemberExpression: 'off' }],
    '@stylistic/key-spacing':           ['warn', { beforeColon: false, afterColon: true, align: 'value' }],
    '@stylistic/keyword-spacing':       ['warn', {
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
    '@stylistic/linebreak-style':             ['warn', 'unix'],
    '@stylistic/no-confusing-arrow':          'warn',
    '@stylistic/no-multi-spaces':             ['off', { ignoreEOLComments: true }],
    '@stylistic/no-trailing-spaces':          'warn',
    '@stylistic/object-curly-spacing':        ['warn', 'always', { arraysInObjects: true }],
    '@stylistic/padded-blocks':               ['warn', 'never'],
    '@stylistic/quote-props':                 ['warn', 'as-needed', { keywords: true, numbers: true }],
    '@stylistic/quotes':                      ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: 'avoidEscape' }],
    '@stylistic/semi':                        ['error', 'always'],
    '@stylistic/space-before-blocks':         ['warn', { functions: 'always', keywords: 'always', classes: 'always' }],
    '@stylistic/space-before-function-paren': ['warn', { anonymous: 'never', named: 'never', asyncArrow: 'always' }],
    '@stylistic/space-in-parens':             ['warn', 'never'],
    '@stylistic/space-infix-ops':             'warn',
    '@stylistic/space-unary-ops':             ['warn', { words: true, nonwords: false }],

    'array-callback-return':        'warn',
    'block-scoped-var':             'error',
    complexity:                     ['warn', 15],
    curly:                          ['warn', 'all'],
    'default-case-last':            'warn',
    'default-param-last':           'error',
    'dot-notation':                 'warn',
    eqeqeq:                         ['warn', 'always'],
    'no-bitwise':                   'warn',
    'no-console':                   'warn',
    'no-constant-condition':        ['warn', { checkLoops: 'allExceptWhileTrue' }],
    'no-constructor-return':        'warn',
    'no-control-regex':             'off',
    'no-eval':                      'warn',
    'no-fallthrough':               ['error', { allowEmptyCase: true, reportUnusedFallthroughComment: true }],
    'no-implied-eval':              'warn',
    'no-loop-func':                 'error',
    'no-nested-ternary':            'error',
    'no-param-reassign':            ['warn', { props: false }],
    'no-promise-executor-return':   'error',
    'no-redeclare':                 ['error', { builtinGlobals: true }],
    'no-return-assign':             ['error', 'always'],
    'no-self-compare':              'error',
    'no-sequences':                 'error',
    'no-shadow':                    'warn',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary':          'error',
    'no-unused-expressions':        ['error', { allowShortCircuit: true, allowTernary: true }],
    'no-unused-vars':               ['warn', { args: 'after-used', argsIgnorePattern: '^_' }],
    'no-use-before-define':         ['error', 'nofunc'],
    'no-useless-call':              'error',
    'no-useless-concat':            'error',
    'no-var':                       'warn',
    'no-warning-comments':          ['warn', { terms: ['todo', 'fixme', 'xxx'], location: 'anywhere' }],
    'prefer-arrow-callback':        ['warn', { allowNamedFunctions: true }],
    'prefer-const':                 'warn',
    'prefer-object-spread':         'warn',
    'require-await':                'off',
    strict:                         ['warn', 'global'],
};

const javascriptConfig = {
    files:           ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
    name:            '@hughescr/eslint-config/recommended',
    languageOptions: {
        globals: {
            ...globals.node,
        },
    },
    plugins: {
        '@stylistic':                        stylistic,
        n,
        lodash:                              fixupPluginRules(lodash),
        promise,
        '@eslint-community/eslint-comments': comments,
        regexp,
    },
    rules: {
        ...(js.configs.recommended.rules),
        ...(stylistic.configs.recommended.rules),
        ...(n.configs.recommended.rules),
        ...(lodash.configs.recommended.rules),
        ...(promise.configs.recommended.rules),
        ...(comments.configs.recommended.rules),
        ...(regexp.configs.recommended.rules),
        ...recommendedRules,
    },
};

const packageJsonConfig = {
    ...packageJson.configs.recommended,
    rules: {
        ...packageJson.configs.recommended.rules,
        strict: 'off',
    },
};

const typescriptFiles = ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'];

const withTypeInformation = config => ({
    ...config,
    files:           config.files ?? typescriptFiles,
    languageOptions: {
        ...config.languageOptions,
        parserOptions: {
            ...(config.languageOptions?.parserOptions ?? {}),
            projectService:  true,
            tsconfigRootDir: process.cwd(),
        },
    },
});

// eslint-disable-next-line lodash/prefer-lodash-method -- intentionally using native .map() on config arrays
const typeCheckedConfigs          = tseslint.configs.recommendedTypeChecked.map(withTypeInformation);
// eslint-disable-next-line lodash/prefer-lodash-method -- intentionally using native .map() on config arrays
const stylisticTypeCheckedConfigs = tseslint.configs.stylisticTypeChecked.map(withTypeInformation);

const typescriptOverrides = {
    files: typescriptFiles,
    rules: {
        '@typescript-eslint/no-unused-vars':              ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        '@typescript-eslint/require-await':               'off',
        'no-use-before-define':                           'off',
        '@typescript-eslint/no-use-before-define':        ['error', 'nofunc'],
        'no-shadow':                                      'off',
        '@typescript-eslint/no-shadow':                   'warn',
        '@typescript-eslint/no-unused-expressions':       ['error', { allowShortCircuit: true, allowTernary: true }],
        '@typescript-eslint/consistent-type-imports':     'warn',
        '@typescript-eslint/switch-exhaustiveness-check': 'warn',
    },
};

export default defineConfig(
    javascriptConfig,
    ...typeCheckedConfigs,
    ...stylisticTypeCheckedConfigs,
    typescriptOverrides,
    packageJsonConfig
);
