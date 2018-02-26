"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DateUtils = require("../utils/dates");
var DomainType;
(function (DomainType) {
    DomainType[DomainType["Event"] = 0] = "Event";
    DomainType[DomainType["Navigator"] = 1] = "Navigator";
    DomainType[DomainType["Sparkline"] = 2] = "Sparkline";
})(DomainType = exports.DomainType || (exports.DomainType = {}));
class Domain {
    constructor(from, to, viewportWidth, viewportHeight, domainCenter, domainDef) {
        this.viewportWidth = viewportWidth;
        this.domainCenter = domainCenter;
        this.domainLabels = false;
        this.heightRatio = 1;
        this.visibleRatio = 1;
        this.rulerLabels = true;
        this.rulers = true;
        this.topOffsetRatio = 0;
        this.type = DomainType.Event;
        Object.keys(domainDef).forEach(k => {
            if (domainDef[k] !== this[k])
                this[k] = domainDef[k];
        });
        this.from = from;
        this.to = to;
        this.viewportHeight = viewportHeight * this.heightRatio;
        this.height = this.viewportHeight;
        this.width = this.viewportWidth / this.visibleRatio;
        this.pixelsPerDay = this.width / this.countDays();
        this.granularity = this.getGranularity();
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
    positionAtDate(date) {
        return DateUtils.countDays(this.from, date) * this.pixelsPerDay;
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
