"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DateUtils = require("../utils/dates");
const date_range_1 = require("../utils/date-range");
var DomainType;
(function (DomainType) {
    DomainType["Events"] = "EVENTS";
    DomainType["Sparkline"] = "SPARKLINE";
})(DomainType = exports.DomainType || (exports.DomainType = {}));
class Domain {
    constructor(domain, from, to, viewportWidth, viewportHeight) {
        this.from = from;
        this.to = to;
        this.viewportWidth = viewportWidth;
        this.viewportHeight = viewportHeight;
        this.domainLabels = false;
        this.heightRatio = 1;
        this.rulerLabels = true;
        this.rulers = true;
        this.topOffsetRatio = 0;
        this.type = DomainType.Events;
        this.visibleRatio = 1;
        Object.keys(domain).forEach(k => {
            if (domain[k] !== this[k])
                this[k] = domain[k];
        });
        this.viewportHeight = viewportHeight * this.heightRatio;
        this.height = this.viewportHeight;
        this.width = viewportWidth / this.visibleRatio;
        this.pixelsPerDay = this.width / this.countDays();
        this.granularity = this.getGranularity();
    }
    setActiveRange(iteration) {
        const deviation = iteration * this.visibleRatio;
        const lowerDeviation = this.center - deviation > 0 ? this.center - deviation : 0;
        const upperDeviation = this.center + deviation < 1 ? this.center + deviation : 1;
        this.activeFrom = this.dateAtProportion(lowerDeviation);
        this.activeTo = this.dateAtProportion(upperDeviation);
    }
    countDays() {
        return DateUtils.countDays(this.from, this.to);
    }
    dateAtPosition(x) {
        return this.dateAtProportion(this.proportionAtPosition(x));
    }
    dateAtProportion(proportion) {
        if (proportion < 0 || proportion > 1)
            throw new Error('[dateAtProportion] proportion should be between 0 and 1.');
        const fromTime = this.from.getTime();
        const toTime = this.to.getTime();
        const newTime = fromTime + ((toTime - fromTime) * proportion);
        return new Date(newTime);
    }
    setCenter(center) {
        if (center < 0)
            center = 0;
        else if (center > 1)
            center = 1;
        this.center = center;
        this.left = center * (this.viewportWidth - this.width);
    }
    setLeft(left) {
        if (left < -this.width + this.viewportWidth)
            left = -this.width + this.viewportWidth;
        else if (left > 0)
            left = 0;
        this.left = left;
        this.center = left / (this.viewportWidth - this.width);
    }
    positionAtDate(date) {
        return DateUtils.countDays(this.from, date) * this.pixelsPerDay;
    }
    proportionAtPosition(position) {
        return position / this.width;
    }
    range() {
        return date_range_1.default(this.from, this.to, this.granularity);
    }
    getGranularity() {
        const days = this.countDays() / (this.width / this.viewportWidth);
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
