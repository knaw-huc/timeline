"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DateUtils = require("../utils/dates");
class BaseEvent {
    constructor(data) {
        this.body = '';
        this.coordinates = [];
        this.date = null;
        this.dateRange = null;
        this.dateRangeUncertain = null;
        this.dateUncertain = null;
        this.from = null;
        this.to = null;
        this.slug = '';
        this.title = '';
        this.types = [];
        this.dateGranularity = 5;
        this.dateRangeGranularity = null;
        this.formatDate = (dateToFormat) => {
            let date = this.date;
            let granularity = this.dateGranularity;
            if (date == null) {
                if (this.dateUncertain != null) {
                    const from = DateUtils.format(this.dateUncertain.from, this.dateGranularity);
                    const to = DateUtils.format(this.dateUncertain.to, this.dateRangeGranularity);
                    return `${from} - ${to}`;
                }
                else if (dateToFormat == null) {
                    throw new Error('[formatDate] Unknown date to format!');
                }
                else {
                    granularity = (dateToFormat === 'from') ?
                        this.dateGranularity :
                        this.dateRangeGranularity;
                    if (this.dateRangeUncertain == null) {
                        date = this.dateRange[dateToFormat];
                    }
                    else {
                        if (DateUtils.isEqual(this.dateRange[dateToFormat], this.dateRangeUncertain[dateToFormat])) {
                            date = this.dateRangeUncertain[dateToFormat];
                        }
                        else {
                            const from = DateUtils.format(this.dateRange[dateToFormat], granularity);
                            const to = DateUtils.format(this.dateRangeUncertain[dateToFormat], granularity);
                            return `${from} - ${to}`;
                        }
                    }
                }
            }
            return DateUtils.format(date, granularity);
        };
        Object.assign(this, data);
        this.setTo();
        this.setFrom();
    }
    countDays() {
        return DateUtils.countDays(this.from, this.to);
    }
    formatFromDate() {
        return this.formatDate('from');
    }
    formatToDate() {
        return this.formatDate('to');
    }
    isInterval() {
        return this.dateRange != null;
    }
    isUncertain() {
        return this.dateUncertain != null || this.dateRangeUncertain != null;
    }
    setFrom() {
        this.from = (this.dateRange != null) ?
            this.dateRange.infiniteFrom ?
                new Date(-4713, 0, 1) :
                this.dateRange.from :
            this.date != null ?
                this.date :
                (this.dateUncertain != null) ?
                    this.dateUncertain.from :
                    null;
    }
    setTo() {
        this.to = (this.dateRange != null) ?
            this.dateRange.infiniteTo ?
                new Date() :
                this.dateRange.to :
            (this.dateUncertain != null) ?
                this.dateUncertain.to :
                null;
    }
}
exports.default = BaseEvent;
