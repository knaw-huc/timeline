"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DateUtils = require("../utils/dates");
const base_event_1 = require("./base-event");
class RootEvent extends base_event_1.default {
    constructor(data, width) {
        super(data);
        this.pixelsPerDay = null;
        this.width = 0;
        this.width = width;
        this.pixelsPerDay = this.width / this.countDays();
    }
    leftPositionAtDate(date) {
        return DateUtils.countDays(this.from, date) * this.pixelsPerDay;
    }
    dateAtLeftPosition(position) {
        return this.dateAtProportion(position / this.width);
    }
    dateAtProportion(proportion) {
        if (proportion < 0 || proportion > 1)
            throw new Error('[dateAtProportion] proportion should be between 0 and 1.');
        const fromTime = this.from.getTime();
        const toTime = this.to.getTime();
        const newTime = fromTime + ((toTime - fromTime) * proportion);
        return new Date(newTime);
    }
    ;
}
exports.default = RootEvent;
