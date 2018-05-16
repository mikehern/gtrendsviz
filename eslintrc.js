module.exports = {
  extends: 'airbnb',
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'comma-dangle': 'off',
    'react/jsx-filename-extension': 'off',
    'no-path-concat': 'off',
    quotes: ['error', 'single', { allowTemplateLiterals: true }]
  },
  env: {
    browser: true,
    node: true
  }
};
