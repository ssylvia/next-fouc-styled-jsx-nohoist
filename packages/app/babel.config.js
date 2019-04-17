module.exports = function(api) {
  api.cache.using(() => {
    process.env.NODE_ENV === 'production';
  });

  return {
    babelrcRoots: ['.'],
    presets: ['next/babel', '@zeit/next-typescript/babel'],
  };
};
