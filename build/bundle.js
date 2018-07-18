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

/***/ "./src/animator.ts":
/*!*************************!*\
  !*** ./src/animator.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst props_1 = __webpack_require__(/*! ./models/props */ \"./src/models/props.ts\");\nconst constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\nvar Direction;\n(function (Direction) {\n    Direction[Direction[\"Backward\"] = -1] = \"Backward\";\n    Direction[Direction[\"Stop\"] = 0] = \"Stop\";\n    Direction[Direction[\"Forward\"] = 1] = \"Forward\";\n})(Direction || (Direction = {}));\nclass Animator {\n    constructor() {\n        this.elapsedTimeThreshold = 2000;\n        this.interval = .00001;\n        this.multipliers = [.25, .5, 1, 2, 4, 8, 16];\n        this.multiplier = 1;\n        this.direction = Direction.Stop;\n        this.prevTimestamp = 0;\n        this.elapsedTimeTotal = 0;\n        this.animate = (timestamp) => {\n            const elapsedTime = timestamp - this.prevTimestamp;\n            if (elapsedTime > 0) {\n                props_1.default.center = props_1.default.center + (this.interval * this.multiplier * this.direction);\n                document.dispatchEvent(new CustomEvent(constants_1.CENTER_CHANGE));\n            }\n            this.elapsedTimeTotal += elapsedTime;\n            if (this.elapsedTimeTotal > this.elapsedTimeThreshold)\n                this.resetElapsedTimeTotal();\n            if (this.isPlaying() && props_1.default.center > 0 && props_1.default.center < 1) {\n                this.prevTimestamp = timestamp;\n                requestAnimationFrame(this.animate);\n            }\n        };\n    }\n    resetElapsedTimeTotal() {\n        this.elapsedTimeTotal = 0;\n        document.dispatchEvent(new CustomEvent(constants_1.CENTER_CHANGE_DONE));\n    }\n    accelerate() {\n        const index = this.multipliers.indexOf(this.multiplier);\n        if (index === this.multipliers.length - 1)\n            return this.multipliers[this.multipliers.length - 1];\n        this.multiplier = this.multipliers[index + 1];\n        return this.multiplier;\n    }\n    decelerate() {\n        const index = this.multipliers.indexOf(this.multiplier);\n        if (index === 0)\n            return this.multipliers[0];\n        this.multiplier = this.multipliers[index - 1];\n        return this.multiplier;\n    }\n    speed(multiplier) {\n        const multiplier2 = parseFloat(multiplier);\n        if (this.multipliers.indexOf(multiplier2) === -1)\n            return;\n        this.multiplier = multiplier2;\n    }\n    isPlaying() {\n        return this.direction !== Direction.Stop;\n    }\n    isPlayingForward() {\n        return this.direction === Direction.Forward;\n    }\n    isPlayingBackward() {\n        return this.direction === Direction.Backward;\n    }\n    play() {\n        requestAnimationFrame(this.animate);\n    }\n    playForward() {\n        this.direction = Direction.Forward;\n        this.play();\n    }\n    playBackward() {\n        this.direction = Direction.Backward;\n        this.play();\n    }\n    stop() {\n        this.direction = Direction.Stop;\n    }\n    toggle() {\n        this.isPlaying() ? this.stop() : this.play();\n    }\n}\nexports.default = Animator;\n\n\n//# sourceURL=webpack://Timeline/./src/animator.ts?");

/***/ }),

/***/ "./src/api.ts":
/*!********************!*\
  !*** ./src/api.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst animator_1 = __webpack_require__(/*! ./animator */ \"./src/animator.ts\");\nconst constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\nconst props_1 = __webpack_require__(/*! ./models/props */ \"./src/models/props.ts\");\nclass Api {\n    constructor() {\n        this.bands = [];\n        this.animator = new animator_1.default();\n        this.handleChange = (onChange) => (ev) => {\n            const [from, to] = this.bands[0].domain.fromTo;\n            onChange({\n                center: props_1.default.center,\n                visibleFrom: from,\n                visibleTo: to,\n            }, ev);\n        };\n    }\n    init(onInit) {\n        const [from, to] = this.bands[0].domain.fromTo;\n        onInit({\n            center: props_1.default.center,\n            visibleFrom: from,\n            visibleTo: to,\n        });\n    }\n    change(onChange) {\n        document.addEventListener(constants_1.CENTER_CHANGE_DONE, this.handleChange(onChange));\n    }\n}\nexports.default = Api;\n\n\n//# sourceURL=webpack://Timeline/./src/api.ts?");

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.EVENT_MIN_SPACE = 160;\nexports.EVENT_HEIGHT = 14;\nexports.EVENT_ROW_HEIGHT = 20;\nexports.DATE_BAR_HEIGHT = exports.EVENT_ROW_HEIGHT;\nexports.RULER_LABELS_HEIGHT = 60;\nexports.CENTER_CHANGE = 'CENTER_CHANGE';\nexports.CENTER_CHANGE_DONE = 'CENTER_CHANGE_DONE';\nclass RawSegment {\n}\nexports.RawSegment = RawSegment;\n\n\n//# sourceURL=webpack://Timeline/./src/constants.ts?");

/***/ }),

