import test from 'tape';
import Config, { exportForWebpack } from './index.js';
import fp from 'lodash/fp';

test('use', (t) => {
  t.plan(1);
  let cfg = Config({
    entry: {}
  }).use(c => c.setIn(['entry', 'main'], 'app.js'));

  t.deepEqual(cfg.toJs(), { entry: { main: 'app.js' } }, 'reducer should have been applied');
});

test('useIf', (t) => {
  t.plan(2);
  let cfg = Config({
    debug: true,
    cache: false
  })
    .useIf(['debug'], c => c.setIn(['devtool'], '#source-map'))
    .useIf(['cache'], c => c.setIn(['output', 'filename'], '[name]_[hash].[ext]'))
    .toJs()
  ;

  t.equal(cfg.devtool, '#source-map', 'when condition is met then reducer should be applied');
  t.equal(cfg.output, void(0), `when condition isn't met then reducer shouldn't be applied`);
});

test('toJs', t => {
  t.plan(1);
  let cfg = Config({ module: { loaders: { x: 1, y: 2 } } }).toJs();

  t.deepEqual(cfg, { module: { loaders: { x: 1, y: 2 } } });
});

test('toJs error', t => {
  t.plan(1);
  let cfg = Config({}).use(c => {
    throw Error('Fail');
  }).toJs();

  t.equal(cfg, false, 'errors in reducers should return false');
});

test('exportForWebpack', t => {
  let cfg = Config(
    {
      module: {
        loaders: { loaderA: { test: /\.a$/, loader: 'a' } }
      },
      externals: { foo: 'foo' }
    })
    .use(exportForWebpack)
    .toJs()
  ;

  t.ok(fp.isArray(cfg.module.loaders), 'module.loaders should be an array');
  t.ok(cfg.externals.indexOf('foo') > -1, 'externals should contain "foo"');

  t.end();
});

test('compose', t => {
  t.plan(2);
  const a = Config({
    env: { production: true },
    output: {
      filename: '[name].[ext]'
    }
  });

  const b = Config({ progress: true }).useIf(
    ['env', 'production'],
    c => c.setIn(['output', 'filename'], '[name].min.[ext]?[hash]')
  );

  let c = a.compose(b);

  t.deepEqual(
    c.toJs(),
    {
      env: { production: true },
      output: {
        filename: '[name].min.[ext]?[hash]'
      },
      progress: true
    },
    'should have composed a and b'
  );

  c = b.compose(a);

  t.deepEqual(
    c.toJs(),
    {
      env: { production: true },
      output: {
        filename: '[name].min.[ext]?[hash]'
      },
      progress: true
    },
    'should have compose b and a'
  );
});
