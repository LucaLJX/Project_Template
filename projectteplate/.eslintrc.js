module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': [0, 'error', 'windows'],
    'comma-dangle': [
      'error',
      {
        'arrays': 'never',
        'objects': 'never',
        'imports': 'never',
        'exports': 'never',
        'functions': 'ignore'
      }
    ],
    'semi': [2, 'never'],
    'quotes': [
      'error',
      'single'
    ],
    'no-console': 'off',
    'no-alert': 'off',
    'arrow-parens': 'off',
    'consistent-return': 'off',
    'arrow-body-style': 'off',
    'dot-notation': [0, { 'allowKeywords': true }],
    'space-before-function-paren': [
      'error',
      {
        'anonymous': 'always',
        'named': 'always',
        'asyncArrow': 'always'
      }
    ]
  },
};
