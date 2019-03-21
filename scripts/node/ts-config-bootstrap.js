const config = require('../../src/server/tsconfig.app.json');
const tsconfigPaths = require('tsconfig-paths');

const baseUrl = './dist/build/server';
tsconfigPaths.register({
  baseUrl,
  paths: config.compilerOptions.paths
});
