import { RawEv3nt } from "./models/event";
export declare const EVENT_HEIGHT = 14;
export declare const EVENT_ROW_HEIGHT = 16;
export declare const DATE_BAR_HEIGHT = 16;
export declare const RULER_LABELS_HEIGHT = 60;
export declare const CENTER_CHANGE_DONE = "CENTER_CHANGE_DONE";
export declare const ZOOM_DONE = "ZOOM_DONE";
export declare const PIXELS_PER_LETTER = 8;
export declare type Milliseconds = number;
export declare type Grid = [Milliseconds, Milliseconds][][];
export declare type Ratio = number;
export declare type Pixels = number;
export declare class RawSegment {
    events?: RawEv3nt[];
    from: Milliseconds;
    to: Milliseconds;
}
export declare type Color = (opacity: number) => string;
export declare const colors: Color[];
