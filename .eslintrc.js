module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier', '@angular-eslint', 'cypress'],
  parserOptions: {
    source: 'module',
    ecmaVersion: 2018,
  },
  root: true,
  env: {
    node: true,
    jest: true,
    'cypress/globals': true,
  },
  rules: {
    'no-control-regex': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    'sort-imports': [
      'error',
      { ignoreDeclarationSort: true, ignoreCase: true },
    ],
    'prettier/prettier': 'warn',
  },
  ignorePatterns: ['*.d.ts', 'dist/*', '**/node_modules/*', 'lib/*', '*.js'],
  globals: {
    WeakSet: 'readonly',
    Promise: 'readonly',
    Reflect: 'readonly',
  },
  overrides: [
    {
      files: ['*.component.html'],
      parser: '@angular-eslint/template-parser',
      plugins: ['@angular-eslint/template'],
      rules: {
        // ORIGINAL tslint.json -> "template-banana-in-box": true,
        '@angular-eslint/template/banana-in-a-box': 'error',

        // ORIGINAL tslint.json -> "template-no-negated-async": true,
        '@angular-eslint/template/no-negated-async': 'error',
      },
    },
    {
      files: ['*.component.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      plugins: ['@angular-eslint/template'],
      processor: '@angular-eslint/template/extract-inline-html',
    },
  ],
};
