import { RawEv3nt } from "../models/event";
import { Milliseconds, Ratio } from "../constants";
import { Granularity } from "./dates";
export declare const debounce: (func: any, wait: any) => () => void;
export declare const onVisible: (from: any, to: any) => (e: RawEv3nt) => boolean;
export declare function findClosestRulerDate(timestamp: Milliseconds, granularity: Granularity): Milliseconds;
export declare function visibleRatio(zoomLevel: number): Ratio;
export declare function createRange(n: number): any;
export declare function selectRandom(set: (string | number)[], amount: number): any[];
