(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Timeline"] = factory();
	else
		root["Timeline"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.EVENT_MIN_SPACE = 160;\nexports.EVENT_HEIGHT = 12;\nexports.EVENT_ROW_HEIGHT = 20;\nexports.DATE_BAR_HEIGHT = 3 * exports.EVENT_ROW_HEIGHT;\nexports.RULER_LABELS_HEIGHT = 60;\nexports.CENTER_CHANGE_EVENT = 'CENTER_CHANGE_EVENT';\nexports.CENTER_CHANGE_DONE_EVENT = 'CENTER_CHANGE_EVENT_DONE';\nexports.DIMENSIONS_CHANGE_EVENT = 'DIMENSIONS_CHANGE_EVENT';\nclass RawEv3nt {\n}\nexports.RawEv3nt = RawEv3nt;\nclass RawSegment {\n}\nexports.RawSegment = RawSegment;\n\n\n//# sourceURL=webpack://Timeline/./src/constants.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst props_1 = __webpack_require__(/*! ./models/props */ \"./src/models/props.ts\");\nconst config_1 = __webpack_require__(/*! ./models/config */ \"./src/models/config.ts\");\nconst band_1 = __webpack_require__(/*! ./views/band */ \"./src/views/band/index.ts\");\nconst indicator_1 = __webpack_require__(/*! ./views/indicator */ \"./src/views/indicator/index.ts\");\nconst create_element_1 = __webpack_require__(/*! ./utils/create-element */ \"./src/utils/create-element.ts\");\nconst index_1 = __webpack_require__(/*! ./utils/index */ \"./src/utils/index.ts\");\nconst events_worker_1 = __webpack_require__(/*! ./utils/events.worker */ \"./src/utils/events.worker.ts\");\nconst constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\nclass Timeline {\n    constructor(config) {\n        this.bands = [];\n        this.refresh = (config = {}) => {\n            this.config.refresh(config);\n            this.remove();\n            window.addEventListener('resize', this.debouncedRefresh);\n        };\n        this.debouncedRefresh = index_1.debounce(this.refresh, 1000);\n        this.appendToWrapper = (child) => this.wrapper.appendChild(child.render());\n        this.config = new config_1.default(config);\n        props_1.default.init(this.config);\n        events_worker_1.default({\n            events: this.config.events,\n            eventMinSpace: constants_1.EVENT_MIN_SPACE\n        }, ([from, to, intervals, pointsInTime, grid, rowCount]) => {\n            props_1.default.from = from;\n            props_1.default.to = to;\n            props_1.default.time = to - from;\n            props_1.default.grid = grid;\n            props_1.default.rowCount = rowCount;\n            props_1.default.intervals = intervals;\n            props_1.default.pointsInTime = pointsInTime;\n            this.config.rootElement.appendChild(this.render());\n        });\n        window.addEventListener('resize', this.debouncedRefresh);\n    }\n    remove() {\n        window.removeEventListener('resize', this.debouncedRefresh);\n        this.config.rootElement.removeChild(this.wrapper);\n        this.wrapper.remove();\n        this.wrapper.innerHTML = '';\n        this.wrapper = null;\n    }\n    render() {\n        this.wrapper = create_element_1.default('div', 'wrapper', [\n            'background-color: teal',\n            'box-sizing: border-box',\n            'height: 100%',\n            'overflow: hidden',\n            'position: relative',\n            'user-select: none',\n            'width: 100%',\n        ]);\n        this.renderBands();\n        this.renderIndicators();\n        return this.wrapper;\n    }\n    renderBands() {\n        this.bands = this.config.domains.map(d => new band_1.default(d, this.config.aggregate));\n        this.bands.forEach(b => this.appendToWrapper(b));\n    }\n    renderIndicators() {\n        this.bands\n            .filter(band => band.domain.config.hasIndicatorFor != null)\n            .map(band => new indicator_1.default(band.domain, this.bands[band.domain.config.hasIndicatorFor].domain))\n            .forEach(this.appendToWrapper);\n    }\n}\nexports.default = Timeline;\n\n\n//# sourceURL=webpack://Timeline/./src/index.ts?");

/***/ }),

/***/ "./src/models/config.ts":
/*!******************************!*\
  !*** ./src/models/config.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst props_1 = __webpack_require__(/*! ./props */ \"./src/models/props.ts\");\nconst domain_config_1 = __webpack_require__(/*! ./domain.config */ \"./src/models/domain.config.ts\");\nclass AggregateEntry {\n}\nexports.AggregateEntry = AggregateEntry;\nclass Config {\n    constructor(config) {\n        this.aggregate = [];\n        this.center = .5;\n        this.domains = [];\n        this.events = [];\n        this.rootElement = null;\n        this.sortEvents = false;\n        Object.keys(config).forEach(k => {\n            if (k === 'domains')\n                this.domains = config.domains.map(d => new domain_config_1.default(d));\n            else if (this.hasOwnProperty(k))\n                this[k] = config[k];\n        });\n    }\n    refresh(config) {\n        Object.keys(config).forEach(k => {\n            if (this.hasOwnProperty(k))\n                this[k] = config[k];\n        });\n        if (config.hasOwnProperty('center'))\n            props_1.default.center = this.center;\n        props_1.default.dimensions = this.rootElement;\n    }\n}\nexports.default = Config;\n\n\n//# sourceURL=webpack://Timeline/./src/models/config.ts?");

