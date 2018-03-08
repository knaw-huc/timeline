import { countDays, getGranularity, Granularity } from '../utils/dates'
import { subsequentDate } from '../utils/dates'
import addTop from '../utils/add-top'
import props from './props'
import DomainConfig from './domain.config'
import Ev3nt from './event';

class Domain {
	// Level of detail (ie century, year, month, week, day, etc)
	public granularity: Granularity

	// The amount of pixels taken by one day. Metric used for calculating 
	// the x-position of an event or ruler on the timeline.
	public pixelsPerDay: number

	private _left: number
	public height: number
	public width: number

	public nextDate: (d: Date) => Date

	public topAdder: (e: Ev3nt) => Ev3nt

	constructor(public config: DomainConfig) {
		this.height = props.viewportHeight * this.config.heightRatio
		this.width = props.viewportWidth / this.config.visibleRatio

		this.granularity = getGranularity(props.from, props.to, this.config.visibleRatio)

		this.nextDate = subsequentDate(this.granularity)

		this.pixelsPerDay = this.width / countDays(props.from, props.to)

		if (this.config.type === 'EVENTS') this.topAdder = addTop()

		this.updateLeft()
	}

	public dateAtPosition(x: number): Date {
		return this.dateAtProportion(this.proportionAtPosition(x))
	}

	public dateAtProportion(proportion: number): Date {
		if (proportion < 0 || proportion > 1) throw new RangeError('[dateAtProportion] proportion should be between 0 and 1.');
		const fromTime = props.from.getTime()
		const toTime = props.to.getTime()
		const newTime = fromTime + ((toTime - fromTime) * proportion)
		return new Date(newTime);
	}

	get left() { return this._left }
	set left(left: number) {
		if (left < -this.width + props.viewportWidth) left = props.viewportWidth - this.width
		else if (left > 0) left = 0 
		this._left = left
	}
	public updateLeft() {
		this.left = props.center * (props.viewportWidth - this.width)
		return this.left
	}

	public positionAtDate(date: Date): number {
		return countDays(props.from, date) * this.pixelsPerDay
	}

	public proportionAtPosition(position: number): number {
		return position / this.width
	}
}

export default Domain