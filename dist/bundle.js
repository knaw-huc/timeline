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
/******/ 	__webpack_require__.p = "/dist/";
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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst props_1 = __webpack_require__(/*! ./models/props */ \"./src/models/props.ts\");\nconst constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\nvar Direction;\n(function (Direction) {\n    Direction[Direction[\"Backward\"] = -1] = \"Backward\";\n    Direction[Direction[\"Stop\"] = 0] = \"Stop\";\n    Direction[Direction[\"Forward\"] = 1] = \"Forward\";\n})(Direction || (Direction = {}));\nclass Animator {\n    constructor() {\n        this.elapsedTimeThreshold = 2000;\n        this.goToDuration = 300;\n        this.zoomToDuration = 300;\n        this.multipliers = [.25, .5, 1, 2, 4, 8, 16];\n        this.multiplier = 1;\n        this.direction = Direction.Stop;\n        this.elapsedTimeTotal = 0;\n        this.models = [];\n        this.views = [];\n        this.animate = (timestamp) => {\n            const elapsedTime = this.prevTimestamp == null ? 0 : timestamp - this.prevTimestamp;\n            if (elapsedTime > 0 || this.prevTimestamp == null) {\n                if (this.centerMarker == null && this.zoomMarker == null) {\n                    props_1.default.center += (props_1.default.controlBand.time / 480) * this.multiplier * this.direction;\n                }\n                else if (this.centerMarker != null) {\n                    const timeRemaining = this.goToDuration - this.elapsedTimeTotal;\n                    const centerDelta = Math.abs(this.centerMarker - props_1.default.center) / (timeRemaining / elapsedTime);\n                    if (timeRemaining < elapsedTime) {\n                        props_1.default.center = this.centerMarker;\n                        this.stop();\n                    }\n                    else\n                        props_1.default.center = props_1.default.center + (centerDelta * this.direction);\n                }\n                else if (this.zoomMarker != null) {\n                    const timeRemaining = this.zoomToDuration - this.elapsedTimeTotal;\n                    const zoomDelta = (this.zoomMarker - this.activeBand.zoomLevel) / (timeRemaining / elapsedTime);\n                    if (timeRemaining < elapsedTime) {\n                        this.activeBand.zoomLevel = this.zoomMarker;\n                        props_1.default.eventsBands.forEach(band => {\n                            if (band === this.activeBand)\n                                this.activeBand.zoomLevel = this.zoomMarker;\n                            else\n                                band.zoomLevel = this.zoomMarker + (band.config.zoomLevel - this.activeBand.config.zoomLevel);\n                        });\n                        this.adjustMinimapBands();\n                        document.dispatchEvent(new CustomEvent(constants_1.ZOOM_DONE));\n                        this.stop();\n                    }\n                    else {\n                        for (const band of props_1.default.eventsBands) {\n                            band.zoomLevel = band.zoomLevel + zoomDelta;\n                        }\n                        this.adjustMinimapBands();\n                    }\n                }\n                this.models.forEach(model => model.update());\n                this.views.forEach(view => view.update());\n            }\n            this.elapsedTimeTotal += elapsedTime;\n            if (this.elapsedTimeTotal > this.elapsedTimeThreshold)\n                this.resetElapsedTimeTotal();\n            if (this.isPlaying() || this.zoomMarker != null) {\n                if ((props_1.default.center >= props_1.default.from && props_1.default.center <= props_1.default.to) || this.centerMarker != null || this.zoomMarker != null) {\n                    this.prevTimestamp = timestamp;\n                    requestAnimationFrame(this.animate);\n                }\n                else {\n                    this.stop();\n                }\n            }\n        };\n    }\n    registerModel(model) {\n        this.models.push(model);\n    }\n    registerView(view) {\n        this.views.push(view);\n    }\n    adjustMinimapBands() {\n        props_1.default.minimapBands.forEach(mmb => {\n            if (this.activeBand.zoomLevel < mmb.config.zoomLevel) {\n                mmb.zoomLevel = this.activeBand.zoomLevel;\n            }\n        });\n    }\n    resetElapsedTimeTotal() {\n        this.elapsedTimeTotal = 0;\n        document.dispatchEvent(new CustomEvent(constants_1.CENTER_CHANGE_DONE));\n    }\n    accelerate() {\n        const index = this.multipliers.indexOf(this.multiplier);\n        if (index === this.multipliers.length - 1)\n            return this.multipliers[this.multipliers.length - 1];\n        this.multiplier = this.multipliers[index + 1];\n        return this.multiplier;\n    }\n    decelerate() {\n        const index = this.multipliers.indexOf(this.multiplier);\n        if (index === 0)\n            return this.multipliers[0];\n        this.multiplier = this.multipliers[index - 1];\n        return this.multiplier;\n    }\n    goTo(nextCenter) {\n        this.centerMarker = nextCenter;\n        if (nextCenter > props_1.default.center)\n            this.playForward();\n        else\n            this.playBackward();\n    }\n    zoomTo(band, nextZoomLevel) {\n        if (this.zoomMarker != null)\n            return;\n        if (nextZoomLevel < 0)\n            nextZoomLevel = 0;\n        if (band !== this.activeBand) {\n            this.stop();\n            this.activeBand = band;\n        }\n        if (this.activeBand.zoomLevel === nextZoomLevel)\n            return;\n        this.zoomMarker = nextZoomLevel;\n        this.nextFrame();\n    }\n    speed(multiplier) {\n        const multiplier2 = parseFloat(multiplier);\n        if (this.multipliers.indexOf(multiplier2) === -1)\n            return;\n        this.multiplier = multiplier2;\n    }\n    isPlaying() {\n        return this.direction !== Direction.Stop;\n    }\n    isPlayingForward() {\n        return this.direction === Direction.Forward;\n    }\n    isPlayingBackward() {\n        return this.direction === Direction.Backward;\n    }\n    nextFrame() {\n        requestAnimationFrame(this.animate);\n    }\n    playForward() {\n        this.direction = Direction.Forward;\n        this.nextFrame();\n    }\n    playBackward() {\n        this.direction = Direction.Backward;\n        this.nextFrame();\n    }\n    stop() {\n        this.direction = Direction.Stop;\n        this.activeBand = null;\n        this.centerMarker = null;\n        this.zoomMarker = null;\n        this.prevTimestamp = null;\n        this.elapsedTimeTotal = 0;\n    }\n    toggle() {\n        this.isPlaying() ? this.stop() : this.nextFrame();\n    }\n}\nexports.Animator = Animator;\nexports.default = new Animator();\n\n\n//# sourceURL=webpack://Timeline/./src/animator.ts?");

/***/ }),

