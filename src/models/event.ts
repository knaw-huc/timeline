import { Pixels, Milliseconds } from '../constants';
import { Granularity } from '../utils/dates';
import EventsBand from './band/events';

export class RawEv3nt {
	date: Milliseconds
	date_granularity?: Granularity = Granularity.DAY
	date_min?: Milliseconds
	date_min_granularity?: Granularity
	description?: string
	end_date?: Milliseconds
	end_date_granularity?: Granularity
	end_date_max?: Milliseconds
	end_date_max_granularity?: Granularity
	id?: string
	label?: string
	row?: number
	wikidata_identifier?: string
	// view?: any
}

class DomainEvent extends RawEv3nt {
	left: Pixels
	width: Pixels

	constructor(rawEvent: RawEv3nt, band: EventsBand) {
		super()

		Object.keys(rawEvent).forEach(k => this[k] = rawEvent[k])

		this.left = band.positionAtDate(this.date)
		this.width = this.isInterval() ?
			(this.end_date - this.date) * band.pixelsPerMillisecond :
			0
		this.row = rawEvent.row
		// this.flip = this.left + Constants.EVENT_MIN_SPACE > visibleDomain.width
	}

	isInterval(): boolean {
		return this.end_date != null
	}
}

export default DomainEvent;
