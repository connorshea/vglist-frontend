module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': ['warn', 2],
    // Ignore rest siblings so we can use the rest syntax to ignore attributes of an object.
    "@typescript-eslint/no-unused-vars": ['error', { 'ignoreRestSiblings': true }]
  },
  // Ignore the generated GraphQL file.
  ignorePatterns: ["src/generated/graphql.ts"],
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
