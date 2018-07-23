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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst props_1 = __webpack_require__(/*! ./models/props */ \"./src/models/props.ts\");\nvar Direction;\n(function (Direction) {\n    Direction[Direction[\"Backward\"] = -1] = \"Backward\";\n    Direction[Direction[\"Stop\"] = 0] = \"Stop\";\n    Direction[Direction[\"Forward\"] = 1] = \"Forward\";\n})(Direction || (Direction = {}));\nclass Animator {\n    constructor() {\n        this.goToDuration = 300;\n        this.interval = .00001;\n        this.multipliers = [.25, .5, 1, 2, 4, 8, 16];\n        this.multiplier = 1;\n        this.direction = Direction.Stop;\n        this.elapsedTimeTotal = 0;\n        this.updaters = [];\n        this.animate = (timestamp) => {\n            const elapsedTime = this.prevTimestamp == null ? 0 : timestamp - this.prevTimestamp;\n            if (elapsedTime > 0 || this.prevTimestamp == null) {\n                if (this.marker == null) {\n                    props_1.default.center = props_1.default.center + (this.interval * this.multiplier * this.direction);\n                }\n                else {\n                    const timeRemaining = this.goToDuration - this.elapsedTimeTotal;\n                    const centerDelta = Math.abs(this.marker - props_1.default.center) / (timeRemaining / elapsedTime);\n                    if (timeRemaining < elapsedTime) {\n                        props_1.default.center = this.marker;\n                        this.stop();\n                    }\n                    else\n                        props_1.default.center = props_1.default.center + (centerDelta * this.direction);\n                }\n                this.update();\n            }\n            this.elapsedTimeTotal += elapsedTime;\n            if (this.isPlaying() && props_1.default.center > 0 && props_1.default.center < 1) {\n                this.prevTimestamp = timestamp;\n                requestAnimationFrame(this.animate);\n            }\n        };\n        this.update = () => this.updaters.forEach(update => update());\n    }\n    registerUpdater(update) {\n        this.updaters.push(update);\n    }\n    accelerate() {\n        const index = this.multipliers.indexOf(this.multiplier);\n        if (index === this.multipliers.length - 1)\n            return this.multipliers[this.multipliers.length - 1];\n        this.multiplier = this.multipliers[index + 1];\n        return this.multiplier;\n    }\n    decelerate() {\n        const index = this.multipliers.indexOf(this.multiplier);\n        if (index === 0)\n            return this.multipliers[0];\n        this.multiplier = this.multipliers[index - 1];\n        return this.multiplier;\n    }\n    goTo(nextCenter) {\n        this.marker = nextCenter;\n        if (nextCenter > props_1.default.center)\n            this.playForward();\n        else\n            this.playBackward();\n    }\n    speed(multiplier) {\n        const multiplier2 = parseFloat(multiplier);\n        if (this.multipliers.indexOf(multiplier2) === -1)\n            return;\n        this.multiplier = multiplier2;\n    }\n    isPlaying() {\n        return this.direction !== Direction.Stop;\n    }\n    isPlayingForward() {\n        return this.direction === Direction.Forward;\n    }\n    isPlayingBackward() {\n        return this.direction === Direction.Backward;\n    }\n    play() {\n        requestAnimationFrame(this.animate);\n    }\n    playForward() {\n        this.direction = Direction.Forward;\n        this.play();\n    }\n    playBackward() {\n        this.direction = Direction.Backward;\n        this.play();\n    }\n    stop() {\n        this.direction = Direction.Stop;\n        this.marker = null;\n        this.prevTimestamp = null;\n        this.elapsedTimeTotal = 0;\n    }\n    toggle() {\n        this.isPlaying() ? this.stop() : this.play();\n    }\n}\nexports.Animator = Animator;\nexports.default = new Animator();\n\n\n//# sourceURL=webpack://Timeline/./src/animator.ts?");

/***/ }),

