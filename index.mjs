import { fixupPluginRules } from '@eslint/compat';
import js            from '@eslint/js';
import comments      from '@eslint-community/eslint-plugin-eslint-comments';
import stylistic     from '@stylistic/eslint-plugin';
import { defineConfig } from 'eslint/config';
import importX       from 'eslint-plugin-import-x';
import lodash        from 'eslint-plugin-lodash';
import n             from 'eslint-plugin-n';
import packageJson   from 'eslint-plugin-package-json';
import promise       from 'eslint-plugin-promise';
import regexp        from 'eslint-plugin-regexp';
import sonarjs       from 'eslint-plugin-sonarjs';
import unicorn       from 'eslint-plugin-unicorn';
import globals       from 'globals';
import tseslint      from 'typescript-eslint';

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
    'lodash/import-scope':            ['warn', 'method'],
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
    'n/no-callback-literal':  'error',

    'promise/always-return':   'warn',
    'promise/catch-or-return': 'warn',
    'promise/param-names':     'warn',
    'promise/prefer-catch':    'warn',

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
    'regexp/no-super-linear-move':               'warn',

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
    'no-unused-vars':               ['warn', { args: 'after-used', argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
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

    'no-template-curly-in-string':    'error',
    'no-unreachable-loop':            'error',
    'no-await-in-loop':               'warn',
    'require-atomic-updates':         'warn',
    'no-new-wrappers':                'error',
    'no-throw-literal':               'error',
    'prefer-promise-reject-errors':   'warn',
    'accessor-pairs':                 'warn',
    'symbol-description':             'warn',
    'prefer-template':                'warn',
    'prefer-exponentiation-operator': 'warn',
    'logical-assignment-operators':   'warn',
    'prefer-object-has-own':          'warn',
    'no-useless-constructor':         'warn',
    'no-useless-return':              'warn',
    'no-useless-computed-key':        'warn',
    'no-useless-rename':              'warn',
    'object-shorthand':               'warn',

    'unicorn/no-null':               'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/filename-case':         ['warn', { cases: { kebabCase: true, pascalCase: true } }],
    'unicorn/catch-error-name':      ['warn', { ignore: [/^e$/, /^err$/, /^error$/] }],

    'import-x/no-duplicates':            ['warn', { 'prefer-inline': true }],
    'import-x/no-self-import':           'error',
    'import-x/no-cycle':                 'warn',
    'import-x/no-useless-path-segments': 'warn',
    'import-x/newline-after-import':     'warn',
    'import-x/no-mutable-exports':       'warn',
    'import-x/order':                    ['warn', {
        groups:             ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'never',
        alphabetize:        { order: 'asc', caseInsensitive: true },
    }],
    'import-x/no-extraneous-dependencies':      ['error', { devDependencies: ['**/*.test.*', '**/*.spec.*', '**/test/**', '**/scripts/**'] }],
    'import-x/no-empty-named-blocks':           'warn',
    'import-x/no-anonymous-default-export':     'warn',
    'import-x/consistent-type-specifier-style': 'off',

    'sonarjs/cognitive-complexity':    ['warn', 15],
    'sonarjs/no-collapsible-if':       'warn',
    'sonarjs/prefer-immediate-return': 'warn',
    'sonarjs/no-unused-vars':          'off',
};

function buildTypescriptExtensionRules(rules) {
    const jsToTsMap = {};
    for(const [tsRuleName, tsRule] of Object.entries(tseslint.plugin.rules)) {
        const base = tsRule?.meta?.docs?.extendsBaseRule;
        if(base === true) {
            jsToTsMap[tsRuleName] = tsRuleName;
        // eslint-disable-next-line lodash/prefer-lodash-typecheck -- avoiding lodash dependency for this simple config package
        } else if(typeof base === 'string') {
            jsToTsMap[base] = tsRuleName;
        }
    }

    const tsOverrides = {};
    for(const [ruleName, config] of Object.entries(rules)) {
        if(ruleName.includes('/')) {   // skip plugin-namespaced rules
            continue;
        }
        const tsRuleName = jsToTsMap[ruleName];
        if(tsRuleName) {
            tsOverrides[ruleName] = 'off';
            tsOverrides[`@typescript-eslint/${tsRuleName}`] = config;
        }
    }
    return tsOverrides;
}

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
        unicorn,
        'import-x':                          importX,
        sonarjs,
    },
    rules: {
        ...(js.configs.recommended.rules),
        ...(stylistic.configs.recommended.rules),
        ...(n.configs.recommended.rules),
        ...(lodash.configs.recommended.rules),
        ...(promise.configs.recommended.rules),
        ...(comments.configs.recommended.rules),
        ...(regexp.configs.recommended.rules),
        ...(unicorn.configs.recommended.rules),
        ...(sonarjs.configs.recommended.rules),
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
            ...config.languageOptions?.parserOptions,
            projectService:  true,
            tsconfigRootDir: process.cwd(),
        },
    },
});

// eslint-disable-next-line lodash/prefer-lodash-method -- avoiding lodash dependency for this simple config package
const typeCheckedConfigs          = tseslint.configs.recommendedTypeChecked.map(config => withTypeInformation(config));
// eslint-disable-next-line lodash/prefer-lodash-method -- avoiding lodash dependency for this simple config package
const stylisticTypeCheckedConfigs = tseslint.configs.stylisticTypeChecked.map(config => withTypeInformation(config));

const typescriptExtensionRules = {
    files: typescriptFiles,
    rules: buildTypescriptExtensionRules(recommendedRules),
};

const typescriptOverrides = {
    files: typescriptFiles,
    rules: {
        '@typescript-eslint/consistent-type-imports':            ['warn', { prefer: 'type-imports', fixStyle: 'separate-type-imports' }],
        '@typescript-eslint/switch-exhaustiveness-check':        'warn',
        '@typescript-eslint/return-await':                       ['warn', 'in-try-catch'],
        '@typescript-eslint/no-unnecessary-condition':           ['warn', { allowConstantLoopConditions: true }],
        '@typescript-eslint/no-confusing-void-expression':       ['warn', { ignoreArrowShorthand: true }],
        '@typescript-eslint/no-misused-spread':                  'warn',
        '@typescript-eslint/no-unnecessary-template-expression': 'warn',
    },
};

export default defineConfig(
    javascriptConfig,
    ...typeCheckedConfigs,
    ...stylisticTypeCheckedConfigs,
    typescriptExtensionRules,
    typescriptOverrides,
    packageJsonConfig
);
