import { Milliseconds, Ratio } from "../constants"
import { RawEv3nt } from "../models/event";

export const enum Granularity {
	HOUR,
	DAY,
	WEEK,
	MONTH,
	YEAR,
	YEAR_5, /* 5 YEARS */
	DECADE,
	DECADE_5, /* 50 years */
	CENTURY,
	CENTURY_5, /* 500 years */
	MILLENIUM,
}

export const isEqual = (date1: Date, date2: Date): boolean => date1.getTime() === date2.getTime()

// export const format = (date: Date, granularity: Granularity): string => {
// 	if (date == null) return '∞';

// 	let displayDate = date.getUTCFullYear().toString();

// 	if (granularity >= Granularity.MONTH) displayDate = `${months[date.getMonth()]} ${displayDate}`
// 	if (granularity >= Granularity.DAY) displayDate = `${date.getUTCDate()} ${displayDate}`
// 	if (granularity === Granularity.HOUR) displayDate = `${date.getUTCHours()}:${date.getUTCMinutes()} ${displayDate}`

// 	return displayDate;
// }

export const getGranularity = (from: Milliseconds, to: Milliseconds, visibleRatio: Ratio): Granularity => {
	const days =  visibleRatio * ((to - from) / 86400000) // 1000ms * 60s * 60m * 24h
	if (days < 1) return Granularity.HOUR
	if (days < 15) return Granularity.DAY
	if (days < 45) return Granularity.WEEK
	if (days < 1.5 * 365) return Granularity.MONTH
	if (days < 15 * 365) return Granularity.YEAR
	if (days < 100 * 365) return Granularity.YEAR_5
	if (days < 200 * 365) return Granularity.DECADE
	if (days < 400 * 365) return Granularity.DECADE_5
	if (days < 3000 * 365) return Granularity.CENTURY
	if (days < 6000 * 365) return Granularity.CENTURY_5
	return Granularity.MILLENIUM
}

export const getStep = (granularity: Granularity): number => {
	if (granularity === Granularity.YEAR) return 1
	if (granularity === Granularity.YEAR_5) return 5
	if (granularity === Granularity.DECADE) return 10
	if (granularity === Granularity.DECADE_5) return 50
	if (granularity === Granularity.CENTURY) return 100
	if (granularity === Granularity.CENTURY_5) return 500
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

export function byDate(a: RawEv3nt, b: RawEv3nt) {
	const aFrom = a.date_min != null ? a.date_min : a.date
	const bFrom = b.date_min != null ? b.date_min : b.date
	if (aFrom < bFrom) return -1
	if (aFrom > bFrom) return 1

	const aTo = a.end_date_max != null ? a.end_date_max : a.end_date
	const bTo = b.end_date_max != null ? b.end_date_max : b.end_date
	if (aTo < bTo) return -1
	if (aTo > bTo) return 1

	return 0
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const getWeekNumber = (date: Date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7)
};

export const labelBody = (d: Milliseconds, granularity: Granularity) => {
	const date = new Date(d)

	if (granularity >= Granularity.YEAR) {
		return date.getUTCFullYear().toString()
	}
	
	if (granularity === Granularity.MONTH) {
		let body = months[date.getUTCMonth()]
		if (date.getUTCMonth() === 0) body = `${date.getUTCFullYear().toString()}, ${body}`
		return body
	}
	
	if (granularity === Granularity.WEEK) {
		return `${months[date.getUTCMonth()]}, week ${getWeekNumber(date)}`
	}
	
	if (granularity === Granularity.DAY) {
		let body = days[date.getUTCDay()]
		body = `${body}, ${months[date.getUTCMonth()]} ${date.getUTCDate()}`
		if (date.getUTCMonth() === 0 && date.getUTCDate() === 1) body = `${body}, ${date.getUTCFullYear().toString()}`
		return body
	}
	
	if (granularity === Granularity.HOUR) {
		return `${date.getUTCHours()}:00`
	}
}