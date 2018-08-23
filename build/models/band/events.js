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
    updateEvents() {
        this.visibleEvents = this.events
            .filter(event => !(event.from > this.to || event.to < this.from) &&
            event.row >= this.lowestVisibleRow && event.row <= this.highestVisibleRow)
            .map(event => {
            event.left = this.positionAtTimestamp(event.from);
            event.width = Math.round((event.time) * this.pixelsPerMillisecond);
            if (event.time && event.width < 1)
                event.width = 1;
            event.padding = Math.round((event.space) * this.pixelsPerMillisecond);
            event.top = this.top + this.availableHeight - ((event.row + 1) * constants_1.EVENT_ROW_HEIGHT) + this.offsetY;
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
