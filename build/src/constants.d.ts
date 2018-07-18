import { RawEv3nt } from "./models/event";
export declare const EVENT_MIN_SPACE = 160;
export declare const EVENT_HEIGHT = 14;
export declare const EVENT_ROW_HEIGHT = 20;
export declare const DATE_BAR_HEIGHT = 20;
export declare const RULER_LABELS_HEIGHT = 60;
export declare const CENTER_CHANGE = "CENTER_CHANGE";
export declare const CENTER_CHANGE_DONE = "CENTER_CHANGE_DONE";
export declare const RELOAD = "RELOAD";
export declare const PROPS_UPDATED = "PROPS_UPDATED";
export declare type Milliseconds = number;
export declare type Grid = [Milliseconds, Milliseconds][][];
export declare type ComponentType = 'EVENTS' | 'MINIMAP' | 'RULERS' | 'SPARKLINE';
export declare type Ratio = number;
export declare type Pixels = number;
export declare class RawSegment {
    events?: RawEv3nt[];
    from: Milliseconds;
    to: Milliseconds;
}
