module.exports = {
  roots: ['<rootDir>/client/app', '<rootDir>/server/app'],
  cacheDirectory: '<rootDir>/../tmp/',
  preset: 'jest-preset-angular',
  rootDir: './src/',
  globals: {
    'ts-jest': {
      tsConfigFile: './tsconfig.json'
    },
    __TRANSFORM_HTML__: true
  },
  transform: {
    '^.+\\.(ts|js|html)$':
      '<rootDir>/../node_modules/jest-preset-angular/preprocessor.js'
  },
  testMatch: ['**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'html'],
  moduleNameMapper: {
    '^client/(.*)': '<rootDir>/client/$1',
    '^server/(.*)': '<rootDir>/server/$1'
  },
  transformIgnorePatterns: ['node_modules/(?!@ngrx)'],
  snapshotSerializers: [
    '<rootDir>/../node_modules/jest-preset-angular/AngularSnapshotSerializer.js',
    '<rootDir>/../node_modules/jest-preset-angular/HTMLCommentSerializer.js'
  ],
  setupTestFrameworkScriptFile: '<rootDir>/client/setupJest.ts',
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
