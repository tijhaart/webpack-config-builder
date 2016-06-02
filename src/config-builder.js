import Immutable from 'immutable';
import Rx from 'rx';

export default function createConfig(c$, defaults={}) {
  c$ = c$ || new Rx.BehaviorSubject(
    Immutable.fromJS(defaults)
  );
  let val = null;

  return {
    use,
    useIf,
    set,
    asObservable,
    merge,
    toJs,
    plugin,
    map,
  };

  function use(configurator) {
    if (typeof configurator !== 'function') {
      throw TypeError('No configurator function provided');
    }

    return createConfig(
      configurator(c$) || notifyOnEmptyReturnValue(c$, configurator)
    );
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
    return this.use(c$ => c$);
  }

  /**
   * Set
   * @param {String|Function} key
   * @param {*} val
   * @returns {Config}
   */
  function set(key, val) {
    if (typeof key === 'function') {
      return this.use($c => c$.map(key));
    }

    return this.use(c$ => c$.map(c => c.setIn([key], val)));
  }

  function asObservable() { return c$; }

  function merge(config) {
    return this.use(merger);

    function merger(c$) {
      return c$.combineLatest(config.asObservable(), (a, b) => {
        return a.mergeDeep(b);
      });
    }
  }

  function toJs() {
    c$.map(x => x.toJS()).do(updateVal).subscribe();
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
    return c$.do(x => console.warn('Configurator: %o did not yield any output', configurator));
  }
}
