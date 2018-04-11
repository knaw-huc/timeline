import { Milliseconds, Grid } from "../constants";
import { RawEv3nt } from "../models/event";
export declare function byDate(a: RawEv3nt, b: RawEv3nt): 1 | -1 | 0;
export declare type OrderEventsReturn = [RawEv3nt[], Milliseconds, Milliseconds, Grid, number];
export declare function orderEvents(rawEvents: RawEv3nt[]): OrderEventsReturn;
export declare function eventsWorker(e: {
    data: {
        events: RawEv3nt[];
        orderEventsURL: string;
        byDateURL: string;
    };
}): void;
declare const _default: (events: RawEv3nt[], done: (response: [RawEv3nt[], number, number, [number, number][][], number]) => void) => void;
export default _default;
