"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dates_1 = require("../utils/dates");
const date_range_1 = require("../utils/date-range");
const props_1 = require("./props");
var DomainType;
(function (DomainType) {
    DomainType["Events"] = "EVENTS";
    DomainType["Sparkline"] = "SPARKLINE";
})(DomainType = exports.DomainType || (exports.DomainType = {}));
class Domain {
    constructor(domain, viewportWidth, viewportHeight) {
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
        this.granularity = dates_1.getGranularity(props_1.default.from, props_1.default.to, this.visibleRatio);
        this.prevDate = date_range_1.default(this.granularity, true);
        this.nextDate = date_range_1.default(this.granularity);
        this.pixelsPerDay = this.width / dates_1.countDays(props_1.default.from, props_1.default.to);
        this.updateLeft();
    }
    initialActiveRange(iteration) {
        const deviation = iteration * this.visibleRatio;
        const lowerDeviation = props_1.default.center - deviation > 0 ? props_1.default.center - deviation : 0;
        const upperDeviation = props_1.default.center + deviation < 1 ? props_1.default.center + deviation : 1;
        let activeFrom = this.prevDate(this.dateAtProportion(lowerDeviation));
        let activeTo = this.nextDate(this.dateAtProportion(upperDeviation));
        const last = lowerDeviation === 0 && upperDeviation === 1 ? true : false;
        return [activeFrom, activeTo, last];
    }
    dateAtPosition(x) {
        return this.dateAtProportion(this.proportionAtPosition(x));
    }
    dateAtProportion(proportion) {
        if (proportion < 0 || proportion > 1)
            throw new RangeError('[dateAtProportion] proportion should be between 0 and 1.');
        const fromTime = props_1.default.from.getTime();
        const toTime = props_1.default.to.getTime();
        const newTime = fromTime + ((toTime - fromTime) * proportion);
        return new Date(newTime);
    }
    get left() { return this._left; }
    set left(left) {
        if (left < -this.width + this.viewportWidth)
            left = this.viewportWidth - this.width;
        else if (left > 0)
            left = 0;
        this._left = left;
    }
    updateLeft() {
        this.left = props_1.default.center * (this.viewportWidth - this.width);
        return this.left;
    }
    positionAtDate(date) {
        return dates_1.countDays(props_1.default.from, date) * this.pixelsPerDay;
    }
    proportionAtPosition(position) {
        return position / this.width;
    }
}
exports.default = Domain;
