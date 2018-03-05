"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_element_1 = require("../../utils/create-element");
const constants_1 = require("../../constants");
const props_1 = require("../../models/props");
class Indicator {
    constructor(hostDomain, targetDomain) {
        this.hostDomain = hostDomain;
        this.targetDomain = targetDomain;
        this.width = this.hostDomain.width / this.targetDomain.width * this.targetDomain.viewportWidth;
        document.addEventListener(constants_1.CENTER_CHANGE_EVENT, (e) => {
            this.indicator.style.transform = `translate3d(${this.indicatorLeft()}px, 0, 0)`;
        });
    }
    render() {
        const wrapper = create_element_1.default('div', 'indicator-wrap', [
            'bottom: 0',
            'left: 0',
            'pointer-events: none',
            'position: absolute',
            'right: 0',
        ], [
            `height: ${this.hostDomain.viewportHeight}px`,
            `top: ${this.hostDomain.topOffsetRatio * 100}%`,
        ]);
        this.indicator = create_element_1.default('div', 'indicator', [
            'position: absolute',
            'bottom: 0',
            'cursor: -webkit-grab',
            'background-color: rgba(255, 0, 0, .05)',
            'z-index: 3',
        ], [
            `height: ${this.hostDomain.viewportHeight}px`,
            `transform: translate3d(${this.indicatorLeft()}px, 0, 0)`,
            `width: ${this.width}px`,
        ]);
        wrapper.appendChild(this.indicator);
        return wrapper;
    }
    indicatorLeft() {
        return (this.targetDomain.viewportWidth - this.width) * props_1.default.center;
    }
}
exports.default = Indicator;
