(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Timeline"] = factory();
	else
		root["Timeline"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"bundle": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	function promiseResolve() { return Promise.resolve(); }
/******/
/******/ 	var wasmImportObjects = {
/******/ 		"./src/wasm/timeline_sort_events_bg.wasm": function() {
/******/ 			return {
/******/ 				"./timeline_sort_events": {
/******/ 					"__wbindgen_throw": function(p0i32,p1i32) {
/******/ 						return installedModules["./src/wasm/timeline_sort_events.js"].exports["__wbindgen_throw"](p0i32,p1i32);
/******/ 					}
/******/ 				}
/******/ 			};
/******/ 		},
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var head = document.getElementsByTagName('head')[0];
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				head.appendChild(script);
/******/ 			}
/******/ 		}
/******/
/******/ 		// Fetch + compile chunk loading for webassembly
/******/
/******/ 		var wasmModules = {"0":["./src/wasm/timeline_sort_events_bg.wasm"]}[chunkId] || [];
/******/
/******/ 		wasmModules.forEach(function(wasmModuleId) {
/******/ 			var installedWasmModuleData = installedWasmModules[wasmModuleId];
/******/
/******/ 			// a Promise means "currently loading" or "already loaded".
/******/ 			if(installedWasmModuleData)
/******/ 				promises.push(installedWasmModuleData);
/******/ 			else {
/******/ 				var importObject = wasmImportObjects[wasmModuleId]();
/******/ 				var req = fetch(__webpack_require__.p + "" + {"./src/wasm/timeline_sort_events_bg.wasm":"e11d3db188e74bd86f43"}[wasmModuleId] + ".module.wasm");
/******/ 				var promise;
/******/ 				if(importObject instanceof Promise && typeof WebAssembly.compileStreaming === 'function') {
/******/ 					promise = Promise.all([WebAssembly.compileStreaming(req), importObject]).then(function(items) {
/******/ 						return WebAssembly.instantiate(items[0], items[1]);
/******/ 					});
/******/ 				} else if(typeof WebAssembly.instantiateStreaming === 'function') {
/******/ 					promise = WebAssembly.instantiateStreaming(req, importObject);
/******/ 				} else {
/******/ 					var bytesPromise = req.then(function(x) { return x.arrayBuffer(); });
/******/ 					promise = bytesPromise.then(function(bytes) {
/******/ 						return WebAssembly.instantiate(bytes, importObject);
/******/ 					});
/******/ 				}
/******/ 				promises.push(installedWasmModules[wasmModuleId] = promise.then(function(res) {
/******/ 					return __webpack_require__.w[wasmModuleId] = (res.instance || res).exports;
/******/ 				}));
/******/ 			}
/******/ 		});
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// object with all WebAssembly.instance exports
/******/ 	__webpack_require__.w = {};
/******/
/******/ 	var jsonpArray = this["webpackJsonpTimeline"] = this["webpackJsonpTimeline"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/animator.ts":
/*!*************************!*\
  !*** ./src/animator.ts ***!
  \*************************/
/*! exports provided: Animator, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Animator\", function() { return Animator; });\n/* harmony import */ var _models_props__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/props */ \"./src/models/props.ts\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\n\n\nvar Direction;\n(function (Direction) {\n    Direction[Direction[\"Backward\"] = -1] = \"Backward\";\n    Direction[Direction[\"Stop\"] = 0] = \"Stop\";\n    Direction[Direction[\"Forward\"] = 1] = \"Forward\";\n})(Direction || (Direction = {}));\nclass Animator {\n    constructor() {\n        this.goToDuration = 300;\n        this.zoomToDuration = 300;\n        this.interval = .00001;\n        this.multipliers = [.25, .5, 1, 2, 4, 8, 16];\n        this.multiplier = 1;\n        this.direction = Direction.Stop;\n        this.elapsedTimeTotal = 0;\n        this.modelUpdaters = [];\n        this.viewUpdaters = [];\n        this.animate = (timestamp) => {\n            const elapsedTime = this.prevTimestamp == null ? 0 : timestamp - this.prevTimestamp;\n            if (elapsedTime > 0 || this.prevTimestamp == null) {\n                if (this.centerMarker == null && this.zoomMarker == null) {\n                    _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].center = _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].center + (this.interval * this.multiplier * this.direction);\n                }\n                else if (this.centerMarker != null) {\n                    const timeRemaining = this.goToDuration - this.elapsedTimeTotal;\n                    const centerDelta = Math.abs(this.centerMarker - _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].center) / (timeRemaining / elapsedTime);\n                    if (timeRemaining < elapsedTime) {\n                        _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].center = this.centerMarker;\n                        this.stop();\n                    }\n                    else\n                        _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].center = _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].center + (centerDelta * this.direction);\n                }\n                else if (this.zoomMarker != null) {\n                    const timeRemaining = this.zoomToDuration - this.elapsedTimeTotal;\n                    const zoomDelta = (this.zoomMarker - _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].eventsBand.zoomLevel) / (timeRemaining / elapsedTime);\n                    if (timeRemaining < elapsedTime) {\n                        _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].eventsBand.zoomLevel = this.zoomMarker;\n                        document.dispatchEvent(new CustomEvent(_constants__WEBPACK_IMPORTED_MODULE_1__[\"ZOOM_DONE\"]));\n                        this.stop();\n                    }\n                    else {\n                        _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].eventsBand.zoomLevel = _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].eventsBand.zoomLevel + zoomDelta;\n                    }\n                    _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].minimapBands.forEach(mmb => {\n                        if (_models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].eventsBand.zoomLevel < mmb.config.zoomLevel) {\n                            mmb.zoomLevel = _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].eventsBand.zoomLevel;\n                        }\n                        else if (mmb.zoomLevel !== mmb.config.zoomLevel) {\n                            mmb.zoomLevel = mmb.config.zoomLevel;\n                        }\n                    });\n                }\n                this.modelUpdaters.forEach(update => update());\n                this.viewUpdaters.forEach(update => update());\n            }\n            this.elapsedTimeTotal += elapsedTime;\n            if (this.isPlaying() || this.zoomMarker != null) {\n                if ((_models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].center > 0 && _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].center < 1) || this.centerMarker != null) {\n                    this.prevTimestamp = timestamp;\n                    requestAnimationFrame(this.animate);\n                }\n                else {\n                    this.stop();\n                }\n            }\n        };\n    }\n    registerModelUpdaters(update) {\n        this.modelUpdaters.push(update);\n    }\n    registerViewUpdaters(update) {\n        this.viewUpdaters.push(update);\n    }\n    accelerate() {\n        const index = this.multipliers.indexOf(this.multiplier);\n        if (index === this.multipliers.length - 1)\n            return this.multipliers[this.multipliers.length - 1];\n        this.multiplier = this.multipliers[index + 1];\n        return this.multiplier;\n    }\n    decelerate() {\n        const index = this.multipliers.indexOf(this.multiplier);\n        if (index === 0)\n            return this.multipliers[0];\n        this.multiplier = this.multipliers[index - 1];\n        return this.multiplier;\n    }\n    goTo(nextCenter) {\n        this.centerMarker = nextCenter;\n        if (nextCenter > _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].center)\n            this.playForward();\n        else\n            this.playBackward();\n    }\n    zoomTo(nextZoomLevel) {\n        if (this.zoomMarker != null)\n            return;\n        if (nextZoomLevel < 0)\n            nextZoomLevel = 0;\n        this.zoomMarker = nextZoomLevel;\n        this.play();\n    }\n    speed(multiplier) {\n        const multiplier2 = parseFloat(multiplier);\n        if (this.multipliers.indexOf(multiplier2) === -1)\n            return;\n        this.multiplier = multiplier2;\n    }\n    isPlaying() {\n        return this.direction !== Direction.Stop;\n    }\n    isPlayingForward() {\n        return this.direction === Direction.Forward;\n    }\n    isPlayingBackward() {\n        return this.direction === Direction.Backward;\n    }\n    play() {\n        requestAnimationFrame(this.animate);\n    }\n    playForward() {\n        this.direction = Direction.Forward;\n        this.play();\n    }\n    playBackward() {\n        this.direction = Direction.Backward;\n        this.play();\n    }\n    stop() {\n        this.direction = Direction.Stop;\n        this.centerMarker = null;\n        this.zoomMarker = null;\n        this.prevTimestamp = null;\n        this.elapsedTimeTotal = 0;\n    }\n    toggle() {\n        this.isPlaying() ? this.stop() : this.play();\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (new Animator());\n\n\n//# sourceURL=webpack://Timeline/./src/animator.ts?");

/***/ }),

