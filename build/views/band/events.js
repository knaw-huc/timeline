"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const event_bus_1 = require("../../event-bus");
const constants_1 = require("../../constants");
class EventsBandView extends index_1.default {
    constructor(band) {
        super(band);
        this.band = band;
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
            event_bus_1.default.dispatch(constants_1.EventType.Select, event);
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
