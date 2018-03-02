"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_element_1 = require("../../../utils/create-element");
class Rulers {
    constructor(domain) {
        this.domain = domain;
    }
    render() {
        const ul = create_element_1.default('ul', 'ruler-wrap', [
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
        const svg = create_element_1.createSvg('svg', null, {
            height: this.domain.viewportHeight,
            preserveAspectRatio: 'none',
            viewBox: `0 0 ${this.domain.width} ${this.domain.viewportHeight}`,
            width: this.domain.width,
        });
        this.domain.range()
            .map(date => {
            const x = this.domain.positionAtDate(date);
            return create_element_1.createSvg('line', null, {
                x1: x,
                y1: 0,
                x2: x,
                y2: this.domain.viewportHeight,
                'stroke-width': 1,
            });
        })
            .forEach(r => svg.appendChild(r));
        return svg;
    }
}
exports.default = Rulers;
