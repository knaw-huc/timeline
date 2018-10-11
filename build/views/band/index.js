"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const band_1 = require("../../models/band");
const props_1 = require("../../models/props");
const create_element_1 = require("../../utils/create-element");
const event_bus_1 = require("../../event-bus");
const animator_1 = require("../../animator");
const constants_1 = require("../../constants");
class BandView {
    constructor(band) {
        this.band = band;
        this.onMouseDown = (ev) => {
            document.addEventListener('mouseup', this.onMouseUp);
            this.dragStartTime = Date.now();
            this.dragStartPosition = [ev.clientX, ev.clientY];
            this.dragOffsetX = ev.clientX;
            this.dragOffsetY = ev.clientY;
        };
        this.onMouseMove = (ev) => {
            if (this.dragOffsetX == null)
                return;
            const yChange = ev.clientY - this.dragOffsetY;
            const xChange = ev.clientX - this.dragOffsetX;
            if (this.band.type === band_1.BandType.EventsBand) {
                const band = this.band;
                if (band.offsetY !== 0 ||
                    (Math.abs(yChange) > Math.abs(xChange) && Math.abs(yChange) > 5)) {
                    band.offsetY = yChange;
                }
            }
            const centerChange = xChange / this.band.pixelsPerMillisecond;
            props_1.default.center -= centerChange;
            animator_1.default.nextFrame();
            this.dragOffsetX = ev.clientX;
            this.dragOffsetY = ev.clientY;
        };
        this.onMouseUp = (ev) => {
            this.lastDragInterval = Date.now() - this.dragStartTime;
            this.dispatchScrollDoneEvent(ev);
            this.dragOffsetX = null;
            this.dragOffsetY = null;
            document.removeEventListener('mouseup', this.onMouseUp);
        };
        this.onDblClick = (ev) => {
            const nextCenter = this.band.timestampAtPosition(ev.clientX);
            animator_1.default.goTo(nextCenter);
        };
    }
    render() {
        this.rootElement = create_element_1.default('div', 'band-wrap', [
            'position: absolute',
            'z-index: 2',
        ], [
            `height: ${this.band.visibleHeight}px`,
            `top: ${this.band.top}px`,
            `width: ${props_1.default.viewportWidth}px`,
        ]);
        event_bus_1.default.register('mousedown', this.onMouseDown, this.rootElement);
        event_bus_1.default.register('mousemove', this.onMouseMove, this.rootElement);
        event_bus_1.default.register('dblclick', this.onDblClick, this.rootElement);
        return this.rootElement;
    }
    dispatchScrollDoneEvent(ev) {
        const significantDrag = [
            this.dragStartPosition[0] - ev.clientX,
            this.dragStartPosition[1] - ev.clientY
        ]
            .map(Math.abs)
            .some(offset => offset > 5);
        if (this.lastDragInterval > 200 || significantDrag) {
            event_bus_1.default.dispatch(constants_1.EventType.ScrollDone);
        }
    }
    resize() {
        this.rootElement.style.cssText = `height: ${this.band.visibleHeight}px; top: ${this.band.top}px; width: ${props_1.default.viewportWidth}px;`;
    }
}
exports.default = BandView;