/***/ }),

/***/ "./src/models/domain.config.ts":
/*!*************************************!*\
  !*** ./src/models/domain.config.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar DomainType;\n(function (DomainType) {\n    DomainType[\"Events\"] = \"EVENTS\";\n    DomainType[\"Sparkline\"] = \"SPARKLINE\";\n})(DomainType = exports.DomainType || (exports.DomainType = {}));\nclass DomainConfig {\n    constructor(props) {\n        this.hasEvents = true;\n        this.hasIndicatorFor = null;\n        this.heightRatio = 1;\n        this.hasRulers = true;\n        this.hasSparkline = true;\n        this.topOffsetRatio = 0;\n        this.type = DomainType.Events;\n        this.visibleRatio = 1;\n        Object.keys(props).forEach(k => {\n            if (this.hasOwnProperty(k))\n                this[k] = props[k];\n        });\n    }\n}\nexports.default = DomainConfig;\n\n\n//# sourceURL=webpack://Timeline/./src/models/domain.config.ts?");

/***/ }),

/***/ "./src/models/domain.ts":
/*!******************************!*\
  !*** ./src/models/domain.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst dates_1 = __webpack_require__(/*! ../utils/dates */ \"./src/utils/dates.ts\");\nconst dates_2 = __webpack_require__(/*! ../utils/dates */ \"./src/utils/dates.ts\");\nconst props_1 = __webpack_require__(/*! ./props */ \"./src/models/props.ts\");\nclass Domain {\n    constructor(config) {\n        this.config = config;\n        this.height = props_1.default.viewportHeight * this.config.heightRatio;\n        this.width = props_1.default.viewportWidth / this.config.visibleRatio;\n        this.granularity = dates_1.getGranularity(props_1.default.from, props_1.default.to, this.config.visibleRatio);\n        this.nextDate = dates_2.subsequentDate(this.granularity);\n        this.pixelsPerDay = this.width / dates_1.countDays(props_1.default.from, props_1.default.to);\n        this.updateLeft();\n    }\n    get left() { return this._left; }\n    set left(left) {\n        if (left < -this.width + props_1.default.viewportWidth)\n            left = props_1.default.viewportWidth - this.width;\n        else if (left > 0)\n            left = 0;\n        this._left = left;\n    }\n    dateAtPosition(x) {\n        return this.dateAtProportion(this.proportionAtPosition(x));\n    }\n    dateAtProportion(proportion) {\n        if (proportion < 0 || proportion > 1)\n            throw new RangeError('[dateAtProportion] proportion should be between 0 and 1.');\n        const newTime = props_1.default.from + (props_1.default.time * proportion);\n        return new Date(newTime);\n    }\n    updateLeft() {\n        this.left = props_1.default.center * (props_1.default.viewportWidth - this.width);\n        return this.left;\n    }\n    positionAtDate(date) {\n        return dates_1.countDays(props_1.default.from, date.getTime()) * this.pixelsPerDay;\n    }\n    proportionAtPosition(position) {\n        return position / this.width;\n    }\n    proportionAtDate(date) {\n        return (date.getTime() - props_1.default.from) / props_1.default.time;\n    }\n}\nexports.default = Domain;\n\n\n//# sourceURL=webpack://Timeline/./src/models/domain.ts?");

/***/ }),

/***/ "./src/models/event.ts":
/*!*****************************!*\
  !*** ./src/models/event.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst dates_1 = __webpack_require__(/*! ../utils/dates */ \"./src/utils/dates.ts\");\nclass Event {\n    constructor(rawEvent, domain) {\n        this.date = new Date(rawEvent.date);\n        if (rawEvent.endDate != null)\n            this.endDate = new Date(rawEvent.endDate);\n        this.title = rawEvent.title;\n        this.left = domain.positionAtDate(this.date);\n        this.width = this.countDays() * domain.pixelsPerDay;\n        this.row = rawEvent.row;\n    }\n    countDays() {\n        if (!this.isInterval())\n            return 0;\n        return dates_1.countDays(this.date.getTime(), this.endDate.getTime());\n    }\n    isInterval() {\n        return this.endDate != null;\n    }\n}\nexports.default = Event;\n\n\n//# sourceURL=webpack://Timeline/./src/models/event.ts?");

/***/ }),

/***/ "./src/models/props.ts":
/*!*****************************!*\
  !*** ./src/models/props.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst constants_1 = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\nclass Props {\n    constructor() {\n        this.pointsInTime = [];\n        this.intervals = [];\n        this._center = .5;\n        this.centerChangeDone = utils_1.debounce(() => document.dispatchEvent(new CustomEvent(constants_1.CENTER_CHANGE_DONE_EVENT)), 1000);\n    }\n    init(config) {\n        this.dimensions = config.rootElement;\n    }\n    get center() { return this._center; }\n    set center(n) {\n        if ((this._center === 0 && n < 0) || (this._center === 1 && n > 1))\n            return;\n        else if (n < 0)\n            this._center = 0;\n        else if (n > 1)\n            this._center = 1;\n        else\n            this._center = n;\n        document.dispatchEvent(new CustomEvent(constants_1.CENTER_CHANGE_EVENT, { detail: n }));\n        this.centerChangeDone();\n    }\n    get viewportWidth() { return this._viewportWidth; }\n    get viewportHeight() { return this._viewportHeight; }\n    set dimensions(rootElement) {\n        const style = getComputedStyle(rootElement);\n        const nextWidth = parseInt(style.getPropertyValue('width'), 10);\n        const nextHeight = parseInt(style.getPropertyValue('height'), 10);\n        if ((this._viewportWidth != null && this._viewportWidth !== nextWidth) ||\n            (this._viewportHeight != null && this._viewportHeight !== nextHeight)) {\n            document.dispatchEvent(new CustomEvent(constants_1.DIMENSIONS_CHANGE_EVENT));\n        }\n        this._viewportWidth = nextWidth;\n        this._viewportHeight = nextHeight;\n    }\n}\nexports.Props = Props;\nexports.default = new Props();\n\n\n//# sourceURL=webpack://Timeline/./src/models/props.ts?");

/***/ }),

