export declare const EVENT_MIN_SPACE = 160;
export declare const EVENT_HEIGHT = 12;
export declare const EVENT_ROW_HEIGHT = 20;
export declare const DATE_BAR_HEIGHT: number;
export declare const RULER_LABELS_HEIGHT = 60;
export declare const CENTER_CHANGE_EVENT = "CENTER_CHANGE_EVENT";
export declare const CENTER_CHANGE_DONE_EVENT = "CENTER_CHANGE_EVENT_DONE";
export declare const DIMENSIONS_CHANGE_EVENT = "DIMENSIONS_CHANGE_EVENT";
export declare type Milliseconds = number;
export declare type Grid = [Milliseconds, Milliseconds][][];
export declare type Ratio = number;
export declare type Pixels = number;
export declare class RawEv3nt {
    date: Milliseconds;
    endDate: Milliseconds;
    row: number;
    title: string;
}
export declare class RawSegment {
    events?: RawEv3nt[];
    from: Milliseconds;
    to: Milliseconds;
}
