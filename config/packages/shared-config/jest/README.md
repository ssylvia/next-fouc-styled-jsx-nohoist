# Jest Testing

## Usage

### Config File

Add a `jest.config.js` file to your package root (modify as needed):

For Node apps:

```js
// jest.config.js
const nodeCommon = require('shared-config/jest/jest-node.config');
module.exports = {
  ...nodeCommon,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/setupTests.ts'],
};
```

For React apps:

```js
// jest.config.js
const reactCommon = require('shared-config/jest/jest-react.config');
module.exports = {
  ...reactCommon,
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.test.json',
    },
  },
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/setupTests.ts', '!src/**/*.stories.tsx'],
};
```

A separate `tsconfig.test.json` file is usually required for React apps because [jest](https://github.com/kulshekhar/ts-jest#tsconfig)<br>
may throw errors if modules are not exported as `commonjs`.

### Test Scripts

In the `package.json` at the following scripts:

```json
{
  "scripts": {
    "test": "jest --forceExit --detectOpenHandles --coverage --verbose",
    "test:watch": "jest --watchAll"
  }
}
```

`--detectOpenHandles` require Jest v23+.
