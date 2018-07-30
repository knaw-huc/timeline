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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst props_1 = __webpack_require__(/*! ./models/props */ \"./src/models/props.ts\");\nvar Direction;\n(function (Direction) {\n    Direction[Direction[\"Backward\"] = -1] = \"Backward\";\n    Direction[Direction[\"Stop\"] = 0] = \"Stop\";\n    Direction[Direction[\"Forward\"] = 1] = \"Forward\";\n})(Direction || (Direction = {}));\nclass Animator {\n    constructor() {\n        this.goToDuration = 300;\n        this.zoomToDuration = 300;\n        this.interval = .00001;\n        this.multipliers = [.25, .5, 1, 2, 4, 8, 16];\n        this.multiplier = 1;\n        this.direction = Direction.Stop;\n        this.elapsedTimeTotal = 0;\n        this.modelUpdaters = [];\n        this.viewUpdaters = [];\n        this.animate = (timestamp) => {\n            const elapsedTime = this.prevTimestamp == null ? 0 : timestamp - this.prevTimestamp;\n            if (elapsedTime > 0 || this.prevTimestamp == null) {\n                if (this.centerMarker == null && this.zoomMarker == null) {\n                    props_1.default.center = props_1.default.center + (this.interval * this.multiplier * this.direction);\n                }\n                else if (this.centerMarker != null) {\n                    const timeRemaining = this.goToDuration - this.elapsedTimeTotal;\n                    const centerDelta = Math.abs(this.centerMarker - props_1.default.center) / (timeRemaining / elapsedTime);\n                    if (timeRemaining < elapsedTime) {\n                        props_1.default.center = this.centerMarker;\n                        this.stop();\n                    }\n                    else\n                        props_1.default.center = props_1.default.center + (centerDelta * this.direction);\n                }\n                else if (this.zoomMarker != null) {\n                    const timeRemaining = this.zoomToDuration - this.elapsedTimeTotal;\n                    const zoomDelta = (this.zoomMarker - props_1.default.eventsBand.zoomLevel) / (timeRemaining / elapsedTime);\n                    if (timeRemaining < elapsedTime) {\n                        props_1.default.eventsBand.zoomLevel = this.zoomMarker;\n                        this.stop();\n                    }\n                    else\n                        props_1.default.eventsBand.zoomLevel = props_1.default.eventsBand.zoomLevel + zoomDelta;\n                }\n                this.modelUpdaters.forEach(update => update());\n                this.viewUpdaters.forEach(update => update());\n            }\n            this.elapsedTimeTotal += elapsedTime;\n            if (this.isPlaying() || this.zoomMarker != null) {\n                if ((props_1.default.center > 0 && props_1.default.center < 1) || this.centerMarker != null) {\n                    this.prevTimestamp = timestamp;\n                    requestAnimationFrame(this.animate);\n                }\n                else {\n                    this.stop();\n                }\n            }\n        };\n    }\n    registerModelUpdaters(update) {\n        this.modelUpdaters.push(update);\n    }\n    registerViewUpdaters(update) {\n        this.viewUpdaters.push(update);\n    }\n    accelerate() {\n        const index = this.multipliers.indexOf(this.multiplier);\n        if (index === this.multipliers.length - 1)\n            return this.multipliers[this.multipliers.length - 1];\n        this.multiplier = this.multipliers[index + 1];\n        return this.multiplier;\n    }\n    decelerate() {\n        const index = this.multipliers.indexOf(this.multiplier);\n        if (index === 0)\n            return this.multipliers[0];\n        this.multiplier = this.multipliers[index - 1];\n        return this.multiplier;\n    }\n    goTo(nextCenter) {\n        this.centerMarker = nextCenter;\n        if (nextCenter > props_1.default.center)\n            this.playForward();\n        else\n            this.playBackward();\n    }\n    zoomTo(nextZoomLevel) {\n        if (nextZoomLevel < 0)\n            nextZoomLevel = 0;\n        this.zoomMarker = nextZoomLevel;\n        this.play();\n    }\n    speed(multiplier) {\n        const multiplier2 = parseFloat(multiplier);\n        if (this.multipliers.indexOf(multiplier2) === -1)\n            return;\n        this.multiplier = multiplier2;\n    }\n    isPlaying() {\n        return this.direction !== Direction.Stop;\n    }\n    isPlayingForward() {\n        return this.direction === Direction.Forward;\n    }\n    isPlayingBackward() {\n        return this.direction === Direction.Backward;\n    }\n    play() {\n        requestAnimationFrame(this.animate);\n    }\n    playForward() {\n        this.direction = Direction.Forward;\n        this.play();\n    }\n    playBackward() {\n        this.direction = Direction.Backward;\n        this.play();\n    }\n    stop() {\n        this.direction = Direction.Stop;\n        this.centerMarker = null;\n        this.zoomMarker = null;\n        this.prevTimestamp = null;\n        this.elapsedTimeTotal = 0;\n    }\n    toggle() {\n        this.isPlaying() ? this.stop() : this.play();\n    }\n}\nexports.Animator = Animator;\nexports.default = new Animator();\n\n\n//# sourceURL=webpack://Timeline/./src/animator.ts?");

/***/ }),

