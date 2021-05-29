module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
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
    '@typescript-eslint/no-unused-vars': ['error', { 'ignoreRestSiblings': true }],
    'vue/singleline-html-element-content-newline': 0,
    'vue/max-attributes-per-line': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/html-self-closing': ['warn', {
      'html': {
        'normal': 'never',
        'component': 'always'
      }
    }]
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
