"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const root_event_1 = require("../models/root-event");
const event_1 = require("../utils/event");
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
            break;
        }
        case 'SET_EVENT_KEY_VALUES': {
            const newEventData = Object.assign({}, state.newEventData, action.keyValues);
            nextState = Object.assign({}, state, {
                newEventData,
            });
            break;
        }
        case 'RESET_EVENT': {
            break;
        }
        case 'SAVE_EVENT': {
            nextState = Object.assign({}, state, {
                events: state.events.concat(state.newEvent),
            });
            break;
        }
        case 'RESIZE': {
            const root = new root_event_1.default(event_1.parseEvent(state.serverRoot), 0);
            break;
        }
        default:
    }
    return nextState;
};
