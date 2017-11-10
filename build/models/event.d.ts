import BaseEvent from './base-event';
import Domain from './domain';
declare class Event extends BaseEvent {
    visibleDomain: Domain;
    flip: boolean;
    left: number;
    top: number;
    width: number;
    constructor(data: any, visibleDomain: Domain);
    space(): [number, number];
}
export default Event;
