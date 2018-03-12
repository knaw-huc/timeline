import { countDays } from '../utils/dates'
import { EVENT_MIN_SPACE } from '../constants';
import Domain from './domain';
import { RawEv3nt } from './config';

class Event {
	private _date: Date
	get date() { return this._date }
	set date(date) { this._date = date }

	private _endDate: Date
	get endDate() { return this._endDate }
	set endDate(endDate) { this._endDate = endDate }

	private _title: string
	get title() { return this._title }
	set title(title) { this._title = title }

	private _left: number
	get left() { return this._left }
	set left(left) { this._left = left }

	private _row: number
	get row() { return this._row }
	set row(row) { this._row = row }

	private _width: number
	get width() { return this._width }
	set width(width) { this._width = width }

	constructor(rawEvent: RawEv3nt, domain: Domain) {
		this.date = new Date(rawEvent.date)
		if (!isNaN(Date.parse(rawEvent.endDate))) this.endDate = new Date(rawEvent.endDate)
		this.title = rawEvent.title
		this.left = Math.round(domain.positionAtDate(this.date))
		this.width = Math.round(this.countDays() * domain.pixelsPerDay)
		// this.flip = this.left + Constants.EVENT_MIN_SPACE > visibleDomain.width
	}

	/**
	 * The space of an event is the left position and the width of the event.
	 * The width differs from this.width() that this.space() takes the label into account.
	 *
	 * @returns {[number, number]} The first element is the left position, the second element the width.
	 */
	space(): [number, number] {
		const width = (this.width < EVENT_MIN_SPACE) ? EVENT_MIN_SPACE : this.width
		return [this.left, width];
	}

	countDays(): number {
		if (!this.isInterval()) return 0
		return countDays(this._date, this._endDate);
	}

	isInterval(): boolean {
		return this._endDate != null
	}
}

export default Event;
