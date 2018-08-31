"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const band_1 = require("./band");
function onEventsBand(band) {
    return band.type === band_1.BandType.EventsBand;
}
function onMinimapBand(band) {
    return band.type === band_1.BandType.MinimapBand;
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
        this.imagePath = config.imagePath != null ? config.imagePath : constants_1.DEFAULT_IMAGE_PATH;
        this.rootElement = config.rootElement;
        this.dimensions = this.rootElement;
        const [froms, tos] = config.bands.reduce((prev, curr) => {
            if (curr.type === band_1.BandType.MinimapBand)
                return prev;
            const band = curr;
            const events = band.config.orderedEvents == null ? band.config.events : band.config.orderedEvents.events;
            prev[0].push(events[0].date_min || events[0].date);
            prev[1].push(events.reduce((prev2, curr2) => {
                return Math.max(prev2, curr2.end_date || -Infinity, curr2.end_date_max || -Infinity);
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
        this.controlBand = config.controlBand != null ? config.controlBand : this.eventsBands[0];
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
