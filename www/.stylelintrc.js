module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-scss', 'stylelint-order'],
  ignoreFiles: ['**/node_modules/**', '**/*.js', '**/*.ts', '**/*.tsx'],
  rules: {
    'string-quotes': 'single',
    'at-rule-no-unknown': null,
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$',
  },
};
