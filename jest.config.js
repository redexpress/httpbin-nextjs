export default {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/api/get.test.ts'],
  collectCoverageFrom: ['src/pages/api/*.ts'],
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
    'default', // Default console output
    ['jest-junit', { outputDirectory: 'reports', outputName: 'junit.xml' }] // Generate JUnit report
  ],
}