/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/utils/aggregate.worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/utils/aggregate.worker.js":
/*!***************************************!*\
  !*** ./src/utils/aggregate.worker.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("onmessage = function(e) {\n\tlet prevYear\n\tconst run1 = e.data\n\t\t.reduce((prev, curr, index, array) => {\n\t\t\tconst year = curr.date.getFullYear()\n\t\t\tif (prev.hasOwnProperty(year)) {\n\t\t\t\tprev[year]++\n\t\t\t} else {\n\t\t\t\twhile (prevYear < year) {\n\t\t\t\t\tprevYear += 1\n\t\t\t\t\tprev[prevYear] = 0\n\t\t\t\t}\n\t\t\t\tprev[year] = 1\n\t\t\t}\n\t\t\tprevYear = year\n\t\t\treturn prev\n\t\t}, {})\n\tconst run2 = Object.keys(run1).map((year, index) => ({ year, count: run1[year]}))\n\tpostMessage(run2)\n}\n\n//# sourceURL=webpack://Timeline/./src/utils/aggregate.worker.js?");

/***/ })

/******/ });