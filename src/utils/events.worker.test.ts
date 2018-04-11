import { byDate, orderEvents } from './events.worker'
import { RawEv3nt } from '../models/event';

const clone = (arr: RawEv3nt[]) => arr.map(x => ({ ...x }))

const events: RawEv3nt[] = [
	{ id: 'a0', date: Date.UTC(2001, 0, 1), end_date: Date.UTC(2100, 0, 1), end_date_max: Date.UTC(2100, 8, 1) }, // last, hightest end_date_max
	{ id: 'b1', date: Date.UTC(2001, 0, 1), end_date: Date.UTC(2100, 0, 1), end_date_max: Date.UTC(2100, 6, 1) },
	{ id: 'c2', date: Date.UTC(1800, 0, 1) },
	{ id: 'd3', date: Date.UTC(2000, 0, 1), date_min: Date.UTC(1700, 2, 1), end_date: Date.UTC(2000, 1, 1) },
	{ id: 'e4', date: Date.UTC(2000, 0, 1), date_min: Date.UTC(1700, 0, 1), end_date: Date.UTC(2000, 1, 1) }, // first, lowest date_min
	{ id: 'f5', date: Date.UTC(1900, 0, 1) },
]

test('Sort some events', () => {
	const sorted = clone(events).sort(byDate)
	expect(sorted).toEqual([events[4], events[3], events[2], events[5], events[1], events[0]])
})

test('Order some events', () => {
	const e = clone(events)
	const [ordered] = orderEvents(clone(events))
	expect(ordered).toEqual([
		{ ...e[4], row: 0 },
		{ ...e[3], row: 1 },
		{ ...e[2], row: 2 },
		{ ...e[5], row: 2 },
		{ ...e[1], row: 0 },
		{ ...e[0], row: 1 }
	])
})