/***/ "./src/api.ts":
/*!********************!*\
  !*** ./src/api.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst animator_1 = __webpack_require__(/*! ./animator */ \"./src/animator.ts\");\nconst constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\nconst props_1 = __webpack_require__(/*! ./models/props */ \"./src/models/props.ts\");\nclass Api {\n    constructor(onChange) {\n        this.onChange = onChange;\n        this.animator = animator_1.default;\n        this.handleChange = () => {\n            const { from, to } = props_1.default.eventsBand;\n            this.onChange({\n                center: props_1.default.center,\n                visibleFrom: from,\n                visibleTo: to,\n            });\n        };\n        document.addEventListener('keydown', (ev) => {\n            if (ev.keyCode === 189)\n                props_1.default.eventsBand.zoomOut();\n            if (ev.keyCode === 187)\n                props_1.default.eventsBand.zoomIn();\n        });\n        document.addEventListener('wheel', (ev) => {\n            if (Math.abs(ev.deltaX) === 0 && ev.deltaY !== 0) {\n                const nz = props_1.default.eventsBand.zoomLevel += ev.deltaY / 20;\n                console.log(ev.deltaY, nz);\n                animator_1.default.zoomTo(nz);\n            }\n            else if (Math.abs(ev.deltaY) === 0 && ev.deltaX !== 0)\n                console.log('move');\n        });\n        if (this.onChange != null && typeof this.onChange === 'function') {\n            document.addEventListener(constants_1.CENTER_CHANGE_DONE, this.handleChange);\n        }\n    }\n    zoomIn() {\n        props_1.default.eventsBand.zoomIn();\n    }\n    zoomOut() {\n        props_1.default.eventsBand.zoomOut();\n        this.handleChange();\n    }\n}\nexports.default = Api;\n\n\n//# sourceURL=webpack://Timeline/./src/api.ts?");

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.EVENT_MIN_SPACE = 160;\nexports.EVENT_HEIGHT = 14;\nexports.EVENT_ROW_HEIGHT = 20;\nexports.DATE_BAR_HEIGHT = exports.EVENT_ROW_HEIGHT;\nexports.RULER_LABELS_HEIGHT = 60;\nexports.CENTER_CHANGE_DONE = 'CENTER_CHANGE_DONE';\nclass RawSegment {\n}\nexports.RawSegment = RawSegment;\nexports.colors = [\n    'rgba(211,84,0',\n    'rgba(219,10,91',\n    'rgba(31,58,147',\n    'rgba(0,128,0'\n].map(color => (opacity = 1) => `${color},${opacity})`);\n\n\n//# sourceURL=webpack://Timeline/./src/constants.ts?");

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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst props_1 = __webpack_require__(/*! ./models/props */ \"./src/models/props.ts\");\nconst index_1 = __webpack_require__(/*! ./models/config/index */ \"./src/models/config/index.ts\");\nexports.TimelineConfig = index_1.default;\nconst band_1 = __webpack_require__(/*! ./views/band */ \"./src/views/band/index.ts\");\nconst create_element_1 = __webpack_require__(/*! ./utils/create-element */ \"./src/utils/create-element.ts\");\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils/index.ts\");\nexports.calcPixelsPerMillisecond = utils_1.calcPixelsPerMillisecond;\nconst events_worker_1 = __webpack_require__(/*! ./utils/events.worker */ \"./src/utils/events.worker.ts\");\nexports.orderEvents = events_worker_1.orderEvents;\nexports.OrderedEvents = events_worker_1.OrderedEvents;\nconst api_1 = __webpack_require__(/*! ./api */ \"./src/api.ts\");\nconst events_1 = __webpack_require__(/*! ./views/band/events */ \"./src/views/band/events.ts\");\nconst canvas_1 = __webpack_require__(/*! ./views/canvas */ \"./src/views/canvas/index.ts\");\nclass Timeline extends api_1.default {\n    constructor(config, onChange) {\n        super(onChange);\n        this.config = config;\n        this.resize = () => {\n            props_1.default.dimensions = this.config.rootElement;\n            props_1.default.eventsBand.zoomLevel = props_1.default.eventsBand.zoomLevel;\n            props_1.default.minimapBands.forEach(mmb => mmb.zoomLevel = mmb.zoomLevel);\n            this.animator.play();\n        };\n        this.debouncedResize = utils_1.debounce(this.resize, 600);\n        this.reload = (config) => {\n            if (config != null)\n                props_1.default.init(config);\n            this.resize();\n        };\n        this.appendToWrapper = (child) => this.wrapper.appendChild(child.render());\n        props_1.default.init(config);\n        config.rootElement.appendChild(this.render());\n        window.addEventListener('resize', this.debouncedResize);\n    }\n    render() {\n        this.wrapper = create_element_1.default('div', 'wrapper', [\n            'box-sizing: border-box',\n            'height: 100%',\n            'overflow: hidden',\n            'position: relative',\n            'user-select: none',\n            'width: 100%',\n        ]);\n        this.appendToWrapper(new canvas_1.default());\n        this.appendToWrapper(new events_1.default(props_1.default.eventsBand));\n        props_1.default.minimapBands\n            .map(band => new band_1.default(band))\n            .forEach(this.appendToWrapper);\n        this.renderLabels();\n        return this.wrapper;\n    }\n    renderLabels() {\n        props_1.default.eventsBand.domains\n            .filter(d => d.label != null)\n            .map(d => {\n            const eventsLabel = create_element_1.default('div', 'events-label', [\n                'border-bottom-right-radius: 4px',\n                'color: #444',\n                'font-size: .8em',\n                'font-family: sans-serif',\n                'padding: 2px 4px',\n                'position: absolute',\n            ], [\n                `top: ${d.topOffsetRatio * 100}%`\n            ]);\n            eventsLabel.innerText = d.label;\n            this.wrapper.appendChild(eventsLabel);\n        });\n    }\n}\nexports.default = Timeline;\n\n\n//# sourceURL=webpack://Timeline/./src/index.ts?");

