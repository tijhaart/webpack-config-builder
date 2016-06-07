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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Config;
	exports.exportForWebpack = exportForWebpack;

	var _debug = __webpack_require__(1);

	var _debug2 = _interopRequireDefault(_debug);

	var _immutable = __webpack_require__(2);

	var _fp = __webpack_require__(3);

	var _fp2 = _interopRequireDefault(_fp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var error = (0, _debug2.default)('webpack-config-builder:error');
	var debug = (0, _debug2.default)('webpack-config-builder:debug');

	var defaultReducers = [function (c) {
	  return c;
	}];

	/**
	 * @type Config
	 * @param {Object|Immutable.Map} state
	 * @param {Function[]} reducers
	 */
	function Config(state) {
	  var reducers = arguments.length <= 1 || arguments[1] === undefined ? defaultReducers : arguments[1];

	  state = _immutable.Map.isMap(state) ? state : (0, _immutable.fromJS)(state || {});

	  return {
	    use: use,
	    useIf: useIf,
	    toJs: toJs,
	    compose: compose,
	    getReducers: function getReducers() {
	      return reducers;
	    },
	    getState: function getState() {
	      return state;
	    }
	  };

	  /**
	   * @param {Config} config
	   */
	  function compose(config) {
	    return Config(config.getState().mergeDeep(state), reducers.concat(config.getReducers()));
	  }

	  /**
	   * toJs
	   * @returns {Object|Boolean}
	   */
	  function toJs() {
	    try {
	      return _fp2.default.flow(reducers)(state).toJS();
	    } catch (err) {
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
	    debug('Added reducer: \'' + (reducer.name || 'Anonymous') + '\'');
	    return Config(state, reducers.concat(reducer));
	  }

	  /**
	   * Run reducer only if condition in config is met
	   * @param {String[]} getInPath - Path in configurator to value
	   * @param {Function} reducer   - state 'changer'
	   * @returns {Config}
	   */
	  function useIf(getInPath, reducer) {
	    return this.use(function (c) {
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
	function exportForWebpack(c) {
	  return c.withMutations(function (c) {
	    return c.updateIn(['module', 'loaders'], objectToArray).updateIn(['plugins'], objectToArray).updateIn(['resolve', 'modulesDirectories'], objectToArray).updateIn(['externals'], objectToArray);
	  });
	}

	function objectToArray(obj) {
	  return obj ? obj.toArray() : void 0;
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("lodash/fp");

/***/ }
/******/ ]);