/***/ "./src/api.ts":
/*!********************!*\
  !*** ./src/api.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst animator_1 = __webpack_require__(/*! ./animator */ \"./src/animator.ts\");\nconst constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\nconst props_1 = __webpack_require__(/*! ./models/props */ \"./src/models/props.ts\");\nclass Api {\n    constructor(onChange) {\n        this.onChange = onChange;\n        this.animator = animator_1.default;\n        this.handleChange = () => {\n            this.onChange(props_1.default);\n        };\n        this.resize = () => {\n            props_1.default.resize();\n            for (const band of props_1.default.bands) {\n                band.resize();\n            }\n            for (const view of this.views) {\n                view.resize();\n            }\n            this.animator.nextFrame();\n        };\n        document.addEventListener('keydown', (ev) => {\n            if (ev.keyCode === 189)\n                props_1.default.controlBand.zoomOut();\n            if (ev.keyCode === 187)\n                props_1.default.controlBand.zoomIn();\n        });\n        if (this.onChange != null && typeof this.onChange === 'function') {\n            document.addEventListener(constants_1.CENTER_CHANGE_DONE, this.handleChange);\n            document.addEventListener(constants_1.ZOOM_DONE, this.handleChange);\n        }\n    }\n    reload() {\n        this.resize();\n    }\n}\nexports.default = Api;\n\n\n//# sourceURL=webpack://Timeline/./src/api.ts?");

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.EVENT_HEIGHT = 14;\nexports.EVENT_ROW_HEIGHT = 16;\nexports.DATE_BAR_HEIGHT = exports.EVENT_ROW_HEIGHT;\nexports.RULER_LABELS_HEIGHT = 60;\nexports.CENTER_CHANGE_DONE = 'CENTER_CHANGE_DONE';\nexports.ZOOM_DONE = 'ZOOM_DONE';\nexports.SCROLL_DONE = 'SCROLL_DONE';\nexports.PIXELS_PER_LETTER = 8;\nclass RawSegment {\n}\nexports.RawSegment = RawSegment;\nexports.colors = [\n    'rgba(211,84,0',\n    'rgba(219,10,91',\n    'rgba(31,58,147',\n    'rgba(0,128,0'\n].map(color => (opacity = 1) => `${color},${opacity})`);\n\n\n//# sourceURL=webpack://Timeline/./src/constants.ts?");

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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst props_1 = __webpack_require__(/*! ./models/props */ \"./src/models/props.ts\");\nexports.TimelineProps = props_1.Props;\nconst index_1 = __webpack_require__(/*! ./models/config/index */ \"./src/models/config/index.ts\");\nexports.TimelineConfig = index_1.default;\nconst band_1 = __webpack_require__(/*! ./views/band */ \"./src/views/band/index.ts\");\nconst create_element_1 = __webpack_require__(/*! ./utils/create-element */ \"./src/utils/create-element.ts\");\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils/index.ts\");\nexports.calcPixelsPerMillisecond = utils_1.calcPixelsPerMillisecond;\nconst events_worker_1 = __webpack_require__(/*! ./utils/events.worker */ \"./src/utils/events.worker.ts\");\nexports.OrderedEvents = events_worker_1.OrderedEvents;\nexports.orderEvents = events_worker_1.orderEvents;\nconst api_1 = __webpack_require__(/*! ./api */ \"./src/api.ts\");\nconst events_1 = __webpack_require__(/*! ./views/band/events */ \"./src/views/band/events.ts\");\nconst canvas_1 = __webpack_require__(/*! ./views/canvas */ \"./src/views/canvas/index.ts\");\nconst label_1 = __webpack_require__(/*! ./views/label */ \"./src/views/label.ts\");\nconst minimap_1 = __webpack_require__(/*! ./models/band/minimap */ \"./src/models/band/minimap.ts\");\nexports.MinimapBand = minimap_1.default;\nconst events_2 = __webpack_require__(/*! ./models/band/events */ \"./src/models/band/events.ts\");\nexports.EventsBand = events_2.default;\nconst dates_1 = __webpack_require__(/*! ./utils/dates */ \"./src/utils/dates.ts\");\nexports.formatDate = dates_1.formatDate;\nconst event_1 = __webpack_require__(/*! ./models/event */ \"./src/models/event.ts\");\nexports.RawEv3nt = event_1.RawEv3nt;\nconst band_2 = __webpack_require__(/*! ./models/band */ \"./src/models/band/index.ts\");\nclass Timeline extends api_1.default {\n    constructor(config, onChange, onSelect) {\n        super(onChange);\n        this.config = config;\n        this.onSelect = onSelect;\n        this.appendToWrapper = (child) => {\n            let children = child.render();\n            if (!Array.isArray(children))\n                children = [children];\n            children.forEach(c => this.wrapper.appendChild(c));\n        };\n        props_1.default.init(config);\n        config.rootElement.appendChild(this.render());\n        const debouncedResize = utils_1.debounce(this.resize, 600);\n        window.addEventListener('resize', debouncedResize);\n    }\n    render() {\n        this.wrapper = create_element_1.default('div', 'wrapper', [\n            'box-sizing: border-box',\n            'height: 100%',\n            'overflow: hidden',\n            'position: relative',\n            'user-select: none',\n            'width: 100%',\n        ]);\n        this.views = props_1.default.bands\n            .map(band => band.type === band_2.BandType.EventsBand ?\n            new events_1.default(band, this.onSelect) :\n            new band_1.default(band));\n        this.views.push(new canvas_1.default());\n        this.views.forEach(this.appendToWrapper);\n        this.renderLabels();\n        const redLine = create_element_1.default('div', 'red-line', [\n            'background-color: rgb(126, 0, 0)',\n            'bottom: 0',\n            'left: calc(50% - 1px)',\n            'position: absolute',\n            'top: 0',\n            'width: 2px',\n            'z-index: 4'\n        ]);\n        this.wrapper.appendChild(redLine);\n        return this.wrapper;\n    }\n    renderLabels() {\n        props_1.default.bands\n            .filter(band => band.type === band_2.BandType.EventsBand && band.config.label != null)\n            .map(band => new label_1.default(band))\n            .forEach(this.appendToWrapper);\n    }\n}\nexports.default = Timeline;\n\n\n//# sourceURL=webpack://Timeline/./src/index.ts?");

/***/ }),