/***/ "./src/event-bus.ts":
/*!**************************!*\
  !*** ./src/event-bus.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass EventBus {\n    constructor() {\n        this.eventsListeners = [];\n    }\n    register(type, listener, target = document) {\n        target.addEventListener(type, listener);\n        this.eventsListeners.push([type, listener, target]);\n    }\n    flush() {\n        this.eventsListeners.forEach((eventListener) => {\n            const [type, listener, target] = eventListener;\n            target.removeEventListener(type, listener);\n        });\n        this.eventsListeners = [];\n    }\n}\nexports.EventBus = EventBus;\nexports.default = new EventBus();\n\n\n//# sourceURL=webpack://Timeline/./src/event-bus.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst props_1 = __webpack_require__(/*! ./models/props */ \"./src/models/props.ts\");\nconst config_1 = __webpack_require__(/*! ./models/config */ \"./src/models/config.ts\");\nexports.TimelineConfig = config_1.default;\nconst band_1 = __webpack_require__(/*! ./views/band */ \"./src/views/band/index.ts\");\nconst indicator_1 = __webpack_require__(/*! ./views/indicator */ \"./src/views/indicator/index.ts\");\nconst create_element_1 = __webpack_require__(/*! ./utils/create-element */ \"./src/utils/create-element.ts\");\nconst index_1 = __webpack_require__(/*! ./utils/index */ \"./src/utils/index.ts\");\nconst events_worker_1 = __webpack_require__(/*! ./utils/events.worker */ \"./src/utils/events.worker.ts\");\nexports.orderEvents = events_worker_1.orderEvents;\nconst api_1 = __webpack_require__(/*! ./api */ \"./src/api.ts\");\nconst event_bus_1 = __webpack_require__(/*! ./event-bus */ \"./src/event-bus.ts\");\nclass Timeline extends api_1.default {\n    constructor(config) {\n        super();\n        this.reload = (config) => {\n            config = config != null ? config : props_1.default.config;\n            props_1.default.init(config);\n            this.removeChildren();\n            this.renderBands();\n        };\n        this.debouncedReload = index_1.debounce(this.reload, 600);\n        this.appendToWrapper = (child) => this.wrapper.appendChild(child.render());\n        props_1.default.init(config);\n        config.rootElement.appendChild(this.render());\n        window.addEventListener('resize', () => {\n            this.removeChildren();\n            this.debouncedReload();\n        });\n    }\n    removeChildren() {\n        event_bus_1.default.flush();\n        Array\n            .from(this.wrapper.children)\n            .forEach(child => this.wrapper.removeChild(child));\n    }\n    render() {\n        this.wrapper = create_element_1.default('div', 'wrapper', [\n            'background-color: teal',\n            'box-sizing: border-box',\n            'height: 100%',\n            'overflow: hidden',\n            'position: relative',\n            'user-select: none',\n            'width: 100%',\n        ]);\n        this.renderBands();\n        return this.wrapper;\n    }\n    renderBands() {\n        this.bands = props_1.default.domains.map(d => new band_1.default(d));\n        this.bands.forEach(this.appendToWrapper);\n        this.renderIndicators();\n    }\n    renderIndicators() {\n        this.bands\n            .filter(band => band.domain.config.hasIndicatorFor != null)\n            .map(band => new indicator_1.default(band.domain, this.bands[band.domain.config.hasIndicatorFor].domain))\n            .forEach(this.appendToWrapper);\n    }\n}\nexports.default = Timeline;\n\n\n//# sourceURL=webpack://Timeline/./src/index.ts?");

/***/ }),

/***/ "./src/models/config.ts":
/*!******************************!*\
  !*** ./src/models/config.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass AggregateEntry {\n}\nexports.AggregateEntry = AggregateEntry;\nclass Config {\n    constructor() {\n        this.aggregate = [];\n        this.center = .5;\n        this.domains = [];\n        this.events = [];\n        this.rootElement = null;\n    }\n}\nexports.default = Config;\n\n\n//# sourceURL=webpack://Timeline/./src/models/config.ts?");

/***/ }),

/***/ "./src/models/domain.config.ts":
/*!*************************************!*\
  !*** ./src/models/domain.config.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass DomainConfig {\n    constructor(props) {\n        this.components = new Set();\n        this.hasEvents = true;\n        this.hasIndicatorFor = null;\n        this.heightRatio = 1;\n        this.hasRulers = true;\n        this.hasSparkline = true;\n        this.topOffsetRatio = 0;\n        this.visibleRatio = 1;\n        Object.keys(props).forEach(k => {\n            if (k === 'components')\n                this[k] = new Set(props[k]);\n            else if (this.hasOwnProperty(k))\n                this[k] = props[k];\n        });\n    }\n}\nexports.default = DomainConfig;\n\n\n//# sourceURL=webpack://Timeline/./src/models/domain.config.ts?");

/***/ }),

/***/ "./src/models/domain.ts":
/*!******************************!*\
  !*** ./src/models/domain.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst dates_1 = __webpack_require__(/*! ../utils/dates */ \"./src/utils/dates.ts\");\nconst dates_2 = __webpack_require__(/*! ../utils/dates */ \"./src/utils/dates.ts\");\nconst props_1 = __webpack_require__(/*! ./props */ \"./src/models/props.ts\");\nconst domain_config_1 = __webpack_require__(/*! ./domain.config */ \"./src/models/domain.config.ts\");\nclass Domain {\n    get left() { return this._left; }\n    set left(left) {\n        if (left < -this.width + props_1.default.viewportWidth)\n            left = props_1.default.viewportWidth - this.width;\n        else if (left > 0)\n            left = 0;\n        this._left = left;\n    }\n    constructor(configProps) {\n        this.config = new domain_config_1.default(configProps);\n        this.height = props_1.default.viewportHeight * this.config.heightRatio;\n        this.width = props_1.default.viewportWidth / this.config.visibleRatio;\n        this.granularity = dates_1.getGranularity(props_1.default.config.from, props_1.default.config.to, this.config.visibleRatio);\n        this.nextDate = dates_2.subsequentDate(this.granularity);\n        this.pixelsPerMillisecond = this.width / props_1.default.time;\n        this.updateLeft();\n    }\n    updateLeft() {\n        this.left = props_1.default.center * (props_1.default.viewportWidth - this.width);\n        return this.left;\n    }\n    positionAtDate(date) {\n        return (date - props_1.default.config.from) * this.pixelsPerMillisecond;\n    }\n    proportionAtPosition(position) {\n        return position / this.width;\n    }\n    dateAtProportion(proportion) {\n        return props_1.default.config.from + (props_1.default.time * proportion);\n    }\n    get fromTo() {\n        const visibleTime = this.config.visibleRatio * props_1.default.time;\n        const from = props_1.default.config.from + (props_1.default.center * (props_1.default.time - visibleTime));\n        const to = props_1.default.config.from + (props_1.default.center * (props_1.default.time - visibleTime)) + visibleTime;\n        return [from, to];\n    }\n}\nexports.default = Domain;\n\n\n//# sourceURL=webpack://Timeline/./src/models/domain.ts?");

/***/ }),

/***/ "./src/models/event.ts":
/*!*****************************!*\
  !*** ./src/models/event.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass RawEv3nt {\n    constructor() {\n        this.date_granularity = 1;\n    }\n}\nexports.RawEv3nt = RawEv3nt;\nclass DomainEvent extends RawEv3nt {\n    constructor(rawEvent, domain) {\n        super();\n        Object.keys(rawEvent).forEach(k => this[k] = rawEvent[k]);\n        this.left = domain.positionAtDate(this.date);\n        this.width = this.isInterval() ?\n            (this.end_date - this.date) * domain.pixelsPerMillisecond :\n            0;\n        this.row = rawEvent.row;\n    }\n    isInterval() {\n        return this.end_date != null;\n    }\n}\nexports.default = DomainEvent;\n\n\n//# sourceURL=webpack://Timeline/./src/models/event.ts?");

/***/ }),

