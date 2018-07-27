import { Milliseconds, Pixels } from '../constants';
import { Granularity } from '../utils/dates';
// import Band from './band';

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

	from: Milliseconds
	to: Milliseconds

	// The length of time an event took.
	// A Point in Time has time = 0
	// For an interval, if something takes 1 year, time = 31536000000
	time?: Milliseconds

	textWidth?: Pixels
}

// class Ev3nt extends RawEv3nt {
// 	left: Pixels
// 	width: Pixels

// 	constructor(rawEvent: RawEv3nt, band: Band) {
// 		super()

// 		Object.keys(rawEvent).forEach(k => this[k] = rawEvent[k])

// 		this.left = band.positionAtDate(this.date)
// 		this.width = this.isInterval() ?
// 			(this.end_date - this.date) * band.pixelsPerMillisecond :
// 			0
// 		this.row = rawEvent.row
// 		// this.flip = this.left + Constants.EVENT_MIN_SPACE > visibleDomain.width
// 	}

// 	isInterval(): boolean {
// 		return this.end_date != null
// 	}
// }

// export default Ev3nt;
