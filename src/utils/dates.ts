import { Milliseconds, Pixels } from "../constants"
import { RawEv3nt } from "../models/event";

export const enum Granularity {
	MILLISECOND = "MILLISECOND",
	MILLISECOND_10 = "MILLISECOND_10", /* 10 MILLISECONDS */
	MILLISECOND_50 = "MILLISECOND_50", /* 50 MILLISECONDS */
	MILLISECOND_100 = "MILLISECOND_100", /* 100 MILLISECONDS */
	MILLISECOND_500 = "MILLISECOND_500", /* 500 MILLISECONDS */
	SECOND = "SECOND",
	MINUTE = "MINUTE",
	HOUR = "HOUR",
	DAY = "DAY",
	WEEK = "WEEK",
	MONTH = "MONHT",
	YEAR = "YEAR",
	YEAR_5 = "YEAR_5", /* 5 YEARS */
	DECADE = "DECADE",
	DECADE_5 = "DECADE_5" , /* 50 years */
	CENTURY = "CENTURY",
	CENTURY_5 = "CENTURY_5", /* 500 years */
	MILLENIUM = "MILLENIUM",
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function nth(n: number){return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"}

function formatMonth(d: Date) { return months[d.getUTCMonth()]}
function formatDateNumber(d: Date) {
	const dateNumber = d.getUTCDate()
	const day = days[d.getUTCDay()]
	return `${day}, ${dateNumber}${nth(dateNumber)}`
}

// @ts-ignore
function formatHours(d: Date) { return d.getUTCHours().toString().padStart(2, '0') }
// @ts-ignore
function formatMinutes(d: Date) { return d.getUTCMinutes().toString().padStart(2, '0') }
// @ts-ignore
function formatSeconds(d: Date) { return d.getUTCSeconds().toString().padStart(2, '0') }
// @ts-ignore
function formatMilliseconds(d: Date) { return d.getUTCMilliseconds().toString().padStart(3, '0') }

function isYearOrBigger(granularity: Granularity) {
	return granularity === Granularity.YEAR ||
		granularity === Granularity.YEAR_5 ||
		granularity === Granularity.DECADE ||
		granularity === Granularity.DECADE_5 ||
		granularity === Granularity.CENTURY ||
		granularity === Granularity.CENTURY_5 ||
		granularity === Granularity.MILLENIUM
}

export const formatDate = (timestamp: Milliseconds, granularity: Granularity): string => {
	if (timestamp == null) return '∞'

	const date = new Date(timestamp)

	let label = date.getUTCFullYear().toString()
	if (isYearOrBigger(granularity)) return label

	label = `${formatMonth(date)} ${label}`
	if (granularity === Granularity.MONTH) return label

	label = `${formatDateNumber(date)} ${label}`
	if (granularity === Granularity.DAY) return label

	label = `${label} at ${formatHours(date)}:`
	if (granularity === Granularity.HOUR) return `${label}00`

	label = `${label}${formatMinutes(date)}`
	if (granularity === Granularity.MINUTE) return label

	label = `${label}:${formatSeconds(date)}`
	if (granularity === Granularity.SECOND) return label

	// If none of the above apply, you get the full monty
	return `${label}.${formatMilliseconds(date)}`
}

export const getGranularity = (pixelsPerMillisecond: Pixels): Granularity => {
	if (pixelsPerMillisecond > 58) return Granularity.MILLISECOND
	if (pixelsPerMillisecond > 12) return Granularity.MILLISECOND_10
	if (pixelsPerMillisecond > 2.3) return Granularity.MILLISECOND_50
	if (pixelsPerMillisecond > 1.5) return Granularity.MILLISECOND_100
	if (pixelsPerMillisecond > .4) return Granularity.MILLISECOND_500
	if (pixelsPerMillisecond > 1.12e-3) return Granularity.SECOND
	if (pixelsPerMillisecond > 1.12e-4) return Granularity.MINUTE
	if (pixelsPerMillisecond > 1.12e-5) return Granularity.HOUR
	if (pixelsPerMillisecond > 8e-7) return Granularity.DAY
	if (pixelsPerMillisecond > 2.6e-7) return Granularity.WEEK
	if (pixelsPerMillisecond > 2.2e-8) return Granularity.MONTH
	if (pixelsPerMillisecond > 2.2e-9) return Granularity.YEAR
	if (pixelsPerMillisecond > 3.3e-10) return Granularity.YEAR_5
	if (pixelsPerMillisecond > 1.6e-10) return Granularity.DECADE
	if (pixelsPerMillisecond > 8e-11) return Granularity.DECADE_5
	if (pixelsPerMillisecond > 1e-11) return Granularity.CENTURY
	if (pixelsPerMillisecond > 5e-12) return Granularity.CENTURY_5
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

	if (granularity === Granularity.MILLISECOND) return 1
	if (granularity === Granularity.MILLISECOND_10) return 10
	if (granularity === Granularity.MILLISECOND_50) return 50
	if (granularity === Granularity.MILLISECOND_100) return 100
	if (granularity === Granularity.MILLISECOND_500) return 500

	throw new RangeError("[getStep] Only steps with a granularity greater than 'year' calculated")
}

export function subsequentDate(granularity: Granularity): ((date: Milliseconds) => Milliseconds) {
	if (isYearOrBigger(granularity)) {
		return (d: Milliseconds) => {
			let date = new Date(d)
			let nextYear = date.getUTCFullYear() + 1

			if (granularity !== Granularity.YEAR) {
				const step = getStep(granularity)
				while(nextYear % step !== 0) { nextYear += 1 }
			} 

			if (nextYear > -1 && nextYear < 100) {
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
			return Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1)
		}
	}

	if (granularity === Granularity.WEEK) {
		return (d: Milliseconds) => {
			const date = new Date(d)
			return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 7)
		}
	}

	if (granularity === Granularity.DAY) {
		return (d: Milliseconds) => {
			const date = new Date(d)
			return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1)
		}
	}

	if (granularity === Granularity.HOUR) {
		return (d: Milliseconds) => {
			const date = new Date(d)
			return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours() + 1)
		}
	}

	if (granularity === Granularity.MINUTE) {
		return (d: Milliseconds) => {
			const date = new Date(d)
			return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes() + 1)
		}
	}

	if (granularity === Granularity.SECOND) {
		return (d: Milliseconds) => {
			const date = new Date(d)
			return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds() + 1)
		}
	}

	if (granularity.slice(0, "MILLISECOND".length) === "MILLISECOND") {
		return (d: Milliseconds) => {
			const step = getStep(granularity)
			const date = new Date(d)
			let ms = date.getUTCMilliseconds() + 1
			if (step > 1) ms = ms + step - (ms % step)
			return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), ms)
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

const getWeekNumber = (date: Date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7)
};

export const labelBody = (d: Milliseconds, granularity: Granularity) => {
	const date = new Date(d)
	if (isYearOrBigger(granularity)) return date.getUTCFullYear().toString()
	if (granularity === Granularity.MONTH) return formatMonth(date)
	if (granularity === Granularity.WEEK) return `${formatMonth(date)}, week ${getWeekNumber(date)}`
	if (granularity === Granularity.DAY) return `${formatDateNumber(date)} ${formatMonth(date)}`
	if (granularity === Granularity.HOUR) return `${formatHours(date)}:00`
	if (granularity === Granularity.MINUTE) return `${formatHours(date)}:${formatMinutes(date)}`
	if (granularity === Granularity.SECOND) return `${formatHours(date)}:${formatMinutes(date)}:${formatSeconds(date)}`

	if (granularity.slice(0, "MILLISECOND".length) === "MILLISECOND") {
		return `${formatHours(date)}:${formatMinutes(date)}:${formatSeconds(date)}.${formatMilliseconds(date)}`
	}
}