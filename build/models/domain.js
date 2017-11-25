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
    constructor(from, to, viewPortWidth, viewPortHeight, domainCenter, domainDef) {
        this.domainLabels = false;
        this.heightRatio = 1;
        this.visibleRatio = 1;
        this.rulerLabels = true;
        this.rulers = true;
        this.topOffsetRatio = 0;
        this.type = DomainType.Event;
        Object.keys(domainDef).map(k => {
            if (domainDef[k] !== this[k])
                this[k] = domainDef[k];
        });
        this.from = from;
        this.to = to;
        if (this.visibleRatio < 1) {
            const leftRatio = domainCenter - (this.visibleRatio / 2);
            const rightRatio = domainCenter + (this.visibleRatio / 2);
            const from = this.dateAtProportion(leftRatio);
            const to = this.dateAtProportion(rightRatio);
            this.from = from;
            this.to = to;
        }
        this.width = viewPortWidth;
        this.height = viewPortHeight * this.heightRatio;
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