/***/ }),

/***/ "./src/models/band/events.ts":
/*!***********************************!*\
  !*** ./src/models/band/events.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst _1 = __webpack_require__(/*! . */ \"./src/models/band/index.ts\");\nconst animator_1 = __webpack_require__(/*! ../../animator */ \"./src/animator.ts\");\nconst constants_1 = __webpack_require__(/*! ../../constants */ \"./src/constants.ts\");\nconst props_1 = __webpack_require__(/*! ../props */ \"./src/models/props.ts\");\nclass EventsBand extends _1.default {\n    constructor(config) {\n        super(config);\n        this.domains = config.domains;\n    }\n    getEventByCoordinates(x, y) {\n        const timestamp = this.timestampAtProportion(this.proportionAtPosition(x));\n        const domain = this.domains.find(d => {\n            const top = props_1.default.viewportOffset + d.topOffsetRatio * props_1.default.viewportHeight;\n            const height = props_1.default.viewportOffset + d.heightRatio * props_1.default.viewportHeight;\n            return top < y && top + height > y;\n        });\n        const event = domain.orderedEvents.events.find(e => {\n            if (!(e.from < timestamp && e.from + e.time + e.space > timestamp))\n                return false;\n            const bottomOfDomain = props_1.default.viewportOffset + ((domain.topOffsetRatio + domain.heightRatio) * props_1.default.viewportHeight) - constants_1.DATE_BAR_HEIGHT;\n            const row = Math.floor((bottomOfDomain - y) / (constants_1.EVENT_HEIGHT + 2));\n            return e.row === row;\n        });\n        return event;\n    }\n    zoomIn() {\n        animator_1.default.zoomTo(this.zoomLevel + 1);\n    }\n    zoomOut() {\n        animator_1.default.zoomTo(this.zoomLevel - 1);\n    }\n}\nexports.default = EventsBand;\n\n\n//# sourceURL=webpack://Timeline/./src/models/band/events.ts?");

/***/ }),

/***/ "./src/models/band/index.ts":
/*!**********************************!*\
  !*** ./src/models/band/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst dates_1 = __webpack_require__(/*! ../../utils/dates */ \"./src/utils/dates.ts\");\nconst props_1 = __webpack_require__(/*! ../props */ \"./src/models/props.ts\");\nconst utils_1 = __webpack_require__(/*! ../../utils */ \"./src/utils/index.ts\");\nconst animator_1 = __webpack_require__(/*! ../../animator */ \"./src/animator.ts\");\nclass Band {\n    constructor(config) {\n        this.defaultZoomLevel = 0;\n        this.update = () => {\n            const offset = props_1.default.center * (props_1.default.time - this.time);\n            this.from = props_1.default.from + offset;\n            this.to = this.from + this.time;\n            this.left = Math.round(props_1.default.center * (props_1.default.viewportWidth - this.width));\n        };\n        this.zoomLevel = config.zoomLevel;\n        this.height = Math.round(config.domains.reduce((prev, curr) => prev + curr.heightRatio, 0) * props_1.default.viewportHeight);\n        this.top = Math.round(config.domains.reduce((prev, curr) => Math.min(prev, curr.topOffsetRatio), 1) * props_1.default.viewportHeight);\n        animator_1.default.registerModelUpdaters(this.update);\n    }\n    get left() { return this._left; }\n    set left(left) {\n        if (left < -this.width + props_1.default.viewportWidth)\n            left = props_1.default.viewportWidth - this.width;\n        else if (left > 0)\n            left = 0;\n        this._left = left;\n    }\n    get zoomLevel() { return this._zoomLevel; }\n    set zoomLevel(zoomLevel) {\n        this.visibleRatio = utils_1.visibleRatio(zoomLevel);\n        this.width = Math.round(props_1.default.viewportWidth / this.visibleRatio);\n        this.time = this.visibleRatio * props_1.default.time;\n        this.update();\n        this.granularity = dates_1.getGranularity(props_1.default.from, props_1.default.to, this.visibleRatio);\n        this.nextDate = dates_1.subsequentDate(this.granularity);\n        this.pixelsPerMillisecond = this.width / props_1.default.time;\n        this._zoomLevel = zoomLevel;\n    }\n    positionAtTimestamp(date) {\n        return Math.round((date - props_1.default.from) * this.pixelsPerMillisecond);\n    }\n    proportionAtPosition(position) {\n        return (Math.abs(this.left) + position) / this.width;\n    }\n    timestampAtProportion(proportion) {\n        return props_1.default.from + (props_1.default.time * proportion);\n    }\n}\nexports.default = Band;\n\n\n//# sourceURL=webpack://Timeline/./src/models/band/index.ts?");

/***/ }),

/***/ "./src/models/band/minimap.ts":
/*!************************************!*\
  !*** ./src/models/band/minimap.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst _1 = __webpack_require__(/*! . */ \"./src/models/band/index.ts\");\nclass MinimapBand extends _1.default {\n    constructor(config) {\n        super(config);\n        this.domains = config.domains;\n    }\n}\nexports.default = MinimapBand;\n\n\n//# sourceURL=webpack://Timeline/./src/models/band/minimap.ts?");

/***/ }),

