const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('../tsconfig.app.json');

module.exports = {
  rootDir: '.',
  name: 'e2e',
  displayName: 'e2e',
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths,
    {
      prefix: '<rootDir>/../'
    }
  ),
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/../tsconfig.spec.json'
    }
  },
  testMatch: ['**/*.e2e.spec.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  coverageDirectory: '<rootDir>/../../coverage/e2e',
  testEnvironment: "node"
}