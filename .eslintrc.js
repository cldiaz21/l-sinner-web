module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'no-debugger': 'warn',
    'no-alert': 'off',
    'no-useless-computed-key': 'off'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  }
};