/***/ "./src/models/config/index.ts":
/*!************************************!*\
  !*** ./src/models/config/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass DomainConfig {\n    constructor() {\n        this.heightRatio = 1;\n        this.rulers = true;\n        this.rulerLabels = true;\n        this.topOffsetRatio = 0;\n    }\n}\nexports.DomainConfig = DomainConfig;\nclass MinimapDomainConfig extends DomainConfig {\n    constructor() {\n        super(...arguments);\n        this.targets = [];\n    }\n}\nexports.MinimapDomainConfig = MinimapDomainConfig;\nclass EventsDomainConfig extends DomainConfig {\n}\nexports.EventsDomainConfig = EventsDomainConfig;\nclass BandConfig {\n    constructor() {\n        this.domains = [];\n        this.zoomLevel = 0;\n    }\n}\nexports.BandConfig = BandConfig;\nclass Config {\n    constructor() {\n        this.center = .5;\n        this.minimaps = [];\n    }\n}\nexports.default = Config;\n\n\n//# sourceURL=webpack://Timeline/./src/models/config/index.ts?");

/***/ }),

/***/ "./src/models/props.ts":
/*!*****************************!*\
  !*** ./src/models/props.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst constants_1 = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\nconst minimap_1 = __webpack_require__(/*! ./band/minimap */ \"./src/models/band/minimap.ts\");\nconst events_1 = __webpack_require__(/*! ./band/events */ \"./src/models/band/events.ts\");\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\nconst prepare_config_1 = __webpack_require__(/*! ../utils/prepare-config */ \"./src/utils/prepare-config.ts\");\nconst dates_1 = __webpack_require__(/*! ../utils/dates */ \"./src/utils/dates.ts\");\nclass Props {\n    constructor() {\n        this.defaultCenter = .5;\n        this._center = this.defaultCenter;\n        this.centerChangeDone = utils_1.debounce(() => {\n            document.dispatchEvent(new CustomEvent(constants_1.CENTER_CHANGE_DONE));\n        }, 300);\n    }\n    init(config) {\n        if (config.rootElement == null)\n            console.error('[init] No rootElement found');\n        this.dimensions = config.rootElement;\n        const froms = [];\n        const tos = [];\n        for (const domain of config.events.domains) {\n            let events;\n            if (domain.hasOwnProperty('events')) {\n                domain.events.sort(dates_1.byDate);\n                events = domain.events;\n            }\n            if (events == null)\n                events = domain.orderedEvents.events;\n            froms.push(events[0].date_min || events[0].date);\n            tos.push(events.reduce((prev, curr) => {\n                return Math.max(prev, curr.end_date || -Infinity, curr.end_date_max || -Infinity);\n            }, -Infinity));\n        }\n        this.from = Math.min(...froms);\n        this.to = Math.max(...tos);\n        const pixelsPerMillisecond = utils_1.calcPixelsPerMillisecond(this.viewportWidth, config.events.zoomLevel || 0, this.to - this.from);\n        config = prepare_config_1.default(config, pixelsPerMillisecond);\n        this.time = this.to - this.from;\n        if (config.center != null)\n            this.center = config.center;\n        this.minimapBands = config.minimaps.map(mm => new minimap_1.default(mm));\n        this.eventsBand = new events_1.default(config.events);\n    }\n    get center() { return this._center; }\n    set center(n) {\n        if ((this._center === 0 && n < 0) || (this._center === 1 && n > 1))\n            return;\n        else if (n < 0)\n            this._center = 0;\n        else if (n > 1)\n            this._center = 1;\n        else\n            this._center = n;\n        this.centerChangeDone();\n    }\n    set dimensions(rootElement) {\n        const style = getComputedStyle(rootElement);\n        this.viewportHeight = parseInt(style.getPropertyValue('height'), 10);\n        this.viewportOffset = rootElement.getBoundingClientRect().top;\n        this.viewportWidth = parseInt(style.getPropertyValue('width'), 10);\n    }\n}\nexports.Props = Props;\nexports.default = new Props();\n\n\n//# sourceURL=webpack://Timeline/./src/models/props.ts?");

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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.isEqual = (date1, date2) => date1.getTime() === date2.getTime();\nexports.format = (date, granularity) => {\n    if (date == null)\n        return '∞';\n    let displayDate = date.getFullYear().toString();\n    if (granularity >= 3) {\n        const months = [\n            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',\n            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',\n        ];\n        displayDate = `${months[date.getMonth()]} ${displayDate}`;\n    }\n    if (granularity >= 1) {\n        displayDate = `${date.getDate()} ${displayDate}`;\n    }\n    if (granularity === 0) {\n        displayDate = `${date.getHours()}:${date.getMinutes()} ${displayDate}`;\n    }\n    return displayDate;\n};\nexports.getGranularity = (from, to, visibleRatio) => {\n    const days = visibleRatio * ((to - from) / 86400000);\n    if (days < 1)\n        return 0;\n    if (days < 15)\n        return 1;\n    if (days < 45)\n        return 2;\n    if (days < 1.5 * 365)\n        return 3;\n    if (days < 15 * 365)\n        return 4;\n    if (days < 100 * 365)\n        return 5;\n    if (days < 200 * 365)\n        return 6;\n    if (days < 400 * 365)\n        return 7;\n    if (days < 3000 * 365)\n        return 8;\n    if (days < 6000 * 365)\n        return 9;\n    return 10;\n};\nexports.getStep = (granularity) => {\n    if (granularity === 4)\n        return 1;\n    if (granularity === 5)\n        return 5;\n    if (granularity === 6)\n        return 10;\n    if (granularity === 7)\n        return 50;\n    if (granularity === 8)\n        return 100;\n    if (granularity === 9)\n        return 500;\n    if (granularity === 10)\n        return 1000;\n    throw new RangeError(\"[getStep] Only steps with a granularity greater than 'year' calculated\");\n};\nfunction subsequentDate(granularity) {\n    if (granularity >= 4) {\n        const step = exports.getStep(granularity);\n        return (d) => {\n            let date = new Date(d);\n            const nextYear = date.getFullYear() + step;\n            if (nextYear > -1 && nextYear < 100) {\n                date = new Date(date);\n                date.setUTCFullYear(nextYear);\n                return date.getTime();\n            }\n            else {\n                return Date.UTC(nextYear, 0, 1);\n            }\n        };\n    }\n    if (granularity === 3) {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getFullYear(), date.getMonth() + 1, 1);\n        };\n    }\n    if (granularity === 2) {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 7);\n        };\n    }\n    if (granularity === 1) {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1);\n        };\n    }\n    if (granularity === 0) {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1);\n        };\n    }\n}\nexports.subsequentDate = subsequentDate;\nfunction byDate(a, b) {\n    const aFrom = a.date_min != null ? a.date_min : a.date;\n    const bFrom = b.date_min != null ? b.date_min : b.date;\n    if (aFrom < bFrom)\n        return -1;\n    if (aFrom > bFrom)\n        return 1;\n    const aTo = a.end_date_max != null ? a.end_date_max : a.end_date;\n    const bTo = b.end_date_max != null ? b.end_date_max : b.end_date;\n    if (aTo < bTo)\n        return -1;\n    if (aTo > bTo)\n        return 1;\n    return 0;\n}\nexports.byDate = byDate;\nconst days = [\"Sun\", \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\"];\nconst months = [\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"Jul\", \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\"];\nconst getWeekNumber = (date) => {\n    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));\n    const dayNum = d.getUTCDay() || 7;\n    d.setUTCDate(d.getUTCDate() + 4 - dayNum);\n    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));\n    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);\n};\nexports.labelBody = (d, granularity) => {\n    const date = new Date(d);\n    if (granularity >= 4) {\n        return date.getFullYear().toString();\n    }\n    else if (granularity === 3) {\n        let body = months[date.getMonth()];\n        if (date.getMonth() === 0)\n            body = `${date.getFullYear().toString()}, ${body}`;\n        return body;\n    }\n    else if (granularity === 2) {\n        return `${months[date.getMonth()]}<br />week ${getWeekNumber(date)}`;\n    }\n    else if (granularity === 1) {\n        let body = days[date.getDay()];\n        body = `${body}<br />${months[date.getMonth()]} ${date.getDate()}`;\n        if (date.getMonth() === 0 && date.getDate() === 1)\n            body = `${body}, ${date.getFullYear().toString()}`;\n        return body;\n    }\n    else if (granularity === 0) {\n        return 'NOT IMPLEMENTED';\n    }\n};\n\n\n//# sourceURL=webpack://Timeline/./src/utils/dates.ts?");

/***/ }),

