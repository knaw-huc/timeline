"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const config_1 = require("../config");
const animator_1 = require("../../animator");
const constants_1 = require("../../constants");
const props_1 = require("../props");
const events_worker_1 = require("../../utils/events.worker");
const dates_1 = require("../../utils/dates");
const utils_1 = require("../../utils");
class EventsBand extends _1.default {
    constructor(config) {
        super(Object.assign({}, new config_1.EventsBandConfig(), config));
        this.type = _1.BandType.EventsBand;
        this.events = [];
        this.rowCount = 0;
        this.visibleEvents = [];
        this._offsetY = 0;
        if (this.config.events != null)
            this.config.events.sort(dates_1.byDate);
    }
    get offsetY() { return this._offsetY; }
    set offsetY(offsetYChange) {
        this._offsetY += offsetYChange;
        if (this._offsetY < 0)
            this._offsetY = 0;
        const maxOffset = this.height > this.availableHeight ?
            this.height - this.availableHeight + constants_1.EVENT_ROW_HEIGHT :
            0;
        if (this._offsetY > maxOffset)
            this._offsetY = maxOffset;
        const lowestRow = this._offsetY / constants_1.EVENT_ROW_HEIGHT;
        this.lowestVisibleRow = Math.ceil(lowestRow);
        this.highestVisibleRow = this.lowestVisibleRow + this.visibleRowsCount;
    }
    init() {
        super.init();
        const pixelsPerMillisecond = utils_1.calcPixelsPerMillisecond(props_1.default.viewportWidth, this.config.zoomLevel || 0, props_1.default.time);
        const orderedEvents = this.config.orderedEvents == null ?
            events_worker_1.orderEvents(this.config.events, pixelsPerMillisecond) :
            this.config.orderedEvents;
        this.events = orderedEvents.events;
        this.rowCount = orderedEvents.row_count;
        this.height = constants_1.EVENT_ROW_HEIGHT * this.rowCount;
        this.offsetY = 0;
        this.updateEvents();
    }
    getColor(from, to) {
        const beforeRGB = [253, 231, 37];
        const centerRGB = [49, 220, 215];
        const afterRGB = [204, 104, 232];
        let diff;
        if (props_1.default.center > to) {
            diff = props_1.default.center - to;
        }
        else if (props_1.default.center < from) {
            diff = from - props_1.default.center;
        }
        else {
            return `rgb(${centerRGB.join(', ')})`;
        }
        const ratio = diff / (this.time / 2);
        const outerRGB = (props_1.default.center > to) ? beforeRGB : afterRGB;
        const codes = centerRGB
            .map((code, i) => {
            return code + ((outerRGB[i] - code) * ratio);
        })
            .join(', ');
        return `rgb(${codes})`;
    }
    updateEvents() {
        this.visibleEvents = this.events
            .filter(event => !(event.from > this.to || event.to < this.from) &&
            event.row >= this.lowestVisibleRow && event.row <= this.highestVisibleRow)
            .map(event => {
            event.left = this.positionAtTimestamp(event.from);
            event.width = Math.round((event.time) * this.pixelsPerMillisecond);
            if (event.time && event.width < 1)
                event.width = 1;
            event.uncertain_from_width = 0;
            if (event.dmin != null) {
                let uncertain_from_to;
                if (event.d != null) {
                    uncertain_from_to = event.d;
                }
                else if (event.ed != null) {
                    uncertain_from_to = event.ed;
                }
                else if (event.dmax != null) {
                    uncertain_from_to = event.dmin + (event.dmax - event.dmin) / 2;
                }
                else {
                    throw Error(['updateEvents', 'Width uncertain from is not definable', JSON.stringify(event)].join('\n'));
                }
                event.uncertain_from_width = (uncertain_from_to - event.dmin) * this.pixelsPerMillisecond;
            }
            event.uncertain_to_width = 0;
            if (event.dmax != null) {
                let uncertain_to_from;
                if (event.ed != null) {
                    uncertain_to_from = event.ed;
                }
                else if (event.d != null) {
                    uncertain_to_from = event.d;
                }
                else if (event.dmin != null) {
                    uncertain_to_from = event.dmin + (event.dmax - event.dmin) / 2;
                }
                else {
                    throw Error(['updateEvents', 'Width uncertain to is not definable', JSON.stringify(event)].join('\n'));
                }
                event.uncertain_to_width = (event.dmax - uncertain_to_from) * this.pixelsPerMillisecond;
            }
            event.top = this.top + this.availableHeight - ((event.row + 1) * constants_1.EVENT_ROW_HEIGHT) + this.offsetY;
            event.color = this.getColor(event.from, event.to);
            return event;
        });
    }
    update() {
        super.update();
        this.updateEvents();
    }
    getEventByCoordinates(x, y) {
        const timestamp = this.timestampAtPosition(x);
        const bottomOfDomain = props_1.default.viewportOffset + this.top + this.availableHeight + this.offsetY;
        const clickedRow = Math.floor((bottomOfDomain - y) / constants_1.EVENT_ROW_HEIGHT);
        const event = this.events.find(e => {
            if (!(e.from < timestamp && e.from + e.time + e.space > timestamp) ||
                (e.row < this.lowestVisibleRow || e.row > this.highestVisibleRow))
                return false;
            return e.row === clickedRow;
        });
        return event;
    }
    zoomIn() {
        animator_1.default.zoomTo(this, this.zoomLevel + 1);
    }
    zoomOut() {
        animator_1.default.zoomTo(this, this.zoomLevel - 1);
    }
}
exports.default = EventsBand;
