import BaseEvent from './base-event';
import Domain from './domain';
declare class Ev3nt extends BaseEvent {
    left: number;
    top: number;
    width: number;
    constructor(data: any, domain: Domain);
    space(): [number, number];
}
export default Ev3nt;
