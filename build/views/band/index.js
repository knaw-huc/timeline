"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_element_1 = require("../../utils/create-element");
const rulers_1 = require("./rulers");
const constants_1 = require("../../constants");
class BandWrapper {
    constructor(domain) {
        this.domain = domain;
        this.updateLeft = () => {
            this.rootElement.style.transform = `translate3d(${this.domain.left}px, 0, 0)`;
        };
        this.onMouseDown = (ev) => {
            document.addEventListener('mouseup', this.onMouseUp);
            this.dragOffset = ev.clientX;
            this.dragStart = this.domain.left;
        };
        this.onMouseMove = (ev) => {
            if (this.dragOffset) {
                const left = this.dragStart - (this.dragOffset - ev.clientX);
                this.domain.setLeft(left);
                this.updateLeft();
                document.dispatchEvent(new CustomEvent(constants_1.CENTER_CHANGE_EVENT, {
                    detail: {
                        center: this.domain.center,
                        id: this.id,
                    }
                }));
            }
        };
        this.onMouseUp = () => {
            document.removeEventListener('mouseup', this.onMouseUp);
            this.dragOffset = null;
        };
        this.id = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
        document.addEventListener(constants_1.CENTER_CHANGE_EVENT, (e) => {
            if (e['detail']['id'] !== this.id) {
                this.domain.setCenter(e['detail']['center']);
                this.updateLeft();
            }
        });
    }
    render() {
        this.rootElement = create_element_1.default('div', 'band-wrap', [
            'background-color: lightyellow',
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
exports.default = BandWrapper;