/***/ "./src/api.ts":
/*!********************!*\
  !*** ./src/api.ts ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Api; });\n/* harmony import */ var _animator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animator */ \"./src/animator.ts\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\n/* harmony import */ var _models_props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/props */ \"./src/models/props.ts\");\n\n\n\nclass Api {\n    constructor(rootElement, onChange) {\n        this.onChange = onChange;\n        this.animator = _animator__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n        this.handleChange = () => {\n            const { from, to } = _models_props__WEBPACK_IMPORTED_MODULE_2__[\"default\"].eventsBand;\n            this.onChange({\n                center: _models_props__WEBPACK_IMPORTED_MODULE_2__[\"default\"].center,\n                visibleFrom: from,\n                visibleTo: to,\n                zoomLevel: _models_props__WEBPACK_IMPORTED_MODULE_2__[\"default\"].eventsBand.zoomLevel\n            });\n        };\n        document.addEventListener('keydown', (ev) => {\n            if (ev.keyCode === 189)\n                _models_props__WEBPACK_IMPORTED_MODULE_2__[\"default\"].eventsBand.zoomOut();\n            if (ev.keyCode === 187)\n                _models_props__WEBPACK_IMPORTED_MODULE_2__[\"default\"].eventsBand.zoomIn();\n        });\n        rootElement.addEventListener('wheel', (ev) => {\n            if (Math.abs(ev.deltaX) === 0 && ev.deltaY !== 0) {\n                if (ev.deltaY < 0)\n                    _models_props__WEBPACK_IMPORTED_MODULE_2__[\"default\"].eventsBand.zoomOut();\n                if (ev.deltaY > 0)\n                    _models_props__WEBPACK_IMPORTED_MODULE_2__[\"default\"].eventsBand.zoomIn();\n            }\n        });\n        if (this.onChange != null && typeof this.onChange === 'function') {\n            document.addEventListener(_constants__WEBPACK_IMPORTED_MODULE_1__[\"CENTER_CHANGE_DONE\"], this.handleChange);\n            document.addEventListener(_constants__WEBPACK_IMPORTED_MODULE_1__[\"ZOOM_DONE\"], this.handleChange);\n        }\n    }\n    zoomIn() {\n        _models_props__WEBPACK_IMPORTED_MODULE_2__[\"default\"].eventsBand.zoomIn();\n    }\n    zoomOut() {\n        _models_props__WEBPACK_IMPORTED_MODULE_2__[\"default\"].eventsBand.zoomOut();\n        this.handleChange();\n    }\n}\n\n\n//# sourceURL=webpack://Timeline/./src/api.ts?");

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! exports provided: EVENT_MIN_SPACE, EVENT_HEIGHT, EVENT_ROW_HEIGHT, DATE_BAR_HEIGHT, RULER_LABELS_HEIGHT, CENTER_CHANGE_DONE, ZOOM_DONE, RawSegment, colors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_MIN_SPACE\", function() { return EVENT_MIN_SPACE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_HEIGHT\", function() { return EVENT_HEIGHT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_ROW_HEIGHT\", function() { return EVENT_ROW_HEIGHT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DATE_BAR_HEIGHT\", function() { return DATE_BAR_HEIGHT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RULER_LABELS_HEIGHT\", function() { return RULER_LABELS_HEIGHT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CENTER_CHANGE_DONE\", function() { return CENTER_CHANGE_DONE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ZOOM_DONE\", function() { return ZOOM_DONE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RawSegment\", function() { return RawSegment; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"colors\", function() { return colors; });\nconst EVENT_MIN_SPACE = 160;\nconst EVENT_HEIGHT = 14;\nconst EVENT_ROW_HEIGHT = 20;\nconst DATE_BAR_HEIGHT = EVENT_ROW_HEIGHT;\nconst RULER_LABELS_HEIGHT = 60;\nconst CENTER_CHANGE_DONE = 'CENTER_CHANGE_DONE';\nconst ZOOM_DONE = 'ZOOM_DONE';\nclass RawSegment {\n}\nconst colors = [\n    'rgba(211,84,0',\n    'rgba(219,10,91',\n    'rgba(31,58,147',\n    'rgba(0,128,0'\n].map(color => (opacity = 1) => `${color},${opacity})`);\n\n\n//# sourceURL=webpack://Timeline/./src/constants.ts?");

/***/ }),

/***/ "./src/event-bus.ts":
/*!**************************!*\
  !*** ./src/event-bus.ts ***!
  \**************************/
