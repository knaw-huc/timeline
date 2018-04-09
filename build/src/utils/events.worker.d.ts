import { Milliseconds, Grid } from "../constants";
import { RawEv3nt } from "../models/event";
export declare type SortFuncReturn = [Milliseconds, Milliseconds, RawEv3nt[], RawEv3nt[], Grid, number];
export declare function sortEvents(rawEvents: RawEv3nt[]): SortFuncReturn;
export declare function eventsWorker(e: {
    data: {
        events: RawEv3nt[];
        sortFuncURL: string;
    };
}): void;
declare const _default: (events: RawEv3nt[], done: (response: [number, number, RawEv3nt[], RawEv3nt[], [number, number][][], number]) => void) => void;
export default _default;
