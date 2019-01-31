const { pathsToModuleNameMapper } = require('ts-jest/utils');

const  { compilerOptions } = require('./tsconfig.json');

module.exports = {
  roots: ['<rootDir>/client/app', '<rootDir>/server/app'],
  cacheDirectory: '<rootDir>/../tmp/',
  preset: 'jest-preset-angular',
  coverageDirectory: '<rootDir>/../coverage',
  rootDir: './src/',
  globals: {
    'ts-jest': {
      tsConfigFile: '../tsconfig.json'
    },
    __TRANSFORM_HTML__: true
  },
  transform: {
    '^.+\\.(ts|js|html)$':
      '<rootDir>/../node_modules/jest-preset-angular/preprocessor.js'
  },
  testMatch: ['**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'html'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>/'}),
  transformIgnorePatterns: ['node_modules/(?!@ngrx)'],
  snapshotSerializers: [
    '<rootDir>/../node_modules/jest-preset-angular/AngularSnapshotSerializer.js',
    '<rootDir>/../node_modules/jest-preset-angular/HTMLCommentSerializer.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/client/setupJest.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/**/*.ts',
    '!**/main.ts',
    '!**/polyfills.ts',
    '!**/setupJest.ts',
    '!**/test.ts',
    '!**/jestGlobalMocks.ts'
  ],
  coverageReporters: ['lcov', 'text']
};