/***/ "./src/models/band/events.ts":
/*!***********************************!*\
  !*** ./src/models/band/events.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst _1 = __webpack_require__(/*! . */ \"./src/models/band/index.ts\");\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/models/config/index.ts\");\nconst animator_1 = __webpack_require__(/*! ../../animator */ \"./src/animator.ts\");\nconst constants_1 = __webpack_require__(/*! ../../constants */ \"./src/constants.ts\");\nconst props_1 = __webpack_require__(/*! ../props */ \"./src/models/props.ts\");\nconst events_worker_1 = __webpack_require__(/*! ../../utils/events.worker */ \"./src/utils/events.worker.ts\");\nconst dates_1 = __webpack_require__(/*! ../../utils/dates */ \"./src/utils/dates.ts\");\nconst utils_1 = __webpack_require__(/*! ../../utils */ \"./src/utils/index.ts\");\nclass EventsBand extends _1.default {\n    constructor(config) {\n        super(Object.assign({}, new config_1.EventsBandConfig(), config));\n        this.type = _1.BandType.EventsBand;\n        this.events = [];\n        this.rowCount = 0;\n        this.visibleEvents = [];\n        this._offsetY = 0;\n        if (this.config.events != null)\n            this.config.events.sort(dates_1.byDate);\n    }\n    get offsetY() { return this._offsetY; }\n    set offsetY(offsetYChange) {\n        this._offsetY += offsetYChange;\n        if (this._offsetY < 0)\n            this._offsetY = 0;\n        const maxOffset = this.height > this.availableHeight ?\n            this.height - this.availableHeight + constants_1.EVENT_ROW_HEIGHT :\n            0;\n        if (this._offsetY > maxOffset)\n            this._offsetY = maxOffset;\n        const lowestRow = this._offsetY / constants_1.EVENT_ROW_HEIGHT;\n        this.lowestVisibleRow = Math.ceil(lowestRow);\n        this.highestVisibleRow = this.lowestVisibleRow + this.visibleRowsCount;\n    }\n    init() {\n        super.init();\n        const pixelsPerMillisecond = utils_1.calcPixelsPerMillisecond(props_1.default.viewportWidth, this.config.zoomLevel || 0, props_1.default.time);\n        const orderedEvents = this.config.orderedEvents == null ?\n            events_worker_1.orderEvents(this.config.events, pixelsPerMillisecond) :\n            this.config.orderedEvents;\n        this.events = orderedEvents.events;\n        this.rowCount = orderedEvents.row_count;\n        this.height = constants_1.EVENT_ROW_HEIGHT * this.rowCount;\n        this.offsetY = 0;\n        this.updateEvents();\n    }\n    getColor(from, to) {\n        const beforeRGB = [253, 231, 37];\n        const centerRGB = [49, 220, 215];\n        const afterRGB = [204, 104, 232];\n        let diff;\n        if (props_1.default.center > to) {\n            diff = props_1.default.center - to;\n        }\n        else if (props_1.default.center < from) {\n            diff = from - props_1.default.center;\n        }\n        else {\n            return `rgb(${centerRGB.join(', ')})`;\n        }\n        const ratio = diff / (this.time / 2);\n        const outerRGB = (props_1.default.center > to) ? beforeRGB : afterRGB;\n        const codes = centerRGB\n            .map((code, i) => {\n            return code + ((outerRGB[i] - code) * ratio);\n        })\n            .join(', ');\n        return `rgb(${codes})`;\n    }\n    updateEvents() {\n        this.visibleEvents = this.events\n            .filter(event => !(event.from > this.to || event.to < this.from) &&\n            event.row >= this.lowestVisibleRow && event.row <= this.highestVisibleRow)\n            .map(event => {\n            event.left = this.positionAtTimestamp(event.from);\n            event.width = Math.round((event.time) * this.pixelsPerMillisecond);\n            if (event.time && event.width < 1)\n                event.width = 1;\n            event.padding = Math.round((event.space) * this.pixelsPerMillisecond);\n            event.top = this.top + this.availableHeight - ((event.row + 1) * constants_1.EVENT_ROW_HEIGHT) + this.offsetY;\n            event.color = this.getColor(event.from, event.to);\n            return event;\n        });\n    }\n    update() {\n        super.update();\n        this.updateEvents();\n    }\n    getEventByCoordinates(x, y) {\n        const timestamp = this.timestampAtPosition(x);\n        const bottomOfDomain = props_1.default.viewportOffset + this.top + this.availableHeight + this.offsetY;\n        const clickedRow = Math.floor((bottomOfDomain - y) / constants_1.EVENT_ROW_HEIGHT);\n        const event = this.events.find(e => {\n            if (!(e.from < timestamp && e.from + e.time + e.space > timestamp) ||\n                (e.row < this.lowestVisibleRow || e.row > this.highestVisibleRow))\n                return false;\n            return e.row === clickedRow;\n        });\n        return event;\n    }\n    zoomIn() {\n        animator_1.default.zoomTo(this, this.zoomLevel + 1);\n    }\n    zoomOut() {\n        animator_1.default.zoomTo(this, this.zoomLevel - 1);\n    }\n}\nexports.default = EventsBand;\n\n\n//# sourceURL=webpack://Timeline/./src/models/band/events.ts?");

/***/ }),

/***/ "./src/models/band/index.ts":
/*!**********************************!*\
  !*** ./src/models/band/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst dates_1 = __webpack_require__(/*! ../../utils/dates */ \"./src/utils/dates.ts\");\nconst props_1 = __webpack_require__(/*! ../props */ \"./src/models/props.ts\");\nconst constants_1 = __webpack_require__(/*! ../../constants */ \"./src/constants.ts\");\nconst utils_1 = __webpack_require__(/*! ../../utils */ \"./src/utils/index.ts\");\nconst animator_1 = __webpack_require__(/*! ../../animator */ \"./src/animator.ts\");\nvar BandType;\n(function (BandType) {\n    BandType[BandType[\"EventsBand\"] = 0] = \"EventsBand\";\n    BandType[BandType[\"MinimapBand\"] = 1] = \"MinimapBand\";\n})(BandType = exports.BandType || (exports.BandType = {}));\nclass Band {\n    constructor(config) {\n        this.config = config;\n        this.defaultZoomLevel = 0;\n    }\n    get offsetX() { return this._offsetX; }\n    set offsetX(left) {\n        this.prevOffsetX = this.offsetX || left;\n        this._offsetX = left;\n    }\n    get zoomLevel() { return this._zoomLevel; }\n    set zoomLevel(zoomLevel) {\n        if (zoomLevel < 0)\n            zoomLevel = 0;\n        this.visibleRatio = utils_1.visibleRatio(zoomLevel);\n        this.width = Math.round(props_1.default.viewportWidth / this.visibleRatio);\n        this.pixelsPerMillisecond = this.width / props_1.default.time;\n        this.time = this.visibleRatio * props_1.default.time;\n        this.granularity = dates_1.getGranularity(this.pixelsPerMillisecond);\n        this.nextDate = dates_1.subsequentDate(this.granularity);\n        this.prevZoomLevel = this.zoomLevel || zoomLevel;\n        this._zoomLevel = zoomLevel;\n        this.setHorizontalProps();\n    }\n    setVerticalProps() {\n        this.visibleHeight = Math.round(this.config.heightRatio * props_1.default.viewportHeight);\n        this.availableHeight = this.visibleHeight - constants_1.DATE_BAR_HEIGHT;\n        this.visibleRowsCount = Math.floor(this.availableHeight / constants_1.EVENT_ROW_HEIGHT) - 1;\n        this.top = Math.round(this.config.topOffsetRatio * props_1.default.viewportHeight);\n    }\n    setHorizontalProps() {\n        this.from = props_1.default.center - this.time / 2;\n        this.to = props_1.default.center + this.time / 2;\n        this.offsetX = (props_1.default.from - this.from) * this.pixelsPerMillisecond;\n    }\n    init() {\n        this.zoomLevel = this.config.zoomLevel;\n        this.setVerticalProps();\n        animator_1.default.registerModel(this);\n    }\n    resize() {\n        this.zoomLevel = this.zoomLevel;\n        this.setVerticalProps();\n    }\n    update() {\n        this.setHorizontalProps();\n    }\n    updateConfig(props) {\n        Object.keys(props).forEach(prop => {\n            if (this.config.hasOwnProperty(prop)) {\n                this.config[prop] = props[prop];\n            }\n        });\n    }\n    positionAtTimestamp(timestamp) {\n        return Math.round((timestamp - this.from) * this.pixelsPerMillisecond);\n    }\n    timestampAtProportion(proportion) {\n        return props_1.default.from + (props_1.default.time * proportion);\n    }\n    timestampAtPosition(position) {\n        return this.from + (position / this.pixelsPerMillisecond);\n    }\n}\nexports.default = Band;\n\n\n//# sourceURL=webpack://Timeline/./src/models/band/index.ts?");

/***/ }),

