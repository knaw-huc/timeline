"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("./models/domain");
const props_1 = require("./models/props");
const events_1 = require("./views/band/events");
const sparkline_1 = require("./views/band/sparkline");
const indicator_1 = require("./views/indicator");
const create_element_1 = require("./utils/create-element");
const create_aggregate_1 = require("./utils/create-aggregate");
const data_1 = require("./data");
const defaultConfig = {
    aggregate: [],
    center: .5,
    domains: [],
    events: data_1.default,
    rootElement: null,
};
class Timeline {
    constructor(config) {
        this.config = config;
        this.appendToWrapper = (child) => this.wrapper.appendChild(child.render());
        this.config = Object.assign({}, defaultConfig, config);
        props_1.default.from = this.config.events[0].date;
        props_1.default.to = this.config.events[this.config.events.length - 1].date;
        this.domains = this.createDomains();
        this.config.rootElement.appendChild(this.render());
    }
    render() {
        this.wrapper = create_element_1.default('div', 'wrapper', [
            'background-color: teal',
            'box-sizing: border-box',
            'height: 100%',
            'overflow: hidden',
            'position: relative',
            'width: 100%',
        ]);
        this.renderEvents();
        this.renderSparklines();
        this.renderIndicators();
        return this.wrapper;
    }
    createDomains() {
        const { width, height } = this.config.rootElement.getBoundingClientRect();
        return this.config.domains.map(d => new domain_1.default(d, width, height));
    }
    renderEvents() {
        this.domains
            .filter(d => d.type === 'EVENTS')
            .map(d => new events_1.default(d, this.config.events))
            .forEach(this.appendToWrapper);
    }
    renderSparklines() {
        this.domains
            .filter(d => d.type === 'SPARKLINE')
            .map(d => new sparkline_1.default(d, create_aggregate_1.default(this.config.events)))
            .forEach(this.appendToWrapper);
    }
    renderIndicators() {
        this.domains
            .filter(d => d.hasIndicatorFor != null)
            .map(d => new indicator_1.default(d, this.domains[d.hasIndicatorFor]))
            .forEach(this.appendToWrapper);
    }
}
exports.default = Timeline;