/***/ "./src/utils/events.worker.ts":
/*!************************************!*\
  !*** ./src/utils/events.worker.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst constants_1 = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\nclass OrderedEvents {\n    constructor() {\n        this.events = [];\n        this.grid = [];\n        this.rowCount = 0;\n    }\n}\nexports.OrderedEvents = OrderedEvents;\nconst pixelsPerLetter = 8;\nfunction orderEvents(events, pixelsPerMillisecond) {\n    if (!events.length)\n        return new OrderedEvents();\n    let rowCount = 0;\n    const grid = [];\n    const paddingRight = constants_1.EVENT_HEIGHT * 2 / pixelsPerMillisecond;\n    const addRow = (event) => {\n        let row;\n        event.from = event.date_min || event.date;\n        event.to = event.end_date_max || event.end_date;\n        event.time = event.to == null ? 0 : event.to - event.from;\n        event.space = 0;\n        if (!event.time) {\n            if (event.label == null)\n                event.label = 'NO LABEL';\n            event.space = ((event.label.length * pixelsPerLetter) / pixelsPerMillisecond) + paddingRight;\n        }\n        let rowIterator = 0;\n        while (row == null && rowIterator < grid.length) {\n            let cellIterator = 0;\n            let hasSpace = true;\n            while (hasSpace && cellIterator < grid[rowIterator].length) {\n                if (event.to < grid[rowIterator][cellIterator][0])\n                    break;\n                hasSpace = event.from > grid[rowIterator][cellIterator][1];\n                cellIterator++;\n            }\n            if (hasSpace) {\n                grid[rowIterator].push([event.from, event.from + event.time + event.space]);\n                row = rowIterator;\n            }\n            rowIterator++;\n        }\n        if (row == null)\n            row = grid.push([[event.from, event.from + event.time + event.space]]) - 1;\n        if (row > rowCount)\n            rowCount = row;\n        event.row = row;\n        return event;\n    };\n    events = events.map(addRow);\n    return {\n        events,\n        grid,\n        rowCount\n    };\n}\nexports.orderEvents = orderEvents;\nfunction eventsWorker(e) {\n    importScripts(e.data.orderEventsURL);\n    postMessage(orderEvents(e.data.events));\n}\nexports.eventsWorker = eventsWorker;\nexports.default = (events, done) => {\n    const orderEventsURL = URL.createObjectURL(new Blob([orderEvents]));\n    const func = `onmessage = ${eventsWorker.toString()}`;\n    const objectURL = URL.createObjectURL(new Blob([func]));\n    let worker = new Worker(objectURL);\n    worker.postMessage({ events, orderEventsURL });\n    worker.onmessage = (e) => {\n        URL.revokeObjectURL(objectURL);\n        worker.terminate();\n        done(e.data);\n    };\n};\n\n\n//# sourceURL=webpack://Timeline/./src/utils/events.worker.ts?");

/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst dates_1 = __webpack_require__(/*! ./dates */ \"./src/utils/dates.ts\");\nexports.debounce = (func, wait) => {\n    let timeout;\n    return () => {\n        clearTimeout(timeout);\n        timeout = setTimeout(func, wait);\n    };\n};\nexports.onVisible = (from, to) => (e) => {\n    const eventFrom = e.date_min || e.date;\n    let eventTo = e.end_date_max || e.end_date;\n    if (eventTo == null)\n        eventTo = eventFrom;\n    if (eventFrom == null && eventTo == null)\n        return false;\n    return !(eventTo < from || eventFrom > to);\n};\nfunction findClosestRulerDate(timestamp, granularity) {\n    if (timestamp == null || isNaN(timestamp)) {\n        console.error('[findClosestRulerDate] start timestamp is not defined');\n        return;\n    }\n    const date = new Date(timestamp);\n    let year = date.getFullYear();\n    if (granularity >= 4) {\n        const step = dates_1.getStep(granularity);\n        if (granularity === 4)\n            year += 1;\n        else\n            while (year % step !== 0) {\n                year += 1;\n            }\n        if (year > -1 && year < 100) {\n            const nextDate = new Date(Date.UTC(year, 0, 1));\n            nextDate.setUTCFullYear(year);\n            return nextDate.getTime();\n        }\n        else {\n            return Date.UTC(year, 0, 1);\n        }\n    }\n    else if (granularity === 3) {\n        return Date.UTC(year, date.getMonth() + 1, 1);\n    }\n    else if (granularity === 1) {\n        return Date.UTC(year, date.getMonth(), date.getDate() + 1);\n    }\n    return timestamp;\n}\nexports.findClosestRulerDate = findClosestRulerDate;\nfunction visibleRatio(zoomLevel) {\n    return Math.pow(2, zoomLevel * -1);\n}\nexports.visibleRatio = visibleRatio;\nfunction createRange(n) {\n    return Array.apply(null, { length: n }).map(Number.call, Number);\n}\nexports.createRange = createRange;\nfunction selectRandom(set, amount) {\n    const selected = [];\n    while (selected.length < amount) {\n        const randomIndex = Math.floor(Math.random() * set.length);\n        const nextItem = set[randomIndex];\n        if (selected.indexOf(nextItem) === -1 || set.length < amount)\n            selected.push(nextItem);\n    }\n    return selected;\n}\nexports.selectRandom = selectRandom;\nfunction calcPixelsPerMillisecond(viewportWidth, zoomLevel, totalTime) {\n    return (viewportWidth / visibleRatio(zoomLevel)) / totalTime;\n}\nexports.calcPixelsPerMillisecond = calcPixelsPerMillisecond;\n\n\n//# sourceURL=webpack://Timeline/./src/utils/index.ts?");

