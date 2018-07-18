import { Milliseconds, Grid, Pixels, Ratio } from "../constants"
import { RawEv3nt } from "../models/event";

export type OrderedEvents = [RawEv3nt[], Milliseconds, Milliseconds, Grid, number]
export function orderEvents(events: RawEv3nt[], viewportWidth: Pixels, visibleRatio: Ratio): OrderedEvents { 
	if (!events.length) return [[], null, null, [], null]
	/** Keep a count the number of rows. It's returned to the main thread to construct the events bar and indicators */
	let rowCount: number = 0
	/**
	 * The grid exists of rows of cells. A cell is an event defined by it's left position and width:
	 * cell = [left, width], row = [cell, cell, etc], grid = [row, row, etc]
	*/
	const grid: Grid = []
	const firstEvent = events[0]
	const from: Milliseconds = firstEvent.date_min != null ? firstEvent.date_min : firstEvent.date
	const lastEvent = events[events.length - 1]
	const to: Milliseconds = lastEvent.end_date_max != null ?
		lastEvent.end_date_max :
		lastEvent.end_date != null ?
			lastEvent.end_date :
			lastEvent.date
	const millisecondsPerPixel = (to - from) / (viewportWidth / visibleRatio)
	const eventMinWidth = millisecondsPerPixel * viewportWidth * .1

	const addRow = (event: RawEv3nt): RawEv3nt => {
		// Create a variable to hold the row to find
		let row: number

		// The right position of the event (event.date is the left position)
		// let right: Milliseconds = event.hasOwnProperty('endDate') ? event.endDate : event.date
		const from = event.date_min != null ? event.date_min : event.date
		let to = event.end_date_max != null ? event.end_date_max : event.end_date
		if (to == null || (to - from) < eventMinWidth) to = from + eventMinWidth

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

	return [events.map(addRow), from, to, grid, rowCount]
}

export function eventsWorker(e: { data: { events: RawEv3nt[], orderEventsURL: string } }) {
	importScripts(e.data.orderEventsURL)
	
	//@ts-ignore Typescript wants the second parameter (targetOrigin), but the browser will throw
	postMessage(orderEvents(e.data.events))
}

export default (events: RawEv3nt[], done: (response: OrderedEvents) => void) => {
	const orderEventsURL = URL.createObjectURL(new Blob([orderEvents]))
	const func = `onmessage = ${eventsWorker.toString()}`
	const objectURL = URL.createObjectURL(new Blob([func]))
	let worker: Worker = new Worker(objectURL)
	worker.postMessage({ events, orderEventsURL })
	worker.onmessage = (e) => {
		URL.revokeObjectURL(objectURL)
		worker.terminate()
		done(e.data)
	}
}
