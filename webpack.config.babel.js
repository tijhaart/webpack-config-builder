import Config, { exportForWebpack } from './src/index.js';
import pkg from './package.json';
import nodeExternals from 'webpack-node-externals';
import fp from 'lodash/fp';

let cfg = Config({
  env: getNodeEnv(),
  context: __dirname + '/src',
  debug: true,
  cache: true,
  watch: true,
  devtool: '#cheap-module-eval-inline-source-map',
  entry: {
    main: './index.js',
  },
  output: {
    path: './lib',
    filename: `${pkg.name}.js`
  },
  module: {
    loaders: {}
  }
})
.useIf(['env', 'production'], c => c.set('devtool', void(0)))
.useIf(['env', 'production'], c => c.set('debug', false).set('watch', false))
.use(babelConfig())
.use(nodeWebpack)
;

cfg = cfg
.use(exportForWebpack);

getNodeEnv().development && console.log(cfg.toJs());

export default cfg.toJs();

function getNodeEnv() {
  const { NODE_ENV } = process.env;

  return {
    development: NODE_ENV === 'development' || (NODE_ENV !== 'production' && NODE_ENV !== 'test'),
    production: NODE_ENV === 'production',
    test: NODE_ENV === 'test'
  };
}

function nodeWebpack(c) {
  return c
    .set('target', 'node')
    .setIn(['externals', 'node'], nodeExternals())
  ;
}

function babelConfig(loader, options={loaderKey:'babel'}) {
  loader = fp.defaultsDeep({
    test: /\.js$/,
    loader: 'babel',
    exclude: /(node_modules|bower_components)/,
    query: {
      presets: ['es2015']
    }
  })(loader);

  return (c) => {
    return c.setIn(['module', 'loaders', options.loaderKey], loader);
  };
}
