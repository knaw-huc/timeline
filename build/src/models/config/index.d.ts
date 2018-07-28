import { Ratio } from "../../constants";
import { OrderedEvents } from "../../utils/events.worker";
import { RawEv3nt } from "../event";
export declare abstract class DomainConfig {
    heightRatio?: Ratio;
    rulers?: boolean;
    rulerLabels?: boolean;
    topOffsetRatio?: Ratio;
}
export declare class MinimapDomainConfig extends DomainConfig {
    targets?: number[];
}
export declare class EventsDomainConfig extends DomainConfig {
    events?: RawEv3nt[];
    label?: string;
    orderedEvents?: OrderedEvents;
}
export declare class BandConfig<T> {
    domains?: T[];
    zoomLevel?: number;
}
export default class Config {
    center?: Ratio;
    events: BandConfig<EventsDomainConfig>;
    minimaps?: BandConfig<MinimapDomainConfig>[];
    rootElement: HTMLElement;
}
