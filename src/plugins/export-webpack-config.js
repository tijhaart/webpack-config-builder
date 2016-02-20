export default function exportToWebpackConfig(c$) {
  return c$.map(c => {
    return c
      .setIn(['module', 'loaders'], c.getIn(['module.loaders']).toArray())
      .deleteIn(['module.loaders'])

      .setIn(['module', 'preLoaders'], c.getIn(['module.preLoaders']).toArray())
      .deleteIn(['module.preLoaders'])

      .setIn(['plugins'], c.getIn(['plugins']).toArray())
    ;
  });
}
