"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dates_1 = require("../../utils/dates");
const props_1 = require("../props");
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
const animator_1 = require("../../animator");
var BandType;
(function (BandType) {
    BandType[BandType["EventsBand"] = 0] = "EventsBand";
    BandType[BandType["MinimapBand"] = 1] = "MinimapBand";
})(BandType = exports.BandType || (exports.BandType = {}));
class Band {
    constructor(config) {
        this.config = config;
        this.defaultZoomLevel = 0;
    }
    get offsetX() { return this._offsetX; }
    set offsetX(left) {
        this.prevOffsetX = this.offsetX || left;
        this._offsetX = left;
    }
    get zoomLevel() { return this._zoomLevel; }
    set zoomLevel(zoomLevel) {
        if (zoomLevel < 0)
            zoomLevel = 0;
        this.visibleRatio = utils_1.visibleRatio(zoomLevel);
        this.width = Math.round(props_1.default.viewportWidth / this.visibleRatio);
        this.pixelsPerMillisecond = this.width / props_1.default.time;
        this.time = this.visibleRatio * props_1.default.time;
        this.granularity = dates_1.getGranularity(this.pixelsPerMillisecond);
        this.nextDate = dates_1.subsequentDate(this.granularity);
        this.prevZoomLevel = this.zoomLevel || zoomLevel;
        this._zoomLevel = zoomLevel;
        this.setHorizontalProps();
    }
    setVerticalProps() {
        this.visibleHeight = Math.round(this.config.heightRatio * props_1.default.viewportHeight);
        this.availableHeight = this.visibleHeight - constants_1.DATE_BAR_HEIGHT;
        this.visibleRowsCount = Math.floor(this.availableHeight / constants_1.EVENT_ROW_HEIGHT) - 1;
        this.top = Math.round(this.config.topOffsetRatio * props_1.default.viewportHeight);
    }
    setHorizontalProps() {
        this.from = props_1.default.center - this.time / 2;
        this.to = props_1.default.center + this.time / 2;
        this.offsetX = (props_1.default.from - this.from) * this.pixelsPerMillisecond;
    }
    init() {
        this.zoomLevel = this.config.zoomLevel;
        this.setVerticalProps();
        animator_1.default.registerModel(this);
    }
    resize() {
        this.zoomLevel = this.zoomLevel;
        this.setVerticalProps();
    }
    update() {
        this.setHorizontalProps();
    }
    updateConfig(props) {
        Object.keys(props).forEach(prop => {
            if (this.config.hasOwnProperty(prop)) {
                this.config[prop] = props[prop];
            }
        });
    }
    positionAtTimestamp(timestamp) {
        return Math.round((timestamp - this.from) * this.pixelsPerMillisecond);
    }
    timestampAtProportion(proportion) {
        return props_1.default.from + (props_1.default.time * proportion);
    }
    timestampAtPosition(position) {
        return this.from + (position / this.pixelsPerMillisecond);
    }
}
exports.default = Band;
