import { Milliseconds } from "../constants";
import { RawEv3nt } from "../models/event";
export declare class OrderedEvents {
    events: RawEv3nt[];
    row_count: number;
}
export declare function orderEvents(events: RawEv3nt[], pixelsPerMillisecond: Milliseconds): OrderedEvents;
