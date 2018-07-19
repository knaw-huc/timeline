import { Ratio, Pixels } from "../constants";
import { OrderedEvents } from "../utils/events.worker";
import { RawEv3nt } from "./event";
export default class DomainConfig {
    events?: RawEv3nt[];
    targets?: number[];
    heightRatio?: Ratio;
    label?: string;
    orderedEvents?: OrderedEvents;
    rulers?: boolean;
    topOffsetRatio?: Ratio;
    type?: 'events' | 'minimap';
    visibleRatio?: Ratio;
    constructor(config: DomainConfig, viewportWidth: Pixels);
}
