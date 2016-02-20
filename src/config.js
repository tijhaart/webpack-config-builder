import createConfig from './config-builder';
import path from 'path';
import _ from 'lodash';
import exportToWebpackConfig from './plugins/export-webpack-config';

export default webpackConfig;
export {
  exportToWebpackConfig
};

function webpackConfig(options) {
  return createConfig(null, _.defaults(options, {
    entry: './src/app.js',
    // Keep the config object more linear
    'module.loaders': {},
    // Keep the config object more linear
    'module.preLoaders': {},
    'plugins': {}
  }));
}
