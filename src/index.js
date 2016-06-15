import Debug from 'debug';
import { fromJS, Map } from 'immutable';
import fp from 'lodash/fp';

const error = Debug('webpack-config-builder:error');
const debug = Debug('webpack-config-builder:debug');

const defaultReducers = [c => c];

/**
 * @type Config
 * @param {Object|Immutable.Map} state
 * @param {Function[]} reducers
 */
export default function Config(state, reducers = defaultReducers) {
  state = Map.isMap(state) ? state : fromJS(state || {});

  return {
    use: use,
    useIf: useIf,
    toJs: toJs,
    compose: compose,
    getReducers: () => reducers,
    getState: () => state,
    plugin: plugin
  };

	/**
 	 * Plugin
	 * @param {Function} pluginFn
	 * @returns {Config}
	 */
	function plugin(pluginFn) {
		return pluginFn.apply(this, [this]);
	}

  /**
   * @param {Config} config
   */
  function compose(config) {
    return Config(
      config.getState().mergeDeep(state),
      reducers.concat(config.getReducers())
    );
  }

  /**
   * toJs
   * @returns {Object|Boolean}
   */
  function toJs() {
    try {
      return fp.flow(reducers)(state).toJS();
    } catch(err) {
      error(err);

      return false;
    }
  }

  /**
   * Use
   * @param {Function} reducer - function that receives the state object
   * @returns {Config}
   */
  function use(reducer) {
    debug(`Added reducer: '${reducer.name || 'Anonymous'}'`);
    return Config(state, reducers.concat(reducer));
  }

  /**
   * Run reducer only if condition in config is met
   * @param {String[]} getInPath - Path in configurator to value
   * @param {Function} reducer   - state 'changer'
   * @returns {Config}
   */
  function useIf(getInPath, reducer) {
    return this.use(c => {
      if (c.getIn(getInPath)) {
        return reducer(c);
      }
      return c;
    });
  }
}

/**
 * exportForWebpack
 * @note exportForWebpack doesn't cover all webpack settings that require mapping from object to array.
 */
export function exportForWebpack(c) {
  return c.withMutations(c => {
    return c
      .updateIn(['module', 'loaders'], objectToArray)
      .updateIn(['plugins'], objectToArray)
      .updateIn(['resolve', 'modulesDirectories'], objectToArray)
      .updateIn(['externals'], objectToArray);
  });
}

function objectToArray(obj) {
  return obj ? obj.toArray(): void(0);
}
