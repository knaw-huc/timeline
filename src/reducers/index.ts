import events from './events';
import {combineReducers} from "redux";


export interface IKeyValues {
	[propName: string]: any;
}

export default combineReducers({
	events,
});
