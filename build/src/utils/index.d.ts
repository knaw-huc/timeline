import { RawEv3nt } from "../models/event";
import { Milliseconds } from "../constants";
import { Granularity } from "./dates";
export declare const debounce: (func: any, wait: any) => () => void;
export declare const onVisible: (from: any, to: any) => (e: RawEv3nt) => boolean;
export declare function findClosestRulerDate(timestamp: Milliseconds, granularity: Granularity): Milliseconds;
