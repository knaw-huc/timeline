"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const animator_1 = require("./animator");
const constants_1 = require("./constants");
const props_1 = require("./models/props");
class Api {
    constructor(onChange) {
        this.onChange = onChange;
        this.animator = animator_1.default;
        this.handleChange = () => {
            this.onChange(props_1.default);
        };
        this.resize = () => {
            props_1.default.resize();
            for (const band of props_1.default.bands) {
                band.resize();
            }
            for (const view of this.views) {
                view.resize();
            }
            this.animator.nextFrame();
        };
        document.addEventListener('keydown', (ev) => {
            if (ev.keyCode === 189)
                props_1.default.eventsBands[0].zoomOut();
            if (ev.keyCode === 187)
                props_1.default.eventsBands[0].zoomIn();
        });
        if (this.onChange != null && typeof this.onChange === 'function') {
            document.addEventListener(constants_1.CENTER_CHANGE_DONE, this.handleChange);
            document.addEventListener(constants_1.ZOOM_DONE, this.handleChange);
        }
    }
    reload() {
        this.resize();
    }
}
exports.default = Api;
