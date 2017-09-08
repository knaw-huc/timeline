"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_event_1 = require("./base-event");
const Constants = require("../constants");
class Event extends base_event_1.default {
    constructor(data, root) {
        super(data);
        this.flip = null;
        this.left = null;
        this.top = null;
        this.width = null;
        this.root = null;
        this.root = root;
        this.left = this.root.leftPositionAtDate(this.from);
        this.flip = (this.left + Constants.EVENT_MIN_SPACE > this.root.width) ? true : false;
        const width = this.countDays() * this.root.pixelsPerDay;
        this.width = (width > 0 && width < 12) ? 12 : width;
    }
    space() {
        const minWidth = (w) => (w === 0 || w < Constants.EVENT_MIN_SPACE) ? Constants.EVENT_MIN_SPACE : w;
        const width = minWidth(this.width);
        const left = (this.flip) ? this.left - width : this.left;
        return [left, width];
    }
}
exports.default = Event;
