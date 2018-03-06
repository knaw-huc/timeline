module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/worker-loader/dist/workers/InlineWorker.js":
/*!*****************************************************************!*\
  !*** ./node_modules/worker-loader/dist/workers/InlineWorker.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string\n\nvar URL = window.URL || window.webkitURL;\n\nmodule.exports = function (content, url) {\n  try {\n    try {\n      var blob;\n\n      try {\n        // BlobBuilder = Deprecated, but widely implemented\n        var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;\n\n        blob = new BlobBuilder();\n\n        blob.append(content);\n\n        blob = blob.getBlob();\n      } catch (e) {\n        // The proposed API\n        blob = new Blob([content]);\n      }\n\n      return new Worker(URL.createObjectURL(blob));\n    } catch (e) {\n      return new Worker('data:application/javascript,' + encodeURIComponent(content));\n    }\n  } catch (e) {\n    if (!url) {\n      throw Error('Inline worker is not supported');\n    }\n\n    return new Worker(url);\n  }\n};\n\n//# sourceURL=webpack://Timeline/./node_modules/worker-loader/dist/workers/InlineWorker.js?");

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.EVENT_MIN_SPACE = 160;\nexports.EVENT_HEIGHT = 12;\nexports.EVENT_ROW_HEIGHT = 16;\nexports.DATE_BAR_HEIGHT = 60;\nexports.RULER_LABELS_HEIGHT = 60;\nexports.CENTER_CHANGE_EVENT = 'CENTER_CHANGE_EVENT';\nexports.READY_FOR_RENDER_EVENT = 'READY_FOR_RENDER_EVENT';\n\n\n//# sourceURL=webpack://Timeline/./src/constants.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst domain_1 = __webpack_require__(/*! ./models/domain */ \"./src/models/domain.ts\");\nconst props_1 = __webpack_require__(/*! ./models/props */ \"./src/models/props.ts\");\nconst events_1 = __webpack_require__(/*! ./views/band/events */ \"./src/views/band/events/index.ts\");\nconst sparkline_1 = __webpack_require__(/*! ./views/band/sparkline */ \"./src/views/band/sparkline.ts\");\nconst indicator_1 = __webpack_require__(/*! ./views/indicator */ \"./src/views/indicator/index.ts\");\nconst create_element_1 = __webpack_require__(/*! ./utils/create-element */ \"./src/utils/create-element.ts\");\nconst defaultConfig = {\n    aggregate: [],\n    center: .5,\n    domains: [],\n    events: [],\n    rootElement: null,\n};\nclass Timeline {\n    constructor(config) {\n        this.config = config;\n        this.appendToWrapper = (child) => this.wrapper.appendChild(child.render());\n        this.config = Object.assign({}, defaultConfig, config);\n        const edges = [];\n        if (this.config.domains.some(d => d.type === 'EVENTS') && this.config.events.length > 1) {\n            edges.push(new Date(this.config.events[0].date));\n            edges.push(props_1.default.to = new Date(this.config.events[this.config.events.length - 1].date));\n        }\n        if (this.config.domains.some(d => d.type === 'SPARKLINE') && this.config.aggregate.length > 1) {\n            edges.push(new Date(this.config.aggregate[0].year, 0, 1));\n            edges.push(new Date(this.config.aggregate[this.config.aggregate.length - 1].year, 0, 1));\n        }\n        if (edges.length < 2)\n            throw Error('Cannot draw Timeline with this config');\n        props_1.default.from = new Date(Math.min(...edges));\n        props_1.default.to = new Date(Math.max(...edges));\n        this.domains = this.createDomains();\n        this.config.rootElement.appendChild(this.render());\n    }\n    render() {\n        this.wrapper = create_element_1.default('div', 'wrapper', [\n            'background-color: teal',\n            'box-sizing: border-box',\n            'height: 100%',\n            'overflow: hidden',\n            'position: relative',\n            'user-select: none',\n            'width: 100%',\n        ]);\n        this.renderBands();\n        this.renderIndicators();\n        return this.wrapper;\n    }\n    createDomains() {\n        const style = getComputedStyle(this.config.rootElement);\n        const height = parseInt(style.getPropertyValue('height'), 10);\n        const width = parseInt(style.getPropertyValue('width'), 10);\n        return this.config.domains.map(d => new domain_1.default(d, width, height));\n    }\n    renderBands() {\n        this.domains.forEach(d => {\n            let b;\n            if (d.type === 'EVENTS')\n                b = new events_1.default(d, this.config.events);\n            else if (d.type === 'SPARKLINE')\n                b = new sparkline_1.default(d, this.config.events, this.config.aggregate);\n            if (b)\n                this.appendToWrapper(b);\n        });\n    }\n    renderIndicators() {\n        this.domains\n            .filter(d => d.hasIndicatorFor != null)\n            .map(d => new indicator_1.default(d, this.domains[d.hasIndicatorFor]))\n            .forEach(this.appendToWrapper);\n    }\n}\nexports.default = Timeline;\n\n\n//# sourceURL=webpack://Timeline/./src/index.ts?");

/***/ }),

