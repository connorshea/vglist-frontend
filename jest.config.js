module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    // process `*.vue` files with `vue-jest`
    ".*\\.(vue)$": "vue-jest"
  }
}
