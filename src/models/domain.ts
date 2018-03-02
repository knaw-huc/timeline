import * as DateUtils from '../utils/dates'
import dateRange from '../utils/date-range'
import { Granularity } from '../constants'

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

	public activeFrom: Date
	public activeTo: Date

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

	public center: number
	public left: number
	public height: number
	public width: number

	constructor(
		domain: IDomainDef,
		private from: Date,
		private to: Date,
		public viewportWidth: number,
		public viewportHeight: number,
	) {
		Object.keys(domain).forEach(k => {
			if (domain[k] !== this[k]) this[k] = domain[k]
		})

		this.viewportHeight = viewportHeight * this.heightRatio
		this.height = this.viewportHeight // TODO calc height depending on max event rows
		this.width = viewportWidth / this.visibleRatio

		this.pixelsPerDay = this.width / this.countDays()
		this.granularity = this.getGranularity()
	}

	public setActiveRange(iteration: number): void {
		const deviation = iteration * this.visibleRatio				
		const lowerDeviation = this.center - deviation > 0 ? this.center - deviation : 0
		const upperDeviation = this.center + deviation < 1 ? this.center + deviation : 1
		this.activeFrom = this.dateAtProportion(lowerDeviation)
		this.activeTo = this.dateAtProportion(upperDeviation)
	}

	public countDays(): number {
		return DateUtils.countDays(this.from, this.to);
	}

	public dateAtPosition(x: number): Date {
		return this.dateAtProportion(this.proportionAtPosition(x))
	}

	public dateAtProportion(proportion: number): Date {
		if (proportion < 0 || proportion > 1) throw new Error('[dateAtProportion] proportion should be between 0 and 1.');
		const fromTime = this.from.getTime()
		const toTime = this.to.getTime()
		const newTime = fromTime + ((toTime - fromTime) * proportion)
		return new Date(newTime);
	}

	public setCenter(center: number) {
		if (center < 0) center = 0
		else if (center > 1) center = 1
		this.center = center
		this.left = center * (this.viewportWidth - this.width)
	}

	public setLeft(left: number) {
		if (left < -this.width + this.viewportWidth) left = -this.width + this.viewportWidth
		else if (left > 0) left = 0 
		this.left = left
		this.center = left / (this.viewportWidth - this.width)	
	}

	public positionAtDate(date: Date): number {
		return DateUtils.countDays(this.from, date) * this.pixelsPerDay;
	}

	public proportionAtPosition(position: number): number {
		return position / this.width
	}

	/**
	 * Create a range from domain.from to domain.to, taking domain.granularity into account.
	 */
	public range() {
		return dateRange(this.from, this.to, this.granularity)	
	}

	private getGranularity(): Granularity {
		const days = this.countDays() / (this.width/this.viewportWidth)
		if (days < 1) return Granularity.HOUR
		if (days < 15) return Granularity.DAY
		if (days < 45) return Granularity.WEEK
		if (days < 1.5 * 365) return Granularity.MONTH
		if (days < 15 * 365) return Granularity.YEAR
		if (days < 150 * 365) return Granularity.DECADE
		return Granularity.CENTURY
	}
}

export default Domain