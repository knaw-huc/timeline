import Band from '.';
import { BandConfig, EventsDomainConfig } from '../config';
import { Pixels } from '../../constants';
import { RawEv3nt } from '../event';
export default class EventsBand extends Band {
    domains: EventsDomainConfig[];
    visibleEvents: RawEv3nt[];
    constructor(config: BandConfig<EventsDomainConfig>);
    private updateEvents;
    update(): void;
    getEventByCoordinates(x: Pixels, y: Pixels): RawEv3nt;
    zoomIn(): void;
    zoomOut(): void;
}
