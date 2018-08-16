import { RawEv3nt } from "../models/event";
import { Milliseconds, Ratio, Pixels } from "../constants";
export declare const debounce: (func: any, wait: any) => () => void;
export declare const onVisible: (from: any, to: any) => (e: RawEv3nt) => boolean;
export declare function visibleRatio(zoomLevel: number): Ratio;
export declare function createRange(n: number): any;
export declare function selectRandom(set: (string | number)[], amount: number): any[];
export declare function calcPixelsPerMillisecond(viewportWidth: Pixels, zoomLevel: number, totalTime: Milliseconds): number;
export declare function logEvent(event: RawEv3nt, ...rest: any[]): void;
