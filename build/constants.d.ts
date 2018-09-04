import { RawEv3nt } from "./models/event";
export declare const IMAGE_SIZES: number[];
export declare const EVENT_HEIGHT = 16;
export declare const LETTER_WIDTH: number;
export declare const FONT_SIZE: number;
export declare const ROW_SPACING: number;
export declare const EVENT_ROW_HEIGHT: number;
export declare const DATE_BAR_HEIGHT: number;
export declare const IMAGE_BOUNDING_BOX: number;
export declare const IMAGE_BORDER_SIZE: number;
export declare const IMAGE_SIZE: number;
export declare const CENTER_CHANGE_DONE = "CENTER_CHANGE_DONE";
export declare const ZOOM_DONE = "ZOOM_DONE";
export declare const SCROLL_DONE = "SCROLL_DONE";
export declare const PIXELS_PER_LETTER = 8;
export declare const DEFAULT_IMAGE_PATH = "/images";
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
