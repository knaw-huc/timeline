"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const event_bus_1 = require("../../event-bus");
const utils_1 = require("../../utils");
class EventsBandView extends index_1.default {
    constructor(band, select) {
        super(band);
        this.band = band;
        this.select = select;
        this.onWheel = (ev) => {
            if (Math.abs(ev.deltaX) === 0 && ev.deltaY !== 0) {
                if (ev.deltaY < 0)
                    this.zoomOut();
                if (ev.deltaY > 0)
                    this.zoomIn();
            }
        };
        this.onClick = (ev) => {
            if (this.lastDragInterval > 175)
                return;
            const event = this.band.getEventByCoordinates(ev.clientX, ev.clientY);
            if (event && this.select) {
                this.select(event);
                utils_1.logEvent(event);
            }
        };
    }
    render() {
        const root = super.render();
        event_bus_1.default.register('click', this.onClick, this.rootElement);
        event_bus_1.default.register('wheel', this.onWheel, this.rootElement);
        return root;
    }
    zoomIn() {
        this.band.zoomIn();
    }
    zoomOut() {
        this.band.zoomOut();
    }
}
exports.default = EventsBandView;
