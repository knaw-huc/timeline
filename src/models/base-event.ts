import * as DateUtils from '../utils/dates'
import {Granularity} from "../constants"

export interface IDateRange {
	from: Date;
	infiniteFrom?: boolean;
	infiniteTo?: boolean;
	to: Date;
}

class BaseEvent {
	public body: string = ''
	public coordinates = []
	public date: Date
	public dateRange: IDateRange
	public dateRangeUncertain: IDateRange
	public dateUncertain: IDateRange
	public from: Date
	public to: Date
	public slug: string
	public title: string
	public types: string[] = []

	private dateGranularity = Granularity.DAY;
	private dateRangeGranularity = null;

	constructor(data) {
		Object.assign(this, data);
		this.setTo();
		this.setFrom();
	}

	public countDays(): number {
		return DateUtils.countDays(this.from, this.to);
	}

	public formatFromDate(): string {
		return this.formatDate('from');
	}

	public formatToDate(): string {
		return this.formatDate('to');
	}

	public isInterval(): boolean {
		return this.dateRange != null;
	}

	public isUncertain(): boolean {
		return this.dateUncertain != null || this.dateRangeUncertain != null;
	}

	private formatDate = (dateToFormat: 'from' | 'to'): string => {
		let date = this.date;
		let granularity = this.dateGranularity;

		if (date == null) {
			if (this.dateUncertain != null) {
				const from = DateUtils.format(this.dateUncertain.from, this.dateGranularity);
				const to = DateUtils.format(this.dateUncertain.to, this.dateRangeGranularity);
				return `${from} - ${to}`;
			} else if (dateToFormat == null) {
				throw new Error('[formatDate] Unknown date to format!');
			} else {
				granularity = (dateToFormat === 'from') ?
					this.dateGranularity :
					this.dateRangeGranularity;

				if (this.dateRangeUncertain == null) {
					date = this.dateRange[dateToFormat];
				} else {
					if (DateUtils.isEqual(this.dateRange[dateToFormat], this.dateRangeUncertain[dateToFormat])) {
						date = this.dateRangeUncertain[dateToFormat];
					} else {
						const from = DateUtils.format(this.dateRange[dateToFormat], granularity);
						const to = DateUtils.format(this.dateRangeUncertain[dateToFormat], granularity);
						return `${from} - ${to}`;
					}
				}
			}
		}

		return DateUtils.format(date, granularity);
	};

	private setFrom(): void {
		this.from = (this.dateRange != null) ?
			this.dateRange.infiniteFrom ?
				new Date(-4713, 0, 1) : // Oldest possible date, constrained by Postgres.
				this.dateRange.from :
			this.date != null ?
				this.date :
				(this.dateUncertain != null) ?
					this.dateUncertain.from :
					null;
	}

	private setTo(): void {
		this.to = (this.dateRange != null) ?
			this.dateRange.infiniteTo ?
				new Date() :
				this.dateRange.to :
			(this.dateUncertain != null) ?
				this.dateUncertain.to :
				null;
	}
}

export default BaseEvent;
