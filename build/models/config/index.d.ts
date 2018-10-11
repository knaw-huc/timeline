import { Ratio } from "../../constants";
import { OrderedTimeline } from "../../utils/events.worker";
import { RawEv3nt, Ev3nt } from "../event";
import MinimapBand from "../band/minimap";
import EventsBand from "../band/events";
export declare abstract class DomainConfig {
}
export declare class BandConfig {
    heightRatio?: Ratio;
    rulers?: boolean;
    rulerLabels?: boolean;
    topOffsetRatio?: Ratio;
    zoomLevel?: number;
}
export declare class MinimapBandConfig extends BandConfig {
    indicatorFor?: number;
    targets?: number[];
}
export declare class EventsBandConfig extends BandConfig {
    events?: RawEv3nt[];
    label?: string;
    orderedEvents?: OrderedTimeline;
}
export default class Config {
    bands: (EventsBand | MinimapBand)[];
    center?: number;
    controlBand?: EventsBand;
    imagePath?: string;
    parent?: Ev3nt;
    rootElement: HTMLElement;
}
