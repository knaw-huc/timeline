import { Milliseconds } from "../constants";
import { RawEv3nt } from "../models/event";
export declare const enum Granularity {
    MILLISECOND = "MILLISECOND",
    MILLISECOND_10 = "MILLISECOND_10",
    MILLISECOND_50 = "MILLISECOND_50",
    MILLISECOND_100 = "MILLISECOND_100",
    MILLISECOND_500 = "MILLISECOND_500",
    SECOND = "SECOND",
    MINUTE = "MINUTE",
    HOUR = "HOUR",
    DAY = "DAY",
    WEEK = "WEEK",
    MONTH = "MONHT",
    YEAR = "YEAR",
    YEAR_5 = "YEAR_5",
    DECADE = "DECADE",
    DECADE_5 = "DECADE_5",
    CENTURY = "CENTURY",
    CENTURY_5 = "CENTURY_5",
    MILLENIUM = "MILLENIUM"
}
export declare const formatDate: (timestamp: number, granularity: Granularity) => string;
export declare const getGranularity: (pixelsPerMillisecond: number) => Granularity;
export declare const getStep: (granularity: Granularity) => number;
export declare function subsequentDate(granularity: Granularity): ((date: Milliseconds) => Milliseconds);
export declare function byDate(a: RawEv3nt, b: RawEv3nt): 1 | 0 | -1;
export declare const labelBody: (d: number, granularity: Granularity) => string;