/***/ "./src/models/base-event.ts":
/*!**********************************!*\
  !*** ./src/models/base-event.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst DateUtils = __webpack_require__(/*! ../utils/dates */ \"./src/utils/dates.ts\");\nclass BaseEvent {\n    constructor(data) {\n        this.body = '';\n        this.coordinates = [];\n        this.types = [];\n        this.dateGranularity = 1;\n        this.dateRangeGranularity = null;\n        this.formatDate = (dateToFormat) => {\n            let date = this.date;\n            let granularity = this.dateGranularity;\n            if (date == null) {\n                if (this.dateUncertain != null) {\n                    const from = DateUtils.format(this.dateUncertain.from, this.dateGranularity);\n                    const to = DateUtils.format(this.dateUncertain.to, this.dateRangeGranularity);\n                    return `${from} - ${to}`;\n                }\n                else if (dateToFormat == null) {\n                    throw new Error('[formatDate] Unknown date to format!');\n                }\n                else {\n                    granularity = (dateToFormat === 'from') ?\n                        this.dateGranularity :\n                        this.dateRangeGranularity;\n                    if (this.dateRangeUncertain == null) {\n                        date = this.dateRange[dateToFormat];\n                    }\n                    else {\n                        if (DateUtils.isEqual(this.dateRange[dateToFormat], this.dateRangeUncertain[dateToFormat])) {\n                            date = this.dateRangeUncertain[dateToFormat];\n                        }\n                        else {\n                            const from = DateUtils.format(this.dateRange[dateToFormat], granularity);\n                            const to = DateUtils.format(this.dateRangeUncertain[dateToFormat], granularity);\n                            return `${from} - ${to}`;\n                        }\n                    }\n                }\n            }\n            return DateUtils.format(date, granularity);\n        };\n        data.date = new Date(data.date);\n        Object.assign(this, data);\n        this.setTo();\n        this.setFrom();\n    }\n    countDays() {\n        return DateUtils.countDays(this.from, this.to);\n    }\n    formatFromDate() {\n        return this.formatDate('from');\n    }\n    formatToDate() {\n        return this.formatDate('to');\n    }\n    isInterval() {\n        return this.dateRange != null;\n    }\n    isUncertain() {\n        return this.dateUncertain != null || this.dateRangeUncertain != null;\n    }\n    setFrom() {\n        this.from = (this.dateRange != null) ?\n            this.dateRange.infiniteFrom ?\n                new Date(-4713, 0, 1) :\n                this.dateRange.from :\n            this.date != null ?\n                this.date :\n                (this.dateUncertain != null) ?\n                    this.dateUncertain.from :\n                    null;\n    }\n    setTo() {\n        this.to = (this.dateRange != null) ?\n            this.dateRange.infiniteTo ?\n                new Date() :\n                this.dateRange.to :\n            (this.dateUncertain != null) ?\n                this.dateUncertain.to :\n                null;\n    }\n}\nexports.default = BaseEvent;\n\n\n//# sourceURL=webpack://Timeline/./src/models/base-event.ts?");

/***/ }),

/***/ "./src/models/domain.ts":
/*!******************************!*\
  !*** ./src/models/domain.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst dates_1 = __webpack_require__(/*! ../utils/dates */ \"./src/utils/dates.ts\");\nconst dates_2 = __webpack_require__(/*! ../utils/dates */ \"./src/utils/dates.ts\");\nconst props_1 = __webpack_require__(/*! ./props */ \"./src/models/props.ts\");\nvar DomainType;\n(function (DomainType) {\n    DomainType[\"Events\"] = \"EVENTS\";\n    DomainType[\"Sparkline\"] = \"SPARKLINE\";\n})(DomainType = exports.DomainType || (exports.DomainType = {}));\nclass Domain {\n    constructor(domain, viewportWidth, viewportHeight) {\n        this.viewportWidth = viewportWidth;\n        this.viewportHeight = viewportHeight;\n        this.domainLabels = false;\n        this.heightRatio = 1;\n        this.rulerLabels = true;\n        this.rulers = true;\n        this.topOffsetRatio = 0;\n        this.type = DomainType.Events;\n        this.visibleRatio = 1;\n        Object.keys(domain).forEach(k => {\n            if (domain[k] !== this[k])\n                this[k] = domain[k];\n        });\n        this.viewportHeight = viewportHeight * this.heightRatio;\n        this.height = this.viewportHeight;\n        this.width = viewportWidth / this.visibleRatio;\n        this.granularity = dates_1.getGranularity(props_1.default.from, props_1.default.to, this.visibleRatio);\n        this.prevDate = dates_2.subsequentDate(this.granularity, true);\n        this.nextDate = dates_2.subsequentDate(this.granularity);\n        this.pixelsPerDay = this.width / dates_1.countDays(props_1.default.from, props_1.default.to);\n        this.updateLeft();\n    }\n    initialActiveRange(iteration) {\n        const deviation = iteration * this.visibleRatio;\n        const lowerDeviation = props_1.default.center - deviation > 0 ? props_1.default.center - deviation : 0;\n        const upperDeviation = props_1.default.center + deviation < 1 ? props_1.default.center + deviation : 1;\n        let activeFrom = this.prevDate(this.dateAtProportion(lowerDeviation));\n        let activeTo = this.nextDate(this.dateAtProportion(upperDeviation));\n        const last = lowerDeviation === 0 && upperDeviation === 1 ? true : false;\n        return [activeFrom, activeTo, last];\n    }\n    dateAtPosition(x) {\n        return this.dateAtProportion(this.proportionAtPosition(x));\n    }\n    dateAtProportion(proportion) {\n        if (proportion < 0 || proportion > 1)\n            throw new RangeError('[dateAtProportion] proportion should be between 0 and 1.');\n        const fromTime = props_1.default.from.getTime();\n        const toTime = props_1.default.to.getTime();\n        const newTime = fromTime + ((toTime - fromTime) * proportion);\n        return new Date(newTime);\n    }\n    get left() { return this._left; }\n    set left(left) {\n        if (left < -this.width + this.viewportWidth)\n            left = this.viewportWidth - this.width;\n        else if (left > 0)\n            left = 0;\n        this._left = left;\n    }\n    updateLeft() {\n        this.left = props_1.default.center * (this.viewportWidth - this.width);\n        return this.left;\n    }\n    positionAtDate(date) {\n        return dates_1.countDays(props_1.default.from, date) * this.pixelsPerDay;\n    }\n    proportionAtPosition(position) {\n        return position / this.width;\n    }\n}\nexports.default = Domain;\n\n\n//# sourceURL=webpack://Timeline/./src/models/domain.ts?");

