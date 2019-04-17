const registerRequireContextHook = require('babel-plugin-require-context-hook/register');
require('jest-dom/extend-expect');
require('isomorphic-fetch');

registerRequireContextHook();
