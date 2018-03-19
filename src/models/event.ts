import { countDays } from '../utils/dates'
// import { EVENT_MIN_SPACE } from '../constants';
import Domain from './domain'
import { RawEv3nt, Pixels } from '../constants';

class Event {
	date: Date
	endDate: Date
	left: Pixels
	row: number
	title: string
	width: Pixels

	constructor(rawEvent: RawEv3nt, domain: Domain) {
		this.date = new Date(rawEvent.date)
		if (rawEvent.endDate != null) this.endDate = new Date(rawEvent.endDate)
		this.title = rawEvent.title
		this.left = domain.positionAtDate(this.date)
		this.width = this.countDays() * domain.pixelsPerDay
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

	// TODO remove
	countDays(): number {
		if (!this.isInterval()) return 0
		return countDays(this.date.getTime(), this.endDate.getTime())
	}

	isInterval(): boolean {
		return this.endDate != null
	}
}

export default Event;