/***/ }),

/***/ "./src/models/event.ts":
/*!*****************************!*\
  !*** ./src/models/event.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst base_event_1 = __webpack_require__(/*! ./base-event */ \"./src/models/base-event.ts\");\nconst Constants = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\nclass Event extends base_event_1.default {\n    constructor(data, domain) {\n        super(data);\n        this.left = domain.positionAtDate(this.from);\n        const width = this.countDays() * domain.pixelsPerDay;\n        this.width = (width > 0 && width < 12) ? 12 : width;\n    }\n    space() {\n        const width = (this.width === 0 || this.width < Constants.EVENT_MIN_SPACE) ? Constants.EVENT_MIN_SPACE : this.width;\n        return [this.left, width];\n    }\n}\nexports.default = Event;\n\n\n//# sourceURL=webpack://Timeline/./src/models/event.ts?");

/***/ }),

/***/ "./src/models/props.ts":
/*!*****************************!*\
  !*** ./src/models/props.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst constants_1 = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\nclass Props {\n    constructor() {\n        this._center = .5;\n    }\n    get center() { return this._center; }\n    set center(n) {\n        if ((this._center === 0 && n < 0) || (this._center === 1 && n > 1))\n            return;\n        else if (n < 0)\n            this._center = 0;\n        else if (n > 1)\n            this._center = 1;\n        else\n            this._center = n;\n        document.dispatchEvent(new CustomEvent(constants_1.CENTER_CHANGE_EVENT, { detail: n }));\n    }\n    get from() { return this._from; }\n    set from(date) {\n        this._from = date;\n    }\n    get to() { return this._to; }\n    set to(date) {\n        this._to = date;\n    }\n}\nexports.Props = Props;\nexports.default = new Props();\n\n\n//# sourceURL=webpack://Timeline/./src/models/props.ts?");

/***/ }),

/***/ "./src/utils/add-top.ts":
/*!******************************!*\
  !*** ./src/utils/add-top.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst constants_1 = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\nexports.default = (domain) => {\n    const grid = [];\n    return (event) => {\n        const [left, width] = event.space();\n        let row;\n        const rowHasSpace = (row) => {\n            return row.reduce((prev, curr, index, array) => {\n                if (!prev)\n                    return false;\n                const [currLeft, currWidth] = curr;\n                return (left + width < currLeft ||\n                    left > currLeft + currWidth);\n            }, true);\n        };\n        for (let i = 0; i < grid.length; i++) {\n            if (rowHasSpace(grid[i])) {\n                grid[i].push([left, width]);\n                row = i;\n                break;\n            }\n        }\n        if (row == null) {\n            row = grid.push([[left, width]]);\n        }\n        event.top = row * constants_1.EVENT_ROW_HEIGHT;\n        return event;\n    };\n};\n\n\n//# sourceURL=webpack://Timeline/./src/utils/add-top.ts?");

/***/ }),

