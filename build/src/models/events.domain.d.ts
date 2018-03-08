import Domain from './domain';
import Ev3nt from './event';
import { RawEv3nt } from './config';
import DomainConfig from './domain.config';
export default class EventsDomain extends Domain {
    events: Ev3nt[];
    constructor(domain: DomainConfig, events: RawEv3nt[]);
}
