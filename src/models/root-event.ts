import * as DateUtils from '../utils/dates';
import BaseEvent, {IBaseEvent} from './base-event';

export interface IRootEvent extends IBaseEvent {
	dateAtLeftPosition(position: number): Date;
	dateAtProportion(proportion: number): Date;
	leftPositionAtDate(date: Date): number;
	width: number;
}

class RootEvent extends BaseEvent implements IRootEvent {
	private pixelsPerDay = null
	public width = 0

	constructor(data, width: number) {
		super(data)
		this.width = width
		this.pixelsPerDay = this.width / this.countDays()
	}

	public leftPositionAtDate(date: Date): number {
		return DateUtils.countDays(this.from, date) * this.pixelsPerDay;
	}

	public dateAtLeftPosition(position: number): Date {
		return this.dateAtProportion(position / this.width);
	}

	public dateAtProportion(proportion: number): Date {
		if (proportion < 0 || proportion > 1) throw new Error('[dateAtProportion] proportion should be between 0 and 1.');

		const fromTime: number = this.from.getTime();
		const toTime: number = this.to.getTime();

		const newTime = fromTime + ((toTime - fromTime) * proportion);

		return new Date(newTime);
	};
}

export default RootEvent;
