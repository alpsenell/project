module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    indent: ['warn', 2],
    curly: 'error',
    'array-element-newline': ['error', { 'minItems': 3 }],
    'array-bracket-newline': ['error', { multiline: true }],
    'space-before-function-paren': ['error', 'never'],
    'comma-dangle': [
      'warn', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    'operator-linebreak': ['error', 'before'],
    'arrow-parens': ['error', 'always'],
    'newline-before-return': 'error',
    'vue/max-attributes-per-line': [
      'error', {
        singleline: 1,
        multiline: 1,
      },
    ],
    'vue/html-closing-bracket-newline': [
      'warn', {
        multiline: 'always',
        singleline: 'never',
      },
    ],
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
