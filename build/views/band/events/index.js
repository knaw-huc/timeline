"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("../../../models/event");
const create_element_1 = require("../../../utils/create-element");
const index_1 = require("../index");
const point_in_time_1 = require("./event/point-in-time");
const add_top_1 = require("../../../utils/add-top");
class EventsBand extends index_1.default {
    constructor(domain, events) {
        super(domain);
        this.events = events;
        this.iter = 0;
        this.renderEvents = () => {
            const [from, to, last] = this.domain.initialActiveRange(++this.iter);
            this.events
                .filter(e => e.date >= from && e.date <= to && !e.isRendered)
                .forEach(e => {
                e.isRendered = true;
                this.eventsWrap.appendChild(new point_in_time_1.default(this.topAdder(new event_1.default(e, this.domain))).render());
            });
            if (!last)
                window.requestAnimationFrame(this.renderEvents);
        };
        this.topAdder = add_top_1.default(domain);
        const t0 = performance.now();
        const segmentCount = Math.ceil(this.domain.width / this.domain.viewportWidth);
        const segments = [];
        for (let i = 0; i < segmentCount; i++) {
            const ratioFrom = this.domain.visibleRatio * i;
            const ratioTo = (this.domain.visibleRatio * i) + this.domain.visibleRatio;
            const from = this.domain.dateAtProportion(ratioFrom);
            const to = this.domain.dateAtProportion(ratioTo);
            const index = this.events.findIndex(e => e.date.getTime() > to.getTime());
            console.log(index);
            segments.push({
                events: null,
                ratioFrom,
                ratioTo,
                from,
                to,
            });
        }
        const t1 = performance.now();
        console.log(segments, (t1 - t0) / 1000);
    }
    render() {
        const bandWrap = super.render();
        this.eventsWrap = create_element_1.default('ul', 'events-wrap', [
            'list-style: none',
            'margin: 0',
            'padding: 0',
            'width: 100%',
        ], [
            `height: ${this.domain.height}px`,
        ]);
        this.renderEvents();
        bandWrap.appendChild(this.eventsWrap);
        return bandWrap;
    }
}
exports.default = EventsBand;