/***/ "./src/models/band/minimap.ts":
/*!************************************!*\
  !*** ./src/models/band/minimap.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst _1 = __webpack_require__(/*! . */ \"./src/models/band/index.ts\");\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/models/config/index.ts\");\nconst props_1 = __webpack_require__(/*! ../props */ \"./src/models/props.ts\");\nconst create_element_1 = __webpack_require__(/*! ../../utils/create-element */ \"./src/utils/create-element.ts\");\nfunction extendConfig(config) {\n    const extendedConfig = Object.assign({}, new config_1.MinimapBandConfig(), config);\n    if (!extendedConfig.targets.length)\n        extendedConfig.targets.push(0);\n    return extendedConfig;\n}\nclass MinimapBand extends _1.default {\n    constructor(config) {\n        super(extendConfig(config));\n        this.type = _1.BandType.MinimapBand;\n        this.canvas = create_element_1.default('canvas');\n        this.ctx = this.canvas.getContext('2d');\n        this.nextCanvas = create_element_1.default('canvas');\n        this.nextCtx = this.nextCanvas.getContext('2d');\n        this.isDrawn = false;\n    }\n    init() {\n        super.init();\n        this.maxRowCount = this.config.targets.reduce((prev, curr) => {\n            const { rowCount } = props_1.default.eventsBands[curr];\n            return Math.max(prev, rowCount);\n        }, 0);\n        const eventHeight = this.availableHeight / this.maxRowCount;\n        this.eventHeight = eventHeight < 1 ? 1 : Math.floor(eventHeight);\n        this.canvas.width = props_1.default.viewportWidth;\n        this.canvas.height = this.maxRowCount * this.eventHeight;\n        this.nextCanvas.width = this.canvas.width;\n        this.nextCanvas.height = this.canvas.height;\n    }\n    resize() {\n        super.resize();\n        this.isDrawn = false;\n    }\n    draw() {\n        if (!this.isDrawn)\n            this.drawEvents();\n        else\n            this.updateNextCanvas();\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        this.ctx.drawImage(this.nextCanvas, 0, 0);\n        return this.canvas;\n    }\n    drawEvents(from = this.from, to = this.to) {\n        this.nextCtx.beginPath();\n        this.config.targets.forEach(targetIndex => {\n            const targetBand = props_1.default.eventsBands[targetIndex];\n            for (const event of targetBand.events) {\n                if (event.from > to || event.to < from)\n                    continue;\n                const eventWidth = Math.round(event.time * this.pixelsPerMillisecond);\n                const eventLeft = this.positionAtTimestamp(event.date_min != null ? event.date_min : event.date);\n                const y = this.maxRowCount - ((event.row + 1) * this.eventHeight);\n                const width = eventWidth < 1 ? 1 : eventWidth;\n                this.nextCtx.rect(eventLeft, y, width, this.eventHeight);\n            }\n        });\n        this.nextCtx.fillStyle = `rgb(190, 190, 190)`;\n        this.nextCtx.fill();\n    }\n    updateNextCanvas() {\n        const leftOffset = Math.round(this.offsetX - this.prevOffsetX);\n        if (leftOffset === 0)\n            return this.canvas;\n        this.nextCtx.clearRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);\n        this.nextCtx.drawImage(this.canvas, leftOffset, 0);\n        let from, to;\n        if (leftOffset < 0) {\n            from = this.timestampAtPosition(props_1.default.viewportWidth + leftOffset);\n            to = this.to;\n        }\n        else {\n            from = this.from;\n            to = this.timestampAtPosition(leftOffset);\n        }\n        this.drawEvents(from, to);\n    }\n}\nexports.default = MinimapBand;\n\n\n//# sourceURL=webpack://Timeline/./src/models/band/minimap.ts?");

/***/ }),

/***/ "./src/models/config/index.ts":
/*!************************************!*\
  !*** ./src/models/config/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass DomainConfig {\n}\nexports.DomainConfig = DomainConfig;\nclass BandConfig {\n    constructor() {\n        this.heightRatio = 1;\n        this.rulers = true;\n        this.rulerLabels = true;\n        this.topOffsetRatio = 0;\n        this.zoomLevel = 0;\n    }\n}\nexports.BandConfig = BandConfig;\nclass MinimapBandConfig extends BandConfig {\n    constructor() {\n        super(...arguments);\n        this.indicatorFor = 0;\n        this.targets = [];\n    }\n}\nexports.MinimapBandConfig = MinimapBandConfig;\nclass EventsBandConfig extends BandConfig {\n}\nexports.EventsBandConfig = EventsBandConfig;\nclass Config {\n}\nexports.default = Config;\n\n\n//# sourceURL=webpack://Timeline/./src/models/config/index.ts?");

/***/ }),

/***/ "./src/models/event.ts":
/*!*****************************!*\
  !*** ./src/models/event.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass RawEv3nt {\n    constructor() {\n        this.date_granularity = \"DAY\";\n    }\n}\nexports.RawEv3nt = RawEv3nt;\n\n\n//# sourceURL=webpack://Timeline/./src/models/event.ts?");

/***/ }),

/***/ "./src/models/props.ts":
/*!*****************************!*\
  !*** ./src/models/props.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst constants_1 = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\nconst band_1 = __webpack_require__(/*! ./band */ \"./src/models/band/index.ts\");\nfunction onEventsBand(band) {\n    return band.type === band_1.BandType.EventsBand;\n}\nfunction onMinimapBand(band) {\n    return band.type === band_1.BandType.MinimapBand;\n}\nclass Props {\n    constructor() {\n        this.defaultCenterRatio = .5;\n        this.centerChangeDone = utils_1.debounce(() => {\n            document.dispatchEvent(new CustomEvent(constants_1.CENTER_CHANGE_DONE));\n        }, 300);\n    }\n    get center() { return this._center; }\n    set center(n) {\n        if ((this._center === this.from && n < this.from) || (this._center === this.to && n > this.to))\n            return;\n        if (n < this.from)\n            this._center = this.from;\n        else if (n > this.to)\n            this._center = this.to;\n        else\n            this._center = n;\n        this.centerChangeDone();\n    }\n    set dimensions(rootElement) {\n        const style = getComputedStyle(rootElement);\n        this.viewportHeight = parseInt(style.getPropertyValue('height'), 10);\n        this.viewportOffset = rootElement.getBoundingClientRect().top;\n        this.viewportWidth = parseInt(style.getPropertyValue('width'), 10);\n    }\n    init(config) {\n        if (config.rootElement == null)\n            console.error('[init] No rootElement found');\n        this.rootElement = config.rootElement;\n        this.dimensions = this.rootElement;\n        const [froms, tos] = config.bands.reduce((prev, curr) => {\n            if (curr.type === band_1.BandType.MinimapBand)\n                return prev;\n            const band = curr;\n            const events = band.config.orderedEvents == null ? band.config.events : band.config.orderedEvents.events;\n            prev[0].push(events[0].date_min || events[0].date);\n            prev[1].push(events.reduce((prev2, curr2) => {\n                return Math.max(prev2, curr2.end_date || -Infinity, curr2.end_date_max || -Infinity);\n            }, -Infinity));\n            return prev;\n        }, [[], []]);\n        this.from = Math.min(...froms);\n        this.to = Math.max(...tos);\n        this.time = this.to - this.from;\n        this.center = (config.center != null) ?\n            config.center :\n            this.from + (this.defaultCenterRatio * this.time);\n        this.bands = config.bands;\n        this.eventsBands = this.bands.filter(onEventsBand);\n        this.minimapBands = this.bands.filter(onMinimapBand);\n        this.controlBand = config.controlBand != null ? config.controlBand : this.eventsBands[0];\n        for (const band of this.bands) {\n            band.init();\n        }\n    }\n    resize() {\n        this.dimensions = this.rootElement;\n    }\n}\nexports.Props = Props;\nexports.default = new Props();\n\n\n//# sourceURL=webpack://Timeline/./src/models/props.ts?");