/*! exports provided: EventBus, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EventBus\", function() { return EventBus; });\nclass EventBus {\n    constructor() {\n        this.eventsListeners = [];\n    }\n    register(type, listener, target = document) {\n        target.addEventListener(type, listener);\n        this.eventsListeners.push([type, listener, target]);\n    }\n    flush() {\n        this.eventsListeners.forEach((eventListener) => {\n            const [type, listener, target] = eventListener;\n            target.removeEventListener(type, listener);\n        });\n        this.eventsListeners = [];\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (new EventBus());\n\n\n//# sourceURL=webpack://Timeline/./src/event-bus.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: TimelineConfig, OrderedEvents, calcPixelsPerMillisecond, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Timeline; });\n/* harmony import */ var _models_props__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/props */ \"./src/models/props.ts\");\n/* harmony import */ var _models_config_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/config/index */ \"./src/models/config/index.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"TimelineConfig\", function() { return _models_config_index__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _views_band__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./views/band */ \"./src/views/band/index.ts\");\n/* harmony import */ var _utils_create_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/create-element */ \"./src/utils/create-element.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ \"./src/utils/index.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"calcPixelsPerMillisecond\", function() { return _utils__WEBPACK_IMPORTED_MODULE_4__[\"calcPixelsPerMillisecond\"]; });\n\n/* harmony import */ var _utils_events_worker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/events.worker */ \"./src/utils/events.worker.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"OrderedEvents\", function() { return _utils_events_worker__WEBPACK_IMPORTED_MODULE_5__[\"OrderedEvents\"]; });\n\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./api */ \"./src/api.ts\");\n/* harmony import */ var _views_band_events__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./views/band/events */ \"./src/views/band/events.ts\");\n/* harmony import */ var _views_canvas__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./views/canvas */ \"./src/views/canvas/index.ts\");\n/* harmony import */ var _views_label__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./views/label */ \"./src/views/label.ts\");\n\n\n\n\n\n\n\n\n\n\n\nclass Timeline extends _api__WEBPACK_IMPORTED_MODULE_6__[\"default\"] {\n    constructor(config, onChange, onSelect) {\n        super(config.rootElement, onChange);\n        this.config = config;\n        this.onSelect = onSelect;\n        this.appendToWrapper = (child) => {\n            let children = child.render();\n            if (!Array.isArray(children))\n                children = [children];\n            children.forEach(c => this.wrapper.appendChild(c));\n        };\n        this.reload = (config) => {\n            if (config != null)\n                _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init(config);\n            this.resize();\n        };\n        this.resize = () => {\n            _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dimensions = this.config.rootElement;\n            _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].eventsBand.zoomLevel = _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].eventsBand.zoomLevel;\n            this.eventsBandView.resize();\n            _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].minimapBands.forEach(mmb => mmb.zoomLevel = mmb.zoomLevel);\n            this.minimapBandViews.forEach(mmbv => mmbv.resize());\n            this.animator.play();\n        };\n        _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init(config).then(() => {\n            config.rootElement.appendChild(this.render());\n            const debouncedResize = Object(_utils__WEBPACK_IMPORTED_MODULE_4__[\"debounce\"])(this.resize, 600);\n            window.addEventListener('resize', debouncedResize);\n        });\n    }\n    render() {\n        this.wrapper = Object(_utils_create_element__WEBPACK_IMPORTED_MODULE_3__[\"default\"])('div', 'wrapper', [\n            'box-sizing: border-box',\n            'height: 100%',\n            'overflow: hidden',\n            'position: relative',\n            'user-select: none',\n            'width: 100%',\n        ]);\n        this.appendToWrapper(new _views_canvas__WEBPACK_IMPORTED_MODULE_8__[\"default\"]());\n        this.eventsBandView = new _views_band_events__WEBPACK_IMPORTED_MODULE_7__[\"default\"](_models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].eventsBand, this.onSelect);\n        this.appendToWrapper(this.eventsBandView);\n        this.minimapBandViews = _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].minimapBands.map(band => new _views_band__WEBPACK_IMPORTED_MODULE_2__[\"default\"](band));\n        this.minimapBandViews.forEach(this.appendToWrapper);\n        this.renderLabels();\n        return this.wrapper;\n    }\n    renderLabels() {\n        _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].eventsBand.domains\n            .filter(d => d.label != null)\n            .map(d => new _views_label__WEBPACK_IMPORTED_MODULE_9__[\"default\"](d))\n            .forEach(this.appendToWrapper);\n    }\n}\n\n\n//# sourceURL=webpack://Timeline/./src/index.ts?");

/***/ }),

/***/ "./src/models/band/events.ts":
/*!***********************************!*\
  !*** ./src/models/band/events.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EventsBand; });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/models/band/index.ts\");\n/* harmony import */ var _animator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../animator */ \"./src/animator.ts\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants */ \"./src/constants.ts\");\n/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../props */ \"./src/models/props.ts\");\n\n\n\n\nclass EventsBand extends ___WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(config) {\n        super(config);\n        this.domains = config.domains;\n    }\n    getEventByCoordinates(x, y) {\n        const timestamp = this.timestampAtProportion(this.proportionAtPosition(x));\n        const domain = this.domains.find(d => {\n            const top = _props__WEBPACK_IMPORTED_MODULE_3__[\"default\"].viewportOffset + d.topOffsetRatio * _props__WEBPACK_IMPORTED_MODULE_3__[\"default\"].viewportHeight;\n            const height = _props__WEBPACK_IMPORTED_MODULE_3__[\"default\"].viewportOffset + d.heightRatio * _props__WEBPACK_IMPORTED_MODULE_3__[\"default\"].viewportHeight;\n            return top < y && top + height > y;\n        });\n        const event = domain.orderedEvents.events.find(e => {\n            if (!(e.from < timestamp && e.from + e.time + e.space > timestamp))\n                return false;\n            const bottomOfDomain = _props__WEBPACK_IMPORTED_MODULE_3__[\"default\"].viewportOffset + ((domain.topOffsetRatio + domain.heightRatio) * _props__WEBPACK_IMPORTED_MODULE_3__[\"default\"].viewportHeight) - _constants__WEBPACK_IMPORTED_MODULE_2__[\"DATE_BAR_HEIGHT\"];\n            const row = Math.floor((bottomOfDomain - y) / (_constants__WEBPACK_IMPORTED_MODULE_2__[\"EVENT_HEIGHT\"] + 2));\n            return e.row === row;\n        });\n        return event;\n    }\n    zoomIn() {\n        _animator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].zoomTo(this.zoomLevel + 1);\n    }\n    zoomOut() {\n        _animator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].zoomTo(this.zoomLevel - 1);\n    }\n}\n\n\n//# sourceURL=webpack://Timeline/./src/models/band/events.ts?");

/***/ }),

