import Band from '.';
import { BandConfig, EventsDomainConfig } from '../config';
import { Pixels } from '../../constants';
import { RawEv3nt } from '../event';
export default class EventsBand extends Band {
    domains: EventsDomainConfig[];
    constructor(config: BandConfig<EventsDomainConfig>);
    getEventByCoordinates(x: Pixels, y: Pixels): RawEv3nt;
    zoomIn(): void;
    zoomOut(): void;
}
