import { countDays, getGranularity, Granularity } from '../utils/dates'
import { subsequentDate } from '../utils/dates'
import props from './props'
import DomainConfig from './domain.config'
import Ev3nt from './event';
import { Pixels } from '../constants';

class Domain {
	// Level of detail (ie century, year, month, week, day, etc)
	granularity: Granularity

	// The amount of pixels taken by one day. Metric used for calculating 
	// the x-position of an event or ruler on the timeline.
	pixelsPerDay: number

	width: number
	height: number

	private _left: Pixels
	get left() { return this._left }
	set left(left) { 
		if (left < -this.width + props.viewportWidth) left = props.viewportWidth - this.width
		else if (left > 0) left = 0 
		this._left = left
	}

	nextDate: (d: Date) => Date

	topAdder: (e: Ev3nt) => Ev3nt

	constructor(public config: DomainConfig) {
		this.height = props.viewportHeight * this.config.heightRatio
		this.width = props.viewportWidth / this.config.visibleRatio
		this.granularity = getGranularity(props.from, props.to, this.config.visibleRatio)
		this.nextDate = subsequentDate(this.granularity)
		this.pixelsPerDay = this.width / countDays(props.from, props.to)
		this.updateLeft()
	}

	dateAtPosition(x: number): Date {
		return this.dateAtProportion(this.proportionAtPosition(x))
	}

	dateAtProportion(proportion: number): Date {
		if (proportion < 0 || proportion > 1) throw new RangeError('[dateAtProportion] proportion should be between 0 and 1.');
		const newTime = props.from + (props.time * proportion)
		return new Date(newTime);
	}

	updateLeft() {
		this.left = props.center * (props.viewportWidth - this.width)
		return this.left
	}

	positionAtDate(date: Date): number {
		return countDays(props.from, date.getTime()) * this.pixelsPerDay
	}

	proportionAtPosition(position: number): number {
		return position / this.width
	}

	proportionAtDate(date: Date): number {
		return (date.getTime() - props.from) / props.time
	}
}

export default Domain