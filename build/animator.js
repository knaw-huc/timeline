"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const props_1 = require("./models/props");
const constants_1 = require("./constants");
var Direction;
(function (Direction) {
    Direction[Direction["Backward"] = -1] = "Backward";
    Direction[Direction["Stop"] = 0] = "Stop";
    Direction[Direction["Forward"] = 1] = "Forward";
})(Direction || (Direction = {}));
class Animator {
    constructor() {
        this.elapsedTimeThreshold = 2000;
        this.goToDuration = 300;
        this.zoomToDuration = 300;
        this.multipliers = [.25, .5, 1, 2, 4, 8, 16];
        this.multiplier = 1;
        this.direction = Direction.Stop;
        this.elapsedTimeTotal = 0;
        this.models = [];
        this.views = [];
        this.animate = (timestamp) => {
            const elapsedTime = this.prevTimestamp == null ? 0 : timestamp - this.prevTimestamp;
            if (elapsedTime > 0 || this.prevTimestamp == null) {
                if (this.centerMarker == null && this.zoomMarker == null) {
                    props_1.default.center += (props_1.default.controlBand.time / 480) * this.multiplier * this.direction;
                }
                else if (this.centerMarker != null) {
                    const timeRemaining = this.goToDuration - this.elapsedTimeTotal;
                    const centerDelta = Math.abs(this.centerMarker - props_1.default.center) / (timeRemaining / elapsedTime);
                    if (timeRemaining < elapsedTime) {
                        props_1.default.center = this.centerMarker;
                        this.stop();
                    }
                    else
                        props_1.default.center = props_1.default.center + (centerDelta * this.direction);
                }
                else if (this.zoomMarker != null) {
                    const timeRemaining = this.zoomToDuration - this.elapsedTimeTotal;
                    const zoomDelta = (this.zoomMarker - this.activeBand.zoomLevel) / (timeRemaining / elapsedTime);
                    if (timeRemaining < elapsedTime) {
                        this.activeBand.zoomLevel = this.zoomMarker;
                        props_1.default.eventsBands.forEach(band => {
                            if (band === this.activeBand)
                                this.activeBand.zoomLevel = this.zoomMarker;
                            else
                                band.zoomLevel = this.zoomMarker + (band.config.zoomLevel - this.activeBand.config.zoomLevel);
                        });
                        this.adjustMinimapBands();
                        document.dispatchEvent(new CustomEvent(constants_1.ZOOM_DONE));
                        this.stop();
                    }
                    else {
                        for (const band of props_1.default.eventsBands) {
                            band.zoomLevel = band.zoomLevel + zoomDelta;
                        }
                        this.adjustMinimapBands();
                    }
                }
                this.models.forEach(model => model.update());
                this.views.forEach(view => view.update());
            }
            this.elapsedTimeTotal += elapsedTime;
            if (this.elapsedTimeTotal > this.elapsedTimeThreshold)
                this.resetElapsedTimeTotal();
            if (this.isPlaying() || this.zoomMarker != null) {
                if ((props_1.default.center >= props_1.default.from && props_1.default.center <= props_1.default.to) || this.centerMarker != null || this.zoomMarker != null) {
                    this.prevTimestamp = timestamp;
                    requestAnimationFrame(this.animate);
                }
                else {
                    this.stop();
                }
            }
        };
    }
    registerModel(model) {
        this.models.push(model);
    }
    registerView(view) {
        this.views.push(view);
    }
    adjustMinimapBands() {
        props_1.default.minimapBands.forEach(mmb => {
            if (this.activeBand.zoomLevel < mmb.config.zoomLevel) {
                mmb.zoomLevel = this.activeBand.zoomLevel;
            }
        });
    }
    resetElapsedTimeTotal() {
        this.elapsedTimeTotal = 0;
        document.dispatchEvent(new CustomEvent(constants_1.CENTER_CHANGE_DONE));
    }
    accelerate() {
        const index = this.multipliers.indexOf(this.multiplier);
        if (index === this.multipliers.length - 1)
            return this.multipliers[this.multipliers.length - 1];
        this.multiplier = this.multipliers[index + 1];
        return this.multiplier;
    }
    decelerate() {
        const index = this.multipliers.indexOf(this.multiplier);
        if (index === 0)
            return this.multipliers[0];
        this.multiplier = this.multipliers[index - 1];
        return this.multiplier;
    }
    goTo(nextCenter) {
        this.centerMarker = nextCenter;
        if (nextCenter > props_1.default.center)
            this.playForward();
        else
            this.playBackward();
    }
    zoomTo(band, nextZoomLevel) {
        if (this.zoomMarker != null)
            return;
        if (nextZoomLevel < 0)
            nextZoomLevel = 0;
        if (band !== this.activeBand) {
            this.stop();
            this.activeBand = band;
        }
        if (this.activeBand.zoomLevel === nextZoomLevel)
            return;
        this.zoomMarker = nextZoomLevel;
        this.nextFrame();
    }
    speed(multiplier) {
        const multiplier2 = parseFloat(multiplier);
        if (this.multipliers.indexOf(multiplier2) === -1)
            return;
        this.multiplier = multiplier2;
    }
    isPlaying() {
        return this.direction !== Direction.Stop;
    }
    isPlayingForward() {
        return this.direction === Direction.Forward;
    }
    isPlayingBackward() {
        return this.direction === Direction.Backward;
    }
    nextFrame() {
        requestAnimationFrame(this.animate);
    }
    playForward() {
        this.direction = Direction.Forward;
        this.nextFrame();
    }
    playBackward() {
        this.direction = Direction.Backward;
        this.nextFrame();
    }
    stop() {
        this.direction = Direction.Stop;
        this.activeBand = null;
        this.centerMarker = null;
        this.zoomMarker = null;
        this.prevTimestamp = null;
        this.elapsedTimeTotal = 0;
    }
    toggle() {
        this.isPlaying() ? this.stop() : this.nextFrame();
    }
}
exports.Animator = Animator;
exports.default = new Animator();