/***/ "./src/api.ts":
/*!********************!*\
  !*** ./src/api.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst animator_1 = __webpack_require__(/*! ./animator */ \"./src/animator.ts\");\nconst constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\nconst props_1 = __webpack_require__(/*! ./models/props */ \"./src/models/props.ts\");\nclass Api {\n    constructor() {\n        this.bands = [];\n        this.animator = animator_1.default;\n        this.handleChange = (onChange) => (ev) => {\n            const [from, to] = this.bands[0].domain.fromTo;\n            onChange({\n                center: props_1.default.center,\n                visibleFrom: from,\n                visibleTo: to,\n            }, ev);\n        };\n    }\n    init(onInit) {\n        const [from, to] = this.bands[0].domain.fromTo;\n        onInit({\n            center: props_1.default.center,\n            visibleFrom: from,\n            visibleTo: to,\n        });\n    }\n    change(onChange) {\n        document.addEventListener(constants_1.CENTER_CHANGE_DONE, this.handleChange(onChange));\n    }\n}\nexports.default = Api;\n\n\n//# sourceURL=webpack://Timeline/./src/api.ts?");

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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst props_1 = __webpack_require__(/*! ./models/props */ \"./src/models/props.ts\");\nconst config_1 = __webpack_require__(/*! ./models/config */ \"./src/models/config.ts\");\nexports.TimelineConfig = config_1.default;\nconst band_1 = __webpack_require__(/*! ./views/band */ \"./src/views/band/index.ts\");\nconst indicator_1 = __webpack_require__(/*! ./views/indicator */ \"./src/views/indicator/index.ts\");\nconst create_element_1 = __webpack_require__(/*! ./utils/create-element */ \"./src/utils/create-element.ts\");\nconst index_1 = __webpack_require__(/*! ./utils/index */ \"./src/utils/index.ts\");\nconst events_worker_1 = __webpack_require__(/*! ./utils/events.worker */ \"./src/utils/events.worker.ts\");\nexports.orderEvents = events_worker_1.orderEvents;\nexports.OrderedEvents = events_worker_1.OrderedEvents;\nconst api_1 = __webpack_require__(/*! ./api */ \"./src/api.ts\");\nconst event_bus_1 = __webpack_require__(/*! ./event-bus */ \"./src/event-bus.ts\");\nconst constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\nconst minimap_1 = __webpack_require__(/*! ./views/band/minimap */ \"./src/views/band/minimap/index.ts\");\nclass Timeline extends api_1.default {\n    constructor(config) {\n        super();\n        this.reload = (config) => {\n            config = config != null ? config : props_1.default.config;\n            props_1.default.init(config);\n            this.removeChildren();\n            this.renderBands();\n        };\n        this.debouncedReload = index_1.debounce(this.reload, 600);\n        this.appendToWrapper = (child) => this.wrapper.appendChild(child.render());\n        props_1.default.init(config);\n        config.rootElement.appendChild(this.render());\n        document.addEventListener(constants_1.CENTER_CHANGE_DONE, () => {\n            const data = {};\n            const body = document.getElementsByTagName('body')[0];\n            function countChildren(root) {\n                Array.from(root.children).forEach(child => {\n                    const name = `${child.tagName}-${child.className}`;\n                    data[name] = data.hasOwnProperty(name) ? ++data[name] : 1;\n                    countChildren(child);\n                });\n            }\n            countChildren(body);\n            console.log(data, props_1.default.visibleEvents.length);\n        });\n        window.addEventListener('resize', () => {\n            this.removeChildren();\n            this.debouncedReload();\n        });\n    }\n    removeChildren() {\n        event_bus_1.default.flush();\n        Array\n            .from(this.wrapper.children)\n            .forEach(child => this.wrapper.removeChild(child));\n    }\n    render() {\n        this.wrapper = create_element_1.default('div', 'wrapper', [\n            'box-sizing: border-box',\n            'height: 100%',\n            'overflow: hidden',\n            'position: relative',\n            'user-select: none',\n            'width: 100%',\n        ]);\n        this.renderBands();\n        return this.wrapper;\n    }\n    renderBands() {\n        this.bands = props_1.default.domains.map(d => new band_1.default(d));\n        this.bands.forEach(this.appendToWrapper);\n        this.renderLabels();\n        this.renderIndicators();\n    }\n    renderIndicators() {\n        this.bands\n            .map(band => new minimap_1.default(band.domain))\n            .forEach(this.appendToWrapper);\n        this.bands\n            .filter(band => band.domain.config.targets != null)\n            .map(band => new indicator_1.default(band.domain))\n            .forEach(this.appendToWrapper);\n    }\n    renderLabels() {\n        props_1.default.domains\n            .filter(d => d.config.label != null)\n            .map(d => {\n            const eventsLabel = create_element_1.default('div', 'events-label', [\n                'border-bottom-right-radius: 4px',\n                'color: #444',\n                'font-size: .8em',\n                'font-family: sans-serif',\n                'padding: 2px 4px',\n                'position: absolute',\n            ], [\n                `top: ${d.config.topOffsetRatio * 100}%`\n            ]);\n            eventsLabel.innerText = d.config.label;\n            this.wrapper.appendChild(eventsLabel);\n        });\n    }\n}\nexports.default = Timeline;\n\n\n//# sourceURL=webpack://Timeline/./src/index.ts?");

/***/ }),

/***/ "./src/models/config.ts":
/*!******************************!*\
  !*** ./src/models/config.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Config {\n    constructor() {\n        this.center = .5;\n        this.domains = [];\n        this.rootElement = null;\n    }\n}\nexports.default = Config;\n\n\n//# sourceURL=webpack://Timeline/./src/models/config.ts?");

/***/ }),

/***/ "./src/models/domain.config.ts":
/*!*************************************!*\
  !*** ./src/models/domain.config.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst events_worker_1 = __webpack_require__(/*! ../utils/events.worker */ \"./src/utils/events.worker.ts\");\nclass DomainConfig {\n    constructor(config, viewportWidth) {\n        this.events = [];\n        this.targets = null;\n        this.heightRatio = 1;\n        this.label = null;\n        this.orderedEvents = null;\n        this.rulers = true;\n        this.topOffsetRatio = 0;\n        this.type = 'events';\n        this.visibleRatio = 1;\n        if (config.type === 'events') {\n            if (config.events == null && config.orderedEvents == null)\n                console.error('[DomainConfig] No events in config!');\n            this.orderedEvents = (config.orderedEvents == null) ?\n                events_worker_1.orderEvents(config.events, viewportWidth, this.visibleRatio) :\n                config.orderedEvents;\n        }\n        Object.keys(config).forEach(k => {\n            if (this.hasOwnProperty(k))\n                this[k] = config[k];\n        });\n    }\n}\nexports.default = DomainConfig;\n\n\n//# sourceURL=webpack://Timeline/./src/models/domain.config.ts?");

