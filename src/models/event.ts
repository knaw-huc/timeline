// import { countDays } from '../utils/dates'
// import { EVENT_MIN_SPACE } from '../constants';
import Domain from './domain'
import { Pixels, Milliseconds } from '../constants';
import { Granularity } from '../utils/dates';

export class RawEv3nt {
	date: Milliseconds
	date_granularity: Granularity
	date_min: Milliseconds
	date_min_granularity: Granularity
	description: string
	end_date: Milliseconds
	end_date_granularity: Granularity
	end_date_max: Milliseconds
	end_date_max_granularity: Granularity
	id: number
	label: string
	row: number
	wikidata_identifier: string
}

class DomainEvent extends RawEv3nt {
	description: string
	left: Pixels
	width: Pixels

	constructor(rawEvent: RawEv3nt, domain: Domain) {
		super()
		// this.date = rawEvent.date
		// if (rawEvent.end_date != null) this.endDate = rawEvent.end_date
		// this.label = rawEvent.label
		this.left = domain.positionAtDate(this.date)
		this.width = this.isInterval() ?
			(this.end_date - this.date) * domain.pixelsPerMillisecond :
			0
		this.row = rawEvent.row
		// this.flip = this.left + Constants.EVENT_MIN_SPACE > visibleDomain.width
	}

	/**
	 * The space of an event is the left position and the width of the event.
	 * The width differs from this.width() that this.space() takes the label into account.
	 *
	 * @returns {[number, number]} The first element is the left position, the second element the width.
	 */
	// space(): [number, number] {
	// 	const width = (this.width < EVENT_MIN_SPACE) ? EVENT_MIN_SPACE : this.width
	// 	return [this.left, width];
	// }

	// // TODO remove
	// countDays(): number {
	// 	if (!this.isInterval()) return 0
	// 	return countDays(this.date.getTime(), this.endDate.getTime())
	// }

	isInterval(): boolean {
		return this.end_date != null
	}
}

export default DomainEvent;