/***/ "./src/utils/aggregate.worker.ts":
/*!***************************************!*\
  !*** ./src/utils/aggregate.worker.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction aggregateWorker(e) {\n    let prevYear;\n    const run1 = e.data\n        .reduce((prev, curr, index, array) => {\n        const year = new Date(curr.date).getFullYear();\n        if (prev.hasOwnProperty(year)) {\n            prev[year]++;\n        }\n        else {\n            while (prevYear < year) {\n                prevYear += 1;\n                prev[prevYear] = 0;\n            }\n            prev[year] = 1;\n        }\n        prevYear = year;\n        return prev;\n    }, {});\n    const run2 = Object.keys(run1).map((year, index) => ({ year, count: run1[year] }));\n    postMessage(run2);\n}\nconst func = `onmessage = ${aggregateWorker.toString()}`;\nexports.default = (events, done) => {\n    const objectURL = URL.createObjectURL(new Blob([func]));\n    let worker = new Worker(objectURL);\n    worker.postMessage(events);\n    worker.onmessage = (e) => {\n        URL.revokeObjectURL(objectURL);\n        worker.terminate();\n        done(e.data);\n    };\n};\n\n\n//# sourceURL=webpack://Timeline/./src/utils/aggregate.worker.ts?");

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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.countDays = (from, to) => {\n    if (to == null)\n        return 0;\n    return (to - from) / 86400000;\n};\nexports.isEqual = (date1, date2) => date1.getTime() === date2.getTime();\nexports.format = (date, granularity) => {\n    if (date == null)\n        return '∞';\n    let displayDate = date.getFullYear().toString();\n    if (granularity >= 3) {\n        const months = [\n            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',\n            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',\n        ];\n        displayDate = `${months[date.getMonth()]} ${displayDate}`;\n    }\n    if (granularity >= 1) {\n        displayDate = `${date.getDate()} ${displayDate}`;\n    }\n    if (granularity === 0) {\n        displayDate = `${date.getHours()}:${date.getMinutes()} ${displayDate}`;\n    }\n    return displayDate;\n};\nexports.getGranularity = (from, to, visibleRatio) => {\n    const days = exports.countDays(from, to) * visibleRatio;\n    if (days < 1)\n        return 0;\n    if (days < 15)\n        return 1;\n    if (days < 45)\n        return 2;\n    if (days < 1.5 * 365)\n        return 3;\n    if (days < 15 * 365)\n        return 4;\n    if (days < 150 * 365)\n        return 5;\n    if (days < 300 * 365)\n        return 6;\n    return 7;\n};\nexports.getStep = (granularity) => {\n    if (granularity === 4)\n        return 1;\n    if (granularity === 5)\n        return 10;\n    if (granularity === 6)\n        return 50;\n    if (granularity === 7)\n        return 100;\n    if (granularity === 8)\n        return 1000;\n    throw new RangeError(\"[getStep] Only steps with a granularity greater than 'year' calculated\");\n};\nfunction subsequentDate(granularity) {\n    if (granularity >= 4) {\n        const step = exports.getStep(granularity);\n        return (date) => {\n            const year = date.getFullYear() + step;\n            date = Date.UTC(date.getFullYear() + step, 0, 1);\n            if (year > -1 && year < 100) {\n                date = new Date(date);\n                date.setUTCFullYear(year);\n                date = date.getTime();\n            }\n            return new Date(date);\n        };\n    }\n    if (granularity === 3)\n        return (date) => new Date(date.getFullYear(), date.getMonth() + 1, 1);\n    if (granularity === 2)\n        return (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);\n    if (granularity === 1)\n        return (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);\n    if (granularity === 0)\n        return (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1);\n}\nexports.subsequentDate = subsequentDate;\n\n\n//# sourceURL=webpack://Timeline/./src/utils/dates.ts?");

/***/ }),

