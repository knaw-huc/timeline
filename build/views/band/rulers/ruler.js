"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_element_1 = require("../../../utils/create-element");
const constants_1 = require("../../../constants");
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};
const labelBody = (d, granularity) => {
    if (granularity >= 4) {
        return d.getFullYear().toString();
    }
    else if (granularity === 3) {
        let body = months[d.getMonth()];
        if (d.getMonth() === 0)
            body = `${d.getFullYear().toString()}, ${body}`;
        return body;
    }
    else if (granularity === 2) {
        return `${months[d.getMonth()]}, week ${getWeekNumber(d)}`;
    }
    else if (granularity === 1) {
        return days[d.getDate()];
    }
    else if (granularity === 0) {
        return 'NOT IMPLEMENTED';
    }
};
class Ruler {
    constructor(date, domain) {
        this.date = date;
        this.domain = domain;
    }
    render() {
        const li = create_element_1.default('li', 'ruler', [
            'border-left: 1px solid #ccc',
            'box-sizing: border-box',
            'height: 100%',
            'padding-left: 6px',
            'position: absolute',
            'transition: all 1s cubic-bezier(.25,.8,.25,1)',
        ], [
            `left: ${this.domain.positionAtDate(this.date)}px`,
        ]);
        const label = create_element_1.default('div', 'ruler-label', [
            'alignItems: flex-end',
            'bottom: 10px',
            'display: flex',
            `height: calc(${constants_1.DATE_BAR_HEIGHT} - 10px)`,
            'color: #444',
            'position: absolute',
            'zIndex: 2',
        ]);
        label.textContent = labelBody(this.date, this.domain.granularity);
        li.appendChild(label);
        return li;
    }
}
exports.default = Ruler;