/***/ }),

/***/ "./src/models/domain.ts":
/*!******************************!*\
  !*** ./src/models/domain.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst dates_1 = __webpack_require__(/*! ../utils/dates */ \"./src/utils/dates.ts\");\nconst dates_2 = __webpack_require__(/*! ../utils/dates */ \"./src/utils/dates.ts\");\nconst props_1 = __webpack_require__(/*! ./props */ \"./src/models/props.ts\");\nclass Domain {\n    constructor(config, color) {\n        this.config = config;\n        this.color = color;\n        this.height = props_1.default.viewportHeight * this.config.heightRatio;\n        this.width = props_1.default.viewportWidth / this.config.visibleRatio;\n        this.granularity = dates_1.getGranularity(props_1.default.from, props_1.default.to, this.config.visibleRatio);\n        this.nextDate = dates_2.subsequentDate(this.granularity);\n        this.pixelsPerMillisecond = this.width / props_1.default.time;\n        this.updateLeft();\n    }\n    get left() { return this._left; }\n    set left(left) {\n        if (left < -this.width + props_1.default.viewportWidth)\n            left = props_1.default.viewportWidth - this.width;\n        else if (left > 0)\n            left = 0;\n        this._left = left;\n    }\n    updateLeft() {\n        this.left = props_1.default.center * (props_1.default.viewportWidth - this.width);\n        return this.left;\n    }\n    positionAtDate(date) {\n        return (date - props_1.default.from) * this.pixelsPerMillisecond;\n    }\n    proportionAtPosition(position) {\n        return position / this.width;\n    }\n    dateAtProportion(proportion) {\n        return props_1.default.from + (props_1.default.time * proportion);\n    }\n    get fromTo() {\n        const visibleTime = this.config.visibleRatio * props_1.default.time;\n        const from = props_1.default.from + (props_1.default.center * (props_1.default.time - visibleTime));\n        const to = props_1.default.from + (props_1.default.center * (props_1.default.time - visibleTime)) + visibleTime;\n        return [from, to];\n    }\n}\nexports.default = Domain;\n\n\n//# sourceURL=webpack://Timeline/./src/models/domain.ts?");

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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst constants_1 = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\nconst domain_1 = __webpack_require__(/*! ./domain */ \"./src/models/domain.ts\");\nconst domain_config_1 = __webpack_require__(/*! ./domain.config */ \"./src/models/domain.config.ts\");\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\nfunction createRange(n) {\n    return Array.apply(null, { length: n }).map(Number.call, Number);\n}\nfunction selectRandom(set, amount) {\n    const selected = [];\n    while (selected.length < amount) {\n        const randomIndex = Math.floor(Math.random() * set.length);\n        const nextItem = set[randomIndex];\n        if (selected.indexOf(nextItem) === -1 || set.length < amount)\n            selected.push(nextItem);\n    }\n    return selected;\n}\nclass Props {\n    constructor() {\n        this.defaultCenter = .5;\n        this.visibleEvents = [];\n        this._center = this.defaultCenter;\n        this.centerChangeDone = utils_1.debounce(() => {\n            this.calculateVisibleEvents();\n            document.dispatchEvent(new CustomEvent(constants_1.CENTER_CHANGE_DONE));\n        }, 300);\n    }\n    init(config) {\n        this.dimensions = config.rootElement;\n        this.config = Object.assign({}, config, { domains: config.domains.map(d => new domain_config_1.default(d, this.viewportWidth)) });\n        const dates = this.config.domains\n            .filter(d => d.type === 'events')\n            .reduce((prev, curr) => {\n            const { events } = curr.orderedEvents;\n            const firstEvent = events[0];\n            const lastEvent = events[events.length - 1];\n            prev.push(firstEvent.date_min, firstEvent.date, firstEvent.end_date, firstEvent.end_date_max);\n            prev.push(lastEvent.date_min, lastEvent.date, lastEvent.end_date, lastEvent.end_date_max);\n            return prev;\n        }, [])\n            .filter(d => d != null);\n        this.from = Math.min(...dates);\n        this.to = Math.max(...dates);\n        this.time = this.to - this.from;\n        if (config.center != null)\n            this.center = config.center;\n        const indices = selectRandom(createRange(constants_1.colors.length), this.config.domains.filter(d => d.type === 'events').length);\n        this.domains = this.config.domains.map((d, i) => new domain_1.default(d, constants_1.colors[indices[i]]));\n    }\n    get center() { return this._center; }\n    set center(n) {\n        if ((this._center === 0 && n < 0) || (this._center === 1 && n > 1))\n            return;\n        else if (n < 0)\n            this._center = 0;\n        else if (n > 1)\n            this._center = 1;\n        else\n            this._center = n;\n        this.centerChangeDone();\n    }\n    set dimensions(rootElement) {\n        const style = getComputedStyle(rootElement);\n        const nextWidth = parseInt(style.getPropertyValue('width'), 10);\n        const nextHeight = parseInt(style.getPropertyValue('height'), 10);\n        this.viewportWidth = nextWidth;\n        this.viewportHeight = nextHeight;\n    }\n    calculateVisibleEvents() {\n        const [from, to] = this.domains.find(d => d.config.type === 'events').fromTo;\n        this.visibleEvents = this.domains\n            .filter(d => d.config.type === 'events')\n            .reduce((prev, curr) => {\n            return prev.concat(curr.config.orderedEvents.events.filter(utils_1.onVisible(from, to)));\n        }, []);\n    }\n}\nexports.Props = Props;\nexports.default = new Props();\n\n\n//# sourceURL=webpack://Timeline/./src/models/props.ts?");

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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.isEqual = (date1, date2) => date1.getTime() === date2.getTime();\nexports.format = (date, granularity) => {\n    if (date == null)\n        return '∞';\n    let displayDate = date.getFullYear().toString();\n    if (granularity >= 3) {\n        const months = [\n            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',\n            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',\n        ];\n        displayDate = `${months[date.getMonth()]} ${displayDate}`;\n    }\n    if (granularity >= 1) {\n        displayDate = `${date.getDate()} ${displayDate}`;\n    }\n    if (granularity === 0) {\n        displayDate = `${date.getHours()}:${date.getMinutes()} ${displayDate}`;\n    }\n    return displayDate;\n};\nexports.getGranularity = (from, to, visibleRatio) => {\n    const days = visibleRatio * ((to - from) / 86400000);\n    if (days < 1)\n        return 0;\n    if (days < 15)\n        return 1;\n    if (days < 45)\n        return 2;\n    if (days < 1.5 * 365)\n        return 3;\n    if (days < 15 * 365)\n        return 4;\n    if (days < 200 * 365)\n        return 5;\n    if (days < 400 * 365)\n        return 6;\n    if (days < 3000 * 365)\n        return 7;\n    if (days < 6000 * 365)\n        return 8;\n    return 9;\n};\nexports.getStep = (granularity) => {\n    if (granularity === 4)\n        return 1;\n    if (granularity === 5)\n        return 10;\n    if (granularity === 6)\n        return 50;\n    if (granularity === 7)\n        return 100;\n    if (granularity === 8)\n        return 500;\n    if (granularity === 9)\n        return 1000;\n    throw new RangeError(\"[getStep] Only steps with a granularity greater than 'year' calculated\");\n};\nfunction subsequentDate(granularity) {\n    if (granularity >= 4) {\n        const step = exports.getStep(granularity);\n        return (d) => {\n            let date = new Date(d);\n            const nextYear = date.getFullYear() + step;\n            if (nextYear > -1 && nextYear < 100) {\n                date = new Date(date);\n                date.setUTCFullYear(nextYear);\n                return date.getTime();\n            }\n            else {\n                return Date.UTC(nextYear, 0, 1);\n            }\n        };\n    }\n    if (granularity === 3) {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getFullYear(), date.getMonth() + 1, 1);\n        };\n    }\n    if (granularity === 2) {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 7);\n        };\n    }\n    if (granularity === 1) {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1);\n        };\n    }\n    if (granularity === 0) {\n        return (d) => {\n            const date = new Date(d);\n            return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1);\n        };\n    }\n}\nexports.subsequentDate = subsequentDate;\nfunction byDate(a, b) {\n    const aFrom = a.date_min != null ? a.date_min : a.date;\n    const bFrom = b.date_min != null ? b.date_min : b.date;\n    if (aFrom < bFrom)\n        return -1;\n    if (aFrom > bFrom)\n        return 1;\n    const aTo = a.end_date_max != null ? a.end_date_max : a.end_date;\n    const bTo = b.end_date_max != null ? b.end_date_max : b.end_date;\n    if (aTo < bTo)\n        return -1;\n    if (aTo > bTo)\n        return 1;\n    return 0;\n}\nexports.byDate = byDate;\nconst days = [\"Sun\", \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\"];\nconst months = [\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"Jul\", \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\"];\nconst getWeekNumber = (date) => {\n    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));\n    const dayNum = d.getUTCDay() || 7;\n    d.setUTCDate(d.getUTCDate() + 4 - dayNum);\n    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));\n    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);\n};\nexports.labelBody = (d, granularity) => {\n    const date = new Date(d);\n    if (granularity >= 4) {\n        return date.getFullYear().toString();\n    }\n    else if (granularity === 3) {\n        let body = months[date.getMonth()];\n        if (date.getMonth() === 0)\n            body = `${date.getFullYear().toString()}, ${body}`;\n        return body;\n    }\n    else if (granularity === 2) {\n        return `${months[date.getMonth()]}<br />week ${getWeekNumber(date)}`;\n    }\n    else if (granularity === 1) {\n        let body = days[date.getDay()];\n        body = `${body}<br />${months[date.getMonth()]} ${date.getDate()}`;\n        if (date.getMonth() === 0 && date.getDate() === 1)\n            body = `${body}, ${date.getFullYear().toString()}`;\n        return body;\n    }\n    else if (granularity === 0) {\n        return 'NOT IMPLEMENTED';\n    }\n};\n\n\n//# sourceURL=webpack://Timeline/./src/utils/dates.ts?");

/***/ }),

