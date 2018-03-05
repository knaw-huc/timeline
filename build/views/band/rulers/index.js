"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_element_1 = require("../../../utils/create-element");
const ruler_1 = require("./ruler");
const date_range_1 = require("../../../utils/date-range");
const findClosestRulerPosition = (date, granularity) => {
    if (granularity > 4) {
        const step = date_range_1.getStep(granularity);
        let year = date.getFullYear();
        while (year % step !== 0) {
            year += 1;
        }
        return new Date(year, 0, 1);
    }
    return date;
};
class Rulers {
    constructor(domain) {
        this.domain = domain;
        this.iter = 0;
        this.prevRange = [null, null];
        this.renderRulers = () => {
            let [from, to, last] = this.domain.initialActiveRange(++this.iter);
            from = findClosestRulerPosition(from, this.domain.granularity);
            const [prevFrom, prevTo] = this.prevRange;
            const end = prevFrom || to;
            for (let i = from; i < end; i = new Date(this.domain.nextDate(i))) {
                const r = new ruler_1.default(i, this.domain);
                this.ul.appendChild(r.render());
            }
            if (prevTo) {
                for (let i = prevTo; i < to; i = new Date(this.domain.nextDate(i))) {
                    const r = new ruler_1.default(i, this.domain);
                    this.ul.appendChild(r.render());
                }
            }
            this.prevRange = [from, to];
            if (!last)
                window.requestAnimationFrame(this.renderRulers);
        };
    }
    render() {
        this.ul = create_element_1.default('ul', 'ruler-wrap', [
            'bottom: 0',
            'left: 0',
            'list-style: none',
            'margin: 0',
            'padding: 0',
            'position: absolute',
            'right: 0',
            'top: 0',
            'whiteSpace: nowrap',
        ]);
        this.renderRulers();
        return this.ul;
    }
}
exports.default = Rulers;
