import { countDays, getGranularity, Granularity } from '../utils/dates'
import { subsequentDate } from '../utils/dates'
import props from './props'

export enum DomainType { Events = "EVENTS", Sparkline = "SPARKLINE" }
export interface IDomainDef {
	domainLabels?: boolean
	hasIndicatorFor?: number
	heightRatio?: number
	visibleRatio?: number
	rulerLabels?: boolean
	rulers?: boolean
	topOffsetRatio?: number
	type?: DomainType
}

class Domain implements IDomainDef {
	// Show from & to labels? Labels are shown left and right respectively
	// of timeline. Use if rulers are to noisy
	public domainLabels: boolean = false

	// Level of detail (ie century, year, month, week, day, etc)
	public granularity: Granularity

	public hasIndicatorFor: number

	// Part of the horizontal space available to this domain.
	// If the ratio is .1 only 10% of the heigth is used for this domain.
	public heightRatio: number = 1

	// The amount of pixels taken by one day. Metric used for calculating 
	// the x-position of an event or ruler on the timeline.
	public pixelsPerDay: number

	// Show ruler labels?
	public rulerLabels: boolean = true

	// Show rulers?
	public rulers: boolean = true

	// Number between 0 and 1 representing the offset from the top
	// at which the domain should start. A ratio of .3 would make the
	// domain start at 30% from the top.
	public topOffsetRatio: number = 0

	// Type of domain (ie sparkline, event, navigator)
	public type: DomainType = DomainType.Events

	// Number between 0 and 1 representing the visible ratio of the domain
	// in relation to the total. If the total is 1 year, a ratio of .75
	// would show 9 months and hide 3 months.
	public visibleRatio: number = 1

	private _left: number
	public height: number
	public width: number

	public prevDate: (d: Date) => Date
	public nextDate: (d: Date) => Date

	constructor(
		domain: IDomainDef,
		public viewportWidth: number,
		public viewportHeight: number,
	) {
		Object.keys(domain).forEach(k => {
			if (domain[k] !== this[k]) this[k] = domain[k]
		})

		this.viewportHeight = viewportHeight * this.heightRatio
		this.height = this.viewportHeight // TODO calc height depending on max event rows
		this.width = viewportWidth / this.visibleRatio

		this.granularity = getGranularity(props.from, props.to, this.visibleRatio)

		this.prevDate = subsequentDate(this.granularity, true)
		this.nextDate = subsequentDate(this.granularity)

		this.pixelsPerDay = this.width / countDays(props.from, props.to)

		this.updateLeft()
	}

	/**
	 * Get the initial active range. This is the range which is visible to the user
	 * plus a left/right offset. The range is used to find the events that should
	 * be rendered on page load.
	 */
	public initialActiveRange(iteration: number): [Date, Date, boolean] {
		const deviation = iteration * this.visibleRatio				
		const lowerDeviation = props.center - deviation > 0 ? props.center - deviation : 0
		const upperDeviation = props.center + deviation < 1 ? props.center + deviation : 1
		let activeFrom = this.prevDate(this.dateAtProportion(lowerDeviation))
		let activeTo = this.nextDate(this.dateAtProportion(upperDeviation))
		const last = lowerDeviation === 0 && upperDeviation === 1 ? true : false
		return [activeFrom, activeTo, last]
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
		if (left < -this.width + this.viewportWidth) left = this.viewportWidth - this.width
		else if (left > 0) left = 0 
		this._left = left
	}
	public updateLeft() {
		this.left = props.center * (this.viewportWidth - this.width)
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