/***/ "./src/utils/events.worker.ts":
/*!************************************!*\
  !*** ./src/utils/events.worker.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass OrderedEvents {\n    constructor() {\n        this.events = [];\n        this.from = null;\n        this.to = null;\n        this.grid = [];\n        this.rowCount = 0;\n    }\n}\nexports.OrderedEvents = OrderedEvents;\nfunction orderEvents(events, viewportWidth, visibleRatio) {\n    if (!events.length)\n        return new OrderedEvents();\n    let rowCount = 0;\n    const grid = [];\n    const firstEvent = events[0];\n    const from = firstEvent.date_min != null ? firstEvent.date_min : firstEvent.date;\n    const lastEvent = events[events.length - 1];\n    const to = lastEvent.end_date_max != null ?\n        lastEvent.end_date_max :\n        lastEvent.end_date != null ?\n            lastEvent.end_date :\n            lastEvent.date;\n    const millisecondsPerPixel = (to - from) / (viewportWidth / visibleRatio);\n    const eventMinWidth = millisecondsPerPixel * viewportWidth * .1;\n    const addRow = (event) => {\n        let row;\n        const from = event.date_min != null ? event.date_min : event.date;\n        let to = event.end_date_max != null ? event.end_date_max : event.end_date;\n        if (to == null || (to - from) < eventMinWidth)\n            to = from + eventMinWidth;\n        let rowIterator = 0;\n        while (row == null && rowIterator < grid.length) {\n            const rows = grid[rowIterator];\n            let cellIterator = 0;\n            let hasSpace = true;\n            while (hasSpace && cellIterator < rows.length) {\n                hasSpace = (to < rows[cellIterator][0] || from > rows[cellIterator][1]);\n                cellIterator++;\n            }\n            if (hasSpace) {\n                rows.push([from, to]);\n                row = rowIterator;\n            }\n            rowIterator++;\n        }\n        if (row == null)\n            row = grid.push([[from, to]]) - 1;\n        if (row > rowCount)\n            rowCount = row;\n        event.row = row;\n        return event;\n    };\n    return {\n        events: events.map(addRow),\n        from,\n        to,\n        grid,\n        rowCount\n    };\n}\nexports.orderEvents = orderEvents;\nfunction eventsWorker(e) {\n    importScripts(e.data.orderEventsURL);\n    postMessage(orderEvents(e.data.events));\n}\nexports.eventsWorker = eventsWorker;\nexports.default = (events, done) => {\n    const orderEventsURL = URL.createObjectURL(new Blob([orderEvents]));\n    const func = `onmessage = ${eventsWorker.toString()}`;\n    const objectURL = URL.createObjectURL(new Blob([func]));\n    let worker = new Worker(objectURL);\n    worker.postMessage({ events, orderEventsURL });\n    worker.onmessage = (e) => {\n        URL.revokeObjectURL(objectURL);\n        worker.terminate();\n        done(e.data);\n    };\n};\n\n\n//# sourceURL=webpack://Timeline/./src/utils/events.worker.ts?");

/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst dates_1 = __webpack_require__(/*! ./dates */ \"./src/utils/dates.ts\");\nexports.debounce = (func, wait) => {\n    let timeout;\n    return () => {\n        clearTimeout(timeout);\n        timeout = setTimeout(func, wait);\n    };\n};\nexports.onVisible = (from, to) => (e) => {\n    const eventFrom = e.date_min || e.date;\n    let eventTo = e.end_date_max || e.end_date;\n    if (eventTo == null)\n        eventTo = eventFrom;\n    if (eventFrom == null && eventTo == null)\n        return false;\n    return !(eventTo < from || eventFrom > to);\n};\nfunction findClosestRulerDate(timestamp, granularity) {\n    if (timestamp == null || isNaN(timestamp)) {\n        console.error('[findClosestRulerDate] start timestamp is not defined');\n        return;\n    }\n    const date = new Date(timestamp);\n    let year = date.getFullYear();\n    if (granularity >= 4) {\n        const step = dates_1.getStep(granularity);\n        if (granularity === 4)\n            year += 1;\n        else\n            while (year % step !== 0) {\n                year += 1;\n            }\n        return Date.UTC(year, 0, 1);\n    }\n    else if (granularity === 3) {\n        return Date.UTC(year, date.getMonth() + 1, 1);\n    }\n    else if (granularity === 1) {\n        return Date.UTC(year, date.getMonth(), date.getDate() + 1);\n    }\n    return timestamp;\n}\nexports.findClosestRulerDate = findClosestRulerDate;\n\n\n//# sourceURL=webpack://Timeline/./src/utils/index.ts?");

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

