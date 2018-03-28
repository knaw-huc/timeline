import Domain from './domain';
import { RawEv3nt, Pixels, Milliseconds } from '../constants';
declare class Event {
    date: Milliseconds;
    endDate: Milliseconds;
    left: Pixels;
    row: number;
    title: string;
    width: Pixels;
    constructor(rawEvent: RawEv3nt, domain: Domain);
    isInterval(): boolean;
}
export default Event;
