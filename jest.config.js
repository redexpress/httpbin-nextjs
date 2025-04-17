export default {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/api/*.test.ts'],
  collectCoverageFrom: ['src/pages/api/*.test.ts'],
  coverageThreshold: {
    global: {
      lines: 0,
      statements: 0
    }
  },
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'reports',
        outputName: 'junit.xml',
        suiteName: 'Jest Tests',
        classNameTemplate: '{classname} - {title}',
        titleTemplate: '{title}',
        ancestorSeparator: ' > ',
        includeConsoleOutput: true,
      },
    ],
  ],
}