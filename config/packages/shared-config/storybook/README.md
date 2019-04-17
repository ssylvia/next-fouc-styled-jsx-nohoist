# Storybook

Add a [Storybook](https://storybook.js.org/) instance to a package.

## Usage

### Storybook Scripts

Add the following scripts to your `package.json`:

```json
{
  "scripts": {
    "storybook": "start-storybook -p 9001 -c .storybook",
    "storybook:build": "build-storybook -o .storybook/build"
  }
}
```

It's also recommended that you add the storybook `build` folder to your `.gitignore`.

```
.storybook/build
```

### Storybook Configuration

Create a `.storybook` folder under the package root with the following<br>
configuration files:

#### Config

```js
// .storybook/config.ts

const sharedConfig = require('shared-config/storybook/config');

const projectOptions = {
  storiesContext: require.context('../src', true, /\.stories\.tsx$/),
};

sharedConfig(projectOptions);
```

The `projectOptions` hold the webpack configuration specific to your package

| Key            | Description                                                                                                         | Required                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| storiesContext | The context for all story files to include in storybook.                                                            | Yes                                                                |
| intlConfig     | See [Addon Intl guide](https://github.com/truffls/storybook-addon-intl#getting-started) for valid object structure. | No (Providing `intlConfig` will add "Locales" panel to storybook). |

#### Addons

```js
// .storybook/addons.ts

import 'shared-config/storybook/addons';
```

#### Webpack

```js
// .storybook/webpack.config.js

const path = require('path');
const sharedWebpack = require('shared-config/storybook/webpack.config');

const projectOptions = {
  typescriptInclude: path.resolve(__dirname, '../src'),
};

module.exports = (baseConfig, env, config) => {
  return sharedWebpack(projectOptions, baseConfig, env, config);
};
```

The `projectOptions` hold the webpack configuration specific to your package

| Key               | Description                                                                                        | Required |
| ----------------- | -------------------------------------------------------------------------------------------------- | -------- |
| typescriptInclude | The include context for all typescript files to include in storybook (both stories and src files). | Yes      |

## Writing Stories

This app includes [Storybook](https://storybook.js.org/) for testing and viewing
UI components inside a<br>
development environment, outside the context of the full app.

See [Storybook docs](https://storybook.js.org/basics/writing-stories/) for
general information.

### File Convention

All "story" files should be written in the same directory as the component using<br>
using the extension `*.stories.ts`. For example, if you're writing a story for<br>
`src/component/ExampleComponent/index.ts` your story file should be<br>
`src/component/ExampleComponent/index.stories.ts`. All `*.stories.ts` files will<br>
automatically be included in the Storybook.

### Naming Convention

All story groups (stories in a single file) should follow the following naming<br> conventions for the first argument of the `storiesOf` method.

`storiesOf('{ComponentType} | {Path}/{ComponentName}')`

- **ComponentType**: One of the following based on type of component
  - Containers
  - Components
  - Blocks
  - Groups
- **Path**: The path from the ComponentType folder. Folders names should be title case.
- **ComponentName**: The name of the Component.

Example using a sample Blockquote block:

```js
// src/nodes/blocks/text/Blockquote/index.stories.ts
import { storiesOf } from '@storybook/react';
import Blockquote from './';

const stories = storiesOf('Blocks | Text/Blockquote', module);

stories.add('Story Name', () => {/* Story Source */}) );
```

### Story Component Documentation

Story source and React Component PropTypes are automatically documented from<br>
inline JSDoc tags using the [Info addon](https://github.com/storybooks/storybook/tree/release/3.4/addons/info)
as a global decorator and [react-docgen-typescript-loader](https://github.com/strothj/react-docgen-typescript-loader).<br>
To ensure documentation appears correctly, use the following:

- Add JSDoc tags to PropTypes interface
- [Export React Component as a named export](https://github.com/strothj/react-docgen-typescript-loader#exporting-components)
- [Extend from `Component` instead of `React.Component`](https://github.com/strothj/react-docgen-typescript-loader#react-component-class-import)

Any additional documentation can be added as Markdown using the
[Notes](https://github.com/storybooks/storybook/tree/release/3.4/addons/notes)
addon.<br>

```js
// src/nodes/blocks/text/Blockquote/index.stories.ts
import { storiesOf } from '@storybook/react';
import Blockquote from './';
import readme from './README.md';

const stories = storiesOf('Blocks | Text/Blockquote', module);

stories.add('Story Name', withNotes(readme)(() => {/* Story Source */})));
```

### Other Available Addons

- [Actions](https://github.com/storybooks/storybook/tree/release/3.4/addons/actions)
- [Links](https://github.com/storybooks/storybook/tree/release/3.4/addons/links)
- [Knobs](https://github.com/storybooks/storybook/tree/release/3.4/addons/knobs)
  (Global decorator already added, only
  [knobs](https://github.com/storybooks/storybook/tree/release/3.4/addons/knobs#available-knobs)
  need to be added)
