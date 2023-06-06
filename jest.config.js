const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './'
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  testEnvironment: './jest-environment-jsdom',
  testMatch: ['<rootDir>/tests/**/*.(test).(ts|tsx)']
}

module.exports = createJestConfig(customJestConfig)