/***/ "./src/models/props.ts":
/*!*****************************!*\
  !*** ./src/models/props.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst constants_1 = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\nconst domain_1 = __webpack_require__(/*! ./domain */ \"./src/models/domain.ts\");\nclass Props {\n    constructor() {\n        this.defaultCenter = .5;\n        this._center = this.defaultCenter;\n        this.centerChangeDone = utils_1.debounce(() => document.dispatchEvent(new CustomEvent(constants_1.CENTER_CHANGE_DONE)), 300);\n    }\n    init(config) {\n        this.config = config;\n        if (config.center != null)\n            this.center = config.center;\n        this.time = config.to - config.from;\n        this.dimensions = config.rootElement;\n        this.domains = config.domains.map(d => new domain_1.default(d));\n    }\n    get center() { return this._center; }\n    set center(n) {\n        if ((this._center === 0 && n < 0) || (this._center === 1 && n > 1))\n            return;\n        else if (n < 0)\n            this._center = 0;\n        else if (n > 1)\n            this._center = 1;\n        else\n            this._center = n;\n        document.dispatchEvent(new CustomEvent(constants_1.CENTER_CHANGE, { detail: n }));\n        this.centerChangeDone();\n    }\n    set dimensions(rootElement) {\n        const style = getComputedStyle(rootElement);\n        const nextWidth = parseInt(style.getPropertyValue('width'), 10);\n        const nextHeight = parseInt(style.getPropertyValue('height'), 10);\n        this.viewportWidth = nextWidth;\n        this.viewportHeight = nextHeight;\n    }\n}\nexports.Props = Props;\nexports.default = new Props();\n\n\n//# sourceURL=webpack://Timeline/./src/models/props.ts?");

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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.createSvg = (name, style, attrs = {}) => {\n    const el = document.createElementNS(\"http://www.w3.org/2000/svg\", name);\n    if (style != null)\n        el.setAttribute('style', style.join(';').concat(';'));\n    Object.keys(attrs).forEach(k => el.setAttribute(k, attrs[k]));\n    return el;\n};\nlet sheet;\nif (typeof window !== 'undefined') {\n    const element = document.createElement('style');\n    document.head.appendChild(element);\n    sheet = element.sheet;\n}\nconst rules = {};\nexports.default = (name, className, style, dynamicStyle) => {\n    if (!className)\n        return document.createElement(name);\n    let el;\n    if (rules.hasOwnProperty(className)) {\n        el = rules[className].cloneNode(false);\n    }\n    else {\n        el = document.createElement(name);\n        el.classList.add(className);\n        if (style) {\n            sheet.insertRule(`.${className} { ${style.join(';').concat(';')} }`);\n        }\n        rules[className] = el.cloneNode(false);\n    }\n    if (dynamicStyle)\n        el.setAttribute('style', dynamicStyle.join(';').concat(';'));\n    return el;\n};\n\n\n//# sourceURL=webpack://Timeline/./src/utils/create-element.ts?");

/***/ }),

/***/ "./src/utils/dates.ts":
/*!****************************!*\
  !*** ./src/utils/dates.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.isEqual = (date1, date2) => date1.getTime() === date2.getTime();\nexports.format = (date, granularity) => {\n    if (date == null)\n        return '∞';\n    let displayDate = date.getFullYear().toString();\n    if (granularity >= 3) {\n        const months = [\n            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',\n            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',\n        ];\n        displayDate = `${months[date.getMonth()]} ${displayDate}`;\n    }\n    if (granularity >= 1) {\n        displayDate = `${date.getDate()} ${displayDate}`;\n    }\n    if (granularity === 0) {\n        displayDate = `${date.getHours()}:${date.getMinutes()} ${displayDate}`;\n    }\n    return displayDate;\n};\nexports.getGranularity = (from, to, visibleRatio) => {\n    const days = visibleRatio * ((to - from) / 86400000);\n    if (days < 1)\n        return 0;\n    if (days < 15)\n        return 1;\n    if (days < 45)\n        return 2;\n    if (days < 1.5 * 365)\n        return 3;\n    if (days < 15 * 365)\n        return 4;\n    if (days < 200 * 365)\n        return 5;\n    if (days < 400 * 365)\n        return 6;\n    if (days < 3000 * 365)\n        return 7;\n    if (days < 6000 * 365)\n        return 8;\n    return 9;\n};\nexports.getStep = (granularity) => {\n    if (granularity === 4)\n        return 1;\n    if (granularity === 5)\n        return 10;\n    if (granularity === 6)\n        return 50;\n    if (granularity === 7)\n        return 100;\n    if (granularity === 8)\n        return 500;\n    if (granularity === 9)\n        return 1000;\n    throw new RangeError(\"[getStep] Only steps with a granularity greater than 'year' calculated\");\n};\nfunction subsequentDate(granularity) {\n    if (granularity >= 4) {\n        const step = exports.getStep(granularity);\n        return (d) => {\n            let date = new Date(d);\n            const nextYear = date.getFullYear() + step;\n            if (nextYear > -1 && nextYear < 100) {\n                date = new Date(date);\n                date.setUTCFullYear(nextYear);\n                return date.getTime();\n            }\n            else {\n                return Date.UTC(nextYear, 0, 1);\n            }\n        };\n    }\n    if (granularity === 3) {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getFullYear(), date.getMonth() + 1, 1);\n        };\n    }\n    if (granularity === 2) {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 7);\n        };\n    }\n    if (granularity === 1) {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1);\n        };\n    }\n    if (granularity === 0) {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1);\n        };\n    }\n}\nexports.subsequentDate = subsequentDate;\nfunction byDate(a, b) {\n    const aFrom = a.date_min != null ? a.date_min : a.date;\n    const bFrom = b.date_min != null ? b.date_min : b.date;\n    if (aFrom < bFrom)\n        return -1;\n    if (aFrom > bFrom)\n        return 1;\n    const aTo = a.end_date_max != null ? a.end_date_max : a.end_date;\n    const bTo = b.end_date_max != null ? b.end_date_max : b.end_date;\n    if (aTo < bTo)\n        return -1;\n    if (aTo > bTo)\n        return 1;\n    return 0;\n}\nexports.byDate = byDate;\n\n\n//# sourceURL=webpack://Timeline/./src/utils/dates.ts?");

/***/ }),

