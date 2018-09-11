import { Milliseconds, Pixels } from '../constants';
import { Granularity } from '../utils/dates';
export declare enum ImageFileType {
    NONE = "none",
    JPG = "jpg",
    SVG = "svg",
    GIF = "gif",
    PNG = "png"
}
declare class Point {
    type: "Point";
    coordinates: [number, number];
}
export declare class Ev3ntLocation {
    coor: Point;
    coor4326: Point;
    dmin: Milliseconds;
    dmin_g: Granularity;
    d: Milliseconds;
    d_g: Granularity;
    ed: Milliseconds;
    ed_g: Granularity;
    dmax: Milliseconds;
    dmax_g: Granularity;
}
export declare class RawEv3nt {
    d: Milliseconds;
    d_g?: Granularity;
    dmin?: Milliseconds;
    dmin_g?: Granularity;
    dsc?: string;
    ed?: Milliseconds;
    ed_g?: Granularity;
    dmax?: Milliseconds;
    dmax_g?: Granularity;
    id?: string;
    lbl?: string;
    row?: number;
    wid?: string;
    locs: Ev3ntLocation[];
    from: Milliseconds;
    to: Milliseconds;
    time?: Milliseconds;
    space?: Milliseconds;
    left?: Pixels;
    top?: Pixels;
    width?: Pixels;
    uncertain_from_width?: Pixels;
    uncertain_to_width?: Pixels;
    color?: string;
    img?: ImageFileType;
    image?: HTMLImageElement;
}
export {};