/***/ "./src/models/band/index.ts":
/*!**********************************!*\
  !*** ./src/models/band/index.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Band; });\n/* harmony import */ var _utils_dates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/dates */ \"./src/utils/dates.ts\");\n/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../props */ \"./src/models/props.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils */ \"./src/utils/index.ts\");\n/* harmony import */ var _animator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../animator */ \"./src/animator.ts\");\n\n\n\n\nclass Band {\n    constructor(config) {\n        this.defaultZoomLevel = 0;\n        this.update = () => {\n            const offset = _props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].center * (_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].time - this.time);\n            this.from = _props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].from + offset;\n            this.to = this.from + this.time;\n            this.left = Math.round(_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].center * (_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportWidth - this.width));\n        };\n        this.zoomLevel = config.zoomLevel;\n        this.height = Math.round(config.domains.reduce((prev, curr) => prev + curr.heightRatio, 0) * _props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportHeight);\n        this.top = Math.round(config.domains.reduce((prev, curr) => Math.min(prev, curr.topOffsetRatio), 1) * _props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportHeight);\n        _animator__WEBPACK_IMPORTED_MODULE_3__[\"default\"].registerModelUpdaters(this.update);\n    }\n    get left() { return this._left; }\n    set left(left) {\n        if (left < -this.width + _props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportWidth)\n            left = _props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportWidth - this.width;\n        else if (left > 0)\n            left = 0;\n        this._left = left;\n    }\n    get zoomLevel() { return this._zoomLevel; }\n    set zoomLevel(zoomLevel) {\n        if (zoomLevel < 0)\n            zoomLevel = 0;\n        this.visibleRatio = Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"visibleRatio\"])(zoomLevel);\n        this.width = Math.round(_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportWidth / this.visibleRatio);\n        this.time = this.visibleRatio * _props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].time;\n        this.update();\n        this.granularity = Object(_utils_dates__WEBPACK_IMPORTED_MODULE_0__[\"getGranularity\"])(_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].from, _props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].to, this.visibleRatio);\n        this.nextDate = Object(_utils_dates__WEBPACK_IMPORTED_MODULE_0__[\"subsequentDate\"])(this.granularity);\n        this.pixelsPerMillisecond = this.width / _props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].time;\n        this._zoomLevel = zoomLevel;\n    }\n    positionAtTimestamp(date) {\n        return Math.round((date - _props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].from) * this.pixelsPerMillisecond);\n    }\n    proportionAtPosition(position) {\n        return (Math.abs(this.left) + position) / this.width;\n    }\n    timestampAtProportion(proportion) {\n        return _props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].from + (_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].time * proportion);\n    }\n}\n\n\n//# sourceURL=webpack://Timeline/./src/models/band/index.ts?");

/***/ }),

/***/ "./src/models/band/minimap.ts":
/*!************************************!*\
  !*** ./src/models/band/minimap.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MinimapBand; });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/models/band/index.ts\");\n\nclass MinimapBand extends ___WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(config) {\n        super(config);\n        this.config = config;\n        this.domains = config.domains;\n    }\n}\n\n\n//# sourceURL=webpack://Timeline/./src/models/band/minimap.ts?");

/***/ }),

/***/ "./src/models/config/index.ts":
/*!************************************!*\
  !*** ./src/models/config/index.ts ***!
  \************************************/
/*! exports provided: DomainConfig, MinimapDomainConfig, EventsDomainConfig, BandConfig, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DomainConfig\", function() { return DomainConfig; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MinimapDomainConfig\", function() { return MinimapDomainConfig; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EventsDomainConfig\", function() { return EventsDomainConfig; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BandConfig\", function() { return BandConfig; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Config; });\nclass DomainConfig {\n    constructor() {\n        this.heightRatio = 1;\n        this.rulers = true;\n        this.rulerLabels = true;\n        this.topOffsetRatio = 0;\n    }\n}\nclass MinimapDomainConfig extends DomainConfig {\n    constructor() {\n        super(...arguments);\n        this.targets = [];\n    }\n}\nclass EventsDomainConfig extends DomainConfig {\n}\nclass BandConfig {\n    constructor() {\n        this.domains = [];\n        this.zoomLevel = 0;\n    }\n}\nclass Config {\n    constructor() {\n        this.center = .5;\n        this.minimaps = [];\n    }\n}\n\n\n//# sourceURL=webpack://Timeline/./src/models/config/index.ts?");

/***/ }),

/***/ "./src/models/props.ts":
/*!*****************************!*\
  !*** ./src/models/props.ts ***!
  \*****************************/
/*! exports provided: Props, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Props\", function() { return Props; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\n/* harmony import */ var _band_minimap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./band/minimap */ \"./src/models/band/minimap.ts\");\n/* harmony import */ var _band_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./band/events */ \"./src/models/band/events.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\n/* harmony import */ var _utils_prepare_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/prepare-config */ \"./src/utils/prepare-config.ts\");\n/* harmony import */ var _utils_dates__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/dates */ \"./src/utils/dates.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\n\nclass Props {\n    constructor() {\n        this.defaultCenter = .5;\n        this._center = this.defaultCenter;\n        this.centerChangeDone = Object(_utils__WEBPACK_IMPORTED_MODULE_3__[\"debounce\"])(() => {\n            document.dispatchEvent(new CustomEvent(_constants__WEBPACK_IMPORTED_MODULE_0__[\"CENTER_CHANGE_DONE\"]));\n        }, 300);\n    }\n    init(config) {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (config.rootElement == null)\n                console.error('[init] No rootElement found');\n            this.dimensions = config.rootElement;\n            const froms = [];\n            const tos = [];\n            for (const domain of config.events.domains) {\n                let events;\n                if (domain.hasOwnProperty('events')) {\n                    domain.events.sort(_utils_dates__WEBPACK_IMPORTED_MODULE_5__[\"byDate\"]);\n                    events = domain.events;\n                }\n                if (events == null)\n                    events = domain.orderedEvents.events;\n                froms.push(events[0].date_min || events[0].date);\n                tos.push(events.reduce((prev, curr) => {\n                    return Math.max(prev, curr.end_date || -Infinity, curr.end_date_max || -Infinity);\n                }, -Infinity));\n            }\n            this.from = Math.min(...froms);\n            this.to = Math.max(...tos);\n            const pixelsPerMillisecond = Object(_utils__WEBPACK_IMPORTED_MODULE_3__[\"calcPixelsPerMillisecond\"])(this.viewportWidth, config.events.zoomLevel || 0, this.to - this.from);\n            config = yield Object(_utils_prepare_config__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(config, pixelsPerMillisecond);\n            this.time = this.to - this.from;\n            if (config.center != null)\n                this.center = config.center;\n            this.minimapBands = config.minimaps.map(mm => new _band_minimap__WEBPACK_IMPORTED_MODULE_1__[\"default\"](mm));\n            this.eventsBand = new _band_events__WEBPACK_IMPORTED_MODULE_2__[\"default\"](config.events);\n        });\n    }\n    get center() { return this._center; }\n    set center(n) {\n        if ((this._center === 0 && n < 0) || (this._center === 1 && n > 1))\n            return;\n        else if (n < 0)\n            this._center = 0;\n        else if (n > 1)\n            this._center = 1;\n        else\n            this._center = n;\n        this.centerChangeDone();\n    }\n    set dimensions(rootElement) {\n        const style = getComputedStyle(rootElement);\n        this.viewportHeight = parseInt(style.getPropertyValue('height'), 10);\n        this.viewportOffset = rootElement.getBoundingClientRect().top;\n        this.viewportWidth = parseInt(style.getPropertyValue('width'), 10);\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (new Props());\n\n\n//# sourceURL=webpack://Timeline/./src/models/props.ts?");

/***/ }),

/***/ "./src/utils/create-element.ts":
/*!*************************************!*\
  !*** ./src/utils/create-element.ts ***!
  \*************************************/