/***/ }),

/***/ "./src/utils/prepare-config.ts":
/*!*************************************!*\
  !*** ./src/utils/prepare-config.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_1 = __webpack_require__(/*! ../models/config */ \"./src/models/config/index.ts\");\nconst events_worker_1 = __webpack_require__(/*! ./events.worker */ \"./src/utils/events.worker.ts\");\nfunction prepareConfig(config, pixelsPerMillisecond) {\n    if (config.events == null) {\n        console.error('[DomainConfig] No events band in config!');\n        return config;\n    }\n    if (config.events.domains == null || !config.events.domains.length) {\n        console.error('[DomainConfig] No events band domains in config!');\n        return config;\n    }\n    config.events.domains = config.events.domains.map(domainConfig => {\n        if (domainConfig.events == null && domainConfig.orderedEvents == null) {\n            console.error('[DomainConfig] No events in config!');\n        }\n        else if (domainConfig.orderedEvents == null) {\n            domainConfig.orderedEvents = events_worker_1.orderEvents(domainConfig.events, pixelsPerMillisecond);\n            delete domainConfig.events;\n        }\n        return Object.assign({}, new config_1.EventsDomainConfig(), domainConfig);\n    });\n    config = Object.assign({}, new config_1.default(), config);\n    config.events.domains = config.events.domains.map(d => (Object.assign({}, new config_1.EventsDomainConfig(), d)));\n    config.events = Object.assign({}, new config_1.BandConfig(), config.events);\n    config.minimaps = config.minimaps.map(mm => {\n        mm = Object.assign({}, new config_1.BandConfig(), mm);\n        if (!mm.domains.length)\n            mm.domains.push({});\n        mm.domains = mm.domains.map(d => (Object.assign({}, new config_1.MinimapDomainConfig(), d)));\n        return (Object.assign({}, new config_1.BandConfig(), mm));\n    });\n    return config;\n}\nexports.default = prepareConfig;\n\n\n//# sourceURL=webpack://Timeline/./src/utils/prepare-config.ts?");

/***/ }),

