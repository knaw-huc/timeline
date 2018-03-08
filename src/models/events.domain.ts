import Domain from './domain'
import Ev3nt from './event'
import { RawEv3nt } from './config';
import DomainConfig from './domain.config';

export default class EventsDomain extends Domain {
	public events: Ev3nt[]

	constructor(domain: DomainConfig, events: RawEv3nt[]) {
		super(domain)

		this.events = events
			.map(e => new Ev3nt(e, this))
			.sort((a, b) => a.date.getTime() - b.date.getTime())
	}
}