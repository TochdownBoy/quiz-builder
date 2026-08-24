module.exports = (config) => {
  config.resolve = {
    ...config.resolve,
    extensionAlias: {
      '.js': ['.ts', '.tsx', '.js'],
    },
  };
  return config;
};
