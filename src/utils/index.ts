import { RawEv3nt } from "../models/event";
import { Milliseconds, Ratio, Pixels } from "../constants";

export const debounce = (func: Function, wait: number) => {
	let timeout: number
	return () => {
		clearTimeout(timeout)
		timeout = setTimeout(func, wait)
	}
}

/**
 * Convert a zoom level to a visible ratio
 * 0 = 1 (2^0), the whole timeline is visible
 * 1 = .5 (2^-1), halve of the timeline visible
 * 2 = .25 (2^-2), quarter of the timeline visible
 * 3 = .125 (2^-3), one eights of the timeline visible
 * ...
 * Infinity = limit to 0, zoomed in on a pico nano micro millisecond
 */
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

export function calcPixelsPerMillisecond(viewportWidth: Pixels, zoomLevel: number, totalTime: Milliseconds) {
	return (viewportWidth / visibleRatio(zoomLevel)) / totalTime
}

function formatDate(ts: Milliseconds) {
	if (ts == null) return null
	const d = new Date(ts)
	return d.toUTCString()
	// return `${d.getUTCFullYear()}-${d.getUTClMonth() + 1}-${d.getDate()}`
}
export function logEvent(event: RawEv3nt, ...rest: string[]) {
	console.log(event.lbl, event, formatDate(event.from), formatDate(event.to), rest)
}