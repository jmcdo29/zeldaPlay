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
      tsConfig: '<rootDir>/tsconfig.spec.json',
      astTransformers: [ require.resolve('jest-preset-angular/InlineHtmlStripStylesTransformer')],
      stringifyContentPathRegex: '\\.html$'
    }
  },
  testMatch: ['**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'html'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>/'}),
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  coverageDirectory: '<rootDir>/../../coverage/client'
}