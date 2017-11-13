"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_event_1 = require("./base-event");
const Constants = require("../constants");
class Event extends base_event_1.default {
    constructor(data, visibleDomain) {
        super(data);
        this.visibleDomain = visibleDomain;
        this.left = visibleDomain.positionAtDate(this.from);
        this.flip = this.left + Constants.EVENT_MIN_SPACE > visibleDomain.width;
        const width = this.countDays() * visibleDomain.pixelsPerDay;
        this.width = (width > 0 && width < 12) ? 12 : width;
    }
    space() {
        const minWidth = (w) => (w === 0 || w < Constants.EVENT_MIN_SPACE) ? Constants.EVENT_MIN_SPACE : w;
        const width = minWidth(this.width);
        const left = this.left;
        return [left, width];
    }
}
exports.default = Event;
