"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../../../constants");
const create_element_1 = require("../../../../../utils/create-element");
class PointInTime {
    constructor(event) {
        this.event = event;
    }
    render() {
        const li = create_element_1.default('li', 'pit-wrap', [
            'box-sizing: border-box',
            'font-size: 0.8em',
            'position: absolute',
            'white-space: nowrap',
            `max-width: ${constants_1.EVENT_MIN_SPACE}px`,
        ], [
            `left: ${this.event.left - 5}px`,
            `top: ${this.event.top}px`,
        ]);
        li.setAttribute('title', this.event.date.toString());
        const title = create_element_1.default('div', 'pit-title', [
            'background-color: rgba(255,255,255,.75)',
            'display: inline-block',
            `line-height: ${constants_1.EVENT_HEIGHT}px`,
            `max-width: calc(${constants_1.EVENT_MIN_SPACE}px - ${constants_1.EVENT_HEIGHT}px)`,
            'overflow: hidden',
            'padding: .25em',
            'text-overflow: ellipsis',
        ]);
        title.textContent = this.event.title;
        const point = create_element_1.default('div', 'pit-point', [
            'background-image: radial-gradient(white 20%, black 100%)',
            `border-radius: ${constants_1.EVENT_HEIGHT / 2}px`,
            'display: inline-block',
            'margin: .25em 0',
            `width: ${constants_1.EVENT_HEIGHT}px`,
            `height: ${constants_1.EVENT_HEIGHT}px`,
        ]);
        li.appendChild(point);
        li.appendChild(title);
        return li;
    }
}
exports.default = PointInTime;
