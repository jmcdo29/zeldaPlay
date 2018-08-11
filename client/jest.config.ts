import 'jest-preset-angular';
export default {
  jest: {
    transform: {
      '^.+\\.ts$': 'ts-jest'
    },
    testRegex: '(/app/.*|(\\.|/)spec)\\.ts$',
    moduleFileExtensions: ['ts', 'json', 'node'],
    collectCoverage: true
  }
};