/***/ "./src/utils/events.worker.ts":
/*!************************************!*\
  !*** ./src/utils/events.worker.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction orderEvents(events, viewportWidth, visibleRatio) {\n    if (!events.length)\n        return [[], null, null, [], null];\n    let rowCount = 0;\n    const grid = [];\n    const firstEvent = events[0];\n    const from = firstEvent.date_min != null ? firstEvent.date_min : firstEvent.date;\n    const lastEvent = events[events.length - 1];\n    const to = lastEvent.end_date_max != null ?\n        lastEvent.end_date_max :\n        lastEvent.end_date != null ?\n            lastEvent.end_date :\n            lastEvent.date;\n    const millisecondsPerPixel = (to - from) / (viewportWidth / visibleRatio);\n    const eventMinWidth = millisecondsPerPixel * viewportWidth * .1;\n    const addRow = (event) => {\n        let row;\n        const from = event.date_min != null ? event.date_min : event.date;\n        let to = event.end_date_max != null ? event.end_date_max : event.end_date;\n        if (to == null || (to - from) < eventMinWidth)\n            to = from + eventMinWidth;\n        let rowIterator = 0;\n        while (row == null && rowIterator < grid.length) {\n            const rows = grid[rowIterator];\n            let cellIterator = 0;\n            let hasSpace = true;\n            while (hasSpace && cellIterator < rows.length) {\n                hasSpace = (to < rows[cellIterator][0] || from > rows[cellIterator][1]);\n                cellIterator++;\n            }\n            if (hasSpace) {\n                rows.push([from, to]);\n                row = rowIterator;\n            }\n            rowIterator++;\n        }\n        if (row == null)\n            row = grid.push([[from, to]]) - 1;\n        if (row > rowCount)\n            rowCount = row;\n        event.row = row;\n        return event;\n    };\n    return [events.map(addRow), from, to, grid, rowCount];\n}\nexports.orderEvents = orderEvents;\nfunction eventsWorker(e) {\n    importScripts(e.data.orderEventsURL);\n    postMessage(orderEvents(e.data.events));\n}\nexports.eventsWorker = eventsWorker;\nexports.default = (events, done) => {\n    const orderEventsURL = URL.createObjectURL(new Blob([orderEvents]));\n    const func = `onmessage = ${eventsWorker.toString()}`;\n    const objectURL = URL.createObjectURL(new Blob([func]));\n    let worker = new Worker(objectURL);\n    worker.postMessage({ events, orderEventsURL });\n    worker.onmessage = (e) => {\n        URL.revokeObjectURL(objectURL);\n        worker.terminate();\n        done(e.data);\n    };\n};\n\n\n//# sourceURL=webpack://Timeline/./src/utils/events.worker.ts?");

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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction segmentsWorker(e) {\n    const center = e.data.center;\n    const visibleRatio = e.data.visibleRatio;\n    const from = e.data.from;\n    const time = e.data.time;\n    const to = from + time;\n    const timePerRatio = time * visibleRatio;\n    let events = e.data.events;\n    let lower = from + (center * time) - timePerRatio;\n    let upper = from + (center * time) + timePerRatio;\n    const segments = [{ from: lower, to: upper }];\n    let prevLower = lower;\n    let prevUpper = upper;\n    while (lower > from || upper < to) {\n        lower -= timePerRatio;\n        upper += timePerRatio;\n        if (lower > from)\n            segments.push({ from: lower, to: prevLower });\n        else if (lower <= from && prevLower > from)\n            segments.push({ from, to: prevLower });\n        if (upper < to)\n            segments.push({ from: prevUpper, to: upper });\n        else if (upper >= to && prevUpper < to)\n            segments.push({ from: prevUpper, to });\n        prevLower = lower;\n        prevUpper = upper;\n    }\n    for (let j = 0; j < segments.length; j++) {\n        const segment = segments[j];\n        function filterFunc(e) {\n            if (e.date >= segment.from && e.date <= segment.to)\n                return true;\n            if (e.end_date != null) {\n                if ((e.end_date >= segment.from && e.end_date <= segment.to) ||\n                    (e.date < segment.from && e.end_date > segment.to))\n                    return true;\n                else\n                    return false;\n            }\n            return false;\n        }\n        segment.events = events.filter(filterFunc),\n            events = events.filter(e => !filterFunc(e));\n    }\n    segments.sort((a, b) => {\n        if (a.from < b.from)\n            return -1;\n        if (a.from > b.from)\n            return 1;\n        return 0;\n    });\n    postMessage(segments);\n}\nconst func = `onmessage = ${segmentsWorker.toString()}`;\nexports.default = (events, done) => {\n    const objectURL = URL.createObjectURL(new Blob([func]));\n    let worker = new Worker(objectURL);\n    worker.postMessage(events);\n    worker.onmessage = (e) => {\n        URL.revokeObjectURL(objectURL);\n        worker.terminate();\n        done(e.data);\n    };\n};\n\n\n//# sourceURL=webpack://Timeline/./src/utils/segments.worker.ts?");

/***/ }),

/***/ "./src/views/band/events/event-segment.ts":
/*!************************************************!*\
  !*** ./src/views/band/events/event-segment.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst event_1 = __webpack_require__(/*! ../../../models/event */ \"./src/models/event.ts\");\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst point_in_time_1 = __webpack_require__(/*! ./event/point-in-time */ \"./src/views/band/events/event/point-in-time/index.ts\");\nconst interval_1 = __webpack_require__(/*! ./event/interval */ \"./src/views/band/events/event/interval/index.ts\");\nconst props_1 = __webpack_require__(/*! ../../../models/props */ \"./src/models/props.ts\");\nclass Segment {\n    constructor(domain, segmentData) {\n        this.domain = domain;\n        this.rendered = false;\n        this.rawEvents = segmentData.events;\n        this.from = segmentData.from;\n        this.left = ((props_1.default.config.from - this.from) / props_1.default.time) * this.domain.width;\n    }\n    render() {\n        this.rootElement = create_element_1.default('div', 'segment', [\n            'bottom: 0',\n            'list-style: none',\n            'margin: 0',\n            'padding: 0',\n            'position: absolute',\n            'top: 0',\n            `width: ${props_1.default.viewportWidth}px`,\n        ], [\n            `left: ${this.left}px`,\n        ]);\n        return this.rootElement;\n    }\n    renderChildren() {\n        if (this.rendered)\n            return;\n        const ul = create_element_1.default('ul', 'events', [\n            'list-style: none',\n            'margin: 0',\n            'padding: 0',\n        ]);\n        for (let i = 0; i < this.rawEvents.length; i++) {\n            const event = new event_1.default(this.rawEvents[i], this.domain);\n            const EventClass = event.isInterval() ? interval_1.default : point_in_time_1.default;\n            const view = new EventClass(event, this.left);\n            ul.appendChild(view.render());\n        }\n        this.rootElement.appendChild(ul);\n        this.rendered = true;\n    }\n}\nexports.default = Segment;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events/event-segment.ts?");

