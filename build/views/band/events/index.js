"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("../../../models/event");
const create_element_1 = require("../../../utils/create-element");
const index_1 = require("../index");
const point_in_time_1 = require("./event/point-in-time");
const add_top_1 = require("../../../utils/add-top");
class EventsBand {
    constructor(domain, events) {
        this.domain = domain;
        this.events = events
            .map(e => new event_1.default(e, this.domain))
            .map(add_top_1.default());
    }
    render() {
        this.eventsWrap = create_element_1.default('ul', 'events-wrap', [
            'list-style: none',
            'margin: 0',
            'padding: 0',
            'width: 100%',
        ], [
            `height: ${this.domain.height}px`,
        ]);
        this.renderChildren();
        const bandWrap = new index_1.default(this.domain).render();
        bandWrap.appendChild(this.eventsWrap);
        return bandWrap;
    }
    renderChildren() {
        this.events
            .map(e => new point_in_time_1.default(e).render())
            .forEach(e => this.eventsWrap.appendChild(e));
    }
}
exports.default = EventsBand;