/***/ "./src/views/band/events.ts":
/*!**********************************!*\
  !*** ./src/views/band/events.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst index_1 = __webpack_require__(/*! ./index */ \"./src/views/band/index.ts\");\nconst event_bus_1 = __webpack_require__(/*! ../../event-bus */ \"./src/event-bus.ts\");\nfunction formatDate(ts) {\n    const d = new Date(ts);\n    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;\n}\nclass EventsBandView extends index_1.default {\n    constructor(band) {\n        super(band);\n        this.band = band;\n        this.onClick = (ev) => {\n            const event = this.band.getEventByCoordinates(ev.clientX, ev.clientY);\n            if (event)\n                console.log(event.label, formatDate(event.from), formatDate(event.to), event);\n        };\n    }\n    render() {\n        const root = super.render();\n        event_bus_1.default.register('click', this.onClick, this.rootElement);\n        return root;\n    }\n}\nexports.default = EventsBandView;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events.ts?");

/***/ }),

/***/ "./src/views/band/index.ts":
/*!*********************************!*\
  !*** ./src/views/band/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst props_1 = __webpack_require__(/*! ../../models/props */ \"./src/models/props.ts\");\nconst create_element_1 = __webpack_require__(/*! ../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst event_bus_1 = __webpack_require__(/*! ../../event-bus */ \"./src/event-bus.ts\");\nconst animator_1 = __webpack_require__(/*! ../../animator */ \"./src/animator.ts\");\nclass BandView {\n    constructor(band) {\n        this.band = band;\n        this.onMouseDown = (ev) => {\n            document.addEventListener('mouseup', this.onMouseUp);\n            this.dragOffset = ev.clientX;\n            this.dragStart = this.band.left;\n        };\n        this.onMouseMove = (ev) => {\n            if (this.dragOffset && this.band.zoomLevel > 0) {\n                const left = this.dragStart - (this.dragOffset - ev.clientX);\n                props_1.default.center = left / (props_1.default.viewportWidth - this.band.width);\n                animator_1.default.play();\n            }\n        };\n        this.onMouseUp = (ev) => {\n            this.dragOffset = null;\n            document.removeEventListener('mouseup', this.onMouseUp);\n        };\n        this.onDblClick = (ev) => {\n            const nextCenter = this.band.proportionAtPosition(ev.clientX);\n            animator_1.default.goTo(nextCenter);\n        };\n    }\n    render() {\n        this.rootElement = create_element_1.default('div', 'band-wrap', [\n            'position: absolute',\n            'z-index: 1',\n        ], [\n            `height: ${this.band.height}px`,\n            `top: ${this.band.top}px`,\n            `width: ${props_1.default.viewportWidth}px`,\n        ]);\n        if (this.band.zoomLevel > 0) {\n            event_bus_1.default.register('mousedown', this.onMouseDown, this.rootElement);\n            event_bus_1.default.register('mousemove', this.onMouseMove, this.rootElement);\n        }\n        event_bus_1.default.register('dblclick', this.onDblClick, this.rootElement);\n        return this.rootElement;\n    }\n}\nexports.default = BandView;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/index.ts?");

/***/ }),