/***/ "./src/utils/events.worker.ts":
/*!************************************!*\
  !*** ./src/utils/events.worker.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction eventsWorker(e) {\n    let rowCount = 0;\n    const grid = [];\n    const addRow = (event) => {\n        let row;\n        let rowIterator = 0;\n        while (row == null && rowIterator < grid.length) {\n            const rows = grid[rowIterator];\n            let cellIterator = 0;\n            let hasSpace = true;\n            while (hasSpace && cellIterator < rows.length) {\n                hasSpace = (event.endDate < rows[cellIterator][0] || event.date > rows[cellIterator][1]);\n                cellIterator++;\n            }\n            if (hasSpace) {\n                rows.push([event.date, event.endDate]);\n                row = rowIterator;\n            }\n            rowIterator++;\n        }\n        if (row == null)\n            row = grid.push([[event.date, event.endDate]]) - 1;\n        if (row > rowCount)\n            rowCount = row;\n        event.row = row;\n        return event;\n    };\n    function partition(arr, filterFunc) {\n        const matched = [];\n        const unmatched = [];\n        for (let i = 0; i < arr.length; i++) {\n            const bool = filterFunc.call(arr, arr[i], i);\n            if (bool)\n                matched.push(arr[i]);\n            else\n                unmatched.push(arr[i]);\n        }\n        return [matched, unmatched];\n    }\n    const [intervals, pointsInTime] = partition(e.data.events, (e) => e.endDate != null);\n    const events = intervals\n        .sort((a, b) => {\n        if (a.date < b.date)\n            return -1;\n        if (a.date > b.date)\n            return 1;\n        if (a.endDate < b.endDate)\n            return -1;\n        if (a.endDate > b.endDate)\n            return 1;\n        return 0;\n    })\n        .map(addRow);\n    const from = events[0].date;\n    const lastEvent = events[events.length - 1];\n    const to = lastEvent.hasOwnProperty('endDate') ? lastEvent.endDate : lastEvent.date;\n    postMessage([from, to, events, pointsInTime, grid, rowCount]);\n}\nconst func = `onmessage = ${eventsWorker.toString()}`;\nexports.default = (events, done) => {\n    const objectURL = URL.createObjectURL(new Blob([func]));\n    let worker = new Worker(objectURL);\n    worker.postMessage(events);\n    worker.onmessage = (e) => {\n        URL.revokeObjectURL(objectURL);\n        worker.terminate();\n        done(e.data);\n    };\n};\n\n\n//# sourceURL=webpack://Timeline/./src/utils/events.worker.ts?");

/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.debounce = (func, wait) => {\n    let timeout;\n    return () => {\n        clearTimeout(timeout);\n        timeout = setTimeout(func, wait);\n    };\n};\n\n\n//# sourceURL=webpack://Timeline/./src/utils/index.ts?");

/***/ }),

/***/ "./src/utils/segments.worker.ts":
/*!**************************************!*\
  !*** ./src/utils/segments.worker.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction segmentsWorker(e) {\n    const center = e.data.center;\n    const visibleRatio = e.data.visibleRatio;\n    const from = e.data.from;\n    const time = e.data.time;\n    const to = from + time;\n    const timePerRatio = time * visibleRatio;\n    let events = e.data.events;\n    let lower = from + (center * time) - timePerRatio;\n    let upper = from + (center * time) + timePerRatio;\n    const segments = [{ from: lower, to: upper }];\n    let prevLower = lower;\n    let prevUpper = upper;\n    while (lower > from || upper < to) {\n        lower -= timePerRatio;\n        upper += timePerRatio;\n        if (lower > from)\n            segments.push({ from: lower, to: prevLower });\n        else if (lower <= from && prevLower > from)\n            segments.push({ from, to: prevLower });\n        if (upper < to)\n            segments.push({ from: prevUpper, to: upper });\n        else if (upper >= to && prevUpper < to)\n            segments.push({ from: prevUpper, to });\n        prevLower = lower;\n        prevUpper = upper;\n    }\n    for (let j = 0; j < segments.length; j++) {\n        const segment = segments[j];\n        function filterFunc(e) {\n            if (e.date >= segment.from && e.date <= segment.to)\n                return true;\n            if (e.endDate != null) {\n                if ((e.endDate >= segment.from && e.endDate <= segment.to) ||\n                    (e.date < segment.from && e.endDate > segment.to))\n                    return true;\n                else\n                    return false;\n            }\n            return false;\n        }\n        segment.events = events.filter(filterFunc),\n            events = events.filter(e => !filterFunc(e));\n    }\n    segments.sort((a, b) => {\n        if (a.from < b.from)\n            return -1;\n        if (a.from > b.from)\n            return 1;\n        return 0;\n    });\n    postMessage(segments);\n}\nconst func = `onmessage = ${segmentsWorker.toString()}`;\nexports.default = (events, done) => {\n    const objectURL = URL.createObjectURL(new Blob([func]));\n    let worker = new Worker(objectURL);\n    worker.postMessage(events);\n    worker.onmessage = (e) => {\n        URL.revokeObjectURL(objectURL);\n        worker.terminate();\n        done(e.data);\n    };\n};\n\n\n//# sourceURL=webpack://Timeline/./src/utils/segments.worker.ts?");

/***/ }),

