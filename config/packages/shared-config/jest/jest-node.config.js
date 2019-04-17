const commonConfig = require('./jest-common.config');

module.exports = {
  ...commonConfig,
  setupFilesAfterEnv: [require.resolve('./setupScripts/jest-node.init.js')],
  testEnvironment: 'node',
};