/***/ "./src/utils/aggregate.worker.js":
/*!***************************************!*\
  !*** ./src/utils/aggregate.worker.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = function() {\n  return __webpack_require__(/*! !./node_modules/worker-loader/dist/workers/InlineWorker.js */ \"./node_modules/worker-loader/dist/workers/InlineWorker.js\")(\"/******/ (function(modules) { // webpackBootstrap\\n/******/ \\t// The module cache\\n/******/ \\tvar installedModules = {};\\n/******/\\n/******/ \\t// The require function\\n/******/ \\tfunction __webpack_require__(moduleId) {\\n/******/\\n/******/ \\t\\t// Check if module is in cache\\n/******/ \\t\\tif(installedModules[moduleId]) {\\n/******/ \\t\\t\\treturn installedModules[moduleId].exports;\\n/******/ \\t\\t}\\n/******/ \\t\\t// Create a new module (and put it into the cache)\\n/******/ \\t\\tvar module = installedModules[moduleId] = {\\n/******/ \\t\\t\\ti: moduleId,\\n/******/ \\t\\t\\tl: false,\\n/******/ \\t\\t\\texports: {}\\n/******/ \\t\\t};\\n/******/\\n/******/ \\t\\t// Execute the module function\\n/******/ \\t\\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\\n/******/\\n/******/ \\t\\t// Flag the module as loaded\\n/******/ \\t\\tmodule.l = true;\\n/******/\\n/******/ \\t\\t// Return the exports of the module\\n/******/ \\t\\treturn module.exports;\\n/******/ \\t}\\n/******/\\n/******/\\n/******/ \\t// expose the modules object (__webpack_modules__)\\n/******/ \\t__webpack_require__.m = modules;\\n/******/\\n/******/ \\t// expose the module cache\\n/******/ \\t__webpack_require__.c = installedModules;\\n/******/\\n/******/ \\t// define getter function for harmony exports\\n/******/ \\t__webpack_require__.d = function(exports, name, getter) {\\n/******/ \\t\\tif(!__webpack_require__.o(exports, name)) {\\n/******/ \\t\\t\\tObject.defineProperty(exports, name, {\\n/******/ \\t\\t\\t\\tconfigurable: false,\\n/******/ \\t\\t\\t\\tenumerable: true,\\n/******/ \\t\\t\\t\\tget: getter\\n/******/ \\t\\t\\t});\\n/******/ \\t\\t}\\n/******/ \\t};\\n/******/\\n/******/ \\t// define __esModule on exports\\n/******/ \\t__webpack_require__.r = function(exports) {\\n/******/ \\t\\tObject.defineProperty(exports, '__esModule', { value: true });\\n/******/ \\t};\\n/******/\\n/******/ \\t// getDefaultExport function for compatibility with non-harmony modules\\n/******/ \\t__webpack_require__.n = function(module) {\\n/******/ \\t\\tvar getter = module && module.__esModule ?\\n/******/ \\t\\t\\tfunction getDefault() { return module['default']; } :\\n/******/ \\t\\t\\tfunction getModuleExports() { return module; };\\n/******/ \\t\\t__webpack_require__.d(getter, 'a', getter);\\n/******/ \\t\\treturn getter;\\n/******/ \\t};\\n/******/\\n/******/ \\t// Object.prototype.hasOwnProperty.call\\n/******/ \\t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\\n/******/\\n/******/ \\t// __webpack_public_path__\\n/******/ \\t__webpack_require__.p = \\\"\\\";\\n/******/\\n/******/\\n/******/ \\t// Load entry module and return exports\\n/******/ \\treturn __webpack_require__(__webpack_require__.s = \\\"./src/utils/aggregate.worker.js\\\");\\n/******/ })\\n/************************************************************************/\\n/******/ ({\\n\\n/***/ \\\"./src/utils/aggregate.worker.js\\\":\\n/*!***************************************!*\\\\\\n  !*** ./src/utils/aggregate.worker.js ***!\\n  \\\\***************************************/\\n/*! no static exports found */\\n/***/ (function(module, exports) {\\n\\neval(\\\"onmessage = function(e) {\\\\n\\\\tlet prevYear\\\\n\\\\tconst run1 = e.data\\\\n\\\\t\\\\t.reduce((prev, curr, index, array) => {\\\\n\\\\t\\\\t\\\\tconst year = curr.date.getFullYear()\\\\n\\\\t\\\\t\\\\tif (prev.hasOwnProperty(year)) {\\\\n\\\\t\\\\t\\\\t\\\\tprev[year]++\\\\n\\\\t\\\\t\\\\t} else {\\\\n\\\\t\\\\t\\\\t\\\\twhile (prevYear < year) {\\\\n\\\\t\\\\t\\\\t\\\\t\\\\tprevYear += 1\\\\n\\\\t\\\\t\\\\t\\\\t\\\\tprev[prevYear] = 0\\\\n\\\\t\\\\t\\\\t\\\\t}\\\\n\\\\t\\\\t\\\\t\\\\tprev[year] = 1\\\\n\\\\t\\\\t\\\\t}\\\\n\\\\t\\\\t\\\\tprevYear = year\\\\n\\\\t\\\\t\\\\treturn prev\\\\n\\\\t\\\\t}, {})\\\\n\\\\tconst run2 = Object.keys(run1).map((year, index) => ({ year, count: run1[year]}))\\\\n\\\\tpostMessage(run2)\\\\n}\\\\n\\\\n//# sourceURL=webpack://Timeline/./src/utils/aggregate.worker.js?\\\");\\n\\n/***/ })\\n\\n/******/ });\", __webpack_require__.p + \"0839a7593cc3893577a5.worker.js\");\n};\n\n//# sourceURL=webpack://Timeline/./src/utils/aggregate.worker.js?");

/***/ }),

/***/ "./src/utils/create-element.ts":
/*!*************************************!*\
  !*** ./src/utils/create-element.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.createSvg = (name, style, attrs = {}) => {\n    const el = document.createElementNS(\"http://www.w3.org/2000/svg\", name);\n    if (style != null)\n        el.setAttribute('style', style.join(';').concat(';'));\n    Object.keys(attrs).forEach(k => el.setAttribute(k, attrs[k]));\n    return el;\n};\nconst element = document.createElement('style');\ndocument.head.appendChild(element);\nconst sheet = element.sheet;\nconst rules = {};\nexports.default = (name, className, style, dynamicStyle) => {\n    if (!className)\n        return document.createElement(name);\n    let el;\n    if (rules.hasOwnProperty(className)) {\n        el = rules[className].cloneNode(false);\n    }\n    else {\n        el = document.createElement(name);\n        el.classList.add(className);\n        if (style) {\n            sheet.insertRule(`.${className} { ${style.join(';').concat(';')} }`);\n        }\n        rules[className] = el.cloneNode(false);\n    }\n    if (dynamicStyle)\n        el.setAttribute('style', dynamicStyle.join(';').concat(';'));\n    return el;\n};\n\n\n//# sourceURL=webpack://Timeline/./src/utils/create-element.ts?");

/***/ }),

