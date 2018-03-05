"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_element_1 = require("../../utils/create-element");
const index_1 = require("./index");
class SparklineBand extends index_1.default {
    constructor(domain, aggregate) {
        super(domain);
        this.aggregate = aggregate;
    }
    render() {
        const wrapper = super.render();
        const svg = create_element_1.createSvg('svg', null, {
            height: `${this.domain.viewportHeight}px`,
            preserveAspectRatio: "none",
            viewBox: `0 0 ${this.domain.width} ${this.domain.viewportHeight}`,
            width: `${this.domain.width}px`,
        });
        const path = create_element_1.createSvg('path', [
            'fill: rgba(245, 245, 255, .7)',
            'stroke: rgb(180, 180, 255)',
        ], { d: this.createPath() });
        svg.appendChild(path);
        wrapper.appendChild(svg);
        return wrapper;
    }
    createPath() {
        const countMax = this.aggregate.reduce((prev, curr) => { return Math.max(prev, curr.count); }, 0);
        const path = this.aggregate.reduce((prev, curr, index) => {
            const curveType = index === 0 ? 'M' : 'L';
            const x = (this.domain.width / (this.aggregate.length - 1)) * index;
            const y = this.domain.viewportHeight - ((curr.count / countMax) * this.domain.viewportHeight);
            return `${prev} ${curveType} ${x} ${y}`;
        }, '');
        const pathCloser = ` L ${this.domain.width + 1} ${this.domain.viewportHeight + 1} L -1 ${this.domain.viewportHeight + 1}`;
        return path + pathCloser;
    }
}
exports.default = SparklineBand;
