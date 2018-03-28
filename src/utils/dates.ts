import { Milliseconds, Ratio } from "../constants"

export const enum Granularity {
	HOUR,
	DAY,
	WEEK,
	MONTH,
	YEAR,
	DECADE,
	YEARS_50,
	CENTURY,
	MILLENIUM,
}

export const isEqual = (date1: Date, date2: Date): boolean => date1.getTime() === date2.getTime()

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
}

export const getGranularity = (from: Milliseconds, to: Milliseconds, visibleRatio: Ratio): Granularity => {
	const days =  visibleRatio * ((to - from) / 86400000) // 1000ms * 60s * 60m * 24h
	if (days < 1) return Granularity.HOUR
	if (days < 15) return Granularity.DAY
	if (days < 45) return Granularity.WEEK
	if (days < 1.5 * 365) return Granularity.MONTH
	if (days < 15 * 365) return Granularity.YEAR
	if (days < 150 * 365) return Granularity.DECADE
	if (days < 300 * 365) return Granularity.YEARS_50
	return Granularity.CENTURY
}

export const getStep = (granularity: Granularity): number => {
	if (granularity === Granularity.YEAR) return 1
	if (granularity === Granularity.DECADE) return 10
	if (granularity === Granularity.YEARS_50) return 50
	if (granularity === Granularity.CENTURY) return 100
	if (granularity === Granularity.MILLENIUM) return 1000
	throw new RangeError("[getStep] Only steps with a granularity greater than 'year' calculated")
}

// TODOD turn into generator?
export function subsequentDate(granularity: Granularity): ((date: Milliseconds) => Milliseconds) {
	if (granularity >= Granularity.YEAR) {
		const step = getStep(granularity)
		return (d: Milliseconds) => {
			let date = new Date(d)
			const nextYear = date.getFullYear() + step
			if (nextYear > -1 && nextYear < 100) {
				date = new Date(date)
				date.setUTCFullYear(nextYear)
				return date.getTime()
			} else {
				return Date.UTC(nextYear, 0, 1)
			}
		}
	}

	if (granularity === Granularity.MONTH) {
		return (d: Milliseconds) => {
			const date = new Date(d)
			return Date.UTC(date.getFullYear(), date.getMonth() + 1, 1)
		}
	}

	if (granularity === Granularity.WEEK) {
		return (d: Milliseconds) => {
			const date = new Date(d)
			return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 7)
		}
	}

	if (granularity === Granularity.DAY) {
		return (d: Milliseconds) => {
			const date = new Date(d)
			return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1)
		}
	}

	if (granularity === Granularity.HOUR) {
		return (d: Milliseconds) => {
			const date = new Date(d)
			return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1)
		}
	}
}