import { RawEv3nt } from "../models/event";
import { Milliseconds, Ratio } from "../constants";
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

export function visibleRatio(zoomLevel: number): Ratio {
	return Math.pow(2, zoomLevel * -1)
}

/**
 * Create a range from 0 up to, but not including n
 * ie: 3 => [0, 1, 2]
 * ie: 6 => [0, 1, 2, 3, 4, 5]
 */
export function createRange(n: number) {
	return Array.apply(null, {length: n}).map(Number.call, Number)
}

/**
 * Random select an given amount from a set
 * ['a', 'b', 'c', 'd'], 2 => ['d', 'a']
 * [1, 2, 3, 4, 5, 6, 7, 8], 4 => [2, 1, 8, 4]
 */
export function selectRandom(set: (string | number)[], amount: number) {
	const selected = []

	while(selected.length < amount) {
		const randomIndex = Math.floor(Math.random() * set.length)
		const nextItem = set[randomIndex]	
		if (selected.indexOf(nextItem) === -1 || set.length < amount) selected.push(nextItem)
	}

	return selected
}