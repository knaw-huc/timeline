"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventBus {
    constructor() {
        this.eventsListeners = [];
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
