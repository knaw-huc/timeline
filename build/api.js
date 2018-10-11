"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const animator_1 = require("./animator");
const props_1 = require("./models/props");
const constants_1 = require("./constants");
class Api {
    constructor() {
        this.animator = animator_1.default;
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
                props_1.default.controlBand.zoomOut();
            if (ev.keyCode === 187)
                props_1.default.controlBand.zoomIn();
        });
    }
    on(eventName, func) {
        const nameMap = {
            centerchange: constants_1.EventType.CenterChange,
            pause: constants_1.EventType.Pause,
            play: constants_1.EventType.Play,
            scrolldone: constants_1.EventType.ScrollDone,
            select: constants_1.EventType.Select,
            zoomdone: constants_1.EventType.ZoomDone,
        };
        if (Object.keys(nameMap).indexOf(eventName) > -1) {
            const eventType = nameMap[eventName];
            let realFunc;
            if (eventType === constants_1.EventType.CenterChange)
                realFunc = () => func(props_1.default);
            else if (eventType === constants_1.EventType.Select)
                realFunc = (ev) => func(ev.detail);
            else
                realFunc = func;
            document.addEventListener(eventType, realFunc);
        }
    }
    reload() {
        this.resize();
    }
}
exports.default = Api;