/***/ "./src/views/animatable.ts":
/*!*********************************!*\
  !*** ./src/views/animatable.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst animator_1 = __webpack_require__(/*! ../animator */ \"./src/animator.ts\");\nclass Animatable {\n    register() {\n        animator_1.default.registerUpdater(this.update);\n    }\n}\nexports.default = Animatable;\n\n\n//# sourceURL=webpack://Timeline/./src/views/animatable.ts?");

/***/ }),

/***/ "./src/views/band/events/event-segment.ts":
/*!************************************************!*\
  !*** ./src/views/band/events/event-segment.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst event_1 = __webpack_require__(/*! ../../../models/event */ \"./src/models/event.ts\");\nconst point_in_time_1 = __webpack_require__(/*! ./event/point-in-time */ \"./src/views/band/events/event/point-in-time/index.ts\");\nconst interval_1 = __webpack_require__(/*! ./event/interval */ \"./src/views/band/events/event/interval/index.ts\");\nclass Segment {\n    constructor(domain, segmentData, rootElement) {\n        this.domain = domain;\n        this.rootElement = rootElement;\n        this.rendered = false;\n        this.rawEvents = segmentData.events;\n    }\n    renderChildren() {\n        if (this.rendered)\n            return;\n        const frag = document.createDocumentFragment();\n        for (let i = 0; i < this.rawEvents.length; i++) {\n            const rawEvent = this.rawEvents[i];\n            const event = new event_1.default(rawEvent, this.domain);\n            const EventClass = event.isInterval() ? interval_1.default : point_in_time_1.default;\n            const view = new EventClass(this.domain, event);\n            frag.appendChild(view.render());\n        }\n        this.rootElement.appendChild(frag);\n        this.rendered = true;\n    }\n}\nexports.default = Segment;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events/event-segment.ts?");

