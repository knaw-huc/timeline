import BaseEvent from './base-event';
import Domain from './domain';
import { RawEv3nt } from './config';
declare class Ev3nt extends BaseEvent {
    left: number;
    top: number;
    width: number;
    constructor(rawEvent: RawEv3nt, domain: Domain);
    space(): [number, number];
}
export default Ev3nt;
