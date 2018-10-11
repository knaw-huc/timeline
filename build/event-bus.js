"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventBus {
    constructor() {
        this.eventsListeners = [];
    }
    dispatch(eventType, payload) {
        const event = (payload != null) ?
            new CustomEvent(eventType, { detail: payload }) :
            new CustomEvent(eventType);
        document.dispatchEvent(event);
    }
    register(type, listener, target = document) {
        target.addEventListener(type, listener);
        this.eventsListeners.push([type, listener, target]);
    }
    flush() {
        this.eventsListeners.forEach((eventListener) => {
            const [type, listener, target] = eventListener;
            target.removeEventListener(type, listener);
        });
        this.eventsListeners = [];
    }
}
exports.EventBus = EventBus;
exports.default = new EventBus();
