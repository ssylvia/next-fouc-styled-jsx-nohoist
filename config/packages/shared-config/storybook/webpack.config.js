const path = require('path');
const rootNodeModules = path.resolve('../../node_modules');
const ModuleDependencyWarning = require('webpack/lib/ModuleDependencyWarning');

// Custom plugin to hide Typescript empty types export warnings - https://github.com/TypeStrong/ts-loader/issues/653#issuecomment-390889335
class IgnoreNotFoundExportPlugin {
  apply(compiler) {
    const messageRegExp = /export '.*'( \(reexported as '.*'\))? was not found in/;
    function doneHook(stats) {
      stats.compilation.warnings = stats.compilation.warnings.filter(function(warn) {
        if (warn instanceof ModuleDependencyWarning && messageRegExp.test(warn.message)) {
          return false;
        }
        return true;
      });
    }
    if (compiler.hooks) {
      compiler.hooks.done.tap('IgnoreNotFoundExportPlugin', doneHook);
    } else {
      compiler.plugin('done', doneHook);
    }
  }
}

module.exports = (projectOptions, baseConfig, env, defaultConfig) => {
  const projectNodeModules = path.resolve('./node_modules');

  defaultConfig.module.rules.forEach((rule) => {
    if (rule.exclude && Array.isArray(rule.exclude)) {
      rule.exclude.push(rootNodeModules);
    } else {
      rule.exclude = [rootNodeModules, projectNodeModules];
    }
  });

  // Add Typescript Files
  defaultConfig.resolve.extensions.push('.ts', '.tsx');

  const tsLoaders = projectOptions.loadDocs
    ? [
        {
          loader: 'babel-loader',
        },
        {
          loader: 'react-docgen-typescript-loader',
        },
      ]
    : [
        {
          loader: 'babel-loader',
        },
      ];

  // Add Babel Loader and TypeScript Doc Generator
  defaultConfig.module.rules.push({
    test: /\.tsx?$/,
    include: projectOptions.typescriptInclude,
    exclude: [rootNodeModules, projectNodeModules],
    use: tsLoaders,
  });

  defaultConfig.plugins.push(new IgnoreNotFoundExportPlugin());

  return defaultConfig;
};
