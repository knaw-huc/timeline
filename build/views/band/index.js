"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const props_1 = require("../../models/props");
const create_element_1 = require("../../utils/create-element");
const rulers_1 = require("./rulers");
const constants_1 = require("../../constants");
class Band {
    constructor(domain) {
        this.domain = domain;
        this.updateLeft = () => {
            this.rootElement.style.transform = `translate3d(${this.domain.updateLeft()}px, 0, 0)`;
        };
        this.onMouseDown = (ev) => {
            document.addEventListener('mouseup', this.onMouseUp);
            this.dragOffset = ev.clientX;
            this.dragStart = this.domain.left;
        };
        this.onMouseMove = (ev) => {
            if (this.dragOffset) {
                const left = this.dragStart - (this.dragOffset - ev.clientX);
                props_1.default.center = left / (this.domain.viewportWidth - this.domain.width);
            }
        };
        this.onMouseUp = () => {
            document.removeEventListener('mouseup', this.onMouseUp);
            this.dragOffset = null;
        };
        document.addEventListener(constants_1.CENTER_CHANGE_EVENT, this.updateLeft);
    }
    render() {
        this.rootElement = create_element_1.default('div', 'band-wrap', [
            'background-color: white',
            'position: absolute',
        ], [
            `height: ${this.domain.heightRatio * 100}%`,
            `top: ${this.domain.topOffsetRatio * 100}%`,
            `transform: translate3d(${this.domain.left}px, 0, 0)`,
            `width: ${this.domain.width}px`,
        ]);
        this.rootElement.appendChild(new rulers_1.default(this.domain).render());
        this.rootElement.addEventListener('mousedown', this.onMouseDown);
        this.rootElement.addEventListener('mousemove', this.onMouseMove);
        return this.rootElement;
    }
}
exports.default = Band;