/***/ }),

/***/ "./src/views/band/events/event/interval/index.ts":
/*!*******************************************************!*\
  !*** ./src/views/band/events/event/interval/index.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst constants_1 = __webpack_require__(/*! ../../../../../constants */ \"./src/constants.ts\");\nconst props_1 = __webpack_require__(/*! ../../../../../models/props */ \"./src/models/props.ts\");\nclass PointInTime {\n    constructor(event, segmentOffset) {\n        this.event = event;\n        this.segmentOffset = segmentOffset;\n    }\n    render() {\n        const backgroundColor = this.event.row % 2 === 0 ? 'rgb(235, 235, 255)' : 'rgb(215, 215, 255)';\n        const li = create_element_1.default('li', 'interval-wrap', [\n            'box-sizing: border-box',\n            'font-size: 0.8em',\n            `height: ${constants_1.EVENT_ROW_HEIGHT - 6}px`,\n            'position: absolute',\n            'white-space: nowrap',\n        ], [\n            `background-color: ${backgroundColor}`,\n            `left: ${this.event.left - this.segmentOffset}px`,\n            `bottom: ${(this.event.row) * constants_1.EVENT_ROW_HEIGHT}px`,\n            `width: ${this.event.width}px`,\n        ]);\n        const title = create_element_1.default('div', 'interval-title', [\n            'display: inline-block',\n            `line-height: ${constants_1.EVENT_ROW_HEIGHT - 6}px`,\n            `max-width: ${props_1.default.viewportWidth / 10}px`,\n            'overflow: hidden',\n            'padding: 0 .25em',\n            'text-overflow: ellipsis',\n        ]);\n        title.textContent = this.event.label;\n        title.title = this.event.label;\n        li.appendChild(title);\n        return li;\n    }\n}\nexports.default = PointInTime;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events/event/interval/index.ts?");

/***/ }),

/***/ "./src/views/band/events/event/point-in-time/index.ts":
/*!************************************************************!*\
  !*** ./src/views/band/events/event/point-in-time/index.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst constants_1 = __webpack_require__(/*! ../../../../../constants */ \"./src/constants.ts\");\nconst create_element_1 = __webpack_require__(/*! ../../../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst props_1 = __webpack_require__(/*! ../../../../../models/props */ \"./src/models/props.ts\");\nclass PointInTime {\n    constructor(event, segmentOffset) {\n        this.event = event;\n        this.segmentOffset = segmentOffset;\n    }\n    render() {\n        const li = create_element_1.default('li', 'pit-wrap', [\n            'box-sizing: border-box',\n            'font-size: 0.8em',\n            `height: ${constants_1.EVENT_HEIGHT}px`,\n            `margin-left: -${constants_1.EVENT_HEIGHT / 2}px`,\n            'position: absolute',\n            'white-space: nowrap',\n            `max-width: ${constants_1.EVENT_MIN_SPACE}px`,\n            `z-index: 1`,\n        ], [\n            `left: ${this.event.left - this.segmentOffset}px`,\n            `bottom: ${(this.event.row) * constants_1.EVENT_ROW_HEIGHT}px`,\n        ]);\n        const title = create_element_1.default('div', 'pit-title', [\n            'background-color: rgba(255,255,255,.75)',\n            'display: inline-block',\n            `line-height: ${constants_1.EVENT_HEIGHT}px`,\n            `max-width: ${props_1.default.viewportWidth / 10}px`,\n            'overflow: hidden',\n            'padding: 0 .25em',\n            'text-overflow: ellipsis',\n        ]);\n        title.textContent = this.event.label;\n        title.title = this.event.label;\n        const point = create_element_1.default('div', 'pit-point', [\n            'background-image: radial-gradient(white 20%, black 100%)',\n            `border-radius: ${constants_1.EVENT_HEIGHT / 2}px`,\n            'display: inline-block',\n            `width: ${constants_1.EVENT_HEIGHT}px`,\n            `height: ${constants_1.EVENT_HEIGHT}px`,\n        ]);\n        li.appendChild(point);\n        li.appendChild(title);\n        return li;\n    }\n}\nexports.default = PointInTime;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events/event/point-in-time/index.ts?");

/***/ }),

/***/ "./src/views/band/events/index.ts":
/*!****************************************!*\
  !*** ./src/views/band/events/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst props_1 = __webpack_require__(/*! ../../../models/props */ \"./src/models/props.ts\");\nconst event_segment_1 = __webpack_require__(/*! ./event-segment */ \"./src/views/band/events/event-segment.ts\");\nconst ruler_segment_1 = __webpack_require__(/*! ./ruler-segment */ \"./src/views/band/events/ruler-segment.ts\");\nconst segments_worker_1 = __webpack_require__(/*! ../../../utils/segments.worker */ \"./src/utils/segments.worker.ts\");\nconst constants_1 = __webpack_require__(/*! ../../../constants */ \"./src/constants.ts\");\nclass Events {\n    constructor(domain) {\n        this.domain = domain;\n        this.eventSegments = [];\n        this.rulerSegments = [];\n    }\n    render() {\n        const eventsBand = create_element_1.default('div', 'events-band');\n        const rulerSegmentsWrap = create_element_1.default('div', 'ruler-segments', [\n            'position: absolute',\n        ], [\n            `height: ${this.domain.height}px`,\n        ]);\n        const eventSegmentsWrap = create_element_1.default('div', 'event-segments', [\n            `bottom: ${constants_1.DATE_BAR_HEIGHT}px`,\n            'position: absolute',\n        ], [\n            `height: ${this.domain.height}px`,\n        ]);\n        segments_worker_1.default({\n            events: props_1.default.config.events,\n            center: props_1.default.center,\n            visibleRatio: this.domain.config.visibleRatio,\n            from: new Date(props_1.default.config.from).getTime(),\n            time: props_1.default.time\n        }, (segments) => {\n            segments.forEach(s => {\n                const eventSegment = new event_segment_1.default(this.domain, s);\n                this.eventSegments.push(eventSegment);\n                eventSegmentsWrap.appendChild(eventSegment.render());\n                const rulerSegment = new ruler_segment_1.default(this.domain, s);\n                this.rulerSegments.push(rulerSegment);\n                rulerSegmentsWrap.appendChild(rulerSegment.render());\n            });\n            this.renderChildren();\n            eventsBand.appendChild(eventSegmentsWrap);\n            eventsBand.appendChild(rulerSegmentsWrap);\n        });\n        return eventsBand;\n    }\n    renderChildren() {\n        let index = Math.floor((this.eventSegments.length - 1) * props_1.default.center);\n        this.eventSegments[index].renderChildren();\n        this.rulerSegments[index].renderChildren();\n        for (let i = index - 2; i <= index + 2; i++) {\n            const eventSegment = this.eventSegments[i];\n            const rulerSegment = this.rulerSegments[i];\n            if (i >= 0 && i < this.eventSegments.length) {\n                if (i !== index) {\n                    eventSegment.renderChildren();\n                    rulerSegment.renderChildren();\n                }\n            }\n        }\n    }\n}\nexports.default = Events;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events/index.ts?");

