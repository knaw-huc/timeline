"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("../models/event");
const root_event_1 = require("../models/root-event");
const event_2 = require("../utils/event");
const defaultState = {
    events: [],
    newEvent: null,
    newEventData: {},
    root: null,
    serverEvents: null,
    serverRoot: null,
};
exports.default = (state = defaultState, action) => {
    let nextState = state;
    switch (action.type) {
        case 'RECEIVE_EVENTS': {
            const root = new root_event_1.default(event_2.parseEvent(action.root));
            let events = action.events.map((e) => new event_1.default(event_2.parseEvent(e), root));
            events = event_2.addTop(events);
            nextState = Object.assign({}, state, {
                events,
                newEvent: new event_1.default({}, root),
                root,
                serverEvents: action.events,
                serverRoot: action.root,
            });
            break;
        }
        case 'SET_EVENT_KEY_VALUES': {
            const newEventData = Object.assign({}, state.newEventData, action.keyValues);
            const newEvent = new event_1.default(newEventData, state.root);
            nextState = Object.assign({}, state, {
                newEvent,
                newEventData,
            });
            break;
        }
        case 'RESET_EVENT': {
            nextState = Object.assign({}, state, { newEvent: new event_1.default({}, state.root) });
            break;
        }
        case 'SAVE_EVENT': {
            nextState = Object.assign({}, state, {
                events: state.events.concat(state.newEvent),
                newEvent: new event_1.default({}, state.root),
            });
            break;
        }
        case 'RESIZE': {
            const root = new root_event_1.default(event_2.parseEvent(state.serverRoot));
            let events = state.serverEvents.map((e) => new event_1.default(event_2.parseEvent(e), root));
            events = event_2.addTop(events);
            nextState = Object.assign({}, state, { root, events });
            break;
        }
        default:
    }
    return nextState;
};
