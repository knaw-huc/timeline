import { Milliseconds } from "../constants";
import { RawEv3nt } from "../models/event";
export declare const enum Granularity {
    HOUR = 0,
    DAY = 1,
    WEEK = 2,
    MONTH = 3,
    YEAR = 4,
    DECADE = 5,
    DECADE_5 = 6,
    CENTURY = 7,
    CENTURY_5 = 8,
    MILLENIUM = 9,
}
export declare const isEqual: (date1: Date, date2: Date) => boolean;
export declare const format: (date: Date, granularity: Granularity) => string;
export declare const getGranularity: (from: number, to: number, visibleRatio: number) => Granularity;
export declare const getStep: (granularity: Granularity) => number;
export declare function subsequentDate(granularity: Granularity): ((date: Milliseconds) => Milliseconds);
export declare function byDate(a: RawEv3nt, b: RawEv3nt): 1 | -1 | 0;
