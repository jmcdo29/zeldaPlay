module.exports = {
  name: 'api-e2e',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/api-e2e',
  testMatch: ['**/+(*.e2e-)+(spec|test).+(ts|js)?(x)'],
  collectCoverageFrom: ['apps/api/**/*.ts'],
};