/***/ "./src/views/band/events/event/interval/index.ts":
/*!*******************************************************!*\
  !*** ./src/views/band/events/event/interval/index.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst constants_1 = __webpack_require__(/*! ../../../../../constants */ \"./src/constants.ts\");\nclass PointInTime {\n    constructor(event, segmentOffset) {\n        this.event = event;\n        this.segmentOffset = segmentOffset;\n    }\n    render() {\n        const backgroundColor = this.event.row % 2 === 0 ? 'rgb(235, 235, 255)' : 'rgb(215, 215, 255)';\n        const li = create_element_1.default('li', 'interval-wrap', [\n            'box-sizing: border-box',\n            'font-size: 0.8em',\n            `height: ${constants_1.EVENT_ROW_HEIGHT - 6}px`,\n            'margin-bottom: 4px',\n            'position: absolute',\n            'white-space: nowrap',\n        ], [\n            `background-color: ${backgroundColor}`,\n            `left: ${this.event.left - this.segmentOffset}px`,\n            `bottom: ${(this.event.row) * constants_1.EVENT_ROW_HEIGHT}px`,\n            `width: ${this.event.width}px`,\n        ]);\n        li.setAttribute('title', `${this.event.title}\\n${this.event.date.toDateString()}\\n${this.event.endDate.toDateString()}`);\n        const title = create_element_1.default('div', 'interval-title', [\n            'display: inline-block',\n            `line-height: ${constants_1.EVENT_ROW_HEIGHT - 6}px`,\n            'overflow: hidden',\n            'padding: 0 .25em',\n            'text-overflow: ellipsis',\n        ]);\n        title.textContent = this.event.title;\n        li.appendChild(title);\n        return li;\n    }\n}\nexports.default = PointInTime;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events/event/interval/index.ts?");

/***/ }),

/***/ "./src/views/band/events/event/point-in-time/index.ts":
/*!************************************************************!*\
  !*** ./src/views/band/events/event/point-in-time/index.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst constants_1 = __webpack_require__(/*! ../../../../../constants */ \"./src/constants.ts\");\nconst create_element_1 = __webpack_require__(/*! ../../../../../utils/create-element */ \"./src/utils/create-element.ts\");\nclass PointInTime {\n    constructor(event, segmentOffset) {\n        this.event = event;\n        this.segmentOffset = segmentOffset;\n    }\n    render() {\n        const li = create_element_1.default('li', 'pit-wrap', [\n            'box-sizing: border-box',\n            'font-size: 0.8em',\n            `margin-left: -${constants_1.EVENT_HEIGHT / 2}px`,\n            'position: absolute',\n            'white-space: nowrap',\n            `max-width: ${constants_1.EVENT_MIN_SPACE}px`,\n        ], [\n            `left: ${this.event.left - this.segmentOffset}px`,\n            `bottom: ${(this.event.row) * constants_1.EVENT_ROW_HEIGHT}px`,\n        ]);\n        li.setAttribute('title', `${this.event.title}\\n${this.event.date.toDateString()}`);\n        const title = create_element_1.default('div', 'pit-title', [\n            'background-color: rgba(255,255,255,.75)',\n            'display: inline-block',\n            `line-height: ${constants_1.EVENT_HEIGHT}px`,\n            `max-width: calc(${constants_1.EVENT_MIN_SPACE}px - ${constants_1.EVENT_HEIGHT}px)`,\n            'overflow: hidden',\n            'padding: .25em',\n            'text-overflow: ellipsis',\n        ]);\n        title.textContent = this.event.title;\n        const point = create_element_1.default('div', 'pit-point', [\n            'background-image: radial-gradient(white 20%, black 100%)',\n            `border-radius: ${constants_1.EVENT_HEIGHT / 2}px`,\n            'display: inline-block',\n            'margin: .25em 0',\n            `width: ${constants_1.EVENT_HEIGHT}px`,\n            `height: ${constants_1.EVENT_HEIGHT}px`,\n        ]);\n        li.appendChild(point);\n        li.appendChild(title);\n        return li;\n    }\n}\nexports.default = PointInTime;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events/event/point-in-time/index.ts?");

/***/ }),

/***/ "./src/views/band/events/index.ts":
/*!****************************************!*\
  !*** ./src/views/band/events/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst props_1 = __webpack_require__(/*! ../../../models/props */ \"./src/models/props.ts\");\nconst segment_1 = __webpack_require__(/*! ./segment */ \"./src/views/band/events/segment.ts\");\nconst segments_worker_1 = __webpack_require__(/*! ../../../utils/segments.worker */ \"./src/utils/segments.worker.ts\");\nconst rulers_1 = __webpack_require__(/*! ../rulers */ \"./src/views/band/rulers/index.ts\");\nconst ruler_1 = __webpack_require__(/*! ../rulers/ruler */ \"./src/views/band/rulers/ruler.ts\");\nconst constants_1 = __webpack_require__(/*! ../../../constants */ \"./src/constants.ts\");\nclass Events {\n    constructor(domain) {\n        this.domain = domain;\n        this.renderRulers = () => {\n            const rulers = create_element_1.default('div', 'rulers', [\n                'width: 100%',\n            ], [\n                `height: ${this.domain.height}px`,\n            ]);\n            let date = rulers_1.findClosestRulerDate(new Date(props_1.default.from), this.domain.granularity);\n            const to = props_1.default.to;\n            while (date.getTime() < to) {\n                rulers.appendChild(new ruler_1.default(date, this.domain).render());\n                date = this.domain.nextDate(date);\n            }\n            return rulers;\n        };\n    }\n    render() {\n        const eventsBand = create_element_1.default('div', 'events-band');\n        const segmentsWrap = create_element_1.default('div', 'segments', [\n            `bottom: ${constants_1.DATE_BAR_HEIGHT}px`,\n            `height: ${(props_1.default.rowCount * constants_1.EVENT_ROW_HEIGHT) + constants_1.DATE_BAR_HEIGHT}px`,\n            'position: absolute',\n            'width: 100%',\n        ], [\n            `height: ${this.domain.height}px`,\n        ]);\n        segments_worker_1.default({\n            events: props_1.default.intervals.concat(props_1.default.pointsInTime),\n            center: props_1.default.center,\n            visibleRatio: this.domain.config.visibleRatio,\n            from: new Date(props_1.default.from).getTime(),\n            time: props_1.default.time\n        }, (segments) => {\n            this.segments = segments.map(s => {\n                const segment = new segment_1.default(this.domain, s);\n                segmentsWrap.appendChild(segment.render());\n                return segment;\n            });\n            this.renderChildren();\n            eventsBand.appendChild(segmentsWrap);\n        });\n        return eventsBand;\n    }\n    renderChildren() {\n        let index = Math.floor((this.segments.length - 1) * props_1.default.center);\n        this.segments[index].renderChildren();\n        for (let i = index - 2; i <= index + 2; i++) {\n            const segment = this.segments[i];\n            if (i >= 0 && i < this.segments.length) {\n                if (i !== index)\n                    segment.renderChildren();\n            }\n        }\n    }\n}\nexports.default = Events;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events/index.ts?");

