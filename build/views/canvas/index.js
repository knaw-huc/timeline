"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const create_element_1 = require("../../utils/create-element");
const props_1 = require("../../models/props");
const constants_1 = require("../../constants");
const animator_1 = require("../../animator");
const rulers_1 = require("./rulers");
const event_bus_1 = require("../../event-bus");
const BORDER_WIDTH = 2;
class Canvas {
    constructor() {
        this.indicatorsDrawn = false;
        this.drawImageOnCanvas = (event) => {
            const callback = () => {
                event.image.removeEventListener('load', callback);
                const boundingBox = constants_1.EVENT_ROW_HEIGHT * 2;
                if (event.image.width > event.image.height) {
                    event.image.height = event.image.height * (boundingBox / event.image.width);
                    event.image.width = boundingBox;
                }
                else {
                    event.image.width = event.image.width * (boundingBox / event.image.height);
                    event.image.height = boundingBox;
                }
                this.loadImage(event);
            };
            return callback;
        };
        this.onAnimationDone = () => {
            this.updateImages();
        };
        this.update = () => {
            for (const band of props_1.default.eventsBands) {
                this.drawEventsBand(band);
            }
            for (const band of props_1.default.minimapBands) {
                this.drawMinimapBand(band);
            }
            this.drawIndicators();
        };
        animator_1.default.registerView(this);
        event_bus_1.default.register(constants_1.ZOOM_DONE, this.onAnimationDone);
        event_bus_1.default.register(constants_1.SCROLL_DONE, this.onAnimationDone);
    }
    updateImages() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (const band of props_1.default.eventsBands) {
                for (const event of band.visibleEvents) {
                    if (event.has_image == null)
                        continue;
                    if (event.image == null) {
                        const path = `${props_1.default.imagePath}/${event.wikidata_identifier}__32.${event.has_image}`;
                        event.image = new Image();
                        event.image.addEventListener('load', this.drawImageOnCanvas(event));
                        event.image.src = path;
                    }
                    else {
                        this.loadImage(event);
                    }
                }
            }
        });
    }
    loadImage(event) {
        const x = event.time ? event.left : event.left - (event.image.width / 2) - BORDER_WIDTH;
        const y = event.top - event.image.height;
        this.ctx.fillStyle = event.color;
        this.ctx.fillRect(x, y - BORDER_WIDTH * 2, event.image.width + BORDER_WIDTH * 2, event.image.height + BORDER_WIDTH * 2);
        this.ctx.drawImage(event.image, x + BORDER_WIDTH, y - BORDER_WIDTH);
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
        this.updateImages();
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
                let left = event.left;
                let width = event.width;
                if (event.width_uncertain_from > 1) {
                    const gradient = this.ctx.createLinearGradient(event.left, 0, event.left + event.width_uncertain_from, 0);
                    gradient.addColorStop(0, 'white');
                    gradient.addColorStop(1, event.color);
                    this.ctx.fillStyle = gradient;
                    this.ctx.fillRect(event.left, event.top, event.width_uncertain_from, constants_1.EVENT_HEIGHT);
                    left = event.left + event.width_uncertain_from;
                    width -= event.width_uncertain_from;
                }
                if (event.width_uncertain_to > 1) {
                    width -= event.width_uncertain_to;
                    const gradientLeft = left + width;
                    const gradientWidth = gradientLeft + event.width_uncertain_to;
                    const gradient = this.ctx.createLinearGradient(gradientLeft, 0, gradientWidth, 0);
                    gradient.addColorStop(0, event.color);
                    gradient.addColorStop(1, 'white');
                    this.ctx.fillStyle = gradient;
                    this.ctx.fillRect(gradientLeft, event.top, event.width_uncertain_to, constants_1.EVENT_HEIGHT);
                }
                this.ctx.fillStyle = event.color;
                this.ctx.fillRect(left, event.top, width, constants_1.EVENT_HEIGHT);
            }
        }
        this.drawEventsText(band);
    }
    drawEventsText(band) {
        this.ctx.font = '11px sans-serif';
        this.ctx.fillStyle = `rgb(40, 40, 40)`;
        for (const event of band.visibleEvents) {
            let eventLeft = event.left;
            if (event.left < 0 && event.time !== 0) {
                eventLeft = -event.width_uncertain_from;
            }
            const paddingLeft = event.time ? 3 : 8;
            this.ctx.fillText(event.label, eventLeft + paddingLeft + event.width_uncertain_from, event.top + constants_1.EVENT_HEIGHT - 3);
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
