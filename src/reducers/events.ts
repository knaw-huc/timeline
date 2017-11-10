import Event from '../models/event';
import RootEvent, {IRootEvent} from '../models/root-event';
import {addTop, parseEvent} from '../utils/event';

export interface IDefaultState {
	events: Event[];
	newEvent: Event;
	newEventData: any;
	root: IRootEvent;
	serverEvents: any[];
	serverRoot: any;
}

const defaultState: IDefaultState = {
	events: [],
	newEvent: null,
	newEventData: {},
	root: null,
	serverEvents: null,
	serverRoot: null,
};

export default (state = defaultState, action) => {
	let nextState = state;

	switch (action.type) {
		case 'RECEIVE_EVENTS': {
			// const root = new RootEvent(parseEvent(action.root), 0);
			// let events = action.events.map((e) => new Event(parseEvent(e), root));
			// events = addTop(events);

			// nextState = Object.assign({}, state, {
			// 	events,
			// 	newEvent: new Event({}, root),
			// 	root,
			// 	serverEvents: action.events,
			// 	serverRoot: action.root,
			// });
			break;
		}

		case 'SET_EVENT_KEY_VALUES': {
			const newEventData = Object.assign({}, state.newEventData, action.keyValues);
			// const newEvent = new Event(newEventData, state.root);

			nextState = Object.assign({}, state, {
				// newEvent,
				newEventData,
			});
			break;
		}

		case 'RESET_EVENT': {
			// nextState = Object.assign({}, state, { newEvent: new Event({}, state.root) });
			break;
		}

		case 'SAVE_EVENT': {
			nextState = Object.assign({}, state, {
				events: state.events.concat(state.newEvent),
				// newEvent: new Event({}, state.root),
			});
			break;
		}

		case 'RESIZE': {
			const root = new RootEvent(parseEvent(state.serverRoot), 0);
			// let events = state.serverEvents.map((e) => new Event(parseEvent(e), root));
			// events = addTop(events);
			// nextState = Object.assign({}, state, { root, events });
			break;
		}

		default:
	}

	return nextState;
};
