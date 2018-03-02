"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("./models/domain");
const events_1 = require("./views/band/events");
const sparkline_1 = require("./views/band/sparkline");
const indicator_1 = require("./views/indicator");
const create_element_1 = require("./utils/create-element");
const create_aggregate_1 = require("./utils/create-aggregate");
const data_1 = require("./data");
const defaultProps = {
    aggregate: [],
    center: .5,
    domains: [],
    events: data_1.default,
    rootElement: null,
};
class Timeline {
    constructor(props) {
        this.props = props;
        this.appendToWrapper = (child) => this.wrapper.appendChild(child.render());
        this.props = Object.assign({}, defaultProps, props);
        this.domains = this.createDomains();
        this.props.rootElement.appendChild(this.render());
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
        const { width, height } = this.props.rootElement.getBoundingClientRect();
        const from = this.props.events[0].date;
        const to = this.props.events[this.props.events.length - 1].date;
        return this.props.domains
            .map(d => {
            const domain = new domain_1.default(d, from, to, width, height);
            domain.setCenter(this.props.center);
            return domain;
        });
    }
    renderEvents() {
        this.domains
            .filter(d => d.type === 'EVENTS')
            .map(d => new events_1.default(d, this.props.events))
            .forEach(this.appendToWrapper);
    }
    renderSparklines() {
        this.domains
            .filter(d => d.type === 'SPARKLINE')
            .map(d => new sparkline_1.default(d, create_aggregate_1.default(this.props.events)))
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
