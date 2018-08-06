import { Milliseconds } from "../constants";
import { RawEv3nt } from "../models/event";
export declare const enum Granularity {
    HOUR = 0,
    DAY = 1,
    WEEK = 2,
    MONTH = 3,
    YEAR = 4,
    YEAR_5 = 5,
    DECADE = 6,
    DECADE_5 = 7,
    CENTURY = 8,
    CENTURY_5 = 9,
    MILLENIUM = 10
}
export declare const isEqual: (date1: Date, date2: Date) => boolean;
export declare const getGranularity: (from: number, to: number, visibleRatio: number) => Granularity;
export declare const getStep: (granularity: Granularity) => number;
export declare function subsequentDate(granularity: Granularity): ((date: Milliseconds) => Milliseconds);
export declare function byDate(a: RawEv3nt, b: RawEv3nt): 0 | 1 | -1;
export declare const labelBody: (d: number, granularity: Granularity) => string;