/***/ }),

/***/ "./src/views/band/events/segment.ts":
/*!******************************************!*\
  !*** ./src/views/band/events/segment.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst event_1 = __webpack_require__(/*! ../../../models/event */ \"./src/models/event.ts\");\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst point_in_time_1 = __webpack_require__(/*! ./event/point-in-time */ \"./src/views/band/events/event/point-in-time/index.ts\");\nconst interval_1 = __webpack_require__(/*! ./event/interval */ \"./src/views/band/events/event/interval/index.ts\");\nconst props_1 = __webpack_require__(/*! ../../../models/props */ \"./src/models/props.ts\");\nclass Segment {\n    constructor(domain, segmentData) {\n        this.domain = domain;\n        this._rendered = false;\n        this.rawEvents = segmentData.events;\n        this.from = segmentData.from;\n        this.left = ((props_1.default.from - this.from) / props_1.default.time) * this.domain.width;\n    }\n    get rendered() { return this._rendered; }\n    set rendered(rendered) { this._rendered = rendered; }\n    render() {\n        this.rootElement = create_element_1.default('div', 'segment', [\n            'bottom: 0',\n            'list-style: none',\n            'margin: 0',\n            'padding: 0',\n            'position: absolute',\n            'top: 0',\n            `width: ${props_1.default.viewportWidth}px`,\n        ], [\n            `left: ${this.left}px`,\n        ]);\n        return this.rootElement;\n    }\n    renderChildren() {\n        if (this._rendered)\n            return;\n        const ul = create_element_1.default('ul', 'events', [\n            'list-style: none',\n            'margin: 0',\n            'padding: 0',\n        ]);\n        for (let i = 0; i < this.rawEvents.length; i++) {\n            const event = new event_1.default(this.rawEvents[i], this.domain);\n            const EventClass = event.isInterval() ? interval_1.default : point_in_time_1.default;\n            const view = new EventClass(event, this.left);\n            ul.appendChild(view.render());\n        }\n        this.rootElement.appendChild(ul);\n        this._rendered = true;\n    }\n}\nexports.default = Segment;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events/segment.ts?");

/***/ }),

/***/ "./src/views/band/index.ts":
/*!*********************************!*\
  !*** ./src/views/band/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst domain_1 = __webpack_require__(/*! ../../models/domain */ \"./src/models/domain.ts\");\nconst props_1 = __webpack_require__(/*! ../../models/props */ \"./src/models/props.ts\");\nconst create_element_1 = __webpack_require__(/*! ../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst constants_1 = __webpack_require__(/*! ../../constants */ \"./src/constants.ts\");\nconst sparkline_1 = __webpack_require__(/*! ./sparkline */ \"./src/views/band/sparkline/index.ts\");\nconst rulers_1 = __webpack_require__(/*! ./rulers */ \"./src/views/band/rulers/index.ts\");\nconst events_1 = __webpack_require__(/*! ./events */ \"./src/views/band/events/index.ts\");\nclass Band {\n    constructor(domainConfig, aggregate) {\n        this.aggregate = aggregate;\n        this.updateLeft = () => {\n            this.rootElement.style.transform = `translate3d(${this.domain.updateLeft()}px, 0, 0)`;\n            if (this.eventsBand != null)\n                this.eventsBand.renderChildren();\n        };\n        this.onMouseDown = (ev) => {\n            document.addEventListener('mouseup', this.onMouseUp);\n            this.dragOffset = ev.clientX;\n            this.dragStart = this.domain.left;\n        };\n        this.onMouseMove = (ev) => {\n            if (this.dragOffset) {\n                const left = this.dragStart - (this.dragOffset - ev.clientX);\n                props_1.default.center = left / (props_1.default.viewportWidth - this.domain.width);\n            }\n        };\n        this.onMouseUp = (ev) => {\n            document.removeEventListener('mouseup', this.onMouseUp);\n            this.dragOffset = null;\n        };\n        this.onDblClick = (ev) => {\n            const rootLeft = this.rootElement.getBoundingClientRect().left;\n            const proportion = this.domain.proportionAtPosition(ev.clientX - rootLeft);\n            props_1.default.center = proportion;\n        };\n        this.domain = new domain_1.default(domainConfig);\n        document.addEventListener(constants_1.CENTER_CHANGE_EVENT, this.updateLeft);\n    }\n    remove() {\n        document.removeEventListener(constants_1.CENTER_CHANGE_EVENT, this.updateLeft);\n        this.rootElement.removeEventListener('mousedown', this.onMouseDown);\n        this.rootElement.removeEventListener('mousemove', this.onMouseMove);\n        this.rootElement.removeEventListener('dblclick', this.onDblClick);\n    }\n    render() {\n        this.rootElement = create_element_1.default('div', 'band-wrap', [\n            'background-color: white',\n            'position: absolute',\n        ], [\n            `height: ${this.domain.config.heightRatio * 100}%`,\n            `top: ${this.domain.config.topOffsetRatio * 100}%`,\n            `transform: translate3d(${this.domain.left}px, 0, 0)`,\n            `width: ${this.domain.width}px`,\n        ]);\n        if (this.domain.config.hasSparkline) {\n            const sparkline = new sparkline_1.default(this.domain, this.aggregate);\n            this.rootElement.appendChild(sparkline.render());\n        }\n        if (this.domain.config.hasRulers && !this.domain.config.hasEvents) {\n            this.rootElement.appendChild(new rulers_1.default(this.domain).render());\n        }\n        if (this.domain.config.hasEvents) {\n            this.eventsBand = new events_1.default(this.domain);\n            this.rootElement.appendChild(this.eventsBand.render());\n        }\n        if (this.domain.config.visibleRatio < 1) {\n            this.rootElement.addEventListener('mousedown', this.onMouseDown);\n            this.rootElement.addEventListener('mousemove', this.onMouseMove);\n        }\n        this.rootElement.addEventListener('dblclick', this.onDblClick);\n        return this.rootElement;\n    }\n}\nexports.default = Band;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/index.ts?");

