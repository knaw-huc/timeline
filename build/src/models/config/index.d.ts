import { Ratio } from "../../constants";
import { OrderedEvents } from "../../utils/events.worker";
import { RawEv3nt } from "../event";
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
    orderedEvents?: OrderedEvents;
}
export default class Config {
    center?: number;
    bands: (EventsBand | MinimapBand)[];
    rootElement: HTMLElement;
}
