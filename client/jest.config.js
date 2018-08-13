module.exports = {
  rootDir: '..',
  roots: ['<rootDir>/client'],
  preset: 'jest-preset-angular',
  globals: {
    "ts-jest": {
      "tsConfigFile": "<rootDir>/client/tsconfig.spec.json"
    },
    "__TRANSFORM_HTML__": true
  },
  transform: {
    "^.+\\.(ts|js|html)$": "<rootDir>/node_modules/jest-preset-angular/preprocessor.js"
  },
  testMatch: [
    "**/*.spec.ts",
  ],
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
    "html"
  ],
  moduleNameMapper: {
    "^client/(.*)": "<rootDir>/client/$1",
    "^app/(.*)": "<rootDir>/client/app/$1",
    "^assets/(.*)": "<rootDir>/client/assets/$1",
    "^environments/(.*)": "<rootDir>/client/environments/$1"
  },
  transformIgnorePatterns: [
    "node_modules/(?!@ngrx)"
  ],
  "snapshotSerializers": [
    "<rootDir>/node_modules/jest-preset-angular/AngularSnapshotSerializer.js",
    "<rootDir>/node_modules/jest-preset-angular/HTMLCommentSerializer.js"
  ],
  setupTestFrameworkScriptFile: './client/setupJest.ts',
  collectCoverage: true
};