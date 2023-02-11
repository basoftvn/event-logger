const { pathsToModuleNameMapper } = require('ts-jest');
const {
  compilerOptions: { paths },
} = require('./tsconfig.json');

/** @type {import('jest').Config} */
const config = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/'],
  moduleNameMapper: {
    ...(pathsToModuleNameMapper(paths, {
      prefix: '<rootDir>/',
    }) || {}),
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};

module.exports = config;
