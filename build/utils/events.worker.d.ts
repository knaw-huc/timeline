import { Milliseconds, Pixels } from "../constants";
import { Ev3nt, RawEv3nt } from "../models/event";
interface InputBand {
    events: RawEv3nt[];
    zoomLevel: number;
}
export interface OrderedBand {
    events: Ev3nt[];
    pixelsPerMillisecond?: Pixels;
    rowCount: number;
    zoomLevel: number;
}
interface Options {
    parent?: RawEv3nt;
    bands: InputBand[];
    viewportWidth: Pixels;
}
export declare class OrderedTimeline {
    bands: OrderedBand[];
    from: Milliseconds;
    parent: Ev3nt;
    time: Milliseconds;
    to: Milliseconds;
}
export declare function orderEvents(options: Options): OrderedTimeline;
export {};