/***/ }),

/***/ "./src/views/band/rulers/index.ts":
/*!****************************************!*\
  !*** ./src/views/band/rulers/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst ruler_1 = __webpack_require__(/*! ./ruler */ \"./src/views/band/rulers/ruler.ts\");\nconst dates_1 = __webpack_require__(/*! ../../../utils/dates */ \"./src/utils/dates.ts\");\nconst props_1 = __webpack_require__(/*! ../../../models/props */ \"./src/models/props.ts\");\nfunction findClosestRulerDate(date, granularity) {\n    let year = date.getFullYear();\n    if (granularity >= 4) {\n        const step = dates_1.getStep(granularity);\n        if (granularity === 4)\n            year += 1;\n        else\n            while (year % step !== 0) {\n                year += 1;\n            }\n        return new Date(year, 0, 1);\n    }\n    else if (granularity === 3) {\n        return new Date(year, date.getMonth() + 1, 1);\n    }\n    else if (granularity === 1) {\n        return new Date(year, date.getMonth(), date.getDate() + 1);\n    }\n    return date;\n}\nexports.findClosestRulerDate = findClosestRulerDate;\nclass Rulers {\n    constructor(domain) {\n        this.domain = domain;\n    }\n    render() {\n        this.ul = create_element_1.default('ul', 'ruler-wrap', [\n            'bottom: 0',\n            'left: 0',\n            'list-style: none',\n            'margin: 0',\n            'padding: 0',\n            'position: absolute',\n            'right: 0',\n            'top: 0',\n            'whiteSpace: nowrap',\n        ]);\n        let date = findClosestRulerDate(new Date(props_1.default.from), this.domain.granularity);\n        while (date.getTime() < props_1.default.to) {\n            this.ul.appendChild(new ruler_1.default(date, this.domain).render());\n            date = this.domain.nextDate(date);\n        }\n        return this.ul;\n    }\n}\nexports.default = Rulers;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/rulers/index.ts?");

/***/ }),

/***/ "./src/views/band/rulers/ruler.ts":
/*!****************************************!*\
  !*** ./src/views/band/rulers/ruler.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst constants_1 = __webpack_require__(/*! ../../../constants */ \"./src/constants.ts\");\nconst days = [\"Sun\", \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\"];\nconst months = [\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"Jul\", \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\"];\nconst getWeekNumber = (date) => {\n    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));\n    const dayNum = d.getUTCDay() || 7;\n    d.setUTCDate(d.getUTCDate() + 4 - dayNum);\n    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));\n    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);\n};\nconst labelBody = (d, granularity) => {\n    if (granularity >= 4) {\n        return d.getFullYear().toString();\n    }\n    else if (granularity === 3) {\n        let body = months[d.getMonth()];\n        if (d.getMonth() === 0)\n            body = `${d.getFullYear().toString()}, ${body}`;\n        return body;\n    }\n    else if (granularity === 2) {\n        return `${months[d.getMonth()]}<br />week ${getWeekNumber(d)}`;\n    }\n    else if (granularity === 1) {\n        let body = days[d.getDay()];\n        body = `${body}<br />${months[d.getMonth()]} ${d.getDate()}`;\n        if (d.getMonth() === 0 && d.getDate() === 1)\n            body = `${body}, ${d.getFullYear().toString()}`;\n        return body;\n    }\n    else if (granularity === 0) {\n        return 'NOT IMPLEMENTED';\n    }\n};\nclass Ruler {\n    constructor(date, domain, offset = 0) {\n        this.date = date;\n        this.domain = domain;\n        this.offset = offset;\n    }\n    render() {\n        const li = create_element_1.default('div', 'ruler', [\n            'border-left: 1px solid #EEE',\n            'box-sizing: border-box',\n            'height: 100%',\n            'padding-left: 6px',\n            'position: absolute',\n            'transition: all 1s cubic-bezier(.25,.8,.25,1)',\n        ], [\n            `left: ${this.domain.positionAtDate(this.date) - this.offset}px`,\n        ]);\n        const label = create_element_1.default('div', 'ruler-label', [\n            'alignItems: flex-end',\n            'bottom: 10px',\n            'color: #888',\n            'display: flex',\n            'font-size: .75em',\n            `height: calc(${constants_1.DATE_BAR_HEIGHT} - 10px)`,\n            'position: absolute',\n            'width: 75px',\n            'zIndex: 2',\n        ]);\n        label.innerHTML = labelBody(this.date, this.domain.granularity);\n        label.title = this.date;\n        li.appendChild(label);\n        return li;\n    }\n}\nexports.default = Ruler;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/rulers/ruler.ts?");

