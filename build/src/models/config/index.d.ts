import { Ratio } from "../../constants";
import { OrderedEvents } from "../../utils/events.worker";
import { RawEv3nt } from "../event";
export declare abstract class DomainConfig {
    heightRatio?: Ratio;
    rulers?: boolean;
    topOffsetRatio?: Ratio;
}
export declare abstract class MinimapDomainConfig extends DomainConfig {
    targets?: number[];
}
export declare abstract class EventsDomainConfig extends DomainConfig {
    events?: RawEv3nt[];
    label?: string;
    orderedEvents?: OrderedEvents;
}
export declare abstract class BandConfig<T> {
    domains?: T[];
    zoomLevel?: number;
}
export default class Config {
    center?: Ratio;
    events?: BandConfig<EventsDomainConfig>;
    minimaps?: BandConfig<MinimapDomainConfig>[];
    rootElement?: HTMLElement;
}