/***/ }),

/***/ "./src/views/band/events/ruler-segment.ts":
/*!************************************************!*\
  !*** ./src/views/band/events/ruler-segment.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst props_1 = __webpack_require__(/*! ../../../models/props */ \"./src/models/props.ts\");\nconst rulers_1 = __webpack_require__(/*! ../rulers */ \"./src/views/band/rulers/index.ts\");\nconst ruler_1 = __webpack_require__(/*! ../rulers/ruler */ \"./src/views/band/rulers/ruler.ts\");\nclass Segment {\n    constructor(domain, segmentData) {\n        this.domain = domain;\n        this.rendered = false;\n        this.renderChildren = () => {\n            if (this.rendered)\n                return;\n            const rulers = create_element_1.default('div', 'rulers', [\n                `width: ${props_1.default.viewportWidth}px`,\n            ], [\n                `left: ${this.left}px`,\n                `height: ${this.domain.height}px`,\n            ]);\n            let date = rulers_1.findClosestRulerDate(this.from, this.domain.granularity);\n            while (date < this.to) {\n                rulers.appendChild(new ruler_1.default(date, this.domain, this.left).render());\n                date = this.domain.nextDate(date);\n            }\n            this.rootElement.appendChild(rulers);\n            this.rendered = true;\n        };\n        this.from = segmentData.from;\n        this.to = segmentData.to;\n        this.left = ((props_1.default.config.from - this.from) / props_1.default.time) * this.domain.width;\n    }\n    render() {\n        this.rootElement = create_element_1.default('div', 'segment', [\n            'bottom: 0',\n            'list-style: none',\n            'margin: 0',\n            'padding: 0',\n            'position: absolute',\n            'top: 0',\n            `width: ${props_1.default.viewportWidth}px`,\n        ], [\n            `left: ${this.left}px`,\n        ]);\n        return this.rootElement;\n    }\n}\nexports.default = Segment;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events/ruler-segment.ts?");

/***/ }),

/***/ "./src/views/band/index.ts":
/*!*********************************!*\
  !*** ./src/views/band/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst props_1 = __webpack_require__(/*! ../../models/props */ \"./src/models/props.ts\");\nconst create_element_1 = __webpack_require__(/*! ../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst constants_1 = __webpack_require__(/*! ../../constants */ \"./src/constants.ts\");\nconst sparkline_1 = __webpack_require__(/*! ./sparkline */ \"./src/views/band/sparkline/index.ts\");\nconst rulers_1 = __webpack_require__(/*! ./rulers */ \"./src/views/band/rulers/index.ts\");\nconst minimap_1 = __webpack_require__(/*! ./minimap */ \"./src/views/band/minimap/index.ts\");\nconst events_1 = __webpack_require__(/*! ./events */ \"./src/views/band/events/index.ts\");\nconst event_bus_1 = __webpack_require__(/*! ../../event-bus */ \"./src/event-bus.ts\");\nclass Band {\n    constructor(domain) {\n        this.domain = domain;\n        this.updateLeft = () => {\n            this.rootElement.style.transform = `translate3d(${this.domain.updateLeft()}px, 0, 0)`;\n            if (this.eventsBand != null)\n                this.eventsBand.renderChildren();\n        };\n        this.onMouseDown = (ev) => {\n            document.addEventListener('mouseup', this.onMouseUp);\n            this.dragOffset = ev.clientX;\n            this.dragStart = this.domain.left;\n        };\n        this.onMouseMove = (ev) => {\n            if (this.dragOffset) {\n                const left = this.dragStart - (this.dragOffset - ev.clientX);\n                props_1.default.center = left / (props_1.default.viewportWidth - this.domain.width);\n            }\n        };\n        this.onMouseUp = (ev) => {\n            document.removeEventListener('mouseup', this.onMouseUp);\n            this.dragOffset = null;\n        };\n        this.onDblClick = (ev) => {\n            const rootLeft = this.rootElement.getBoundingClientRect().left;\n            const proportion = this.domain.proportionAtPosition(ev.clientX - rootLeft);\n            props_1.default.center = proportion;\n        };\n        event_bus_1.default.register(constants_1.CENTER_CHANGE, this.updateLeft);\n    }\n    render() {\n        this.rootElement = create_element_1.default('div', 'band-wrap', [\n            'background-color: white',\n            'box-shadow: inset 0 6px 20px #eee',\n            'position: absolute',\n        ], [\n            `height: ${this.domain.config.heightRatio * 100}%`,\n            `top: ${this.domain.config.topOffsetRatio * 100}%`,\n            `transform: translate3d(${this.domain.left}px, 0, 0)`,\n            `width: ${this.domain.width}px`,\n        ]);\n        if (this.domain.config.components.has('SPARKLINE')) {\n            const sparkline = new sparkline_1.default(this.domain, props_1.default.config.aggregate);\n            this.rootElement.appendChild(sparkline.render());\n        }\n        if (this.domain.config.components.has('RULERS') && !this.domain.config.components.has('EVENTS')) {\n            this.rootElement.appendChild(new rulers_1.default(this.domain).render());\n        }\n        if (this.domain.config.components.has('MINIMAP')) {\n            const minimap = new minimap_1.default(this.domain);\n            this.rootElement.appendChild(minimap.render());\n        }\n        if (this.domain.config.components.has('EVENTS')) {\n            this.eventsBand = new events_1.default(this.domain);\n            this.rootElement.appendChild(this.eventsBand.render());\n        }\n        if (this.domain.config.visibleRatio < 1) {\n            event_bus_1.default.register('mousedown', this.onMouseDown, this.rootElement);\n            event_bus_1.default.register('mousemove', this.onMouseMove, this.rootElement);\n        }\n        event_bus_1.default.register('dblclick', this.onDblClick, this.rootElement);\n        return this.rootElement;\n    }\n}\nexports.default = Band;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/index.ts?");

