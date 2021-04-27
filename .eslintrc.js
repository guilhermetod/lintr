const { gitIgnorePatterns } = require('./tools/utils/git-ignore-patterns');

const commonJSAndTSRules = {
  'array-bracket-newline': ['error', 'consistent'],
  'array-element-newline': ['error', 'consistent'],
  'function-paren-newline': ['error', 'multiline-arguments'],
  'import/no-extraneous-dependencies': ['error', { devDependencies: [
    './{tests,tools}/**/*.{js,ts}',
    './**/*.{d,test}.ts',
    './*.{js,ts}',
  ] }],
  'import/order': ['error', {
    alphabetize: { order: 'asc' },
    'newlines-between': 'always',
  }],
  'import/prefer-default-export': 'off',
  'object-curly-newline': ['error', { consistent: true }],
  'object-curly-spacing': ['error', 'always'],
};

module.exports = {
  ignorePatterns: gitIgnorePatterns,
  overrides: [
    // Javascript
    {
      files: [
        '*.js',
      ],
      extends: [
        'airbnb-base',
      ],
      rules: {
        ...commonJSAndTSRules,
      },
    },
    // TypeScript
    {
      files: [
        '*.ts',
      ],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript/base',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2019,
        project: 'tsconfig.eslint.json',
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: './tsconfig.eslint.json',
          },
        },
      },
      rules: {
        ...commonJSAndTSRules,
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/member-delimiter-style': ['error', {
          multiline: { delimiter: 'comma', requireLast: true },
          singleline: { delimiter: 'comma', requireLast: false },
          overrides: {
            interface: {
              multiline: { delimiter: 'semi', requireLast: true },
              singleline: { delimiter: 'semi', requireLast: false },
            },
          },
        }],
        'import/dynamic-import-chunkname': 'error',
        'max-len': ['error', 120, 2, {
          ignoreUrls: true,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        }],
        'no-restricted-imports': ['error', { patterns: ['../*', './*'] }],
      },
    },
  ],
};
