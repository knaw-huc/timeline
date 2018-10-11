"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const band_1 = require("./band");
const __1 = require("..");
const event_bus_1 = require("../event-bus");
function onEventsBand(band) {
    return band.type === band_1.BandType.EventsBand;
}
function onMinimapBand(band) {
    return band.type === band_1.BandType.MinimapBand;
}
class Props {
    constructor() {
        this.defaultCenterRatio = .5;
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
        event_bus_1.default.dispatch(constants_1.EventType.CenterChange);
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
        this.bands = config.bands;
        this.eventsBands = this.bands.filter(onEventsBand);
        this.minimapBands = this.bands.filter(onMinimapBand);
        this.controlBand = config.controlBand != null ? config.controlBand : this.eventsBands[0];
        const t0 = performance.now();
        const options = {
            bands: this.eventsBands
                .map(band => ({
                events: band.config.events,
                zoomLevel: band.config.zoomLevel
            })),
            parent: config.parent,
            viewportWidth: this.viewportWidth
        };
        const orderResult = __1.orderEvents(options);
        this.parent = orderResult.parent;
        this.from = orderResult.from;
        this.to = orderResult.to;
        this.time = orderResult.time;
        const t1 = performance.now();
        console.log('Performance: ', `${t1 - t0}ms\n[from] ${new Date(this.from).toUTCString()}\n[ to ] ${new Date(this.to).toUTCString()}`);
        this.center = (config.center != null) ?
            config.center :
            this.from + (this.defaultCenterRatio * this.time);
        for (const [index, band] of this.eventsBands.entries()) {
            band.init(orderResult.bands[index]);
        }
        for (const band of this.minimapBands) {
            band.init();
        }
    }
    resize() {
        this.dimensions = this.rootElement;
    }
}
exports.Props = Props;
exports.default = new Props();