/***/ }),

/***/ "./src/views/band/minimap/index.ts":
/*!*****************************************!*\
  !*** ./src/views/band/minimap/index.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst props_1 = __webpack_require__(/*! ../../../models/props */ \"./src/models/props.ts\");\nconst event_1 = __webpack_require__(/*! ../../../models/event */ \"./src/models/event.ts\");\nconst constants_1 = __webpack_require__(/*! ../../../constants */ \"./src/constants.ts\");\nconst event_bus_1 = __webpack_require__(/*! ../../../event-bus */ \"./src/event-bus.ts\");\nconst onVisible = (from, to) => (e) => {\n    const eventFrom = e.date_min || e.date;\n    let eventTo = e.end_date_max || e.end_date;\n    if (eventTo == null)\n        eventTo = eventFrom;\n    if (eventFrom == null && eventTo == null)\n        return false;\n    return !(eventTo < from || eventFrom > to);\n};\nclass MiniMap {\n    constructor(domain) {\n        this.domain = domain;\n        this.drawEvents = () => {\n            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n            const left = this.domain.positionAtDate(this.domain.fromTo[0]);\n            this.canvas.style.left = `${left}px`;\n            const [from, to] = this.domain.fromTo;\n            const visibleEvents = props_1.default.config.events.filter(onVisible(from, to));\n            for (let i = 0; i < visibleEvents.length; i++) {\n                const event = new event_1.default(visibleEvents[i], this.domain);\n                const y = this.maxHeight - ((event.row + 1) * this.eventHeight);\n                const width = event.width < 1 ? 1 : event.width;\n                this.context.fillRect(event.left - left, y, width, this.eventHeight);\n            }\n        };\n        this.maxHeight = this.domain.height - constants_1.DATE_BAR_HEIGHT;\n        this.eventHeight = this.maxHeight / props_1.default.config.rowCount;\n        if (this.eventHeight < 1)\n            this.eventHeight = 1;\n        if (this.domain.config.visibleRatio < 1) {\n            event_bus_1.default.register(constants_1.CENTER_CHANGE_DONE, this.drawEvents);\n        }\n    }\n    render() {\n        this.canvas = create_element_1.default('canvas', 'minimap', [\n            'position: absolute',\n        ]);\n        this.canvas.width = props_1.default.viewportWidth;\n        this.canvas.height = this.domain.height;\n        this.context = this.canvas.getContext('2d');\n        this.context.fillStyle = 'rgba(180, 180, 255, 1)';\n        this.drawEvents();\n        return this.canvas;\n    }\n}\nexports.default = MiniMap;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/minimap/index.ts?");

/***/ }),

/***/ "./src/views/band/rulers/index.ts":
/*!****************************************!*\
  !*** ./src/views/band/rulers/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst ruler_1 = __webpack_require__(/*! ./ruler */ \"./src/views/band/rulers/ruler.ts\");\nconst dates_1 = __webpack_require__(/*! ../../../utils/dates */ \"./src/utils/dates.ts\");\nconst props_1 = __webpack_require__(/*! ../../../models/props */ \"./src/models/props.ts\");\nfunction findClosestRulerDate(d, granularity) {\n    const date = new Date(d);\n    let year = date.getFullYear();\n    if (granularity >= 4) {\n        const step = dates_1.getStep(granularity);\n        if (granularity === 4)\n            year += 1;\n        else\n            while (year % step !== 0) {\n                year += 1;\n            }\n        return Date.UTC(year, 0, 1);\n    }\n    else if (granularity === 3) {\n        return Date.UTC(year, date.getMonth() + 1, 1);\n    }\n    else if (granularity === 1) {\n        return Date.UTC(year, date.getMonth(), date.getDate() + 1);\n    }\n    return d;\n}\nexports.findClosestRulerDate = findClosestRulerDate;\nclass Rulers {\n    constructor(domain) {\n        this.domain = domain;\n    }\n    render() {\n        this.ul = create_element_1.default('ul', 'ruler-wrap', [\n            'bottom: 0',\n            'left: 0',\n            'list-style: none',\n            'margin: 0',\n            'padding: 0',\n            'position: absolute',\n            'right: 0',\n            'top: 0',\n            'whiteSpace: nowrap',\n        ]);\n        let date = findClosestRulerDate(props_1.default.config.from, this.domain.granularity);\n        while (date < props_1.default.config.to) {\n            this.ul.appendChild(new ruler_1.default(date, this.domain).render());\n            date = this.domain.nextDate(date);\n        }\n        return this.ul;\n    }\n}\nexports.default = Rulers;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/rulers/index.ts?");

/***/ }),

/***/ "./src/views/band/rulers/ruler.ts":
/*!****************************************!*\
  !*** ./src/views/band/rulers/ruler.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst constants_1 = __webpack_require__(/*! ../../../constants */ \"./src/constants.ts\");\nconst days = [\"Sun\", \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\"];\nconst months = [\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"Jul\", \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\"];\nconst getWeekNumber = (date) => {\n    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));\n    const dayNum = d.getUTCDay() || 7;\n    d.setUTCDate(d.getUTCDate() + 4 - dayNum);\n    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));\n    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);\n};\nconst labelBody = (d, granularity) => {\n    const date = new Date(d);\n    if (granularity >= 4) {\n        return date.getFullYear().toString();\n    }\n    else if (granularity === 3) {\n        let body = months[date.getMonth()];\n        if (date.getMonth() === 0)\n            body = `${date.getFullYear().toString()}, ${body}`;\n        return body;\n    }\n    else if (granularity === 2) {\n        return `${months[date.getMonth()]}<br />week ${getWeekNumber(date)}`;\n    }\n    else if (granularity === 1) {\n        let body = days[date.getDay()];\n        body = `${body}<br />${months[date.getMonth()]} ${date.getDate()}`;\n        if (date.getMonth() === 0 && date.getDate() === 1)\n            body = `${body}, ${date.getFullYear().toString()}`;\n        return body;\n    }\n    else if (granularity === 0) {\n        return 'NOT IMPLEMENTED';\n    }\n};\nclass Ruler {\n    constructor(date, domain, offset = 0) {\n        this.date = date;\n        this.domain = domain;\n        this.offset = offset;\n    }\n    render() {\n        const li = create_element_1.default('div', 'ruler', [\n            'border-left: 1px solid #EEE',\n            'box-sizing: border-box',\n            'height: 100%',\n            'padding-left: 6px',\n            'position: absolute',\n            'transition: all 1s cubic-bezier(.25,.8,.25,1)',\n        ], [\n            `left: ${this.domain.positionAtDate(this.date) - this.offset}px`,\n        ]);\n        const label = create_element_1.default('div', 'ruler-label', [\n            'alignItems: flex-end',\n            'bottom: 2px',\n            'color: #888',\n            'display: flex',\n            'font-size: .75em',\n            `height: calc(${constants_1.DATE_BAR_HEIGHT} - 10px)`,\n            'position: absolute',\n            'width: 75px',\n            'zIndex: 2',\n        ]);\n        label.innerHTML = labelBody(this.date, this.domain.granularity);\n        label.title = this.date;\n        li.appendChild(label);\n        return li;\n    }\n}\nexports.default = Ruler;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/rulers/ruler.ts?");