/***/ "./src/utils/dates.ts":
/*!****************************!*\
  !*** ./src/utils/dates.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.countDays = (from, to) => {\n    if (to == null)\n        return 0;\n    return Math.round(to.getTime() - from.getTime()) / 86400000;\n};\nexports.isEqual = (date1, date2) => date1.getTime() === date2.getTime();\nexports.format = (date, granularity) => {\n    if (date == null)\n        return '∞';\n    let displayDate = date.getFullYear().toString();\n    if (granularity >= 3) {\n        const months = [\n            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',\n            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',\n        ];\n        displayDate = `${months[date.getMonth()]} ${displayDate}`;\n    }\n    if (granularity >= 1) {\n        displayDate = `${date.getDate()} ${displayDate}`;\n    }\n    if (granularity === 0) {\n        displayDate = `${date.getHours()}:${date.getMinutes()} ${displayDate}`;\n    }\n    return displayDate;\n};\nexports.getGranularity = (from, to, visibleRatio) => {\n    const days = exports.countDays(from, to) * visibleRatio;\n    if (days < 1)\n        return 0;\n    if (days < 15)\n        return 1;\n    if (days < 45)\n        return 2;\n    if (days < 1.5 * 365)\n        return 3;\n    if (days < 15 * 365)\n        return 4;\n    if (days < 150 * 365)\n        return 5;\n    if (days < 300 * 365)\n        return 6;\n    return 7;\n};\nexports.getStep = (granularity) => {\n    if (granularity === 4)\n        return 1;\n    if (granularity === 5)\n        return 10;\n    if (granularity === 6)\n        return 50;\n    if (granularity === 7)\n        return 100;\n    if (granularity === 8)\n        return 1000;\n    throw new RangeError(\"[getStep] Only steps with a granularity greater than 'year' calculated\");\n};\nexports.subsequentDate = (granularity, prev = false) => {\n    const modifier = prev ? -1 : 1;\n    if (granularity >= 4) {\n        return (date) => new Date(date.getFullYear() + (exports.getStep(granularity) * modifier), 0, 1);\n    }\n    if (granularity === 3) {\n        return (date) => new Date(date.getFullYear(), date.getMonth() + modifier, 1);\n    }\n    if (granularity === 2) {\n        return (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + (7 * modifier));\n    }\n    if (granularity === 1) {\n        return (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + modifier);\n    }\n    if (granularity === 0) {\n        return (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + modifier);\n    }\n};\n\n\n//# sourceURL=webpack://Timeline/./src/utils/dates.ts?");

/***/ }),

/***/ "./src/views/band/events/event/point-in-time/index.ts":
/*!************************************************************!*\
  !*** ./src/views/band/events/event/point-in-time/index.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst constants_1 = __webpack_require__(/*! ../../../../../constants */ \"./src/constants.ts\");\nconst create_element_1 = __webpack_require__(/*! ../../../../../utils/create-element */ \"./src/utils/create-element.ts\");\nclass PointInTime {\n    constructor(event, segmentOffset) {\n        this.event = event;\n        this.segmentOffset = segmentOffset;\n    }\n    render() {\n        const li = create_element_1.default('li', 'pit-wrap', [\n            'box-sizing: border-box',\n            'font-size: 0.8em',\n            `margin-left: -${constants_1.EVENT_HEIGHT / 2}px`,\n            'position: absolute',\n            'white-space: nowrap',\n            `max-width: ${constants_1.EVENT_MIN_SPACE}px`,\n        ], [\n            `left: ${this.event.left - this.segmentOffset}px`,\n            `top: ${this.event.top}px`,\n        ]);\n        li.setAttribute('title', this.event.date.toString());\n        const title = create_element_1.default('div', 'pit-title', [\n            'background-color: rgba(255,255,255,.75)',\n            'display: inline-block',\n            `line-height: ${constants_1.EVENT_HEIGHT}px`,\n            `max-width: calc(${constants_1.EVENT_MIN_SPACE}px - ${constants_1.EVENT_HEIGHT}px)`,\n            'overflow: hidden',\n            'padding: .25em',\n            'text-overflow: ellipsis',\n        ]);\n        title.textContent = this.event.title;\n        const point = create_element_1.default('div', 'pit-point', [\n            'background-image: radial-gradient(white 20%, black 100%)',\n            `border-radius: ${constants_1.EVENT_HEIGHT / 2}px`,\n            'display: inline-block',\n            'margin: .25em 0',\n            `width: ${constants_1.EVENT_HEIGHT}px`,\n            `height: ${constants_1.EVENT_HEIGHT}px`,\n        ]);\n        li.appendChild(point);\n        li.appendChild(title);\n        return li;\n    }\n}\nexports.default = PointInTime;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events/event/point-in-time/index.ts?");

/***/ }),