/*! exports provided: createSvg, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createSvg\", function() { return createSvg; });\nconst createSvg = (name, style, attrs = {}) => {\n    const el = document.createElementNS(\"http://www.w3.org/2000/svg\", name);\n    if (style != null)\n        el.setAttribute('style', style.join(';').concat(';'));\n    Object.keys(attrs).forEach(k => el.setAttribute(k, attrs[k]));\n    return el;\n};\nlet sheet;\nif (typeof window !== 'undefined') {\n    const element = document.createElement('style');\n    document.head.appendChild(element);\n    sheet = element.sheet;\n}\nconst rules = {};\n/* harmony default export */ __webpack_exports__[\"default\"] = ((name, className, style, dynamicStyle) => {\n    if (!className)\n        return document.createElement(name);\n    let el;\n    if (rules.hasOwnProperty(className)) {\n        el = rules[className].cloneNode(false);\n    }\n    else {\n        el = document.createElement(name);\n        el.classList.add(className);\n        if (style) {\n            sheet.insertRule(`.${className} { ${style.join(';').concat(';')} }`);\n        }\n        rules[className] = el.cloneNode(false);\n    }\n    if (dynamicStyle)\n        el.setAttribute('style', dynamicStyle.join(';').concat(';'));\n    return el;\n});\n\n\n//# sourceURL=webpack://Timeline/./src/utils/create-element.ts?");

/***/ }),

/***/ "./src/utils/dates.ts":
/*!****************************!*\
  !*** ./src/utils/dates.ts ***!
  \****************************/
/*! exports provided: isEqual, getGranularity, getStep, subsequentDate, byDate, labelBody */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isEqual\", function() { return isEqual; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getGranularity\", function() { return getGranularity; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getStep\", function() { return getStep; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"subsequentDate\", function() { return subsequentDate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"byDate\", function() { return byDate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"labelBody\", function() { return labelBody; });\nconst isEqual = (date1, date2) => date1.getTime() === date2.getTime();\nconst getGranularity = (from, to, visibleRatio) => {\n    const days = visibleRatio * ((to - from) / 86400000);\n    if (days < 1)\n        return 0;\n    if (days < 15)\n        return 1;\n    if (days < 45)\n        return 2;\n    if (days < 1.5 * 365)\n        return 3;\n    if (days < 15 * 365)\n        return 4;\n    if (days < 100 * 365)\n        return 5;\n    if (days < 200 * 365)\n        return 6;\n    if (days < 400 * 365)\n        return 7;\n    if (days < 3000 * 365)\n        return 8;\n    if (days < 6000 * 365)\n        return 9;\n    return 10;\n};\nconst getStep = (granularity) => {\n    if (granularity === 4)\n        return 1;\n    if (granularity === 5)\n        return 5;\n    if (granularity === 6)\n        return 10;\n    if (granularity === 7)\n        return 50;\n    if (granularity === 8)\n        return 100;\n    if (granularity === 9)\n        return 500;\n    if (granularity === 10)\n        return 1000;\n    throw new RangeError(\"[getStep] Only steps with a granularity greater than 'year' calculated\");\n};\nfunction subsequentDate(granularity) {\n    if (granularity >= 4) {\n        const step = getStep(granularity);\n        return (d) => {\n            let date = new Date(d);\n            const nextYear = date.getFullYear() + step;\n            if (nextYear > -1 && nextYear < 100) {\n                date = new Date(date);\n                date.setUTCFullYear(nextYear);\n                return date.getTime();\n            }\n            else {\n                return Date.UTC(nextYear, 0, 1);\n            }\n        };\n    }\n    if (granularity === 3) {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getFullYear(), date.getMonth() + 1, 1);\n        };\n    }\n    if (granularity === 2) {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 7);\n        };\n    }\n    if (granularity === 1) {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1);\n        };\n    }\n    if (granularity === 0) {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1);\n        };\n    }\n}\nfunction byDate(a, b) {\n    const aFrom = a.date_min != null ? a.date_min : a.date;\n    const bFrom = b.date_min != null ? b.date_min : b.date;\n    if (aFrom < bFrom)\n        return -1;\n    if (aFrom > bFrom)\n        return 1;\n    const aTo = a.end_date_max != null ? a.end_date_max : a.end_date;\n    const bTo = b.end_date_max != null ? b.end_date_max : b.end_date;\n    if (aTo < bTo)\n        return -1;\n    if (aTo > bTo)\n        return 1;\n    return 0;\n}\nconst days = [\"Sun\", \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\"];\nconst months = [\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"Jul\", \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\"];\nconst getWeekNumber = (date) => {\n    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));\n    const dayNum = d.getUTCDay() || 7;\n    d.setUTCDate(d.getUTCDate() + 4 - dayNum);\n    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));\n    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);\n};\nconst labelBody = (d, granularity) => {\n    const date = new Date(d);\n    if (granularity >= 4) {\n        return date.getUTCFullYear().toString();\n    }\n    if (granularity === 3) {\n        let body = months[date.getUTCMonth()];\n        if (date.getUTCMonth() === 0)\n            body = `${date.getUTCFullYear().toString()}, ${body}`;\n        return body;\n    }\n    if (granularity === 2) {\n        return `${months[date.getUTCMonth()]}, week ${getWeekNumber(date)}`;\n    }\n    if (granularity === 1) {\n        let body = days[date.getUTCDay()];\n        body = `${body}, ${months[date.getUTCMonth()]} ${date.getUTCDate()}`;\n        if (date.getUTCMonth() === 0 && date.getUTCDate() === 1)\n            body = `${body}, ${date.getUTCFullYear().toString()}`;\n        return body;\n    }\n    if (granularity === 0) {\n        return `${date.getUTCHours()}:00`;\n    }\n};\n\n\n//# sourceURL=webpack://Timeline/./src/utils/dates.ts?");

/***/ }),

/***/ "./src/utils/events.worker.ts":
/*!************************************!*\
  !*** ./src/utils/events.worker.ts ***!
  \************************************/
