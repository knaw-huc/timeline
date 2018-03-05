import { Granularity } from "../constants";
export declare const countDays: (from: Date, to: Date) => number;
export declare const isEqual: (date1: Date, date2: Date) => boolean;
export declare const format: (date: Date, granularity: Granularity) => string;
export declare const getGranularity: (from: Date, to: Date, visibleRatio: number) => Granularity;