/***/ }),

/***/ "./src/views/band/sparkline/index.ts":
/*!*******************************************!*\
  !*** ./src/views/band/sparkline/index.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst aggregate_worker_1 = __webpack_require__(/*! ../../../utils/aggregate.worker */ \"./src/utils/aggregate.worker.ts\");\nconst props_1 = __webpack_require__(/*! ../../../models/props */ \"./src/models/props.ts\");\nclass Sparkline {\n    constructor(domain, aggregate) {\n        this.domain = domain;\n        this.aggregate = aggregate;\n    }\n    render() {\n        this.svg = create_element_1.createSvg('svg', null, {\n            height: `${this.domain.height}px`,\n            preserveAspectRatio: \"none\",\n            viewBox: `0 0 ${this.domain.width} ${this.domain.height}`,\n            width: `${this.domain.width}px`,\n        });\n        if (this.aggregate.length) {\n            this.renderPath();\n        }\n        else if (props_1.default.config.events.length) {\n            aggregate_worker_1.default(props_1.default.config.events, (aggregate) => {\n                this.aggregate = aggregate;\n                this.renderPath();\n            });\n        }\n        return this.svg;\n    }\n    renderChildren() { }\n    createPath() {\n        const countMax = this.aggregate.reduce((prev, curr) => { return Math.max(prev, curr.count); }, 0);\n        const path = this.aggregate.reduce((prev, curr, index) => {\n            const curveType = index === 0 ? 'M' : 'L';\n            const x = (this.domain.width / (this.aggregate.length - 1)) * index;\n            const y = this.domain.height - ((curr.count / countMax) * this.domain.height);\n            return `${prev} ${curveType} ${x} ${y}`;\n        }, '');\n        const pathCloser = ` L ${this.domain.width + 1} ${this.domain.height + 1} L -1 ${this.domain.height + 1}`;\n        return path + pathCloser;\n    }\n    renderPath() {\n        const pathElement = create_element_1.createSvg('path', [\n            'fill: rgba(245, 245, 255, .7)',\n            'stroke: rgb(180, 180, 255)',\n        ], { d: this.createPath() });\n        this.svg.appendChild(pathElement);\n    }\n}\nexports.default = Sparkline;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/sparkline/index.ts?");

/***/ }),

/***/ "./src/views/indicator/index.ts":
/*!**************************************!*\
  !*** ./src/views/indicator/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst constants_1 = __webpack_require__(/*! ../../constants */ \"./src/constants.ts\");\nconst props_1 = __webpack_require__(/*! ../../models/props */ \"./src/models/props.ts\");\nconst event_bus_1 = __webpack_require__(/*! ../../event-bus */ \"./src/event-bus.ts\");\nclass Indicator {\n    constructor(hostDomain, targetDomain) {\n        this.hostDomain = hostDomain;\n        this.targetDomain = targetDomain;\n        this.handleCenterChange = (e) => {\n            this.leftOfIndicator.style.transform = `scaleX(${this.leftWidthScale()})`;\n            this.rightOfIndicator.style.transform = `scaleX(${this.rightWidthScale()})`;\n        };\n        this.width = this.hostDomain.width / this.targetDomain.width * props_1.default.viewportWidth;\n        if (this.width < 2)\n            this.width = 2;\n        let heightRatio = (this.targetDomain.height - constants_1.DATE_BAR_HEIGHT) / (props_1.default.config.rowCount * constants_1.EVENT_ROW_HEIGHT);\n        if (heightRatio > 1)\n            heightRatio = 1;\n        this.offset = props_1.default.viewportWidth - this.width;\n        this.leftWidth = this.nextLeftWidth();\n        this.rightWidth = this.nextRightWidth();\n        event_bus_1.default.register(constants_1.CENTER_CHANGE, this.handleCenterChange);\n    }\n    render() {\n        const wrapper = create_element_1.default('div', 'indicator-wrap', [\n            'bottom: 0',\n            'left: 0',\n            'pointer-events: none',\n            'position: absolute',\n            'right: 0',\n        ], [\n            `height: ${this.hostDomain.height}px`,\n            `top: ${this.hostDomain.config.topOffsetRatio * 100}%`,\n        ]);\n        this.leftOfIndicator = create_element_1.default('div', 'indicator', [\n            'position: absolute',\n            `bottom: ${0}px`,\n            'cursor: -webkit-grab',\n            'background-color: rgba(0, 0, 0, .1)',\n            'z-index: 3',\n        ], [\n            `height: ${this.hostDomain.height}px`,\n            'left: 0',\n            'transform-origin: left',\n            `width: ${this.leftWidth}px`,\n        ]);\n        this.rightOfIndicator = create_element_1.default('div', 'indicator', [], [\n            `height: ${this.hostDomain.height}px`,\n            'right: 0',\n            'transform-origin: right',\n            `width: ${this.rightWidth}px`,\n        ]);\n        wrapper.appendChild(this.leftOfIndicator);\n        wrapper.appendChild(this.rightOfIndicator);\n        return wrapper;\n    }\n    nextLeftWidth() {\n        return this.offset * props_1.default.center;\n    }\n    nextRightWidth() {\n        return props_1.default.viewportWidth - (this.nextLeftWidth() + this.width);\n    }\n    leftWidthScale() {\n        return this.nextLeftWidth() / this.leftWidth;\n    }\n    rightWidthScale() {\n        return this.nextRightWidth() / this.rightWidth;\n    }\n}\nexports.default = Indicator;\n\n\n//# sourceURL=webpack://Timeline/./src/views/indicator/index.ts?");

/***/ })

/******/ });
});