/***/ }),

/***/ "./src/views/band/events/event/interval/index.ts":
/*!*******************************************************!*\
  !*** ./src/views/band/events/event/interval/index.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst constants_1 = __webpack_require__(/*! ../../../../../constants */ \"./src/constants.ts\");\nconst props_1 = __webpack_require__(/*! ../../../../../models/props */ \"./src/models/props.ts\");\nclass Interval {\n    constructor(domain, event) {\n        this.domain = domain;\n        this.event = event;\n    }\n    render() {\n        const li = create_element_1.default('li', 'interval-wrap', [\n            'box-sizing: border-box',\n            'font-size: 0.8em',\n            `height: ${constants_1.EVENT_ROW_HEIGHT - 6}px`,\n            'position: absolute',\n            'white-space: nowrap',\n            'z-index: 1',\n        ], [\n            `background-color: ${this.domain.color(.25)}`,\n            `left: ${this.event.left}px`,\n            `bottom: ${(this.event.row) * constants_1.EVENT_ROW_HEIGHT}px`,\n            `width: ${this.event.width}px`,\n        ]);\n        const title = create_element_1.default('div', 'interval-title', [\n            'display: inline-block',\n            `line-height: ${constants_1.EVENT_ROW_HEIGHT - 6}px`,\n            `max-width: ${props_1.default.viewportWidth / 10}px`,\n            'overflow: hidden',\n            'padding: 0 .25em',\n            'text-overflow: ellipsis',\n        ]);\n        title.textContent = this.event.label;\n        title.title = this.event.label;\n        li.appendChild(title);\n        return li;\n    }\n}\nexports.default = Interval;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events/event/interval/index.ts?");

/***/ }),

/***/ "./src/views/band/events/event/point-in-time/index.ts":
/*!************************************************************!*\
  !*** ./src/views/band/events/event/point-in-time/index.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst constants_1 = __webpack_require__(/*! ../../../../../constants */ \"./src/constants.ts\");\nconst create_element_1 = __webpack_require__(/*! ../../../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst props_1 = __webpack_require__(/*! ../../../../../models/props */ \"./src/models/props.ts\");\nclass PointInTime {\n    constructor(domain, event) {\n        this.domain = domain;\n        this.event = event;\n    }\n    render() {\n        this.domain;\n        const li = create_element_1.default('li', 'pit-wrap', [\n            'box-sizing: border-box',\n            'font-size: 0.8em',\n            `height: ${constants_1.EVENT_HEIGHT}px`,\n            `margin-left: -${constants_1.EVENT_HEIGHT / 2}px`,\n            'position: absolute',\n            'white-space: nowrap',\n            `max-width: ${constants_1.EVENT_MIN_SPACE}px`,\n            `z-index: 1`,\n        ], [\n            `left: ${this.event.left}px`,\n            `bottom: ${(this.event.row) * constants_1.EVENT_ROW_HEIGHT}px`,\n        ]);\n        const title = create_element_1.default('div', 'pit-title', [\n            'background-color: rgba(255,255,255,.75)',\n            'display: inline-block',\n            `line-height: ${constants_1.EVENT_HEIGHT}px`,\n            `max-width: ${props_1.default.viewportWidth / 10}px`,\n            'overflow: hidden',\n            'padding: 0 .25em',\n            'text-overflow: ellipsis',\n        ]);\n        title.textContent = this.event.label;\n        title.title = this.event.label;\n        const point = create_element_1.default('div', 'pit-point', [\n            'background-image: radial-gradient(white 20%, black 100%)',\n            `border-radius: ${constants_1.EVENT_HEIGHT / 2}px`,\n            'display: inline-block',\n            `width: ${constants_1.EVENT_HEIGHT}px`,\n            `height: ${constants_1.EVENT_HEIGHT}px`,\n        ]);\n        li.appendChild(point);\n        li.appendChild(title);\n        return li;\n    }\n}\nexports.default = PointInTime;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events/event/point-in-time/index.ts?");

/***/ }),

