"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_element_1 = require("../../utils/create-element");
const props_1 = require("../../models/props");
const constants_1 = require("../../constants");
const animator_1 = require("../../animator");
const rulers_1 = require("./rulers");
const band_1 = require("../../models/band");
class Canvas {
    constructor() {
        this.indicatorsDrawn = false;
        this.update = () => {
            props_1.default.bands
                .forEach(band => {
                if (band.type === band_1.BandType.EventsBand)
                    this.drawEventsBand(band);
                else
                    this.drawMinimapBand(band);
            });
            this.drawIndicators();
        };
        animator_1.default.registerView(this);
    }
    render() {
        this.canvas = create_element_1.default('canvas', 'main', [
            'position: absolute',
        ]);
        this.canvas.width = props_1.default.viewportWidth;
        this.canvas.height = props_1.default.viewportHeight;
        this.ctx = this.canvas.getContext('2d');
        this.indicatorsCanvas = create_element_1.default('canvas', 'indicators', [
            'position: absolute',
        ], ['z-index: 1']);
        this.indicatorsCanvas.width = props_1.default.viewportWidth;
        this.indicatorsCanvas.height = props_1.default.viewportHeight;
        this.indicatorsCtx = this.indicatorsCanvas.getContext('2d');
        this.update();
        return [this.canvas, this.indicatorsCanvas];
    }
    resize() {
        this.indicatorsCanvas.width = props_1.default.viewportWidth;
        this.indicatorsCanvas.height = props_1.default.viewportHeight;
        this.canvas.width = props_1.default.viewportWidth;
        this.canvas.height = props_1.default.viewportHeight;
        this.indicatorsDrawn = false;
    }
    clear(band) {
        this.ctx.clearRect(0, band.top, this.canvas.width, band.visibleHeight);
    }
    drawEventsBand(band) {
        this.clear(band);
        rulers_1.default(this.ctx, band);
        for (const event of band.visibleEvents) {
            if (!event.time) {
                this.ctx.moveTo(event.left, event.top + constants_1.EVENT_HEIGHT / 2);
                this.ctx.beginPath();
                this.ctx.arc(event.left, event.top + constants_1.EVENT_HEIGHT / 2, constants_1.EVENT_HEIGHT / 3, 0, 2 * Math.PI);
                this.ctx.fillStyle = event.color;
                this.ctx.fill();
            }
            else {
                this.ctx.fillStyle = event.color;
                this.ctx.fillRect(event.left, event.top, event.width, constants_1.EVENT_HEIGHT);
            }
        }
        this.drawEventsText(band);
    }
    drawEventsText(band) {
        this.ctx.font = '11px sans-serif';
        this.ctx.fillStyle = `rgb(40, 40, 40)`;
        for (const event of band.visibleEvents) {
            let eventWidth = event.time === 0 ? event.padding : event.width;
            let eventLeft = event.left;
            if (event.left < 0 && event.time !== 0) {
                eventWidth = event.width + event.left;
                eventLeft = 0;
            }
            let eventLabelLength = event.label.length * constants_1.PIXELS_PER_LETTER;
            if (eventLabelLength <= eventWidth) {
                const paddingLeft = event.time ? 3 : 8;
                this.ctx.fillText(event.label, eventLeft + paddingLeft, event.top + constants_1.EVENT_HEIGHT - 3);
            }
        }
    }
    drawMinimapBand(band) {
        if (band.isDrawn && band.prevOffsetX === band.offsetX && band.prevZoomLevel === band.zoomLevel)
            return;
        this.clear(band);
        rulers_1.default(this.ctx, band);
        const minimapCanvas = band.draw();
        this.ctx.drawImage(minimapCanvas, 0, band.top, props_1.default.viewportWidth, band.availableHeight);
        band.isDrawn = true;
    }
    drawIndicators() {
        if (this.indicatorsDrawn && props_1.default.eventsBands.every(b => b.prevZoomLevel === b.zoomLevel))
            return;
        this.indicatorsCtx.clearRect(0, 0, props_1.default.viewportWidth, props_1.default.viewportHeight);
        this.indicatorsCtx.beginPath();
        for (const band of props_1.default.minimapBands) {
            const eventsBand = props_1.default.eventsBands[band.config.indicatorFor];
            const indicatorTOP = Math.round(band.config.topOffsetRatio * props_1.default.viewportHeight);
            const leftIndicatorRightX = band.positionAtTimestamp(eventsBand.from);
            this.indicatorsCtx.rect(0, indicatorTOP, leftIndicatorRightX, band.visibleHeight);
            const rightIndicatorLeftX = band.positionAtTimestamp(eventsBand.to);
            this.indicatorsCtx.rect(rightIndicatorLeftX, indicatorTOP, props_1.default.viewportWidth, band.visibleHeight);
            this.indicatorsCtx.rect(leftIndicatorRightX, indicatorTOP + band.visibleHeight - constants_1.DATE_BAR_HEIGHT, rightIndicatorLeftX - leftIndicatorRightX, constants_1.DATE_BAR_HEIGHT);
        }
        this.indicatorsCtx.fillStyle = `rgba(0, 0, 0, .04)`;
        this.indicatorsCtx.fill();
        this.indicatorsCtx.closePath();
        this.indicatorsDrawn = true;
    }
}
exports.default = Canvas;
