'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createConfig;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createConfig(c$) {
  var defaults = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  c$ = c$ || new _rx2.default.BehaviorSubject(_immutable2.default.fromJS(defaults));
  var val = null;

  return {
    use: use,
    useIf: useIf,
    set: set,
    asObservable: asObservable,
    merge: merge,
    toJs: toJs,
    plugin: plugin,
    map: map
  };

  function use(configurator) {
    if (typeof configurator !== 'function') {
      throw TypeError('No configurator function provided');
    }

    return createConfig(configurator(c$) || notifyOnEmptyReturnValue(c$, configurator));
  }

  function useIf(use, configurator) {
    if (typeof use === 'function') {
      use = use();
    }

    if (use) {
      // apply configurator
      return this.use(configurator);
    }
    // ignore configurator
    return this.use(function (c$) {
      return c$;
    });
  }

  /**
   * Set
   * @param {String|Function} key
   * @param {*} val
   * @returns {Config}
   */
  function set(key, val) {
    if (typeof key === 'function') {
      return this.use(function ($c) {
        return c$.map(key);
      });
    }

    return this.use(function (c$) {
      return c$.map(function (c) {
        return c.setIn([key], val);
      });
    });
  }

  function asObservable() {
    return c$;
  }

  function merge(config) {
    return this.use(merger);

    function merger(c$) {
      return c$.combineLatest(config.asObservable(), function (a, b) {
        return a.mergeDeep(b);
      });
    }
  }

  function toJs() {
    c$.map(function (x) {
      return x.toJS();
    }).do(updateVal).subscribe();
    return val;
  }

  /**
   * Pass self to plugin function the allow further chaining without storing references.
   * @param {Function} pluginFn
   * @example
     ```
     const configX = createConfig(null, {
       debug: true,
       output: {
         filename: 'main.js'
       }
     })
     .plugin(myPlugin);
      function myPlugin(config) {
       return config
         .use(c$ => {
           return c$.map(changeOutputFilename)
         })
       ;
        function changeOutputFilename(c) {
         if (c.get('debug')) {
           return c.updateIn(['output', 'filename'], (filename) => {
             return filename.replace('.js', '.min.js');
           });
         }
         return c;
       }
     }
     ```
   * @returns {(Object|*)} Plugin decides what to return
   */
  function plugin(pluginFn) {
    return pluginFn(this);
  }

  // local

  function updateVal(c) {
    val = c;
  }

  function notifyOnEmptyReturnValue(c$, configurator) {
    return c$.do(function (x) {
      return console.warn('Configurator: %o did not yield any output', configurator);
    });
  }
}