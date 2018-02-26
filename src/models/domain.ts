import * as DateUtils from '../utils/dates'
import { Granularity } from '../constants';

export enum DomainType { Event, Navigator, Sparkline }
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

	// The from date
	public from: Date

	// Level of detail (ie century, year, month, week, day, etc)
	public granularity: Granularity

	public hasIndicatorFor: number

	// Part of the horizontal space available to this domain.
	// If the ratio is .1 only 10% of the heigth is used for this domain.
	public heightRatio: number = 1

	// The amount of pixels taken by one day. Metric used for calculating 
	// the x-position of an event or ruler on the timeline.
	public pixelsPerDay: number

	// Number between 0 and 1 representing the visible ratio of the domain
	// in relation to the total. If the total is 1 year, a ratio of .75
	// would show 9 months and hide 3 months.
	public visibleRatio: number = 1

	// Show ruler labels?
	public rulerLabels: boolean = true

	// Show rulers?
	public rulers: boolean = true

	// The to date
	public to: Date

	// Number between 0 and 1 representing the offset from the top
	// at which the domain should start. A ratio of .3 would make the
	// domain start at 30% from the top.
	public topOffsetRatio: number = 0

	// Type of domain (ie sparkline, event, navigator)
	public type: DomainType = DomainType.Event

	// Visible height of the domain in pixels
	public viewportHeight: number

	// Visible width of the domain in pixels
	public viewportWidth: number

	public height: number
	public width: number

	constructor(
		from: Date,
		to: Date,
		viewPortWidth: number,
		viewPortHeight: number,
		public domainCenter: number,
		domainDef: IDomainDef,
	) {
		Object.keys(domainDef).forEach(k => {
			if (domainDef[k] !== this[k]) this[k] = domainDef[k]
		})

		this.from = from
		this.to = to
		if (this.visibleRatio < 1) {
			const leftRatio = domainCenter - (this.visibleRatio/2) 
			const rightRatio = domainCenter + (this.visibleRatio/2) 

			// Do not change! `from` and `to` have to be calculated before
			// assigning to `this.from` and `this.to`
			const from = this.dateAtProportion(leftRatio)
			const to = this.dateAtProportion(rightRatio)
			this.from = from
			this.to = to
		}

		this.viewportWidth = viewPortWidth
		this.viewportHeight = viewPortHeight * this.heightRatio
		this.height = this.viewportHeight // TODO calc height depending on max event rows
		this.width = this.viewportWidth / this.visibleRatio

		this.pixelsPerDay = this.viewportWidth / this.countDays()
		this.granularity = this.getGranularity()
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

	public positionAtDate(date: Date): number {
		return DateUtils.countDays(this.from, date) * this.pixelsPerDay;
	}

	public proportionAtPosition(position: number): number {
		return position / this.viewportWidth
	}

	private getGranularity(): Granularity {
		const days = this.countDays()
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