/***/ }),

/***/ "./src/utils/create-element.ts":
/*!*************************************!*\
  !*** ./src/utils/create-element.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.createSvg = (name, style, attrs = {}) => {\n    const el = document.createElementNS(\"http://www.w3.org/2000/svg\", name);\n    if (style != null)\n        el.setAttribute('style', style.join(';').concat(';'));\n    Object.keys(attrs).forEach(k => el.setAttribute(k, attrs[k]));\n    return el;\n};\nlet sheet;\nif (typeof window !== 'undefined') {\n    const element = document.createElement('style');\n    document.head.appendChild(element);\n    sheet = element.sheet;\n}\nconst rules = {};\nfunction createElement(name, className, style, dynamicStyle) {\n    if (!className)\n        return document.createElement(name);\n    let el;\n    if (rules.hasOwnProperty(className)) {\n        el = rules[className].cloneNode(false);\n    }\n    else {\n        el = document.createElement(name);\n        el.classList.add(className);\n        if (style) {\n            sheet.insertRule(`.${className} { ${style.join(';').concat(';')} }`);\n        }\n        rules[className] = el.cloneNode(false);\n    }\n    if (dynamicStyle)\n        el.setAttribute('style', dynamicStyle.join(';').concat(';'));\n    return el;\n}\nexports.default = createElement;\n\n\n//# sourceURL=webpack://Timeline/./src/utils/create-element.ts?");

/***/ }),

/***/ "./src/utils/dates.ts":
/*!****************************!*\
  !*** ./src/utils/dates.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst days = [\"Sun\", \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\"];\nconst months = [\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"Jul\", \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\"];\nfunction nth(n) { return [\"st\", \"nd\", \"rd\"][((n + 90) % 100 - 10) % 10 - 1] || \"th\"; }\nfunction formatMonth(d) { return months[d.getUTCMonth()]; }\nfunction formatDateNumber(d) {\n    const dateNumber = d.getUTCDate();\n    const day = days[d.getUTCDay()];\n    return `${day}, ${dateNumber}${nth(dateNumber)}`;\n}\nfunction formatHours(d) { return d.getUTCHours().toString().padStart(2, '0'); }\nfunction formatMinutes(d) { return d.getUTCMinutes().toString().padStart(2, '0'); }\nfunction formatSeconds(d) { return d.getUTCSeconds().toString().padStart(2, '0'); }\nfunction formatMilliseconds(d) { return d.getUTCMilliseconds().toString().padStart(3, '0'); }\nfunction isYearOrBigger(granularity) {\n    return granularity === \"YEAR\" ||\n        granularity === \"YEAR_5\" ||\n        granularity === \"DECADE\" ||\n        granularity === \"DECADE_5\" ||\n        granularity === \"CENTURY\" ||\n        granularity === \"CENTURY_5\" ||\n        granularity === \"MILLENIUM\";\n}\nexports.formatDate = (timestamp, granularity) => {\n    if (timestamp == null)\n        return '∞';\n    const date = new Date(timestamp);\n    let label = date.getUTCFullYear().toString();\n    if (isYearOrBigger(granularity))\n        return label;\n    label = `${formatMonth(date)} ${label}`;\n    if (granularity === \"MONHT\")\n        return label;\n    label = `${formatDateNumber(date)} ${label}`;\n    if (granularity === \"DAY\")\n        return label;\n    label = `${label} at ${formatHours(date)}:`;\n    if (granularity === \"HOUR\")\n        return `${label}00`;\n    label = `${label}${formatMinutes(date)}`;\n    if (granularity === \"MINUTE\")\n        return label;\n    label = `${label}:${formatSeconds(date)}`;\n    if (granularity === \"SECOND\")\n        return label;\n    return `${label}.${formatMilliseconds(date)}`;\n};\nexports.getGranularity = (pixelsPerMillisecond) => {\n    if (pixelsPerMillisecond > 58)\n        return \"MILLISECOND\";\n    if (pixelsPerMillisecond > 12)\n        return \"MILLISECOND_10\";\n    if (pixelsPerMillisecond > 2.3)\n        return \"MILLISECOND_50\";\n    if (pixelsPerMillisecond > 1.5)\n        return \"MILLISECOND_100\";\n    if (pixelsPerMillisecond > .4)\n        return \"MILLISECOND_500\";\n    if (pixelsPerMillisecond > 1.12e-3)\n        return \"SECOND\";\n    if (pixelsPerMillisecond > 1.12e-4)\n        return \"MINUTE\";\n    if (pixelsPerMillisecond > 1.12e-5)\n        return \"HOUR\";\n    if (pixelsPerMillisecond > 8e-7)\n        return \"DAY\";\n    if (pixelsPerMillisecond > 2.6e-7)\n        return \"WEEK\";\n    if (pixelsPerMillisecond > 2.2e-8)\n        return \"MONHT\";\n    if (pixelsPerMillisecond > 2.2e-9)\n        return \"YEAR\";\n    if (pixelsPerMillisecond > 3.3e-10)\n        return \"YEAR_5\";\n    if (pixelsPerMillisecond > 1.6e-10)\n        return \"DECADE\";\n    if (pixelsPerMillisecond > 8e-11)\n        return \"DECADE_5\";\n    if (pixelsPerMillisecond > 1e-11)\n        return \"CENTURY\";\n    if (pixelsPerMillisecond > 5e-12)\n        return \"CENTURY_5\";\n    return \"MILLENIUM\";\n};\nexports.getStep = (granularity) => {\n    if (granularity === \"YEAR\")\n        return 1;\n    if (granularity === \"YEAR_5\")\n        return 5;\n    if (granularity === \"DECADE\")\n        return 10;\n    if (granularity === \"DECADE_5\")\n        return 50;\n    if (granularity === \"CENTURY\")\n        return 100;\n    if (granularity === \"CENTURY_5\")\n        return 500;\n    if (granularity === \"MILLENIUM\")\n        return 1000;\n    if (granularity === \"MILLISECOND\")\n        return 1;\n    if (granularity === \"MILLISECOND_10\")\n        return 10;\n    if (granularity === \"MILLISECOND_50\")\n        return 50;\n    if (granularity === \"MILLISECOND_100\")\n        return 100;\n    if (granularity === \"MILLISECOND_500\")\n        return 500;\n    throw new RangeError(\"[getStep] Only steps with a granularity greater than 'year' calculated\");\n};\nfunction subsequentDate(granularity) {\n    if (isYearOrBigger(granularity)) {\n        return (d) => {\n            let date = new Date(d);\n            let nextYear = date.getUTCFullYear() + 1;\n            if (granularity !== \"YEAR\") {\n                const step = exports.getStep(granularity);\n                while (nextYear % step !== 0) {\n                    nextYear += 1;\n                }\n            }\n            if (nextYear > -1 && nextYear < 100) {\n                date.setUTCFullYear(nextYear);\n                return date.getTime();\n            }\n            else {\n                return Date.UTC(nextYear, 0, 1);\n            }\n        };\n    }\n    if (granularity === \"MONHT\") {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1);\n        };\n    }\n    if (granularity === \"WEEK\") {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 7);\n        };\n    }\n    if (granularity === \"DAY\") {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1);\n        };\n    }\n    if (granularity === \"HOUR\") {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours() + 1);\n        };\n    }\n    if (granularity === \"MINUTE\") {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes() + 1);\n        };\n    }\n    if (granularity === \"SECOND\") {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds() + 1);\n        };\n    }\n    if (granularity.slice(0, \"MILLISECOND\".length) === \"MILLISECOND\") {\n        return (d) => {\n            const step = exports.getStep(granularity);\n            const date = new Date(d);\n            let ms = date.getUTCMilliseconds() + 1;\n            if (step > 1)\n                ms = ms + step - (ms % step);\n            return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), ms);\n        };\n    }\n}\nexports.subsequentDate = subsequentDate;\nfunction byDate(a, b) {\n    const aFrom = a.date_min != null ? a.date_min : a.date;\n    const bFrom = b.date_min != null ? b.date_min : b.date;\n    if (aFrom < bFrom)\n        return -1;\n    if (aFrom > bFrom)\n        return 1;\n    const aTo = a.end_date_max != null ? a.end_date_max : a.end_date;\n    const bTo = b.end_date_max != null ? b.end_date_max : b.end_date;\n    if (aTo < bTo)\n        return -1;\n    if (aTo > bTo)\n        return 1;\n    return 0;\n}\nexports.byDate = byDate;\nconst getWeekNumber = (date) => {\n    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));\n    const dayNum = d.getUTCDay() || 7;\n    d.setUTCDate(d.getUTCDate() + 4 - dayNum);\n    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));\n    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);\n};\nexports.labelBody = (d, granularity) => {\n    const date = new Date(d);\n    if (isYearOrBigger(granularity))\n        return date.getUTCFullYear().toString();\n    if (granularity === \"MONHT\")\n        return formatMonth(date);\n    if (granularity === \"WEEK\")\n        return `${formatMonth(date)}, week ${getWeekNumber(date)}`;\n    if (granularity === \"DAY\")\n        return `${formatDateNumber(date)} ${formatMonth(date)}`;\n    if (granularity === \"HOUR\")\n        return `${formatHours(date)}:00`;\n    if (granularity === \"MINUTE\")\n        return `${formatHours(date)}:${formatMinutes(date)}`;\n    if (granularity === \"SECOND\")\n        return `${formatHours(date)}:${formatMinutes(date)}:${formatSeconds(date)}`;\n    if (granularity.slice(0, \"MILLISECOND\".length) === \"MILLISECOND\") {\n        return `${formatHours(date)}:${formatMinutes(date)}:${formatSeconds(date)}.${formatMilliseconds(date)}`;\n    }\n};\n\n\n//# sourceURL=webpack://Timeline/./src/utils/dates.ts?");

/***/ }),

