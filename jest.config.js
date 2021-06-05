module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  // Run the setup.ts to spin up the mock GraphQL server.
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    // process `*.vue` files with `vue-jest`
    ".*\\.(vue)$": "vue-jest"
  },
  // Ignore CSS files since Jest doesn't know what to do with them and doesn't need them.
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/tests/mocks/styleMock.ts"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,vue}",
    "!**/node_modules/**",
    "!**/dist/**",
    "!**/tests/**",
    "!**/src/generated/**",
    "!**/public/**"
  ]
}
