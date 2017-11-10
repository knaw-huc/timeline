import Event from '../models/event';
import { IRootEvent } from '../models/root-event';
export interface IDefaultState {
    events: Event[];
    newEvent: Event;
    newEventData: any;
    root: IRootEvent;
    serverEvents: any[];
    serverRoot: any;
}
declare const _default: (state: IDefaultState, action: any) => IDefaultState;
export default _default;