/***/ "./src/utils/events.worker.ts":
/*!************************************!*\
  !*** ./src/utils/events.worker.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst constants_1 = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\nclass OrderedEvents {\n    constructor() {\n        this.events = [];\n        this.row_count = 0;\n    }\n}\nexports.OrderedEvents = OrderedEvents;\nconst pixelsPerLetter = 8;\nfunction orderEvents(events, pixelsPerMillisecond) {\n    if (!events.length)\n        return new OrderedEvents();\n    let rowCount = 0;\n    const grid = [];\n    const paddingRight = constants_1.EVENT_HEIGHT * 2 / pixelsPerMillisecond;\n    const addRow = (event) => {\n        let row;\n        if (event.label == null)\n            event.label = 'NO LABEL';\n        event.from = event.date_min || event.date;\n        event.to = event.end_date_max || event.end_date;\n        if (event.to == null)\n            event.to = event.from;\n        event.time = event.to == null ? 0 : event.to - event.from;\n        event.space = 0;\n        if (!event.time) {\n            if (event.label == null)\n                event.label = 'NO LABEL';\n            event.space = ((event.label.length * pixelsPerLetter) / pixelsPerMillisecond) + paddingRight;\n        }\n        let rowIterator = 0;\n        while (row == null && rowIterator < grid.length) {\n            let cellIterator = 0;\n            let hasSpace = true;\n            while (hasSpace && cellIterator < grid[rowIterator].length) {\n                if (event.to < grid[rowIterator][cellIterator][0])\n                    break;\n                hasSpace = event.from > grid[rowIterator][cellIterator][1];\n                cellIterator++;\n            }\n            if (hasSpace) {\n                grid[rowIterator].push([event.from, event.from + event.time + event.space]);\n                row = rowIterator;\n            }\n            rowIterator++;\n        }\n        if (row == null)\n            row = grid.push([[event.from, event.from + event.time + event.space]]) - 1;\n        if (row > rowCount)\n            rowCount = row;\n        event.row = row;\n        return event;\n    };\n    events = events.map(addRow);\n    return {\n        events,\n        row_count: grid.length\n    };\n}\nexports.orderEvents = orderEvents;\n\n\n//# sourceURL=webpack://Timeline/./src/utils/events.worker.ts?");

/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.debounce = (func, wait) => {\n    let timeout;\n    return () => {\n        clearTimeout(timeout);\n        timeout = setTimeout(func, wait);\n    };\n};\nfunction visibleRatio(zoomLevel) {\n    return Math.pow(2, zoomLevel * -1);\n}\nexports.visibleRatio = visibleRatio;\nfunction createRange(n) {\n    return Array.apply(null, { length: n }).map(Number.call, Number);\n}\nexports.createRange = createRange;\nfunction selectRandom(set, amount) {\n    const selected = [];\n    while (selected.length < amount) {\n        const randomIndex = Math.floor(Math.random() * set.length);\n        const nextItem = set[randomIndex];\n        if (selected.indexOf(nextItem) === -1 || set.length < amount)\n            selected.push(nextItem);\n    }\n    return selected;\n}\nexports.selectRandom = selectRandom;\nfunction calcPixelsPerMillisecond(viewportWidth, zoomLevel, totalTime) {\n    return (viewportWidth / visibleRatio(zoomLevel)) / totalTime;\n}\nexports.calcPixelsPerMillisecond = calcPixelsPerMillisecond;\nfunction formatDate(ts) {\n    if (ts == null)\n        return null;\n    const d = new Date(ts);\n    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;\n}\nfunction logEvent(event, ...rest) {\n    console.log(event.label, event, event.left, formatDate(event.from), formatDate(event.to), rest);\n}\nexports.logEvent = logEvent;\n\n\n//# sourceURL=webpack://Timeline/./src/utils/index.ts?");

/***/ }),

