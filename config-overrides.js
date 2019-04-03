const rewireLess = require('react-app-rewire-less')
const {injectBabelPlugin} = require('react-app-rewired');

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}],
    config,
  );

  config = rewireLess.withLoaderOptions({
    modifyVars: {"@primary-color": "#1DA57A"},
    javascriptEnabled: true,
  })(config, env);

  return config;
};