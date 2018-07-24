import Band from './index';
import { BandConfig, EventsDomainConfig } from '../config';
export default class EventsBand extends Band {
    constructor(config: BandConfig<EventsDomainConfig>);
}
