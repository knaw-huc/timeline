(this["webpackJsonpTimeline"] = this["webpackJsonpTimeline"] || []).push([[0],{

/***/ "./src/wasm/timeline_sort_events.js":
/*!******************************************!*\
  !*** ./src/wasm/timeline_sort_events.js ***!
  \******************************************/
/*! exports provided: order_events, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"order_events\", function() { return order_events; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _timeline_sort_events_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timeline_sort_events_bg */ \"./src/wasm/timeline_sort_events_bg.wasm\");\n/* tslint:disable */\n\n\nconst TextEncoder = typeof self === 'object' && self.TextEncoder\n    ? self.TextEncoder\n    : __webpack_require__(/*! util */ \"./node_modules/util/util.js\").TextEncoder;\n\nlet cachedEncoder = new TextEncoder('utf-8');\n\nlet cachegetUint8Memory = null;\nfunction getUint8Memory() {\n    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _timeline_sort_events_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory = new Uint8Array(_timeline_sort_events_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory;\n}\n\nfunction passStringToWasm(arg) {\n    \n    const buf = cachedEncoder.encode(arg);\n    const ptr = _timeline_sort_events_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"](buf.length);\n    getUint8Memory().set(buf, ptr);\n    return [ptr, buf.length];\n}\n\nconst TextDecoder = typeof self === 'object' && self.TextDecoder\n    ? self.TextDecoder\n    : __webpack_require__(/*! util */ \"./node_modules/util/util.js\").TextDecoder;\n\nlet cachedDecoder = new TextDecoder('utf-8');\n\nfunction getStringFromWasm(ptr, len) {\n    return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));\n}\n\nlet cachedGlobalArgumentPtr = null;\nfunction globalArgumentPtr() {\n    if (cachedGlobalArgumentPtr === null) {\n        cachedGlobalArgumentPtr = _timeline_sort_events_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_global_argument_ptr\"]();\n    }\n    return cachedGlobalArgumentPtr;\n}\n\nlet cachegetUint32Memory = null;\nfunction getUint32Memory() {\n    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== _timeline_sort_events_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint32Memory = new Uint32Array(_timeline_sort_events_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint32Memory;\n}\n/**\n* @param {string} arg0\n* @returns {string}\n*/\nfunction order_events(arg0) {\n    const [ptr0, len0] = passStringToWasm(arg0);\n    const retptr = globalArgumentPtr();\n    try {\n        _timeline_sort_events_bg__WEBPACK_IMPORTED_MODULE_0__[\"order_events\"](retptr, ptr0, len0);\n        const mem = getUint32Memory();\n        const ptr = mem[retptr / 4];\n        const len = mem[retptr / 4 + 1];\n        \n        const realRet = getStringFromWasm(ptr, len).slice();\n        _timeline_sort_events_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](ptr, len * 1);\n        return realRet;\n        \n        \n    } finally {\n        _timeline_sort_events_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](ptr0, len0 * 1);\n        \n    }\n    \n}\n\nfunction __wbindgen_throw(ptr, len) {\n    throw new Error(getStringFromWasm(ptr, len));\n}\n\n\n\n//# sourceURL=webpack://Timeline/./src/wasm/timeline_sort_events.js?");

/***/ }),

/***/ "./src/wasm/timeline_sort_events_bg.wasm":
/*!***********************************************!*\
  !*** ./src/wasm/timeline_sort_events_bg.wasm ***!
  \***********************************************/
/*! exports provided: memory, __heap_base, __data_end, order_events, __wbindgen_global_argument_ptr, __wbindgen_malloc, __wbindgen_free */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./timeline_sort_events */ \"./src/wasm/timeline_sort_events.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack://Timeline/./src/wasm/timeline_sort_events_bg.wasm?");

/***/ })

}]);