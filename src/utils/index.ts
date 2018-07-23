import { RawEv3nt } from "../models/event";
import { Milliseconds } from "../constants";
import { Granularity, getStep } from "./dates";

export const debounce = (func, wait) => {
	let timeout
	return () => {
		clearTimeout(timeout)
		timeout = setTimeout(func, wait)
	}
}

export const onVisible = (from, to) => (e: RawEv3nt) => {
	const eventFrom = e.date_min || e.date
	let eventTo = e.end_date_max || e.end_date
	if (eventTo == null) eventTo = eventFrom
	if (eventFrom == null && eventTo == null) return false
	return !(eventTo < from || eventFrom > to)
}

export function findClosestRulerDate(timestamp: Milliseconds, granularity: Granularity): Milliseconds {
	if (timestamp == null || isNaN(timestamp)) {
		console.error('[findClosestRulerDate] start timestamp is not defined')
		return 
	}

	const date = new Date(timestamp)
	let year = date.getFullYear()

	if (granularity >= Granularity.YEAR) {
		const step = getStep(granularity)
		if (granularity === Granularity.YEAR) year += 1
		else while(year % step !== 0) { year += 1 }
		return Date.UTC(year, 0, 1)
	} else if (granularity === Granularity.MONTH) {
		return Date.UTC(year, date.getMonth() + 1, 1)
	} else if (granularity === Granularity.DAY) {
		return Date.UTC(year, date.getMonth(), date.getDate() + 1)
	}

	return timestamp
}