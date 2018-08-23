"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const minimap_1 = require("./band/minimap");
const utils_1 = require("../utils");
const events_1 = require("./band/events");
function onEventsBand(band) {
    return band instanceof events_1.default;
}
function onMinimapBand(band) {
    return band instanceof minimap_1.default;
}
class Props {
    constructor() {
        this.defaultCenterRatio = .5;
        this.centerChangeDone = utils_1.debounce(() => {
            document.dispatchEvent(new CustomEvent(constants_1.CENTER_CHANGE_DONE));
        }, 300);
    }
    get center() { return this._center; }
    set center(n) {
        if ((this._center === this.from && n < this.from) || (this._center === this.to && n > this.to))
            return;
        if (n < this.from)
            this._center = this.from;
        else if (n > this.to)
            this._center = this.to;
        else
            this._center = n;
        this.centerChangeDone();
    }
    set dimensions(rootElement) {
        const style = getComputedStyle(rootElement);
        this.viewportHeight = parseInt(style.getPropertyValue('height'), 10);
        this.viewportOffset = rootElement.getBoundingClientRect().top;
        this.viewportWidth = parseInt(style.getPropertyValue('width'), 10);
    }
    init(config) {
        if (config.rootElement == null)
            console.error('[init] No rootElement found');
        this.rootElement = config.rootElement;
        this.dimensions = this.rootElement;
        const [froms, tos] = config.bands.reduce((prev, curr) => {
            if (curr instanceof minimap_1.default)
                return prev;
            const events = curr.config.orderedEvents == null ? curr.config.events : curr.config.orderedEvents.events;
            prev[0].push(events[0].date_min || events[0].date);
            prev[1].push(events.reduce((prev, curr) => {
                return Math.max(prev, curr.end_date || -Infinity, curr.end_date_max || -Infinity);
            }, -Infinity));
            return prev;
        }, [[], []]);
        this.from = Math.min(...froms);
        this.to = Math.max(...tos);
        this.time = this.to - this.from;
        this.center = (config.center != null) ?
            config.center :
            this.from + (this.defaultCenterRatio * this.time);
        this.bands = config.bands;
        this.eventsBands = this.bands.filter(onEventsBand);
        this.minimapBands = this.bands.filter(onMinimapBand);
        for (const band of this.bands) {
            band.init();
        }
    }
    resize() {
        this.dimensions = this.rootElement;
    }
}
exports.Props = Props;
exports.default = new Props();
