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
  moduleNameMapper: {
    '#Enums/(.*)$': '<rootDir>/client/app/models/enums/$1',
    '#Races/(.*)$': '<rootDir>/client/app/models/races/$1',
    '#Models/(.*)$': '<rootDir>/client/app/models/$1',
    '#Alert/(.*)$': '<rootDir>/client/app/alert/$1',
    '#Shared/(.*)$': '<rootDir>/client/app/shared/$1',
    '#Mocks/(.*)$': '<rootDir>/client/app/mocks/$1',
    '#Environment/(.*)$': '<rootDir>/client/environments/$1',
    '@Auth/(.*)$': '<rootDir>/server/app/auth/$1',
    '@Character/(.*)$': '<rootDir>/server/app/character/$1',
    '@Entity/(.*)$': '<rootDir>/server/app/entities/$1',
    '@Note/(.*)$': '<rootDir>/server/app/character/note/$1',
    '@Skill/(.*)$': '<rootDir>/server/app/character/skill/$1',
    '@Spell/(.*)$': '<rootDir>/server/app/character/spell/$1',
    '@User/(.*)$': '<rootDir>/server/app/user/$1',
    '@Weapon/(.*)$': '<rootDir>/server/app/character/weapon/$1'
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
