import { Milliseconds, Grid } from "../constants";
import { RawEv3nt } from "../models/event";
export declare class OrderedEvents {
    events: RawEv3nt[];
    from: Milliseconds;
    to: Milliseconds;
    grid: Grid;
    rowCount: number;
}
export declare function orderEvents(events: RawEv3nt[]): OrderedEvents;
export declare function eventsWorker(e: {
    data: {
        events: RawEv3nt[];
        orderEventsURL: string;
    };
}): void;
declare const _default: (events: RawEv3nt[], done: (response: OrderedEvents) => void) => void;
export default _default;
