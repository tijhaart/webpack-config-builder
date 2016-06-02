'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportToWebpackConfig = undefined;

var _configBuilder = require('./config-builder');

var _configBuilder2 = _interopRequireDefault(_configBuilder);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _exportWebpackConfig = require('./plugins/export-webpack-config');

var _exportWebpackConfig2 = _interopRequireDefault(_exportWebpackConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = webpackConfig;
exports.exportToWebpackConfig = _exportWebpackConfig2.default;


function webpackConfig(options) {
  return (0, _configBuilder2.default)(null, _lodash2.default.defaults(options, {
    entry: './src/app.js',
    // Keep the config object more linear
    'module.loaders': {},
    // Keep the config object more linear
    'module.preLoaders': {},
    'plugins': {}
  }));
}