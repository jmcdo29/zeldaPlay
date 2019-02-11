module.exports = {
  projects: [
    'src/server/jest.config.js',
    'src/client/jest.config.js'
  ],
  collectCoverageFrom: [
    '<rootDir>/**/*.ts',
    '!**/main.ts',
    '!**/polyfills.ts',
    '!**/setupJest.ts',
    '!**/test.ts',
    '!**/jestGlobalMocks.ts'
  ],
  coverageReporters: ['lcov', 'text', 'text-summary'],
  coverageDirectory: 'coverage'
};
