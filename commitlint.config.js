const { releaseRules } = require('./tools/utils/release-rules');

const types = releaseRules.map((rule) => rule.type);

module.exports = {
  extends: '@commitlint/config-conventional',
  rules: {
    'type-case': [2, 'always', 'sentence-case'],
    'type-enum': [2, 'always', types],
  },
};
