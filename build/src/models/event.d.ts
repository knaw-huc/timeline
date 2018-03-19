import Domain from './domain';
import { RawEv3nt, Pixels } from '../constants';
declare class Event {
    date: Date;
    endDate: Date;
    left: Pixels;
    row: number;
    title: string;
    width: Pixels;
    constructor(rawEvent: RawEv3nt, domain: Domain);
    countDays(): number;
    isInterval(): boolean;
}
export default Event;
