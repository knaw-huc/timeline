import BaseEvent from './base-event'
import * as Constants from '../constants'
import Domain from './domain'
import { RawEv3nt } from './config';

class Ev3nt extends BaseEvent {
	// public flip: boolean
	public left: number
	public top: number
	public width: number

	constructor(rawEvent: RawEv3nt, domain: Domain) {
		super(rawEvent)

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
		const width = (this.width === 0 || this.width < Constants.EVENT_MIN_SPACE) ? Constants.EVENT_MIN_SPACE : this.width
		return [this.left, width];
	}
}

export default Ev3nt;
