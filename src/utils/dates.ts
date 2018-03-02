import {Granularity} from "../constants"

export const countDays = (from: Date, to: Date): number => {
	if (to == null) return 0;
	return Math.round(to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);
};

export const isEqual = (date1: Date, date2: Date): boolean => date1.getTime() === date2.getTime();

export const format = (date: Date, granularity: Granularity): string => {
	if (date == null) return '∞';

	let displayDate = date.getFullYear().toString();

	if (granularity >= Granularity.MONTH) {
		const months = [
			'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
		];
		displayDate = `${months[date.getMonth()]} ${displayDate}`;
	}
	
	if (granularity >= Granularity.DAY) {
		displayDate = `${date.getDate()} ${displayDate}`;
	}
	
	if (granularity === Granularity.HOUR) {
		displayDate = `${date.getHours()}:${date.getMinutes()} ${displayDate}`;
	}

	return displayDate;
};