/***/ "./src/views/band/events/index.ts":
/*!****************************************!*\
  !*** ./src/views/band/events/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst event_1 = __webpack_require__(/*! ../../../models/event */ \"./src/models/event.ts\");\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst index_1 = __webpack_require__(/*! ../index */ \"./src/views/band/index.ts\");\nconst add_top_1 = __webpack_require__(/*! ../../../utils/add-top */ \"./src/utils/add-top.ts\");\nconst props_1 = __webpack_require__(/*! ../../../models/props */ \"./src/models/props.ts\");\nconst segment_1 = __webpack_require__(/*! ./segment */ \"./src/views/band/events/segment.ts\");\nconst rulers_1 = __webpack_require__(/*! ../rulers */ \"./src/views/band/rulers/index.ts\");\nclass EventsBand extends index_1.default {\n    constructor(domain, events) {\n        super(domain);\n        this.events = events;\n        this.topAdder = add_top_1.default(domain);\n        this.events = events\n            .map(e => new event_1.default(e, domain))\n            .sort((a, b) => a.date.getTime() - b.date.getTime());\n        this.segments = this.createSegments();\n    }\n    render() {\n        const bandWrap = super.render();\n        this.eventsWrap = create_element_1.default('ul', 'events-wrap', [\n            'list-style: none',\n            'margin: 0',\n            'padding: 0',\n            'width: 100%',\n        ], [\n            `height: ${this.domain.height}px`,\n        ]);\n        this.segments.forEach(s => bandWrap.appendChild(s.render()));\n        this.renderChildren();\n        bandWrap.appendChild(this.eventsWrap);\n        return bandWrap;\n    }\n    renderChildren() {\n        const index = Math.floor(this.segments.length * props_1.default.center);\n        for (let i = 0; i < this.segments.length; i++) {\n            const seg = this.segments[i];\n            if (i > index - 2 && i < index + 2) {\n                if (seg.rendered)\n                    seg.show();\n                else\n                    seg.renderEvents();\n            }\n            else {\n                seg.hide();\n            }\n        }\n    }\n    createSegments() {\n        const segments = [];\n        const segmentCount = Math.ceil(1 / this.domain.visibleRatio);\n        for (let i = 0; i < segmentCount; i++) {\n            const ratioFrom = this.domain.visibleRatio * i;\n            const ratioTo = ratioFrom + this.domain.visibleRatio;\n            const from = this.domain.dateAtProportion(ratioFrom);\n            const to = this.domain.dateAtProportion(ratioTo);\n            const rulerDates = [];\n            let date = rulers_1.findClosestRulerDate(from, this.domain.granularity);\n            while (date.getTime() < to.getTime()) {\n                rulerDates.push(date);\n                date = this.domain.nextDate(date);\n            }\n            const outOfBoundsIndex = this.events.findIndex(e => e.date.getTime() > to.getTime());\n            let events = this.events.slice(0, outOfBoundsIndex);\n            this.events = this.events.slice(outOfBoundsIndex);\n            if (i === segmentCount - 1)\n                events = events.concat(this.events);\n            segments.push(new segment_1.default(events, rulerDates, i * this.domain.viewportWidth, this.topAdder, this.domain));\n        }\n        return segments;\n    }\n}\nexports.default = EventsBand;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events/index.ts?");

/***/ }),

/***/ "./src/views/band/events/segment.ts":
/*!******************************************!*\
  !*** ./src/views/band/events/segment.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst point_in_time_1 = __webpack_require__(/*! ./event/point-in-time */ \"./src/views/band/events/event/point-in-time/index.ts\");\nconst ruler_1 = __webpack_require__(/*! ../rulers/ruler */ \"./src/views/band/rulers/ruler.ts\");\nclass Segment {\n    constructor(events, rulerDates, left, topAdder, domain) {\n        this.events = events;\n        this.rulerDates = rulerDates;\n        this.left = left;\n        this.topAdder = topAdder;\n        this.domain = domain;\n        this.rendered = false;\n    }\n    render() {\n        this.rootElement = create_element_1.default('ul', 'segment', [\n            'bottom: 0',\n            'display: none',\n            'list-style: none',\n            'margin: 0',\n            'padding: 0',\n            'position: absolute',\n            'top: 0',\n            `width: ${this.domain.viewportWidth}px`,\n        ], [\n            `left: ${this.left}px`,\n        ]);\n        return this.rootElement;\n    }\n    renderEvents() {\n        this.rulerDates.forEach(d => this.rootElement.appendChild(new ruler_1.default(d, this.domain, this.left).render()));\n        this.events.forEach(e => this.rootElement.appendChild(new point_in_time_1.default(this.topAdder(e), this.left).render()));\n        this.show();\n        this.rendered = true;\n    }\n    show() {\n        this.rootElement.style.display = 'block';\n    }\n    hide() {\n        this.rootElement.style.display = 'none';\n    }\n}\nexports.default = Segment;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events/segment.ts?");

/***/ }),

