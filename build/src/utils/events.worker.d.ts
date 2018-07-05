import { Milliseconds, Grid, Pixels, Ratio } from "../constants";
import { RawEv3nt } from "../models/event";
export declare type OrderEventsReturn = [RawEv3nt[], Milliseconds, Milliseconds, Grid, number];
export declare function orderEvents(events: RawEv3nt[], viewportWidth: Pixels, visibleRatio: Ratio): OrderEventsReturn;
export declare function eventsWorker(e: {
    data: {
        events: RawEv3nt[];
        orderEventsURL: string;
    };
}): void;
declare const _default: (events: RawEv3nt[], done: (response: [RawEv3nt[], number, number, [number, number][][], number]) => void) => void;
export default _default;
