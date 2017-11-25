import * as DateUtils from '../utils/dates'
import { Granularity } from '../constants';

export enum DomainType { Event, Navigator, Sparkline }
export interface IDomainDef {
	domainLabels?: boolean
	ratio?: number
	rulers?: boolean
	type?: DomainType
}

class Domain {
	public from: Date
	public to: Date
	public pixelsPerDay: number
	public granularity: Granularity
	public ratio: number = 1
	public type: DomainType = DomainType.Event
	public domainLabels: boolean = false
	public rulers: boolean = true

	constructor(
		from: Date,
		to: Date,
		public width: number,
		public height: number,
		domainCenter: number,
		domainDef: IDomainDef,
	) {
		Object.keys(domainDef).map(k => {
			if (domainDef[k] !== this[k]) this[k] = domainDef[k]
		})

		this.from = from
		this.to = to
		if (this.ratio < 1) {
			const leftRatio = domainCenter - (this.ratio/2) 
			const rightRatio = domainCenter + (this.ratio/2) 

			// Do not assign computed from to this.from,
			// otherwise this.dateAtProportion would wrongly compute this.to
			const from = this.dateAtProportion(leftRatio)
			const to = this.dateAtProportion(rightRatio)
			this.from = from
			this.to = to
		}

		this.pixelsPerDay = this.width / this.countDays()
		this.granularity = this.getGranularity()
	}

	public positionAtDate(date: Date): number {
		return DateUtils.countDays(this.from, date) * this.pixelsPerDay;
	}

	public dateAtPosition(x: number): Date {
		return this.dateAtProportion(this.proportionAtPosition(x))
	}

	public countDays(): number {
		return DateUtils.countDays(this.from, this.to);
	}

	public dateAtProportion(proportion: number): Date {
		if (proportion < 0 || proportion > 1) throw new Error('[dateAtProportion] proportion should be between 0 and 1.');
		const fromTime = this.from.getTime()
		const toTime = this.to.getTime()
		const newTime = fromTime + ((toTime - fromTime) * proportion)
		return new Date(newTime);
	}

	public proportionAtPosition(position: number): number {
		return position / this.width
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