/*! exports provided: OrderedEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OrderedEvents\", function() { return OrderedEvents; });\nclass OrderedEvents {\n    constructor() {\n        this.events = [];\n        this.rowCount = 0;\n    }\n}\n\n\n//# sourceURL=webpack://Timeline/./src/utils/events.worker.ts?");

/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/*! exports provided: debounce, onVisible, findClosestRulerDate, visibleRatio, createRange, selectRandom, calcPixelsPerMillisecond */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"debounce\", function() { return debounce; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"onVisible\", function() { return onVisible; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"findClosestRulerDate\", function() { return findClosestRulerDate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"visibleRatio\", function() { return visibleRatio; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createRange\", function() { return createRange; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"selectRandom\", function() { return selectRandom; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"calcPixelsPerMillisecond\", function() { return calcPixelsPerMillisecond; });\n/* harmony import */ var _dates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dates */ \"./src/utils/dates.ts\");\n\nconst debounce = (func, wait) => {\n    let timeout;\n    return () => {\n        clearTimeout(timeout);\n        timeout = setTimeout(func, wait);\n    };\n};\nconst onVisible = (from, to) => (e) => {\n    const eventFrom = e.date_min || e.date;\n    let eventTo = e.end_date_max || e.end_date;\n    if (eventTo == null)\n        eventTo = eventFrom;\n    if (eventFrom == null && eventTo == null)\n        return false;\n    return !(eventTo < from || eventFrom > to);\n};\nfunction findClosestRulerDate(timestamp, granularity) {\n    if (timestamp == null || isNaN(timestamp)) {\n        console.error('[findClosestRulerDate] start timestamp is not defined');\n        return;\n    }\n    const date = new Date(timestamp);\n    let year = date.getUTCFullYear();\n    if (granularity >= 4) {\n        const step = Object(_dates__WEBPACK_IMPORTED_MODULE_0__[\"getStep\"])(granularity);\n        if (granularity === 4)\n            year += 1;\n        else\n            while (year % step !== 0) {\n                year += 1;\n            }\n        if (year > -1 && year < 100) {\n            const nextDate = new Date(Date.UTC(year, 0, 1));\n            nextDate.setUTCFullYear(year);\n            return nextDate.getTime();\n        }\n        else {\n            return Date.UTC(year, 0, 1);\n        }\n    }\n    else if (granularity === 3) {\n        return Date.UTC(year, date.getUTCMonth() + 1, 1);\n    }\n    else if (granularity === 1) {\n        return Date.UTC(year, date.getUTCMonth(), date.getUTCDate() + 1);\n    }\n    else if (granularity === 0) {\n        return Date.UTC(year, date.getUTCMonth(), date.getUTCDate(), date.getUTCHours() + 1);\n    }\n    return timestamp;\n}\nfunction visibleRatio(zoomLevel) {\n    return Math.pow(2, zoomLevel * -1);\n}\nfunction createRange(n) {\n    return Array.apply(null, { length: n }).map(Number.call, Number);\n}\nfunction selectRandom(set, amount) {\n    const selected = [];\n    while (selected.length < amount) {\n        const randomIndex = Math.floor(Math.random() * set.length);\n        const nextItem = set[randomIndex];\n        if (selected.indexOf(nextItem) === -1 || set.length < amount)\n            selected.push(nextItem);\n    }\n    return selected;\n}\nfunction calcPixelsPerMillisecond(viewportWidth, zoomLevel, totalTime) {\n    return (viewportWidth / visibleRatio(zoomLevel)) / totalTime;\n}\n\n\n//# sourceURL=webpack://Timeline/./src/utils/index.ts?");

/***/ }),

/***/ "./src/utils/prepare-config.ts":
/*!*************************************!*\
  !*** ./src/utils/prepare-config.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return prepareConfig; });\n/* harmony import */ var _models_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/config */ \"./src/models/config/index.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\nfunction prepareConfig(config, pixelsPerMillisecond) {\n    return __awaiter(this, void 0, void 0, function* () {\n        if (config.events == null) {\n            console.error('[DomainConfig] No events band in config!');\n            return config;\n        }\n        if (config.events.domains == null || !config.events.domains.length) {\n            console.error('[DomainConfig] No events band domains in config!');\n            return config;\n        }\n        const oe = yield Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(0)]).then(__webpack_require__.bind(null, /*! ../wasm/timeline_sort_events.js */ \"./src/wasm/timeline_sort_events.js\"));\n        config.events.domains = config.events.domains.map((domainConfig) => {\n            if (domainConfig.events == null && domainConfig.orderedEvents == null) {\n                console.error('[DomainConfig] No events in config!');\n            }\n            else if (domainConfig.orderedEvents == null) {\n                const t0 = performance.now();\n                domainConfig.orderedEvents = JSON.parse(oe.order_events(JSON.stringify(domainConfig.events)));\n                const t1 = performance.now();\n                console.log('Performance: ', `${t1 - t0}ms`);\n                delete domainConfig.events;\n            }\n            return Object.assign({}, new _models_config__WEBPACK_IMPORTED_MODULE_0__[\"EventsDomainConfig\"](), domainConfig);\n        });\n        config = Object.assign({}, new _models_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"](), config);\n        config.events.domains = config.events.domains.map(d => (Object.assign({}, new _models_config__WEBPACK_IMPORTED_MODULE_0__[\"EventsDomainConfig\"](), d)));\n        config.events = Object.assign({}, new _models_config__WEBPACK_IMPORTED_MODULE_0__[\"BandConfig\"](), config.events);\n        config.minimaps = config.minimaps.map(mm => {\n            mm = Object.assign({}, new _models_config__WEBPACK_IMPORTED_MODULE_0__[\"BandConfig\"](), mm);\n            if (!mm.domains.length)\n                mm.domains.push({});\n            mm.domains = mm.domains.map(d => (Object.assign({}, new _models_config__WEBPACK_IMPORTED_MODULE_0__[\"MinimapDomainConfig\"](), d)));\n            return (Object.assign({}, new _models_config__WEBPACK_IMPORTED_MODULE_0__[\"BandConfig\"](), mm));\n        });\n        return config;\n    });\n}\n\n\n//# sourceURL=webpack://Timeline/./src/utils/prepare-config.ts?");

/***/ }),

/***/ "./src/views/band/events.ts":
/*!**********************************!*\
  !*** ./src/views/band/events.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EventsBandView; });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/views/band/index.ts\");\n/* harmony import */ var _event_bus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../event-bus */ \"./src/event-bus.ts\");\n\n\nfunction formatDate(ts) {\n    const d = new Date(ts);\n    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;\n}\nclass EventsBandView extends _index__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(band, select) {\n        super(band);\n        this.band = band;\n        this.select = select;\n        this.onClick = (ev) => {\n            const event = this.band.getEventByCoordinates(ev.clientX, ev.clientY);\n            if (event && this.select) {\n                this.select(event);\n                console.log(event, formatDate(event.from), formatDate(event.to));\n            }\n        };\n    }\n    render() {\n        const root = super.render();\n        _event_bus__WEBPACK_IMPORTED_MODULE_1__[\"default\"].register('click', this.onClick, this.rootElement);\n        return root;\n    }\n}\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events.ts?");

/***/ }),