/***/ }),

/***/ "./src/views/band/sparkline/index.ts":
/*!*******************************************!*\
  !*** ./src/views/band/sparkline/index.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst aggregate_worker_1 = __webpack_require__(/*! ../../../utils/aggregate.worker */ \"./src/utils/aggregate.worker.ts\");\nconst props_1 = __webpack_require__(/*! ../../../models/props */ \"./src/models/props.ts\");\nclass Sparkline {\n    constructor(domain, aggregate) {\n        this.domain = domain;\n        this.aggregate = aggregate;\n        this.events = props_1.default.intervals.concat(props_1.default.pointsInTime);\n    }\n    render() {\n        this.svg = create_element_1.createSvg('svg', null, {\n            height: `${this.domain.height}px`,\n            preserveAspectRatio: \"none\",\n            viewBox: `0 0 ${this.domain.width} ${this.domain.height}`,\n            width: `${this.domain.width}px`,\n        });\n        if (this.aggregate.length) {\n            this.renderPath();\n        }\n        else if (this.events.length) {\n            aggregate_worker_1.default(this.events, (aggregate) => {\n                this.aggregate = aggregate;\n                this.renderPath();\n            });\n        }\n        return this.svg;\n    }\n    renderChildren() { }\n    createPath() {\n        const countMax = this.aggregate.reduce((prev, curr) => { return Math.max(prev, curr.count); }, 0);\n        const path = this.aggregate.reduce((prev, curr, index) => {\n            const curveType = index === 0 ? 'M' : 'L';\n            const x = (this.domain.width / (this.aggregate.length - 1)) * index;\n            const y = this.domain.height - ((curr.count / countMax) * this.domain.height);\n            return `${prev} ${curveType} ${x} ${y}`;\n        }, '');\n        const pathCloser = ` L ${this.domain.width + 1} ${this.domain.height + 1} L -1 ${this.domain.height + 1}`;\n        return path + pathCloser;\n    }\n    renderPath() {\n        const pathElement = create_element_1.createSvg('path', [\n            'fill: rgba(245, 245, 255, .7)',\n            'stroke: rgb(180, 180, 255)',\n        ], { d: this.createPath() });\n        this.svg.appendChild(pathElement);\n    }\n}\nexports.default = Sparkline;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/sparkline/index.ts?");

/***/ }),

/***/ "./src/views/indicator/index.ts":
/*!**************************************!*\
  !*** ./src/views/indicator/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst constants_1 = __webpack_require__(/*! ../../constants */ \"./src/constants.ts\");\nconst props_1 = __webpack_require__(/*! ../../models/props */ \"./src/models/props.ts\");\nclass Indicator {\n    constructor(hostDomain, targetDomain) {\n        this.hostDomain = hostDomain;\n        this.targetDomain = targetDomain;\n        this.handleCenterChange = (e) => {\n            this.indicator.style.transform = `translate3d(${this.indicatorLeft()}px, 0, 0)`;\n        };\n        this.width = this.hostDomain.width / this.targetDomain.width * props_1.default.viewportWidth;\n        if (this.width < 2)\n            this.width = 2;\n        document.addEventListener(constants_1.CENTER_CHANGE_EVENT, this.handleCenterChange);\n    }\n    remove() {\n        document.removeEventListener(constants_1.CENTER_CHANGE_EVENT, this.handleCenterChange);\n    }\n    render() {\n        const wrapper = create_element_1.default('div', 'indicator-wrap', [\n            'bottom: 0',\n            'left: 0',\n            'pointer-events: none',\n            'position: absolute',\n            'right: 0',\n        ], [\n            `height: ${this.hostDomain.height}px`,\n            `top: ${this.hostDomain.config.topOffsetRatio * 100}%`,\n        ]);\n        this.indicator = create_element_1.default('div', 'indicator', [\n            'position: absolute',\n            'bottom: 0',\n            'cursor: -webkit-grab',\n            'background-color: rgba(255, 0, 0, .05)',\n            'z-index: 3',\n        ], [\n            `height: ${this.hostDomain.height}px`,\n            `transform: translate3d(${this.indicatorLeft()}px, 0, 0)`,\n            `width: ${this.width}px`,\n        ]);\n        wrapper.appendChild(this.indicator);\n        return wrapper;\n    }\n    indicatorLeft() {\n        return (props_1.default.viewportWidth - this.width) * props_1.default.center;\n    }\n}\nexports.default = Indicator;\n\n\n//# sourceURL=webpack://Timeline/./src/views/indicator/index.ts?");

/***/ })

/******/ });
});