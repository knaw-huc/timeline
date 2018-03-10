import Domain from './domain';
import { RawEv3nt } from './config';
declare abstract class BaseEvent {
    private _date;
    date: Date;
    private _endDate;
    endDate: Date;
    private _title;
    title: string;
    private _left;
    left: number;
    private _top;
    top: number;
    private _width;
    width: number;
    constructor(rawEvent: RawEv3nt, domain: Domain);
    space(): [number, number];
    countDays(): number;
    isInterval(): boolean;
}
export default BaseEvent;