/***/ "./src/views/band/events/index.ts":
/*!****************************************!*\
  !*** ./src/views/band/events/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst props_1 = __webpack_require__(/*! ../../../models/props */ \"./src/models/props.ts\");\nconst event_segment_1 = __webpack_require__(/*! ./event-segment */ \"./src/views/band/events/event-segment.ts\");\nconst segments_worker_1 = __webpack_require__(/*! ../../../utils/segments.worker */ \"./src/utils/segments.worker.ts\");\nconst constants_1 = __webpack_require__(/*! ../../../constants */ \"./src/constants.ts\");\nconst animatable_1 = __webpack_require__(/*! ../../animatable */ \"./src/views/animatable.ts\");\nclass Events extends animatable_1.default {\n    constructor(domain) {\n        super();\n        this.domain = domain;\n        this.eventSegments = [];\n        this.update = () => {\n            let index = Math.floor((this.eventSegments.length - 1) * props_1.default.center);\n            this.eventSegments[index].renderChildren();\n            for (let i = index - 2; i <= index + 2; i++) {\n                const eventSegment = this.eventSegments[i];\n                if (i >= 0 && i < this.eventSegments.length) {\n                    if (i !== index)\n                        eventSegment.renderChildren();\n                }\n            }\n        };\n        this.register();\n    }\n    render() {\n        const eventsBand = create_element_1.default('div', 'events-band');\n        const eventSegmentsWrap = create_element_1.default('ul', 'events', [\n            `bottom: ${constants_1.DATE_BAR_HEIGHT}px`,\n            `list-style: none`,\n            'position: absolute',\n        ], [\n            `height: ${this.domain.height}px`,\n        ]);\n        segments_worker_1.default({\n            events: this.domain.config.orderedEvents.events,\n            center: props_1.default.center,\n            visibleRatio: this.domain.config.visibleRatio,\n            from: new Date(props_1.default.from).getTime(),\n            time: props_1.default.time\n        }, (segments) => {\n            segments.forEach(s => {\n                const eventSegment = new event_segment_1.default(this.domain, s, eventSegmentsWrap);\n                this.eventSegments.push(eventSegment);\n            });\n            this.update();\n            eventsBand.appendChild(eventSegmentsWrap);\n        });\n        return eventsBand;\n    }\n}\nexports.default = Events;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events/index.ts?");

/***/ }),

/***/ "./src/views/band/index.ts":
/*!*********************************!*\
  !*** ./src/views/band/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst props_1 = __webpack_require__(/*! ../../models/props */ \"./src/models/props.ts\");\nconst create_element_1 = __webpack_require__(/*! ../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst events_1 = __webpack_require__(/*! ./events */ \"./src/views/band/events/index.ts\");\nconst event_bus_1 = __webpack_require__(/*! ../../event-bus */ \"./src/event-bus.ts\");\nconst animator_1 = __webpack_require__(/*! ../../animator */ \"./src/animator.ts\");\nconst animatable_1 = __webpack_require__(/*! ../animatable */ \"./src/views/animatable.ts\");\nclass Band extends animatable_1.default {\n    constructor(domain) {\n        super();\n        this.domain = domain;\n        this.update = () => {\n            this.rootElement.style.transform = `translate3d(${this.domain.updateLeft()}px, 0, 0)`;\n        };\n        this.onMouseDown = (ev) => {\n            document.addEventListener('mouseup', this.onMouseUp);\n            this.dragOffset = ev.clientX;\n            this.dragStart = this.domain.left;\n        };\n        this.onMouseMove = (ev) => {\n            if (this.dragOffset) {\n                const left = this.dragStart - (this.dragOffset - ev.clientX);\n                props_1.default.center = left / (props_1.default.viewportWidth - this.domain.width);\n                animator_1.default.play();\n            }\n        };\n        this.onMouseUp = (ev) => {\n            this.dragOffset = null;\n            document.removeEventListener('mouseup', this.onMouseUp);\n        };\n        this.onDblClick = (ev) => {\n            const rootLeft = this.rootElement.getBoundingClientRect().left;\n            const nextCenter = this.domain.proportionAtPosition(ev.clientX - rootLeft);\n            animator_1.default.goTo(nextCenter);\n        };\n        this.register();\n    }\n    render() {\n        this.rootElement = create_element_1.default('div', 'band-wrap', [\n            'position: absolute',\n            'z-index: 1',\n        ], [\n            `box-shadow: inset 0 6px 20px ${this.domain.color != null ? this.domain.color(.1) : '#eee'}`,\n            `height: ${this.domain.config.heightRatio * 100}%`,\n            `top: ${this.domain.config.topOffsetRatio * 100}%`,\n            `transform: translate3d(${this.domain.left}px, 0, 0)`,\n            `width: ${this.domain.width}px`,\n        ]);\n        if (this.domain.config.type === 'events') {\n            this.eventsBand = new events_1.default(this.domain);\n            this.rootElement.appendChild(this.eventsBand.render());\n        }\n        if (this.domain.config.visibleRatio < 1) {\n            event_bus_1.default.register('mousedown', this.onMouseDown, this.rootElement);\n            event_bus_1.default.register('mousemove', this.onMouseMove, this.rootElement);\n        }\n        event_bus_1.default.register('dblclick', this.onDblClick, this.rootElement);\n        return this.rootElement;\n    }\n}\nexports.default = Band;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/index.ts?");

/***/ }),

