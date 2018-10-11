import { Ev3nt } from "../models/event";
import { Milliseconds, Ratio, Pixels } from "../constants";
export declare const debounce: (func: Function, wait: number) => () => void;
export declare function visibleRatio(zoomLevel: number): Ratio;
export declare function createRange(n: number): any;
export declare function selectRandom(set: (string | number)[], amount: number): (string | number)[];
export declare function calcPixelsPerMillisecond(viewportWidth: Pixels, zoomLevel: number, totalTime: Milliseconds): number;
export declare function logEvent(event: Ev3nt, ...rest: string[]): void;