/***/ "./src/views/canvas/index.ts":
/*!***********************************!*\
  !*** ./src/views/canvas/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst props_1 = __webpack_require__(/*! ../../models/props */ \"./src/models/props.ts\");\nconst constants_1 = __webpack_require__(/*! ../../constants */ \"./src/constants.ts\");\nconst utils_1 = __webpack_require__(/*! ../../utils */ \"./src/utils/index.ts\");\nconst dates_1 = __webpack_require__(/*! ../../utils/dates */ \"./src/utils/dates.ts\");\nconst animator_1 = __webpack_require__(/*! ../../animator */ \"./src/animator.ts\");\nclass Canvas {\n    constructor() {\n        this.font = \"10px sans-serif\";\n        this.update = () => {\n            if (this.canvas.width !== props_1.default.viewportWidth)\n                this.canvas.width = props_1.default.viewportWidth;\n            if (this.canvas.height !== props_1.default.viewportHeight)\n                this.canvas.height = props_1.default.viewportHeight;\n            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n            this.ctx.beginPath();\n            props_1.default.eventsBand.domains.forEach(domain => {\n                if (domain.rulers)\n                    this.drawRulers(props_1.default.eventsBand, domain);\n            });\n            props_1.default.minimapBands.forEach(band => {\n                band.domains.forEach(domain => {\n                    this.drawMinimap(band, domain);\n                    if (domain.rulers)\n                        this.drawRulers(band, domain);\n                    this.drawIndicators(band, domain);\n                });\n            });\n            this.ctx.closePath();\n            props_1.default.eventsBand.domains.forEach(domain => {\n                this.drawEvents(domain);\n            });\n            this.ctx.fillStyle = `rgba(255, 0, 0, .5)`;\n            const x = props_1.default.eventsBand.positionAtTimestamp(props_1.default.eventsBand.timestampAtProportion(props_1.default.center)) + props_1.default.eventsBand.left;\n            this.ctx.fillRect(x - 1, 0, 2, props_1.default.viewportHeight);\n        };\n        animator_1.default.registerViewUpdaters(this.update);\n        this.offsiteCanvas = create_element_1.default('canvas');\n        this.offsiteCtx = this.offsiteCanvas.getContext('2d');\n    }\n    render() {\n        this.canvas = create_element_1.default('canvas', 'minimap', [\n            'position: absolute',\n        ]);\n        this.canvas.width = props_1.default.viewportWidth;\n        this.canvas.height = props_1.default.viewportHeight;\n        this.ctx = this.canvas.getContext('2d');\n        this.ctx.font = this.font;\n        this.update();\n        return this.canvas;\n    }\n    drawEvents(domain) {\n        const band = props_1.default.eventsBand;\n        const left = band.positionAtTimestamp(band.from);\n        const offsetY = domain.topOffsetRatio * props_1.default.viewportHeight;\n        const domainHeight = (domain.heightRatio * props_1.default.viewportHeight) - constants_1.DATE_BAR_HEIGHT;\n        this.ctx.fillStyle = `rgba(126, 0, 0, .3)`;\n        this.ctx.beginPath();\n        for (const event of domain.orderedEvents.events) {\n            event.width = Math.round((event.time + event.space) * band.pixelsPerMillisecond);\n            if (event.width < 1)\n                event.width = 1;\n            event.left = band.positionAtTimestamp(event.from) - left;\n            event.top = offsetY + domainHeight - ((event.row + 1) * (constants_1.EVENT_HEIGHT + 2));\n            if (!event.time) {\n                this.ctx.moveTo(event.left, event.top + constants_1.EVENT_HEIGHT / 2);\n                this.ctx.arc(event.left, event.top + constants_1.EVENT_HEIGHT / 2, constants_1.EVENT_HEIGHT / 3, 0, 2 * Math.PI);\n            }\n            else {\n                this.ctx.fillRect(event.left, event.top, event.width, constants_1.EVENT_HEIGHT);\n            }\n        }\n        this.ctx.fill();\n        this.ctx.closePath();\n        this.ctx.fillStyle = `rgb(126, 0, 0)`;\n        for (const event of domain.orderedEvents.events) {\n            if (event.left < 0) {\n                event.width = event.width + event.left;\n                event.left = 0;\n            }\n            if ((event.label.length * 8) + 10 < event.width) {\n                const paddingLeft = event.time ? 3 : 8;\n                this.ctx.fillText(event.label, event.left + paddingLeft, event.top + constants_1.EVENT_HEIGHT - 3);\n            }\n        }\n    }\n    drawMinimap(band, domain) {\n        const maxHeight = band.height - constants_1.DATE_BAR_HEIGHT;\n        const maxRowCount = band.domains.reduce((prev, curr) => {\n            const counts = curr.targets.map(index => props_1.default.eventsBand.domains[index].orderedEvents.rowCount);\n            return Math.max(prev, ...counts);\n        }, 0);\n        let eventHeight = maxHeight / maxRowCount;\n        if (eventHeight < 1) {\n            eventHeight = 1;\n            this.offsiteCanvas.width = props_1.default.viewportWidth;\n            this.offsiteCanvas.height = maxRowCount;\n            drawEvents(this.offsiteCtx, maxRowCount, 0);\n            this.ctx.drawImage(this.offsiteCanvas, 0, band.top, props_1.default.viewportWidth, maxHeight);\n        }\n        else {\n            eventHeight = Math.round(eventHeight);\n            drawEvents(this.ctx, maxHeight);\n        }\n        function drawEvents(ctx, height, offsetY = band.top) {\n            const left = band.positionAtTimestamp(band.from);\n            ctx.fillStyle = `rgba(0, 0, 0, .2)`;\n            domain.targets.forEach(targetIndex => {\n                const targetDomain = props_1.default.eventsBand.domains[targetIndex];\n                const { events } = targetDomain.orderedEvents;\n                const visibleEvents = events.filter(utils_1.onVisible(band.from, band.to));\n                for (const event of visibleEvents) {\n                    const eventWidth = Math.round(event.time * band.pixelsPerMillisecond);\n                    const eventLeft = band.positionAtTimestamp(event.date_min != null ? event.date_min : event.date);\n                    const y = offsetY + height - ((event.row + 1) * eventHeight);\n                    const width = eventWidth < 1 ? 1 : eventWidth;\n                    ctx.fillRect(eventLeft - left, y, width, eventHeight);\n                }\n            });\n        }\n    }\n    drawIndicators(band, domain) {\n        this.ctx.fillStyle = `rgba(0, 0, 0, .1)`;\n        const indicatorTOP = Math.round(domain.topOffsetRatio * props_1.default.viewportHeight);\n        const leftIndicatorRightX = band.positionAtTimestamp(props_1.default.eventsBand.from) + band.left;\n        this.ctx.fillRect(0, indicatorTOP, leftIndicatorRightX, band.height);\n        const rightIndicatorLeftX = band.positionAtTimestamp(props_1.default.eventsBand.to) + band.left;\n        this.ctx.fillRect(rightIndicatorLeftX, indicatorTOP, props_1.default.viewportWidth, band.height);\n        this.ctx.fillRect(leftIndicatorRightX, indicatorTOP + band.height - constants_1.DATE_BAR_HEIGHT, rightIndicatorLeftX - leftIndicatorRightX, constants_1.DATE_BAR_HEIGHT);\n    }\n    drawRulers(band, domain) {\n        this.ctx.strokeStyle = `rgb(200, 200, 200)`;\n        this.ctx.fillStyle = `rgb(150, 150, 150)`;\n        let date = utils_1.findClosestRulerDate(band.from, band.granularity);\n        const y = domain.topOffsetRatio * props_1.default.viewportHeight;\n        const height = domain.heightRatio * props_1.default.viewportHeight;\n        while (date < band.to) {\n            const left = band.positionAtTimestamp(date) + band.left;\n            this.ctx.moveTo(left, y);\n            this.ctx.lineTo(left, y + height);\n            if (domain.rulerLabels)\n                this.ctx.fillText(dates_1.labelBody(date, band.granularity), left + 3, y + height - 3);\n            date = band.nextDate(date);\n        }\n        this.ctx.stroke();\n    }\n}\nexports.default = Canvas;\n\n\n//# sourceURL=webpack://Timeline/./src/views/canvas/index.ts?");

/***/ })

/******/ });
});