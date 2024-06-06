module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', '@typescript-eslint', 'import'],
  extends: [
    'airbnb-typescript/base',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'arrow-body-style': 0,
    "indent": ["error", 2, { "ignoredNodes": ["PropertyDefinition"] }],
    "@typescript-eslint/indent": ["error", 2, { "ignoredNodes": ["PropertyDefinition"] }],
    'eol-last': ['error', 'always'],
    'no-underscore-dangle': 0,
    'function-paren-newline': 1,
    'import/no-extraneous-dependencies': 0,
    'max-len': ['warn', { code: 120 }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'variable',
        'format': ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
    ],
  },
};
