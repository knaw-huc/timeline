import BaseEvent from './base-event';
import Domain from './domain';
declare class Event extends BaseEvent {
    isRendered: boolean;
    left: number;
    top: number;
    width: number;
    constructor(data: any, domain: Domain);
    space(): [number, number];
}
export default Event;