/***/ "./src/views/band/events.ts":
/*!**********************************!*\
  !*** ./src/views/band/events.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst index_1 = __webpack_require__(/*! ./index */ \"./src/views/band/index.ts\");\nconst event_bus_1 = __webpack_require__(/*! ../../event-bus */ \"./src/event-bus.ts\");\nconst utils_1 = __webpack_require__(/*! ../../utils */ \"./src/utils/index.ts\");\nclass EventsBandView extends index_1.default {\n    constructor(band, select) {\n        super(band);\n        this.band = band;\n        this.select = select;\n        this.onWheel = (ev) => {\n            if (Math.abs(ev.deltaX) === 0 && ev.deltaY !== 0) {\n                if (ev.deltaY < 0)\n                    this.zoomOut();\n                if (ev.deltaY > 0)\n                    this.zoomIn();\n            }\n        };\n        this.onClick = (ev) => {\n            if (this.lastDragInterval > 175)\n                return;\n            const event = this.band.getEventByCoordinates(ev.clientX, ev.clientY);\n            if (event && this.select) {\n                this.select(event);\n                utils_1.logEvent(event);\n            }\n        };\n    }\n    render() {\n        const root = super.render();\n        event_bus_1.default.register('click', this.onClick, this.rootElement);\n        event_bus_1.default.register('wheel', this.onWheel, this.rootElement);\n        return root;\n    }\n    zoomIn() {\n        this.band.zoomIn();\n    }\n    zoomOut() {\n        this.band.zoomOut();\n    }\n}\nexports.default = EventsBandView;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events.ts?");

/***/ }),

/***/ "./src/views/band/index.ts":
/*!*********************************!*\
  !*** ./src/views/band/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst band_1 = __webpack_require__(/*! ../../models/band */ \"./src/models/band/index.ts\");\nconst props_1 = __webpack_require__(/*! ../../models/props */ \"./src/models/props.ts\");\nconst create_element_1 = __webpack_require__(/*! ../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst event_bus_1 = __webpack_require__(/*! ../../event-bus */ \"./src/event-bus.ts\");\nconst animator_1 = __webpack_require__(/*! ../../animator */ \"./src/animator.ts\");\nconst constants_1 = __webpack_require__(/*! ../../constants */ \"./src/constants.ts\");\nclass BandView {\n    constructor(band) {\n        this.band = band;\n        this.onMouseDown = (ev) => {\n            document.addEventListener('mouseup', this.onMouseUp);\n            this.dragStartTime = Date.now();\n            this.dragStartPosition = [ev.clientX, ev.clientY];\n            this.dragOffsetX = ev.clientX;\n            this.dragOffsetY = ev.clientY;\n        };\n        this.onMouseMove = (ev) => {\n            if (this.dragOffsetX == null)\n                return;\n            const yChange = ev.clientY - this.dragOffsetY;\n            const xChange = ev.clientX - this.dragOffsetX;\n            if (this.band.type === band_1.BandType.EventsBand) {\n                const band = this.band;\n                if (band.offsetY !== 0 ||\n                    (Math.abs(yChange) > Math.abs(xChange) && Math.abs(yChange) > 5)) {\n                    band.offsetY = yChange;\n                }\n            }\n            const centerChange = xChange / this.band.pixelsPerMillisecond;\n            props_1.default.center -= centerChange;\n            animator_1.default.nextFrame();\n            this.dragOffsetX = ev.clientX;\n            this.dragOffsetY = ev.clientY;\n        };\n        this.onMouseUp = (ev) => {\n            this.lastDragInterval = Date.now() - this.dragStartTime;\n            this.dispatchScrollDoneEvent(ev);\n            this.dragOffsetX = null;\n            this.dragOffsetY = null;\n            document.removeEventListener('mouseup', this.onMouseUp);\n        };\n        this.onDblClick = (ev) => {\n            const nextCenter = this.band.timestampAtPosition(ev.clientX);\n            animator_1.default.goTo(nextCenter);\n        };\n    }\n    render() {\n        this.rootElement = create_element_1.default('div', 'band-wrap', [\n            'position: absolute',\n            'z-index: 2',\n        ], [\n            `height: ${this.band.visibleHeight}px`,\n            `top: ${this.band.top}px`,\n            `width: ${props_1.default.viewportWidth}px`,\n        ]);\n        event_bus_1.default.register('mousedown', this.onMouseDown, this.rootElement);\n        event_bus_1.default.register('mousemove', this.onMouseMove, this.rootElement);\n        event_bus_1.default.register('dblclick', this.onDblClick, this.rootElement);\n        return this.rootElement;\n    }\n    dispatchScrollDoneEvent(ev) {\n        const significantDrag = [\n            this.dragStartPosition[0] - ev.clientX,\n            this.dragStartPosition[1] - ev.clientY\n        ]\n            .map(Math.abs)\n            .some(offset => offset > 5);\n        if (this.lastDragInterval > 200 || significantDrag) {\n            document.dispatchEvent(new CustomEvent(constants_1.SCROLL_DONE));\n        }\n    }\n    resize() {\n        this.rootElement.style.cssText = `height: ${this.band.visibleHeight}px; top: ${this.band.top}px; width: ${props_1.default.viewportWidth}px;`;\n    }\n}\nexports.default = BandView;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/index.ts?");

/***/ }),