/***/ "./src/views/band/minimap/index.ts":
/*!*****************************************!*\
  !*** ./src/views/band/minimap/index.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst props_1 = __webpack_require__(/*! ../../../models/props */ \"./src/models/props.ts\");\nconst event_1 = __webpack_require__(/*! ../../../models/event */ \"./src/models/event.ts\");\nconst constants_1 = __webpack_require__(/*! ../../../constants */ \"./src/constants.ts\");\nconst animatable_1 = __webpack_require__(/*! ../../animatable */ \"./src/views/animatable.ts\");\nconst utils_1 = __webpack_require__(/*! ../../../utils */ \"./src/utils/index.ts\");\nconst dates_1 = __webpack_require__(/*! ../../../utils/dates */ \"./src/utils/dates.ts\");\nclass MiniMap extends animatable_1.default {\n    constructor(domain) {\n        super();\n        this.domain = domain;\n        this.update = () => {\n            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n            const [from, to] = this.domain.fromTo;\n            const left = this.domain.positionAtDate(from);\n            this.ctx.beginPath();\n            if (this.domain.config.type === 'minimap') {\n                this.domain.config.targets.forEach(targetIndex => {\n                    const targetDomain = props_1.default.domains[targetIndex];\n                    this.ctx.fillStyle = targetDomain.color(.5);\n                    const { events } = targetDomain.config.orderedEvents;\n                    const visibleEvents = events.filter(utils_1.onVisible(from, to));\n                    for (let i = 0; i < visibleEvents.length; i++) {\n                        const event = new event_1.default(visibleEvents[i], this.domain);\n                        const y = this.maxHeight - ((event.row + 1) * this.eventHeight);\n                        const width = event.width < 1 ? 1 : event.width;\n                        this.ctx.fillRect(event.left - left, y, width, this.eventHeight);\n                    }\n                });\n            }\n            this.ctx.strokeStyle = `rgb(235, 235, 235)`;\n            this.ctx.fillStyle = `rgb(150, 150, 150)`;\n            let date = utils_1.findClosestRulerDate(from, this.domain.granularity);\n            while (date < to) {\n                const left = this.domain.positionAtDate(date) + this.domain.left;\n                this.ctx.moveTo(left, 0);\n                this.ctx.lineTo(left, this.domain.height);\n                this.ctx.fillText(dates_1.labelBody(date, this.domain.granularity), left + 3, this.domain.height - 3);\n                date = this.domain.nextDate(date);\n            }\n            this.ctx.stroke();\n            this.ctx.closePath();\n        };\n        this.register();\n        if (this.domain.config.type === 'minimap') {\n            this.maxHeight = this.domain.height - constants_1.DATE_BAR_HEIGHT;\n            const rowCounts = this.domain.config.targets.map(index => props_1.default.domains[index].config.orderedEvents.rowCount);\n            this.eventHeight = this.maxHeight / Math.max(...rowCounts);\n            if (this.eventHeight < 1)\n                this.eventHeight = 1;\n        }\n    }\n    render() {\n        this.canvas = create_element_1.default('canvas', 'minimap', [\n            'position: absolute',\n        ], [\n            `top: ${this.domain.config.topOffsetRatio * 100}%`\n        ]);\n        this.canvas.width = props_1.default.viewportWidth;\n        this.canvas.height = this.domain.height;\n        this.ctx = this.canvas.getContext('2d');\n        this.update();\n        return this.canvas;\n    }\n}\nexports.default = MiniMap;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/minimap/index.ts?");

/***/ }),

/***/ "./src/views/indicator/index.ts":
/*!**************************************!*\
  !*** ./src/views/indicator/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst props_1 = __webpack_require__(/*! ../../models/props */ \"./src/models/props.ts\");\nconst animatable_1 = __webpack_require__(/*! ../animatable */ \"./src/views/animatable.ts\");\nclass Indicator extends animatable_1.default {\n    constructor(hostDomain) {\n        super();\n        this.hostDomain = hostDomain;\n        this.update = () => {\n            this.leftOfIndicator.style.transform = `scaleX(${this.leftWidthScale()})`;\n            this.rightOfIndicator.style.transform = `scaleX(${this.rightWidthScale()})`;\n        };\n        this.register();\n        this.width = this.hostDomain.width / props_1.default.domains[this.hostDomain.config.targets[0]].width * props_1.default.viewportWidth;\n        if (this.width < 2)\n            this.width = 2;\n        this.offset = props_1.default.viewportWidth - this.width;\n        this.leftWidth = this.nextLeftWidth();\n        this.rightWidth = this.nextRightWidth();\n    }\n    render() {\n        const wrapper = create_element_1.default('div', 'indicator-wrap', [\n            'bottom: 0',\n            'left: 0',\n            'pointer-events: none',\n            'position: absolute',\n            'right: 0',\n        ], [\n            `height: ${this.hostDomain.height}px`,\n            `top: ${this.hostDomain.config.topOffsetRatio * 100}%`,\n        ]);\n        this.leftOfIndicator = create_element_1.default('div', 'indicator', [\n            'position: absolute',\n            `bottom: ${0}px`,\n            'cursor: -webkit-grab',\n            'background-color: rgba(0, 0, 0, .1)',\n            'z-index: 3',\n        ], [\n            `height: ${this.hostDomain.height}px`,\n            'left: 0',\n            'transform-origin: left',\n            `width: ${this.leftWidth}px`,\n        ]);\n        this.rightOfIndicator = create_element_1.default('div', 'indicator', [], [\n            `height: ${this.hostDomain.height}px`,\n            'right: 0',\n            'transform-origin: right',\n            `width: ${this.rightWidth}px`,\n        ]);\n        wrapper.appendChild(this.leftOfIndicator);\n        wrapper.appendChild(this.rightOfIndicator);\n        return wrapper;\n    }\n    nextLeftWidth() {\n        return this.offset * props_1.default.center;\n    }\n    nextRightWidth() {\n        return props_1.default.viewportWidth - (this.nextLeftWidth() + this.width);\n    }\n    leftWidthScale() {\n        return this.nextLeftWidth() / this.leftWidth;\n    }\n    rightWidthScale() {\n        return this.nextRightWidth() / this.rightWidth;\n    }\n}\nexports.default = Indicator;\n\n\n//# sourceURL=webpack://Timeline/./src/views/indicator/index.ts?");

/***/ })

/******/ });
});