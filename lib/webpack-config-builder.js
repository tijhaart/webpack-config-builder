module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = Config;\nexports.exportForWebpack = exportForWebpack;\n\nvar _debug = __webpack_require__(1);\n\nvar _debug2 = _interopRequireDefault(_debug);\n\nvar _immutable = __webpack_require__(2);\n\nvar _fp = __webpack_require__(3);\n\nvar _fp2 = _interopRequireDefault(_fp);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar error = (0, _debug2.default)('webpack-config-builder:error');\nvar debug = (0, _debug2.default)('webpack-config-builder:debug');\n\nvar defaultReducers = [function (c) {\n  return c;\n}];\n\n/**\n * @type Config\n * @param {Object|Immutable.Map} state\n * @param {Function[]} reducers\n */\nfunction Config(state) {\n  var reducers = arguments.length <= 1 || arguments[1] === undefined ? defaultReducers : arguments[1];\n\n  state = _immutable.Map.isMap(state) ? state : (0, _immutable.fromJS)(state || {});\n\n  return {\n    use: use,\n    useIf: useIf,\n    toJs: toJs,\n    compose: compose,\n    getReducers: function getReducers() {\n      return reducers;\n    },\n    getState: function getState() {\n      return state;\n    },\n    plugin: plugin\n  };\n\n  /**\n  \t * Plugin\n   * @param {Function} pluginFn\n   * @returns {Config}\n   */\n  function plugin(pluginFn) {\n    return pluginFn.apply(this, [this]);\n  }\n\n  /**\n   * @param {Config} config\n   */\n  function compose(config) {\n    return Config(config.getState().mergeDeep(state), reducers.concat(config.getReducers()));\n  }\n\n  /**\n   * toJs\n   * @returns {Object|Boolean}\n   */\n  function toJs() {\n    try {\n      return _fp2.default.flow(reducers)(state).toJS();\n    } catch (err) {\n      error(err);\n\n      return false;\n    }\n  }\n\n  /**\n   * Use\n   * @param {Function} reducer - function that receives the state object\n   * @returns {Config}\n   */\n  function use(reducer) {\n    debug('Added reducer: \\'' + (reducer.name || 'Anonymous') + '\\'');\n    return Config(state, reducers.concat(reducer));\n  }\n\n  /**\n   * Run reducer only if condition in config is met\n   * @param {String[]} getInPath - Path in configurator to value\n   * @param {Function} reducer   - state 'changer'\n   * @returns {Config}\n   */\n  function useIf(getInPath, reducer) {\n    return this.use(function (c) {\n      if (c.getIn(getInPath)) {\n        return reducer(c);\n      }\n      return c;\n    });\n  }\n}\n\n/**\n * exportForWebpack\n * @note exportForWebpack doesn't cover all webpack settings that require mapping from object to array.\n */\nfunction exportForWebpack(c) {\n  return c.withMutations(function (c) {\n    return c.updateIn(['module', 'loaders'], objectToArray).updateIn(['plugins'], objectToArray).updateIn(['resolve', 'modulesDirectories'], objectToArray).updateIn(['externals'], objectToArray);\n  });\n}\n\nfunction objectToArray(obj) {\n  return obj ? obj.toArray() : void 0;\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvaW5kZXguanM/MWZkZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IHsgZnJvbUpTLCBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IGZwIGZyb20gJ2xvZGFzaC9mcCc7XG5cbmNvbnN0IGVycm9yID0gRGVidWcoJ3dlYnBhY2stY29uZmlnLWJ1aWxkZXI6ZXJyb3InKTtcbmNvbnN0IGRlYnVnID0gRGVidWcoJ3dlYnBhY2stY29uZmlnLWJ1aWxkZXI6ZGVidWcnKTtcblxuY29uc3QgZGVmYXVsdFJlZHVjZXJzID0gW2MgPT4gY107XG5cbi8qKlxuICogQHR5cGUgQ29uZmlnXG4gKiBAcGFyYW0ge09iamVjdHxJbW11dGFibGUuTWFwfSBzdGF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbltdfSByZWR1Y2Vyc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb25maWcoc3RhdGUsIHJlZHVjZXJzID0gZGVmYXVsdFJlZHVjZXJzKSB7XG4gIHN0YXRlID0gTWFwLmlzTWFwKHN0YXRlKSA/IHN0YXRlIDogZnJvbUpTKHN0YXRlIHx8IHt9KTtcblxuICByZXR1cm4ge1xuICAgIHVzZTogdXNlLFxuICAgIHVzZUlmOiB1c2VJZixcbiAgICB0b0pzOiB0b0pzLFxuICAgIGNvbXBvc2U6IGNvbXBvc2UsXG4gICAgZ2V0UmVkdWNlcnM6ICgpID0+IHJlZHVjZXJzLFxuICAgIGdldFN0YXRlOiAoKSA9PiBzdGF0ZSxcblx0XHRwbHVnaW46IHBsdWdpblxuICB9O1xuXG5cdC8qKlxuIFx0ICogUGx1Z2luXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IHBsdWdpbkZuXG5cdCAqIEByZXR1cm5zIHtDb25maWd9XG5cdCAqL1xuXHRmdW5jdGlvbiBwbHVnaW4ocGx1Z2luRm4pIHtcblx0XHRyZXR1cm4gcGx1Z2luRm4uYXBwbHkodGhpcywgW3RoaXNdKTtcblx0fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0NvbmZpZ30gY29uZmlnXG4gICAqL1xuICBmdW5jdGlvbiBjb21wb3NlKGNvbmZpZykge1xuICAgIHJldHVybiBDb25maWcoXG4gICAgICBjb25maWcuZ2V0U3RhdGUoKS5tZXJnZURlZXAoc3RhdGUpLFxuICAgICAgcmVkdWNlcnMuY29uY2F0KGNvbmZpZy5nZXRSZWR1Y2VycygpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogdG9Kc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fEJvb2xlYW59XG4gICAqL1xuICBmdW5jdGlvbiB0b0pzKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnAuZmxvdyhyZWR1Y2Vycykoc3RhdGUpLnRvSlMoKTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgZXJyb3IoZXJyKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVkdWNlciAtIGZ1bmN0aW9uIHRoYXQgcmVjZWl2ZXMgdGhlIHN0YXRlIG9iamVjdFxuICAgKiBAcmV0dXJucyB7Q29uZmlnfVxuICAgKi9cbiAgZnVuY3Rpb24gdXNlKHJlZHVjZXIpIHtcbiAgICBkZWJ1ZyhgQWRkZWQgcmVkdWNlcjogJyR7cmVkdWNlci5uYW1lIHx8ICdBbm9ueW1vdXMnfSdgKTtcbiAgICByZXR1cm4gQ29uZmlnKHN0YXRlLCByZWR1Y2Vycy5jb25jYXQocmVkdWNlcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJ1biByZWR1Y2VyIG9ubHkgaWYgY29uZGl0aW9uIGluIGNvbmZpZyBpcyBtZXRcbiAgICogQHBhcmFtIHtTdHJpbmdbXX0gZ2V0SW5QYXRoIC0gUGF0aCBpbiBjb25maWd1cmF0b3IgdG8gdmFsdWVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVkdWNlciAgIC0gc3RhdGUgJ2NoYW5nZXInXG4gICAqIEByZXR1cm5zIHtDb25maWd9XG4gICAqL1xuICBmdW5jdGlvbiB1c2VJZihnZXRJblBhdGgsIHJlZHVjZXIpIHtcbiAgICByZXR1cm4gdGhpcy51c2UoYyA9PiB7XG4gICAgICBpZiAoYy5nZXRJbihnZXRJblBhdGgpKSB7XG4gICAgICAgIHJldHVybiByZWR1Y2VyKGMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGM7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBleHBvcnRGb3JXZWJwYWNrXG4gKiBAbm90ZSBleHBvcnRGb3JXZWJwYWNrIGRvZXNuJ3QgY292ZXIgYWxsIHdlYnBhY2sgc2V0dGluZ3MgdGhhdCByZXF1aXJlIG1hcHBpbmcgZnJvbSBvYmplY3QgdG8gYXJyYXkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHBvcnRGb3JXZWJwYWNrKGMpIHtcbiAgcmV0dXJuIGMud2l0aE11dGF0aW9ucyhjID0+IHtcbiAgICByZXR1cm4gY1xuICAgICAgLnVwZGF0ZUluKFsnbW9kdWxlJywgJ2xvYWRlcnMnXSwgb2JqZWN0VG9BcnJheSlcbiAgICAgIC51cGRhdGVJbihbJ3BsdWdpbnMnXSwgb2JqZWN0VG9BcnJheSlcbiAgICAgIC51cGRhdGVJbihbJ3Jlc29sdmUnLCAnbW9kdWxlc0RpcmVjdG9yaWVzJ10sIG9iamVjdFRvQXJyYXkpXG4gICAgICAudXBkYXRlSW4oWydleHRlcm5hbHMnXSwgb2JqZWN0VG9BcnJheSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvYmplY3RUb0FycmF5KG9iaikge1xuICByZXR1cm4gb2JqID8gb2JqLnRvQXJyYXkoKTogdm9pZCgwKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9pbmRleC5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFjQTtBQTRFQTtBQUNBO0FBM0ZBO0FBQ0E7OztBQUFBO0FBQ0E7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBOzs7Ozs7QUFNQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBUEE7QUFDQTs7Ozs7O0FBY0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBSUE7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("module.exports = require(\"debug\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcImRlYnVnXCI/ZmIxYSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZGVidWdcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("module.exports = require(\"immutable\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcImltbXV0YWJsZVwiPzFkMjAiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaW1tdXRhYmxlXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJpbW11dGFibGVcIlxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("module.exports = require(\"lodash/fp\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaC9mcFwiPzc5MDAiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoL2ZwXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJsb2Rhc2gvZnBcIlxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);