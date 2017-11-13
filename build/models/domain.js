"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DateUtils = require("../utils/dates");
class Domain {
    constructor(from, to, width) {
        this.from = from;
        this.to = to;
        this.width = width;
        this.pixelsPerDay = this.width / this.countDays();
        this.granularity = this.getGranularity();
    }
    positionAtDate(date) {
        return DateUtils.countDays(this.from, date) * this.pixelsPerDay;
    }
    dateAtPosition(x) {
        return this.dateAtProportion(this.proportionAtPosition(x));
    }
    countDays() {
        return DateUtils.countDays(this.from, this.to);
    }
    dateAtProportion(proportion) {
        if (proportion < 0 || proportion > 1)
            throw new Error('[dateAtProportion] proportion should be between 0 and 1.');
        const fromTime = this.from.getTime();
        const toTime = this.to.getTime();
        const newTime = fromTime + ((toTime - fromTime) * proportion);
        return new Date(newTime);
    }
    proportionAtPosition(position) {
        return position / this.width;
    }
    getGranularity() {
        const days = this.countDays();
        if (days < 1)
            return 0;
        if (days < 15)
            return 1;
        if (days < 45)
            return 2;
        if (days < 1.5 * 365)
            return 3;
        if (days < 15 * 365)
            return 4;
        if (days < 150 * 365)
            return 5;
        return 6;
    }
}
exports.default = Domain;
