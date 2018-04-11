import { Milliseconds, Grid } from "../constants"
import { RawEv3nt } from "../models/event";

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

export type OrderEventsReturn = [RawEv3nt[], Milliseconds, Milliseconds, Grid, number]
export function orderEvents(rawEvents: RawEv3nt[]): OrderEventsReturn { 
	if (!rawEvents.length) return [[], null, null, [], null]

	/** Keep a count the number of rows. It's returned to the main thread to construct the events bar and indicators */
	let rowCount: number = 0

	/**
	 * The grid exists of rows of cells. A cell is an event defined by it's left position and width:
	 * cell = [left, width], row = [cell, cell, etc], grid = [row, row, etc]
	*/
	const grid: Grid = []

	const addRow = (event: RawEv3nt): RawEv3nt => {
		// Create a variable to hold the row to find
		let row: number

		// The right position of the event (event.date is the left position)
		// let right: Milliseconds = event.hasOwnProperty('endDate') ? event.endDate : event.date
		const from = event.date_min != null ? event.date_min : event.date
		let to = event.end_date_max != null ? event.end_date_max : event.end_date
		if (to == null) to = from

		// Search the grid for a row which has space for the current event
		let rowIterator = 0
		while (row == null && rowIterator < grid.length) {
			const rows = grid[rowIterator]
			let cellIterator = 0
			let hasSpace = true

			while (hasSpace && cellIterator < rows.length) {
				hasSpace = (to < rows[cellIterator][0] || from > rows[cellIterator][1])
				cellIterator++
			}

			if (hasSpace) {
				rows.push([from, to])
				row = rowIterator
			}	

			rowIterator++
		}

		// If row is undefined, it means there is no space in the current grid and
		// we need to add an extra row to the grid
		if (row == null) row = grid.push([[from, to]]) - 1

		// Increment the row count if necessary
		if (row > rowCount) rowCount = row

		// Add the found row to the event
		event.row = row

		return event
	}

	const events = rawEvents
		.sort(byDate)
		.map(addRow)

	const from: Milliseconds = events[0].date
	const lastEvent = events[events.length - 1]
	const to: Milliseconds = lastEvent.hasOwnProperty('end_date') ? lastEvent.end_date : lastEvent.date

	return [events, from, to, grid, rowCount]
}

export function eventsWorker(e: { data: { events: RawEv3nt[], orderEventsURL: string, byDateURL: string } }) {
	importScripts(e.data.byDateURL)
	importScripts(e.data.orderEventsURL)
	
	//@ts-ignore Typescript wants the second parameter (targetOrigin), but the browser will throw
	postMessage(orderEvents(e.data.events))
}

export default (events: RawEv3nt[], done: (response: OrderEventsReturn) => void) => {
	const byDateURL = URL.createObjectURL(new Blob([byDate]))
	const orderEventsURL = URL.createObjectURL(new Blob([orderEvents]))
	const func = `onmessage = ${eventsWorker.toString()}`
	const objectURL = URL.createObjectURL(new Blob([func]))
	let worker: Worker = new Worker(objectURL)
	worker.postMessage({ events, byDateURL, orderEventsURL })
	worker.onmessage = (e) => {
		URL.revokeObjectURL(objectURL)
		worker.terminate()
		done(e.data)
	}
}
