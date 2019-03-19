const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig.app.json');

module.exports = {
  rootDir: '.',
  name: 'client',
  displayName: 'client',
  roots: ['<rootDir>/app'],
  preset: 'jest-preset-angular',
  globals: {
    'ts-jest': {
      tsConfigFile: './tsconfig.spec.json',
      astTransformer: [ require.resolve('jest-preset-angular/InlineHtmlStripStylesTransformer')],
      stringifyContextPathRegex: '\\.html$'
    }
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest'
  },
  testMatch: ['**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'html'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>/'}),
  transformIgnorePatterns: ['node_modules/(?!@ngrx)'],
  snapshotSerializers: [
    '<rootDir>/../../node_modules/jest-preset-angular/AngularSnapshotSerializer.js',
    '<rootDir>/../../node_modules/jest-preset-angular/HTMLCommentSerializer.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  coverageDirectory: '<rootDir>/../../coverage/client'
}