/***/ "./src/views/band/index.ts":
/*!*********************************!*\
  !*** ./src/views/band/index.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return BandView; });\n/* harmony import */ var _models_props__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/props */ \"./src/models/props.ts\");\n/* harmony import */ var _utils_create_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/create-element */ \"./src/utils/create-element.ts\");\n/* harmony import */ var _event_bus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../event-bus */ \"./src/event-bus.ts\");\n/* harmony import */ var _animator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../animator */ \"./src/animator.ts\");\n\n\n\n\nclass BandView {\n    constructor(band) {\n        this.band = band;\n        this.onMouseDown = (ev) => {\n            document.addEventListener('mouseup', this.onMouseUp);\n            this.dragOffset = ev.clientX;\n            this.dragStart = this.band.left;\n        };\n        this.onMouseMove = (ev) => {\n            if (this.dragOffset && this.band.zoomLevel > 0) {\n                const left = this.dragStart - (this.dragOffset - ev.clientX);\n                _models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].center = left / (_models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].viewportWidth - this.band.width);\n                _animator__WEBPACK_IMPORTED_MODULE_3__[\"default\"].play();\n            }\n        };\n        this.onMouseUp = (ev) => {\n            this.dragOffset = null;\n            document.removeEventListener('mouseup', this.onMouseUp);\n        };\n        this.onDblClick = (ev) => {\n            const nextCenter = this.band.proportionAtPosition(ev.clientX);\n            _animator__WEBPACK_IMPORTED_MODULE_3__[\"default\"].goTo(nextCenter);\n        };\n    }\n    render() {\n        this.rootElement = Object(_utils_create_element__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('div', 'band-wrap', [\n            'position: absolute',\n            'z-index: 1',\n        ], [\n            `height: ${this.band.height}px`,\n            `top: ${this.band.top}px`,\n            `width: ${_models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].viewportWidth}px`,\n        ]);\n        if (this.band.zoomLevel > 0) {\n            _event_bus__WEBPACK_IMPORTED_MODULE_2__[\"default\"].register('mousedown', this.onMouseDown, this.rootElement);\n            _event_bus__WEBPACK_IMPORTED_MODULE_2__[\"default\"].register('mousemove', this.onMouseMove, this.rootElement);\n        }\n        _event_bus__WEBPACK_IMPORTED_MODULE_2__[\"default\"].register('dblclick', this.onDblClick, this.rootElement);\n        return this.rootElement;\n    }\n    resize() {\n        this.rootElement.style.cssText = `height: ${this.band.height}px; top: ${this.band.top}px; width: ${_models_props__WEBPACK_IMPORTED_MODULE_0__[\"default\"].viewportWidth}px;`;\n    }\n}\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/index.ts?");

/***/ }),

