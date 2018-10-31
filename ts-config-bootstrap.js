const config = require('./src/server/tsconfig.app.json');
const tsconfigPaths = require('tsconfig-paths');

const baseUrl = './dist/server';
tsconfigPaths.register({
  baseUrl,
  paths: config.compilerOptions.paths
});
