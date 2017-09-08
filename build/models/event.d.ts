import BaseEvent, { IBaseEvent } from './base-event';
import { IRootEvent } from "./root-event";
export interface IEvent extends IBaseEvent {
    flip: boolean;
    left: number;
    root: IRootEvent;
    top: number;
    width: number;
    space(): [number, number];
}
declare class Event extends BaseEvent implements IEvent {
    flip: any;
    left: any;
    top: any;
    width: any;
    root: any;
    constructor(data: any, root: IRootEvent);
    space(): [number, number];
}
export default Event;