/***/ "./src/views/band/index.ts":
/*!*********************************!*\
  !*** ./src/views/band/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst props_1 = __webpack_require__(/*! ../../models/props */ \"./src/models/props.ts\");\nconst create_element_1 = __webpack_require__(/*! ../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst constants_1 = __webpack_require__(/*! ../../constants */ \"./src/constants.ts\");\nclass Band {\n    constructor(domain) {\n        this.domain = domain;\n        this.updateLeft = () => {\n            this.rootElement.style.transform = `translate3d(${this.domain.updateLeft()}px, 0, 0)`;\n            if (this.domain.type === 'EVENTS')\n                this.renderChildren();\n        };\n        this.onMouseDown = (ev) => {\n            document.addEventListener('mouseup', this.onMouseUp);\n            this.dragOffset = ev.clientX;\n            this.dragStart = this.domain.left;\n        };\n        this.onMouseMove = (ev) => {\n            if (this.dragOffset) {\n                const left = this.dragStart - (this.dragOffset - ev.clientX);\n                props_1.default.center = left / (this.domain.viewportWidth - this.domain.width);\n            }\n        };\n        this.onMouseUp = () => {\n            document.removeEventListener('mouseup', this.onMouseUp);\n            this.dragOffset = null;\n        };\n        this.onDblClick = (ev) => {\n            const rootLeft = this.rootElement.getBoundingClientRect().left;\n            const proportion = this.domain.proportionAtPosition(ev.clientX - rootLeft);\n            props_1.default.center = proportion;\n        };\n        document.addEventListener(constants_1.CENTER_CHANGE_EVENT, this.updateLeft);\n    }\n    render() {\n        this.rootElement = create_element_1.default('div', 'band-wrap', [\n            'background-color: white',\n            'position: absolute',\n        ], [\n            `height: ${this.domain.heightRatio * 100}%`,\n            `top: ${this.domain.topOffsetRatio * 100}%`,\n            `transform: translate3d(${this.domain.left}px, 0, 0)`,\n            `width: ${this.domain.width}px`,\n        ]);\n        this.rootElement.addEventListener('mousedown', this.onMouseDown);\n        this.rootElement.addEventListener('mousemove', this.onMouseMove);\n        this.rootElement.addEventListener('dblclick', this.onDblClick);\n        return this.rootElement;\n    }\n}\nexports.default = Band;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/index.ts?");

/***/ }),

/***/ "./src/views/band/rulers/index.ts":
/*!****************************************!*\
  !*** ./src/views/band/rulers/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst ruler_1 = __webpack_require__(/*! ./ruler */ \"./src/views/band/rulers/ruler.ts\");\nconst dates_1 = __webpack_require__(/*! ../../../utils/dates */ \"./src/utils/dates.ts\");\nconst props_1 = __webpack_require__(/*! ../../../models/props */ \"./src/models/props.ts\");\nexports.findClosestRulerDate = (date, granularity) => {\n    let year = date.getFullYear();\n    if (granularity >= 4) {\n        const step = dates_1.getStep(granularity);\n        if (granularity === 4)\n            year += 1;\n        else\n            while (year % step !== 0) {\n                year += 1;\n            }\n        return new Date(year, 0, 1);\n    }\n    else if (granularity === 3) {\n        return new Date(year, date.getMonth() + 1, 1);\n    }\n    else if (granularity === 1) {\n        return new Date(year, date.getMonth(), date.getDate() + 1);\n    }\n    return date;\n};\nclass Rulers {\n    constructor(domain) {\n        this.domain = domain;\n    }\n    render() {\n        this.ul = create_element_1.default('ul', 'ruler-wrap', [\n            'bottom: 0',\n            'left: 0',\n            'list-style: none',\n            'margin: 0',\n            'padding: 0',\n            'position: absolute',\n            'right: 0',\n            'top: 0',\n            'whiteSpace: nowrap',\n        ]);\n        let date = exports.findClosestRulerDate(props_1.default.from, this.domain.granularity);\n        while (date.getTime() < props_1.default.to.getTime()) {\n            this.ul.appendChild(new ruler_1.default(date, this.domain).render());\n            date = this.domain.nextDate(date);\n        }\n        return this.ul;\n    }\n}\nexports.default = Rulers;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/rulers/index.ts?");

/***/ }),

/***/ "./src/views/band/rulers/ruler.ts":
/*!****************************************!*\
  !*** ./src/views/band/rulers/ruler.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst constants_1 = __webpack_require__(/*! ../../../constants */ \"./src/constants.ts\");\nconst days = [\"Sun\", \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\"];\nconst months = [\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"Jul\", \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\"];\nconst getWeekNumber = (date) => {\n    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));\n    const dayNum = d.getUTCDay() || 7;\n    d.setUTCDate(d.getUTCDate() + 4 - dayNum);\n    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));\n    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);\n};\nconst labelBody = (d, granularity) => {\n    if (granularity >= 4) {\n        return d.getFullYear().toString();\n    }\n    else if (granularity === 3) {\n        let body = months[d.getMonth()];\n        if (d.getMonth() === 0)\n            body = `${d.getFullYear().toString()}, ${body}`;\n        return body;\n    }\n    else if (granularity === 2) {\n        return `${months[d.getMonth()]}<br />week ${getWeekNumber(d)}`;\n    }\n    else if (granularity === 1) {\n        let body = days[d.getDay()];\n        body = `${body}<br />${months[d.getMonth()]} ${d.getDate()}`;\n        if (d.getMonth() === 0 && d.getDate() === 1)\n            body = `${body}, ${d.getFullYear().toString()}`;\n        return body;\n    }\n    else if (granularity === 0) {\n        return 'NOT IMPLEMENTED';\n    }\n};\nclass Ruler {\n    constructor(date, domain, offset = 0) {\n        this.date = date;\n        this.domain = domain;\n        this.offset = offset;\n    }\n    render() {\n        const li = create_element_1.default('li', 'ruler', [\n            'border-left: 1px solid #EEE',\n            'box-sizing: border-box',\n            'height: 100%',\n            'padding-left: 6px',\n            'position: absolute',\n            'transition: all 1s cubic-bezier(.25,.8,.25,1)',\n        ], [\n            `left: ${this.domain.positionAtDate(this.date) - this.offset}px`,\n        ]);\n        const label = create_element_1.default('div', 'ruler-label', [\n            'alignItems: flex-end',\n            'bottom: 10px',\n            'color: #888',\n            'display: flex',\n            'font-size: .75em',\n            `height: calc(${constants_1.DATE_BAR_HEIGHT} - 10px)`,\n            'position: absolute',\n            'width: 75px',\n            'zIndex: 2',\n        ]);\n        label.innerHTML = labelBody(this.date, this.domain.granularity);\n        label.title = this.date;\n        li.appendChild(label);\n        return li;\n    }\n}\nexports.default = Ruler;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/rulers/ruler.ts?");