/***/ "./src/views/canvas/index.ts":
/*!***********************************!*\
  !*** ./src/views/canvas/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst props_1 = __webpack_require__(/*! ../../models/props */ \"./src/models/props.ts\");\nconst constants_1 = __webpack_require__(/*! ../../constants */ \"./src/constants.ts\");\nconst animator_1 = __webpack_require__(/*! ../../animator */ \"./src/animator.ts\");\nconst rulers_1 = __webpack_require__(/*! ./rulers */ \"./src/views/canvas/rulers.ts\");\nconst band_1 = __webpack_require__(/*! ../../models/band */ \"./src/models/band/index.ts\");\nclass Canvas {\n    constructor() {\n        this.indicatorsDrawn = false;\n        this.update = () => {\n            props_1.default.bands\n                .forEach(band => {\n                if (band.type === band_1.BandType.EventsBand)\n                    this.drawEventsBand(band);\n                else\n                    this.drawMinimapBand(band);\n            });\n            this.drawIndicators();\n        };\n        animator_1.default.registerView(this);\n    }\n    render() {\n        this.canvas = create_element_1.default('canvas', 'main', [\n            'position: absolute',\n        ]);\n        this.canvas.width = props_1.default.viewportWidth;\n        this.canvas.height = props_1.default.viewportHeight;\n        this.ctx = this.canvas.getContext('2d');\n        this.indicatorsCanvas = create_element_1.default('canvas', 'indicators', [\n            'position: absolute',\n        ], ['z-index: 1']);\n        this.indicatorsCanvas.width = props_1.default.viewportWidth;\n        this.indicatorsCanvas.height = props_1.default.viewportHeight;\n        this.indicatorsCtx = this.indicatorsCanvas.getContext('2d');\n        this.update();\n        return [this.canvas, this.indicatorsCanvas];\n    }\n    resize() {\n        this.indicatorsCanvas.width = props_1.default.viewportWidth;\n        this.indicatorsCanvas.height = props_1.default.viewportHeight;\n        this.canvas.width = props_1.default.viewportWidth;\n        this.canvas.height = props_1.default.viewportHeight;\n        this.indicatorsDrawn = false;\n    }\n    clear(band) {\n        this.ctx.clearRect(0, band.top, this.canvas.width, band.visibleHeight);\n    }\n    drawEventsBand(band) {\n        this.clear(band);\n        rulers_1.default(this.ctx, band);\n        for (const event of band.visibleEvents) {\n            if (!event.time) {\n                this.ctx.moveTo(event.left, event.top + constants_1.EVENT_HEIGHT / 2);\n                this.ctx.beginPath();\n                this.ctx.arc(event.left, event.top + constants_1.EVENT_HEIGHT / 2, constants_1.EVENT_HEIGHT / 3, 0, 2 * Math.PI);\n                this.ctx.fillStyle = event.color;\n                this.ctx.fill();\n            }\n            else {\n                this.ctx.fillStyle = event.color;\n                this.ctx.fillRect(event.left, event.top, event.width, constants_1.EVENT_HEIGHT);\n            }\n        }\n        this.drawEventsText(band);\n    }\n    drawEventsText(band) {\n        this.ctx.font = '11px sans-serif';\n        this.ctx.fillStyle = `rgb(40, 40, 40)`;\n        for (const event of band.visibleEvents) {\n            let eventWidth = event.time === 0 ? event.padding : event.width;\n            let eventLeft = event.left;\n            if (event.left < 0 && event.time !== 0) {\n                eventWidth = event.width + event.left;\n                eventLeft = 0;\n            }\n            let eventLabelLength = event.label.length * constants_1.PIXELS_PER_LETTER;\n            if (eventLabelLength <= eventWidth) {\n                const paddingLeft = event.time ? 3 : 8;\n                this.ctx.fillText(event.label, eventLeft + paddingLeft, event.top + constants_1.EVENT_HEIGHT - 3);\n            }\n        }\n    }\n    drawMinimapBand(band) {\n        if (band.isDrawn && band.prevOffsetX === band.offsetX && band.prevZoomLevel === band.zoomLevel)\n            return;\n        this.clear(band);\n        rulers_1.default(this.ctx, band);\n        const minimapCanvas = band.draw();\n        this.ctx.drawImage(minimapCanvas, 0, band.top, props_1.default.viewportWidth, band.availableHeight);\n        band.isDrawn = true;\n    }\n    drawIndicators() {\n        if (this.indicatorsDrawn && props_1.default.eventsBands.every(b => b.prevZoomLevel === b.zoomLevel))\n            return;\n        this.indicatorsCtx.clearRect(0, 0, props_1.default.viewportWidth, props_1.default.viewportHeight);\n        this.indicatorsCtx.beginPath();\n        for (const band of props_1.default.minimapBands) {\n            const eventsBand = props_1.default.eventsBands[band.config.indicatorFor];\n            const indicatorTOP = Math.round(band.config.topOffsetRatio * props_1.default.viewportHeight);\n            const leftIndicatorRightX = band.positionAtTimestamp(eventsBand.from);\n            this.indicatorsCtx.rect(0, indicatorTOP, leftIndicatorRightX, band.visibleHeight);\n            const rightIndicatorLeftX = band.positionAtTimestamp(eventsBand.to);\n            this.indicatorsCtx.rect(rightIndicatorLeftX, indicatorTOP, props_1.default.viewportWidth, band.visibleHeight);\n            this.indicatorsCtx.rect(leftIndicatorRightX, indicatorTOP + band.visibleHeight - constants_1.DATE_BAR_HEIGHT, rightIndicatorLeftX - leftIndicatorRightX, constants_1.DATE_BAR_HEIGHT);\n        }\n        this.indicatorsCtx.fillStyle = `rgba(0, 0, 0, .04)`;\n        this.indicatorsCtx.fill();\n        this.indicatorsCtx.closePath();\n        this.indicatorsDrawn = true;\n    }\n}\nexports.default = Canvas;\n\n\n//# sourceURL=webpack://Timeline/./src/views/canvas/index.ts?");

/***/ }),

/***/ "./src/views/canvas/rulers.ts":
/*!************************************!*\
  !*** ./src/views/canvas/rulers.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst props_1 = __webpack_require__(/*! ../../models/props */ \"./src/models/props.ts\");\nconst dates_1 = __webpack_require__(/*! ../../utils/dates */ \"./src/utils/dates.ts\");\nconst smallFont = \"11px sans-serif\";\nconst bigFont = \"13px sans-serif\";\nfunction isSpecialRuler(date, band) {\n    if (band.granularity === \"CENTURY\" && new Date(date).getUTCFullYear() % 1000 === 0)\n        return true;\n    if (band.granularity === \"YEAR_5\" && new Date(date).getUTCFullYear() % 50 === 0)\n        return true;\n    if (band.granularity === \"YEAR\" && new Date(date).getUTCFullYear() % 5 === 0)\n        return true;\n    return false;\n}\nfunction drawRuler(ctx, band, date, top, bottom) {\n    const left = band.positionAtTimestamp(date);\n    ctx.moveTo(left, top);\n    ctx.lineTo(left, bottom);\n    if (band.config.rulerLabels)\n        ctx.fillText(dates_1.labelBody(date, band.granularity), left + 3, bottom - 3);\n}\nfunction drawRulers(ctx, band) {\n    if (!band.config.rulers)\n        return;\n    let date = band.nextDate(band.from);\n    const y = band.config.topOffsetRatio * props_1.default.viewportHeight;\n    const height = band.config.heightRatio * props_1.default.viewportHeight;\n    const normalRulerDates = [];\n    const specialRulerDates = [];\n    while (date < band.to) {\n        if (isSpecialRuler(date, band))\n            specialRulerDates.push(date);\n        else\n            normalRulerDates.push(date);\n        date = band.nextDate(date);\n    }\n    ctx.beginPath();\n    ctx.font = smallFont;\n    ctx.fillStyle = `rgb(205, 205, 205)`;\n    for (const date of normalRulerDates) {\n        drawRuler(ctx, band, date, y, y + height);\n    }\n    ctx.strokeStyle = `rgb(235, 235, 235)`;\n    ctx.stroke();\n    ctx.beginPath();\n    ctx.font = bigFont;\n    ctx.fillStyle = `rgb(120, 120, 120)`;\n    for (const date of specialRulerDates) {\n        drawRuler(ctx, band, date, y, y + height);\n    }\n    ctx.strokeStyle = `rgb(150, 150, 150)`;\n    ctx.stroke();\n}\nexports.default = drawRulers;\n\n\n//# sourceURL=webpack://Timeline/./src/views/canvas/rulers.ts?");

/***/ }),

/***/ "./src/views/label.ts":
/*!****************************!*\
  !*** ./src/views/label.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../utils/create-element */ \"./src/utils/create-element.ts\");\nclass Label {\n    constructor(band) {\n        this.band = band;\n    }\n    render() {\n        const wrapper = create_element_1.default('div', 'events-label-wrapper', [\n            'border-top: 1px solid #CCC',\n            'pointer-events: none',\n            'position: absolute',\n            'width: 100%',\n            'z-index: 3',\n        ], [\n            `top: ${this.band.config.topOffsetRatio * 100}%`\n        ]);\n        const eventsLabel = create_element_1.default('div', 'events-label', [\n            'background: white',\n            'border-bottom-right-radius: 4px',\n            'box-shadow: 1px 2px 4px #AAA',\n            'color: #444',\n            'display: inline-block',\n            'font-family: sans-serif',\n            'font-size: .8em',\n            'padding: 4px 8px',\n        ]);\n        eventsLabel.innerText = this.band.config.label;\n        wrapper.appendChild(eventsLabel);\n        return wrapper;\n    }\n    resize() {\n    }\n}\nexports.default = Label;\n\n\n//# sourceURL=webpack://Timeline/./src/views/label.ts?");

/***/ })

/******/ });
});