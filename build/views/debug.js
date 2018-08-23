"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const animator_1 = require("../animator");
const create_element_1 = require("../utils/create-element");
const props_1 = require("../models/props");
const minimap_1 = require("../models/band/minimap");
class Debug {
    constructor() {
        animator_1.default.registerView(this);
    }
    render() {
        this.wrapper = create_element_1.default('div', 'debug', [
            'background: black',
            'color: white',
            'font-size: .75em',
            'height: 640px',
            'padding: 1em',
            'position: absolute',
            'right: 0',
            'top: 200px',
            'width: 240px',
            'z-index: 10',
        ]);
        this.update();
        return this.wrapper;
    }
    resize() { }
    update() {
        this.wrapper.innerHTML = `
			${props_1.default.bands
            .map(band => `
						<table style="margin-bottom: 1em; border-collapse: collapse; border-spacing: 0;">
							<tr><td style="color: gray" width=40>type</td><td>${band instanceof minimap_1.default ? 'minimap' : 'events'}</td></tr>
							<tr><td style="color: gray">zoom</td><td>${band.zoomLevel}</td></tr>
							<tr><td style="color: gray">px/ms</td><td>${band.pixelsPerMillisecond.toExponential(2)}</td></tr>
							<tr><td style="color: gray">left</td><td>${Math.round(band.offsetX)}px</td></tr>
							<tr><td style="color: gray">width</td><td>${Math.round(band.width)}px</td></tr>
							<tr><td style="color: gray">from</td><td>${new Date(band.from).toUTCString()}</td></tr>
							<tr><td style="color: gray">to</td><td>${new Date(band.to).toUTCString()}</td></tr>
						</table>
					`)
            .join('')}
		`;
    }
}
exports.default = Debug;
