module.exports = {
  parser: 'babel-eslint',
  plugins: ['react'],
  extends: 'airbnb',

  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/anchor-is-valid': 0,
    'react/forbid-prop-types': 0,
  },
  globals: {
    graphql: true,
  },
};
