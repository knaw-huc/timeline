import BaseEvent from './base-event'
import * as Constants from '../constants'
import Domain from './domain'

class Event extends BaseEvent {
	// public flip: boolean
	public isRendered: boolean
	public left: number
	public top: number
	public width: number

	constructor(data, private domain: Domain) {
		super(data)

		this.left = domain.positionAtDate(this.from)
		// this.flip = this.left + Constants.EVENT_MIN_SPACE > visibleDomain.width

		const width = this.countDays() * domain.pixelsPerDay
		this.width = (width > 0 && width < 12) ? 12 : width
	}

	/**
	 * The space of an event is the left position and the width of the event.
	 * The width differs from this.width() that this.space() takes the label into account.
	 *
	 * @returns {[number, number]} The first element is the left position, the second element the width.
	 */
	public space(): [number, number] {
		const minWidth = (w) => (w === 0 || w < Constants.EVENT_MIN_SPACE) ? Constants.EVENT_MIN_SPACE : w;
		const width = minWidth(this.width);
		// const left = (this.flip) ? this.left - width : this.left;
		const left = this.left
		return [left, width];
	}

	public shouldRender(): boolean {
		return (
			this.date > this.domain.activeFrom &&
			this.date < this.domain.activeTo &&
			!this.isRendered
		)
	}
}

export default Event;
