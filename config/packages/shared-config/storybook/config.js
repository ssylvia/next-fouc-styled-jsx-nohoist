const { configure, addDecorator } = require('@storybook/react');
const { setOptions } = require('@storybook/addon-options');
const { withInfo } = require('@storybook/addon-info');
const { checkA11y } = require('@storybook/addon-a11y');
const { withKnobs } = require('@storybook/addon-knobs');
const { setIntlConfig, withIntl } = require('storybook-addon-intl');
const { initializeRTL } = require('storybook-addon-rtl');
const { StrictMode, createElement } = require('react');
const messages = require('../../../../packages/storymaps-app/locales/en/index.json');

module.exports.sharedConfig = (projectOptions) => {
  setOptions({
    /**
     * name to display in the top left corner
     * @type {String}
     */
    name: 'Story Maps',
    /**
     * URL for name in top left corner to link to
     * @type {String}
     */
    url: 'https://devtopia.esri.com/WebGIS/arcgis-storymaps/tree/develop/packages/storymaps-client',
    /**
     * show story component as full screen
     * @type {Boolean}
     */
    goFullScreen: false,
    /**
     * display panel that shows a list of stories
     * @type {Boolean}
     */
    showStoriesPanel: true,
    /**
     * display panel that shows addon configurations
     * @type {Boolean}
     */
    showAddonPanel: true,
    /**
     * display floating search box to search through stories
     * @type {Boolean}
     */
    showSearchBox: false,
    /**
     * show addon panel as a vertical panel on the right
     * @type {Boolean}
     */
    addonPanelInRight: false,
    /**
     * sorts stories
     * @type {Boolean}
     */
    sortStoriesByKind: true,
    /**
     * regex for finding the hierarchy separator
     * @example:
     *   null - turn off hierarchy
     *   /\// - split by `/`
     *   /\./ - split by `.`
     *   /\/|\./ - split by `/` or `.`
     * @type {Regex}
     */
    hierarchySeparator: /\//,
    /**
     * regex for finding the hierarchy root separator
     * @example:
     *   null - turn off multiple hierarchy roots
     *   /\|/ - split by `|`
     * @type {Regex}
     */
    hierarchyRootSeparator: /\|/,
    /**
     * sidebar tree animations
     * @type {Boolean}
     */
    sidebarAnimations: true,
    /**
     * id to select an addon panel
     * @type {String}
     */
    selectedAddonPanel: undefined, // The order of addons in the "Addon panel" is the same as you import them in 'addons.js'. The first panel will be opened by default as you run Storybook
  });

  // Add all files in src/ folder that end in "stories.tsx"
  const req = projectOptions.storiesContext;

  // Disable Info Decorators in tests to clean up StoryShots
  if (process.env.NODE_ENV !== 'test') {
    // Add TypeScript info to all supported stories
    addDecorator(
      withInfo({
        header: false,
        styles: (defaultStyles) => {
          // Change button background so it doesn't fail a11y tests.
          defaultStyles.button.base.background = '#017ac3';
          return defaultStyles;
        },
      })
    );

    if (projectOptions.globalDecorators) {
      projectOptions.globalDecorators.forEach((decorator) => {
        addDecorator(decorator);
      });
    }

    // Add knobs support
    addDecorator(withKnobs);

    // a11y tests
    addDecorator(checkA11y);

    // ReactStrict mode: https://reactjs.org/docs/strict-mode.html
    addDecorator((story) => {
      return createElement(StrictMode, {}, story());
    });

    // RTL Addon
    initializeRTL();
  }

  // // React-Intl
  const getMessages = () => messages;

  if (projectOptions.intlConfig) {
    // setIntlConfig(projectOptions.intlConfig);
    setIntlConfig({
      locales: ['en'],
      defaultLocale: 'en',
      getMessages,
    });
    addDecorator(withIntl);
  }

  const importAll = (req) => {
    req.keys().forEach((filename) => req(filename));
  };

  const loadStories = () => {
    let req;
    req = projectOptions.storiesContext;
    importAll(req);
  };

  configure(loadStories, module);
};
