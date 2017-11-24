import * as DateUtils from '../utils/dates'
import { Granularity } from '../constants';

class Domain {
	public pixelsPerDay: number
	public granularity: Granularity

	constructor(
		public from: Date,
		public to: Date,
		public width: number,
		public height: number
	) {
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

		const fromTime = this.from.getTime();
		const toTime = this.to.getTime();

		const newTime = fromTime + ((toTime - fromTime) * proportion);

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