/***/ }),

/***/ "./src/views/band/sparkline.ts":
/*!*************************************!*\
  !*** ./src/views/band/sparkline.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst index_1 = __webpack_require__(/*! ./index */ \"./src/views/band/index.ts\");\nconst rulers_1 = __webpack_require__(/*! ./rulers */ \"./src/views/band/rulers/index.ts\");\nconst AggregateWorker = __webpack_require__(/*! ../../utils/aggregate.worker.js */ \"./src/utils/aggregate.worker.js\");\nclass SparklineBand extends index_1.default {\n    constructor(domain, events, aggregate) {\n        super(domain);\n        this.events = events;\n        this.aggregate = aggregate;\n    }\n    render() {\n        const wrapper = super.render();\n        const svg = create_element_1.createSvg('svg', null, {\n            height: `${this.domain.viewportHeight}px`,\n            preserveAspectRatio: \"none\",\n            viewBox: `0 0 ${this.domain.width} ${this.domain.viewportHeight}`,\n            width: `${this.domain.width}px`,\n        });\n        wrapper.appendChild(svg);\n        wrapper.appendChild(new rulers_1.default(this.domain).render());\n        if (this.aggregate.length) {\n            const path = create_element_1.createSvg('path', [\n                'fill: rgba(245, 245, 255, .7)',\n                'stroke: rgb(180, 180, 255)',\n            ], { d: this.createPath(this.aggregate) });\n            svg.appendChild(path);\n        }\n        else if (this.events.length) {\n            const worker = new AggregateWorker();\n            worker.postMessage(this.events);\n            worker.onmessage = (e) => {\n                const path = create_element_1.createSvg('path', [\n                    'fill: rgba(245, 245, 255, .7)',\n                    'stroke: rgb(180, 180, 255)',\n                ], { d: this.createPath(e.data) });\n                svg.appendChild(path);\n            };\n        }\n        return wrapper;\n    }\n    renderChildren() { }\n    createPath(aggregate) {\n        const countMax = aggregate.reduce((prev, curr) => { return Math.max(prev, curr.count); }, 0);\n        const path = aggregate.reduce((prev, curr, index) => {\n            const curveType = index === 0 ? 'M' : 'L';\n            const x = (this.domain.width / (aggregate.length - 1)) * index;\n            const y = this.domain.viewportHeight - ((curr.count / countMax) * this.domain.viewportHeight);\n            return `${prev} ${curveType} ${x} ${y}`;\n        }, '');\n        const pathCloser = ` L ${this.domain.width + 1} ${this.domain.viewportHeight + 1} L -1 ${this.domain.viewportHeight + 1}`;\n        return path + pathCloser;\n    }\n}\nexports.default = SparklineBand;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/sparkline.ts?");

/***/ }),

/***/ "./src/views/indicator/index.ts":
/*!**************************************!*\
  !*** ./src/views/indicator/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst constants_1 = __webpack_require__(/*! ../../constants */ \"./src/constants.ts\");\nconst props_1 = __webpack_require__(/*! ../../models/props */ \"./src/models/props.ts\");\nclass Indicator {\n    constructor(hostDomain, targetDomain) {\n        this.hostDomain = hostDomain;\n        this.targetDomain = targetDomain;\n        this.width = this.hostDomain.width / this.targetDomain.width * this.targetDomain.viewportWidth;\n        if (this.width < 2)\n            this.width = 2;\n        document.addEventListener(constants_1.CENTER_CHANGE_EVENT, (e) => {\n            this.indicator.style.transform = `translate3d(${this.indicatorLeft()}px, 0, 0)`;\n        });\n    }\n    render() {\n        const wrapper = create_element_1.default('div', 'indicator-wrap', [\n            'bottom: 0',\n            'left: 0',\n            'pointer-events: none',\n            'position: absolute',\n            'right: 0',\n        ], [\n            `height: ${this.hostDomain.viewportHeight}px`,\n            `top: ${this.hostDomain.topOffsetRatio * 100}%`,\n        ]);\n        this.indicator = create_element_1.default('div', 'indicator', [\n            'position: absolute',\n            'bottom: 0',\n            'cursor: -webkit-grab',\n            'background-color: rgba(255, 0, 0, .05)',\n            'z-index: 3',\n        ], [\n            `height: ${this.hostDomain.viewportHeight}px`,\n            `transform: translate3d(${this.indicatorLeft()}px, 0, 0)`,\n            `width: ${this.width}px`,\n        ]);\n        wrapper.appendChild(this.indicator);\n        return wrapper;\n    }\n    indicatorLeft() {\n        return (this.targetDomain.viewportWidth - this.width) * props_1.default.center;\n    }\n}\nexports.default = Indicator;\n\n\n//# sourceURL=webpack://Timeline/./src/views/indicator/index.ts?");

/***/ })

/******/ });