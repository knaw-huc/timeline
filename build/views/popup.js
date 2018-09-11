"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_element_1 = require("../utils/create-element");
const props_1 = require("../models/props");
const constants_1 = require("../constants");
const dates_1 = require("../utils/dates");
const animator_1 = require("../animator");
const POPUP_OFFSET = 14;
function template(event) {
    return `
		<img alt="noimage" src="" />
		<div class="metadata">
			<h2 class="label">${event.lbl}</h2>
			<div class="description">${event.dsc || ''}</div>
			<br />
			<br />
			<div class="from">${dates_1.formatDate(event.from, event.dmin_g || event.d_g)}</div>
			${event.time ?
        `<div class="to">${dates_1.formatDate(event.to, event.dmax_g || event.ed_g)}</div>` :
        ''}
		</div>
		<div id="popup-close">✖</div>
	`;
}
class Popup {
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.update = () => {
            if (this.event)
                this.setPosition();
        };
        this.loadImage = () => {
            const img = this.el.querySelector('img');
            img.removeEventListener('load', this.loadImage);
            this.setWidth();
            this.setPosition();
        };
        this.el = create_element_1.default('div');
        this.el.id = 'popup';
        this.el.style.position = 'absolute';
        this.el.style.zIndex = '10';
        this.hide();
        this.rootElement.appendChild(this.el);
        this.el.addEventListener('click', (ev) => {
            if (ev.target.matches('#popup-close')) {
                this.hide();
            }
        });
        animator_1.default.registerView(this);
    }
    hide() {
        this.event = null;
        this.el.style.width = 'auto';
        this.el.style.visibility = 'hidden';
        this.el.classList.remove('bottom');
    }
    setWidth() {
        const rect = this.el.getBoundingClientRect();
        this.el.style.width = `${rect.width}px`;
    }
    setPosition() {
        const rect = this.el.getBoundingClientRect();
        if (this.event.left + this.event.width < POPUP_OFFSET ||
            this.event.left > props_1.default.viewportWidth - POPUP_OFFSET) {
            this.el.style.visibility = 'hidden';
            return;
        }
        let left = this.event.left + this.event.width / 2 - rect.width / 2;
        if (left < POPUP_OFFSET)
            left = POPUP_OFFSET;
        if (left + rect.width > props_1.default.viewportWidth - POPUP_OFFSET)
            left = props_1.default.viewportWidth - rect.width - POPUP_OFFSET;
        this.el.style.left = `${left}px`;
        let top = this.event.top + constants_1.EVENT_HEIGHT + POPUP_OFFSET;
        if (top + rect.height > props_1.default.viewportHeight - POPUP_OFFSET) {
            top = this.event.top - rect.height - POPUP_OFFSET;
            this.el.classList.add('bottom');
        }
        this.el.style.top = `${top}px`;
        this.el.style.visibility = 'visible';
    }
    show(event) {
        this.hide();
        this.event = event;
        this.el.innerHTML = template(event);
        const label = this.el.querySelector('.label');
        label.style.color = event.color;
        const img = this.el.querySelector('img');
        if (event.img) {
            img.setAttribute('alt', `Image of ${event.lbl}`);
            img.addEventListener('load', this.loadImage);
            img.src = event.image.src.replace('32', '128');
        }
        else {
            img.src = null;
            img.setAttribute('alt', 'noimage');
            this.setWidth();
            this.setPosition();
        }
    }
}
exports.default = Popup;