/***/ "./src/views/canvas/index.ts":
/*!***********************************!*\
  !*** ./src/views/canvas/index.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Canvas; });\n/* harmony import */ var _utils_create_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/create-element */ \"./src/utils/create-element.ts\");\n/* harmony import */ var _models_props__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/props */ \"./src/models/props.ts\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants */ \"./src/constants.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils */ \"./src/utils/index.ts\");\n/* harmony import */ var _utils_dates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/dates */ \"./src/utils/dates.ts\");\n/* harmony import */ var _animator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../animator */ \"./src/animator.ts\");\n\n\n\n\n\n\nclass Canvas {\n    constructor() {\n        this.font = \"10px sans-serif\";\n        this.offsiteCanvas = Object(_utils_create_element__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('canvas');\n        this.clear = () => {\n            this.ctx.clearRect(_models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].eventsBand.top, 0, this.canvas.width, _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].eventsBand.height);\n            _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].minimapBands\n                .filter(band => band.zoomLevel !== 0)\n                .forEach(band => this.ctx.clearRect(0, band.top, this.canvas.width, band.height));\n        };\n        this.update = () => {\n            if (this.canvas.width !== _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportWidth || this.canvas.height !== _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportHeight) {\n                this.canvas.width = _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportWidth;\n                this.canvas.height = _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportHeight;\n                this.indicatorsCanvas.width = _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportWidth;\n                this.indicatorsCanvas.height = _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportHeight;\n                this.drawStaticMinimapBands();\n            }\n            this.clear();\n            this.drawRulers(_models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].eventsBand);\n            this.drawEvents();\n            _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].minimapBands\n                .filter(band => band.zoomLevel !== 0)\n                .forEach(band => {\n                band.domains.forEach(domain => {\n                    this.drawMinimap(band, domain);\n                });\n                this.drawRulers(band);\n            });\n            this.drawIndicators();\n        };\n        _animator__WEBPACK_IMPORTED_MODULE_5__[\"default\"].registerViewUpdaters(this.update);\n        this.offsiteCtx = this.offsiteCanvas.getContext('2d');\n    }\n    render() {\n        this.canvas = Object(_utils_create_element__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('canvas', 'minimap', [\n            'position: absolute',\n        ]);\n        this.canvas.width = _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportWidth;\n        this.canvas.height = _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportHeight;\n        this.ctx = this.canvas.getContext('2d');\n        this.ctx.font = this.font;\n        this.indicatorsCanvas = Object(_utils_create_element__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('canvas', 'minimap', [\n            'position: absolute',\n        ], ['z-index: 1']);\n        this.indicatorsCanvas.width = _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportWidth;\n        this.indicatorsCanvas.height = _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportHeight;\n        this.indicatorsCtx = this.indicatorsCanvas.getContext('2d');\n        this.update();\n        this.drawStaticMinimapBands();\n        return [this.canvas, this.indicatorsCanvas];\n    }\n    drawStaticMinimapBands() {\n        _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].minimapBands\n            .filter(band => band.zoomLevel === 0)\n            .forEach(band => {\n            band.domains.forEach(domain => {\n                this.drawMinimap(band, domain);\n            });\n            this.drawRulers(band);\n        });\n    }\n    drawEvents() {\n        this.ctx.beginPath();\n        _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].eventsBand.domains.forEach(domain => {\n            const band = _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].eventsBand;\n            const left = band.positionAtTimestamp(band.from);\n            const offsetY = domain.topOffsetRatio * _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportHeight;\n            const domainHeight = (domain.heightRatio * _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportHeight) - _constants__WEBPACK_IMPORTED_MODULE_2__[\"DATE_BAR_HEIGHT\"];\n            for (const event of domain.orderedEvents.events) {\n                event.left = band.positionAtTimestamp(event.from) - left;\n                event.width = Math.round((event.time + event.space) * band.pixelsPerMillisecond);\n                if (event.width < 1)\n                    event.width = 1;\n                event.top = offsetY + domainHeight - ((event.row + 1) * (_constants__WEBPACK_IMPORTED_MODULE_2__[\"EVENT_HEIGHT\"] + 2));\n                if (event.from > band.to || event.to < band.from)\n                    continue;\n                if (!event.time) {\n                    this.ctx.moveTo(event.left, event.top + _constants__WEBPACK_IMPORTED_MODULE_2__[\"EVENT_HEIGHT\"] / 2);\n                    this.ctx.arc(event.left, event.top + _constants__WEBPACK_IMPORTED_MODULE_2__[\"EVENT_HEIGHT\"] / 2, _constants__WEBPACK_IMPORTED_MODULE_2__[\"EVENT_HEIGHT\"] / 3, 0, 2 * Math.PI);\n                }\n                else {\n                    this.ctx.rect(event.left, event.top, event.width, _constants__WEBPACK_IMPORTED_MODULE_2__[\"EVENT_HEIGHT\"]);\n                }\n            }\n        });\n        this.ctx.fillStyle = `rgba(126, 0, 0, .3)`;\n        this.ctx.fill();\n        this.drawEventsText();\n    }\n    drawEventsText() {\n        this.ctx.fillStyle = `rgb(126, 0, 0)`;\n        for (const domain of _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].eventsBand.domains) {\n            for (const event of domain.orderedEvents.events) {\n                if (event.from > _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].eventsBand.to || event.to < _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].eventsBand.from)\n                    continue;\n                let eventWidth = event.width;\n                let eventLeft = event.left;\n                if (event.left < 0 && event.time !== 0) {\n                    eventWidth = event.width + event.left;\n                    eventLeft = 0;\n                }\n                if (event.label == null)\n                    event.label = 'NO LABEL';\n                if ((event.label.length * 8) + 10 < eventWidth) {\n                    const paddingLeft = event.time ? 3 : 8;\n                    this.ctx.fillText(event.label, eventLeft + paddingLeft, event.top + _constants__WEBPACK_IMPORTED_MODULE_2__[\"EVENT_HEIGHT\"] - 3);\n                }\n            }\n        }\n    }\n    drawMinimap(band, domain) {\n        const maxHeight = band.height - _constants__WEBPACK_IMPORTED_MODULE_2__[\"DATE_BAR_HEIGHT\"];\n        const maxRowCount = band.domains.reduce((prev, curr) => {\n            const counts = curr.targets.map(index => _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].eventsBand.domains[index].orderedEvents.rowCount);\n            return Math.max(prev, ...counts);\n        }, 0);\n        let eventHeight = maxHeight / maxRowCount;\n        if (eventHeight < 1) {\n            eventHeight = 1;\n            this.offsiteCanvas.width = _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportWidth;\n            this.offsiteCanvas.height = maxRowCount;\n            drawEvents(this.offsiteCtx, maxRowCount, 0);\n            this.ctx.drawImage(this.offsiteCanvas, 0, band.top, _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportWidth, maxHeight);\n        }\n        else {\n            eventHeight = Math.round(eventHeight);\n            drawEvents(this.ctx, maxHeight);\n        }\n        function drawEvents(ctx, height, offsetY = band.top) {\n            ctx.beginPath();\n            const left = band.positionAtTimestamp(band.from);\n            domain.targets.forEach(targetIndex => {\n                const targetDomain = _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].eventsBand.domains[targetIndex];\n                for (const event of targetDomain.orderedEvents.events) {\n                    if (event.from > band.to || event.to < band.from)\n                        continue;\n                    const eventWidth = Math.round(event.time * band.pixelsPerMillisecond);\n                    const eventLeft = band.positionAtTimestamp(event.date_min != null ? event.date_min : event.date);\n                    const y = offsetY + height - ((event.row + 1) * eventHeight);\n                    const width = eventWidth < 1 ? 1 : eventWidth;\n                    ctx.rect(eventLeft - left, y, width, eventHeight);\n                }\n            });\n            ctx.fillStyle = `rgba(0, 0, 0, .2)`;\n            ctx.fill();\n        }\n    }\n    drawIndicators() {\n        this.indicatorsCtx.clearRect(0, 0, _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportWidth, _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportHeight);\n        this.indicatorsCtx.beginPath();\n        _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].minimapBands.forEach(band => {\n            band.domains.forEach(domain => {\n                const indicatorTOP = Math.round(domain.topOffsetRatio * _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportHeight);\n                const leftIndicatorRightX = band.positionAtTimestamp(_models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].eventsBand.from) + band.left;\n                this.indicatorsCtx.rect(0, indicatorTOP, leftIndicatorRightX, band.height);\n                const rightIndicatorLeftX = band.positionAtTimestamp(_models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].eventsBand.to) + band.left;\n                this.indicatorsCtx.rect(rightIndicatorLeftX, indicatorTOP, _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportWidth, band.height);\n                this.indicatorsCtx.rect(leftIndicatorRightX, indicatorTOP + band.height - _constants__WEBPACK_IMPORTED_MODULE_2__[\"DATE_BAR_HEIGHT\"], rightIndicatorLeftX - leftIndicatorRightX, _constants__WEBPACK_IMPORTED_MODULE_2__[\"DATE_BAR_HEIGHT\"]);\n            });\n        });\n        this.indicatorsCtx.fillStyle = `rgba(0, 0, 0, .1)`;\n        this.indicatorsCtx.fill();\n        this.indicatorsCtx.fillStyle = `rgba(255, 0, 0, .5)`;\n        const x = _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].eventsBand.positionAtTimestamp(_models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].eventsBand.timestampAtProportion(_models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].center)) + _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].eventsBand.left;\n        this.indicatorsCtx.fillRect(x - 1, 0, 2, _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportHeight);\n        this.indicatorsCtx.closePath();\n    }\n    drawRulers(band) {\n        this.ctx.beginPath();\n        this.ctx.fillStyle = `rgb(150, 150, 150)`;\n        for (const domain of band.domains) {\n            if (!domain.rulers)\n                continue;\n            let date = Object(_utils__WEBPACK_IMPORTED_MODULE_3__[\"findClosestRulerDate\"])(band.from, band.granularity);\n            const y = domain.topOffsetRatio * _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportHeight;\n            const height = domain.heightRatio * _models_props__WEBPACK_IMPORTED_MODULE_1__[\"default\"].viewportHeight;\n            while (date < band.to) {\n                const left = band.positionAtTimestamp(date) + band.left;\n                this.ctx.moveTo(left, y);\n                this.ctx.lineTo(left, y + height);\n                if (domain.rulerLabels)\n                    this.ctx.fillText(Object(_utils_dates__WEBPACK_IMPORTED_MODULE_4__[\"labelBody\"])(date, band.granularity), left + 3, y + height - 3);\n                date = band.nextDate(date);\n            }\n        }\n        this.ctx.strokeStyle = `rgb(200, 200, 200)`;\n        this.ctx.stroke();\n    }\n}\n\n\n//# sourceURL=webpack://Timeline/./src/views/canvas/index.ts?");

/***/ }),

/***/ "./src/views/label.ts":
/*!****************************!*\
  !*** ./src/views/label.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Label; });\n/* harmony import */ var _utils_create_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/create-element */ \"./src/utils/create-element.ts\");\n\nclass Label {\n    constructor(domain) {\n        this.domain = domain;\n    }\n    render() {\n        const wrapper = Object(_utils_create_element__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('div', 'events-label-wrapper', [\n            'border-top: 1px solid #CCC',\n            'position: absolute',\n            'width: 100%',\n        ], [\n            `top: ${this.domain.topOffsetRatio * 100}%`\n        ]);\n        const eventsLabel = Object(_utils_create_element__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('div', 'events-label', [\n            'background: white',\n            'border-bottom-right-radius: 4px',\n            'box-shadow: 1px 2px 4px #AAA',\n            'display: inline-block',\n            'color: #444',\n            'font-size: .8em',\n            'font-family: sans-serif',\n            'padding: 4px 8px',\n        ]);\n        eventsLabel.innerText = this.domain.label;\n        wrapper.appendChild(eventsLabel);\n        return wrapper;\n    }\n}\n\n\n//# sourceURL=webpack://Timeline/./src/views/label.ts?");

/***/ })

/******/ });
});