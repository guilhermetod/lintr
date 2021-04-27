const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig.base.json');

module.exports = {
  collectCoverageFrom: [
    'bin/**/*.ts',
    'lib/**/*.ts',
  ],
  coverageDirectory: '<rootDir>/tests/reports/coverage',
  coveragePathIgnorePatterns: [
    'index\\.ts$',
    '\\.d\\.ts$',
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json',
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  preset: 'ts-jest',
  restoreMocks: true,
  reporters: [
    'default',
    ['<rootDir>/node_modules/jest-html-reporter', {
      includeConsoleLog: true,
      includeFailureMsg: true,
      includeSuiteFailure: true,
      outputPath: '<rootDir>/tests/reports/test-report.html',
    }],
  ],
  testEnvironment: 'node',
};
