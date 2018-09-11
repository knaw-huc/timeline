"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const config_1 = require("../config");
const props_1 = require("../props");
const create_element_1 = require("../../utils/create-element");
function extendConfig(config) {
    const extendedConfig = Object.assign({}, new config_1.MinimapBandConfig(), config);
    if (!extendedConfig.targets.length)
        extendedConfig.targets.push(0);
    return extendedConfig;
}
class MinimapBand extends _1.default {
    constructor(config) {
        super(extendConfig(config));
        this.type = _1.BandType.MinimapBand;
        this.canvas = create_element_1.default('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.nextCanvas = create_element_1.default('canvas');
        this.nextCtx = this.nextCanvas.getContext('2d');
        this.isDrawn = false;
    }
    init() {
        super.init();
        this.maxRowCount = this.config.targets.reduce((prev, curr) => {
            const { rowCount } = props_1.default.eventsBands[curr];
            return Math.max(prev, rowCount);
        }, 0);
        const eventHeight = this.availableHeight / this.maxRowCount;
        this.eventHeight = eventHeight < 1 ? 1 : Math.floor(eventHeight);
        this.canvas.width = props_1.default.viewportWidth;
        this.canvas.height = this.maxRowCount * this.eventHeight;
        this.nextCanvas.width = this.canvas.width;
        this.nextCanvas.height = this.canvas.height;
    }
    resize() {
        super.resize();
        this.isDrawn = false;
    }
    draw() {
        if (!this.isDrawn)
            this.drawEvents();
        else
            this.updateNextCanvas();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.nextCanvas, 0, 0);
        return this.canvas;
    }
    drawEvents(from = this.from, to = this.to) {
        this.nextCtx.beginPath();
        this.config.targets.forEach(targetIndex => {
            const targetBand = props_1.default.eventsBands[targetIndex];
            for (const event of targetBand.events) {
                if (event.from > to || event.to < from)
                    continue;
                const x = this.positionAtTimestamp(event.from);
                const y = this.maxRowCount - ((event.row + 2) * this.eventHeight);
                const eventWidth = Math.round(event.time * this.pixelsPerMillisecond);
                const width = eventWidth < 1 ? 1 : eventWidth;
                this.nextCtx.fillStyle = `rgb(190, 190, 190)`;
                this.nextCtx.fillRect(x, y, width, this.eventHeight);
                if (event.img) {
                    this.nextCtx.fillStyle = `rgb(240, 240, 240)`;
                    this.nextCtx.fillRect(x, y - this.eventHeight * 2, this.eventHeight * 2, this.eventHeight * 2);
                }
            }
        });
    }
    updateNextCanvas() {
        const leftOffset = Math.round(this.offsetX - this.prevOffsetX);
        if (leftOffset === 0)
            return this.canvas;
        this.nextCtx.clearRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
        this.nextCtx.drawImage(this.canvas, leftOffset, 0);
        let from, to;
        if (leftOffset < 0) {
            from = this.timestampAtPosition(props_1.default.viewportWidth + leftOffset);
            to = this.to;
        }
        else {
            from = this.from;
            to = this.timestampAtPosition(leftOffset);
        }
        this.drawEvents(from, to);
    }
}
exports.default = MinimapBand;
