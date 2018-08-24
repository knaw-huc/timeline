"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const props_1 = require("./models/props");
exports.TimelineProps = props_1.Props;
const index_1 = require("./models/config/index");
exports.TimelineConfig = index_1.default;
const band_1 = require("./views/band");
const create_element_1 = require("./utils/create-element");
const utils_1 = require("./utils");
exports.calcPixelsPerMillisecond = utils_1.calcPixelsPerMillisecond;
const events_worker_1 = require("./utils/events.worker");
exports.OrderedEvents = events_worker_1.OrderedEvents;
exports.orderEvents = events_worker_1.orderEvents;
const api_1 = require("./api");
const events_1 = require("./views/band/events");
const canvas_1 = require("./views/canvas");
const label_1 = require("./views/label");
const minimap_1 = require("./models/band/minimap");
exports.MinimapBand = minimap_1.default;
const events_2 = require("./models/band/events");
exports.EventsBand = events_2.default;
const dates_1 = require("./utils/dates");
exports.formatDate = dates_1.formatDate;
const event_1 = require("./models/event");
exports.RawEv3nt = event_1.RawEv3nt;
const band_2 = require("./models/band");
class Timeline extends api_1.default {
    constructor(config, onChange, onSelect) {
        super(onChange);
        this.config = config;
        this.onSelect = onSelect;
        this.appendToWrapper = (child) => {
            let children = child.render();
            if (!Array.isArray(children))
                children = [children];
            children.forEach(c => this.wrapper.appendChild(c));
        };
        props_1.default.init(config);
        config.rootElement.appendChild(this.render());
        const debouncedResize = utils_1.debounce(this.resize, 600);
        window.addEventListener('resize', debouncedResize);
    }
    render() {
        this.wrapper = create_element_1.default('div', 'wrapper', [
            'box-sizing: border-box',
            'height: 100%',
            'overflow: hidden',
            'position: relative',
            'user-select: none',
            'width: 100%',
        ]);
        this.views = props_1.default.bands
            .map(band => band.type === band_2.BandType.EventsBand ?
            new events_1.default(band, this.onSelect) :
            new band_1.default(band));
        this.views.push(new canvas_1.default());
        this.views.forEach(this.appendToWrapper);
        this.renderLabels();
        const redLine = create_element_1.default('div', 'red-line', [
            'background-color: rgb(126, 0, 0)',
            'bottom: 0',
            'left: calc(50% - 1px)',
            'position: absolute',
            'top: 0',
            'width: 2px',
            'z-index: 4'
        ]);
        this.wrapper.appendChild(redLine);
        return this.wrapper;
    }
    renderLabels() {
        props_1.default.bands
            .filter(band => band.type === band_2.BandType.EventsBand && band.config.label != null)
            .map(band => new label_1.default(band))
            .forEach(this.appendToWrapper);
    }
}
exports.default = Timeline;
