module.exports = {
  extends: 'airbnb',
  'plugins': [
    'prefer-object-spread'
  ],
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'comma-dangle': 'off',
    'react/jsx-filename-extension': 'off',
    'no-path-concat': 'off',
    'prefer-object-spread/prefer-object-spread': 2,
  },
  env: {
    browser: true,
    node: true
  }
};
