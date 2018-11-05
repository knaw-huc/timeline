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
    coor?: Point;
    coor4326?: Point;
    dmin?: Milliseconds;
    dmin_g?: Granularity;
    d?: Milliseconds;
    d_g?: Granularity;
    ed?: Milliseconds;
    ed_g?: Granularity;
    dmax?: Milliseconds;
    dmax_g?: Granularity;
}
export declare class Voyage {
    d: Milliseconds;
    ed: Milliseconds;
    route?: string;
    sp?: Point;
    ep?: Point;
}
export declare class Area {
    d: Milliseconds;
    ed: Milliseconds;
    area: string;
}
export declare class RawEv3nt {
    class: string[];
    d: Milliseconds;
    d_g: Granularity;
    dmax: Milliseconds;
    dmax_g: Granularity;
    dmin: Milliseconds;
    dmin_g: Granularity;
    dsc: string;
    ed: Milliseconds;
    ed_g: Granularity;
    id: string;
    img: ImageFileType;
    lbl: string;
    areas: Area[];
    locs: Ev3ntLocation[];
    voyages: Voyage[];
    wid: string;
}
export declare class Ev3nt extends RawEv3nt {
    from: Milliseconds;
    to: Milliseconds;
    screenTo: Milliseconds;
    time?: Milliseconds;
    row: number;
    left?: Pixels;
    top?: Pixels;
    width?: Pixels;
    uncertain_from_width?: Pixels;
    uncertain_to_width?: Pixels;
    color?: string;
    image?: HTMLImageElement;
    constructor(event: RawEv3nt, pixelsPerMillisecond?: Pixels);
}
export {};
