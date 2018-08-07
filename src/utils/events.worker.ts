import { Milliseconds, Grid, EVENT_HEIGHT } from "../constants"
import { RawEv3nt } from "../models/event";

export class OrderedEvents {
	events: RawEv3nt[] = []
	// grid: Grid = []
	row_count: number = 0
}

const pixelsPerLetter = 8

// TODO remove visibleRatio and use 1 ms per 1 pixel as normalized values
export function orderEvents(events: RawEv3nt[], pixelsPerMillisecond: Milliseconds): OrderedEvents { 
	if (!events.length) return new OrderedEvents()

	/** Keep a count the number of rows. It's returned to the main thread to construct the events bar and indicators */
	let rowCount: number = 0

	/**
	 * The grid exists of rows of cells. A cell is an event defined by it's left position and width:
	 * cell = [left, width], row = [cell, cell, etc], grid = [row, row, etc]
	*/
	const grid: Grid = []

	const paddingRight = EVENT_HEIGHT * 2 / pixelsPerMillisecond

	const addRow = (event: RawEv3nt): RawEv3nt => {
		// Create a variable to hold the row to find
		let row: number


		if (event.label == null) event.label = 'NO LABEL'
		event.from = event.date_min || event.date
		event.to = event.end_date_max || event.end_date
		if (event.to == null) event.to = event.from
		event.time = event.to == null ? 0 : event.to - event.from
		// If the event is a Point in Time, we use the label width to determine the width
		event.space = 0
		if (!event.time) {
			if (event.label == null) event.label = 'NO LABEL'
			event.space = ((event.label.length * pixelsPerLetter) / pixelsPerMillisecond) + paddingRight
		}

		// Search the grid for a row which has space for the current event
		let rowIterator = 0
		while (row == null && rowIterator < grid.length) {
			let cellIterator = 0
			let hasSpace = true

			while (hasSpace && cellIterator < grid[rowIterator].length) {
				// If event.to is smaller than cell.from, the rest of the cells
				// will also be "after" `event` and we don't have to check the rest, 
				// so break
				if (event.to < grid[rowIterator][cellIterator][0]) break;

				// Check if event.from is greater than cell.to, otherwise
				// there is overlap and hence no space
				hasSpace = event.from > grid[rowIterator][cellIterator][1]
				cellIterator++
			}

			if (hasSpace) {
				grid[rowIterator].push([event.from, event.from + event.time + event.space])
				row = rowIterator
			}	

			rowIterator++
		}

		// If row is undefined, it means there is no space in the current grid and
		// we need to add an extra row to the grid
		if (row == null) row = grid.push([[event.from, event.from + event.time + event.space]]) - 1

		// Increment the row count if necessary
		if (row > rowCount) rowCount = row

		// Add the found row to the event
		event.row = row

		return event
	}

	events = events.map(addRow)

	return {
		events, 
		// from,
		// to,
		// grid,
		row_count: grid.length
	}
}

// export function eventsWorker(e: { data: { events: RawEv3nt[], orderEventsURL: string } }) {
// 	importScripts(e.data.orderEventsURL)
	
// 	//@ts-ignore Typescript wants the second parameter (targetOrigin), but the browser will throw
// 	postMessage(orderEvents(e.data.events))
// }

// export default (events: RawEv3nt[], done: (response: OrderedEvents) => void) => {
// 	const orderEventsURL = URL.createObjectURL(new Blob([orderEvents]))
// 	const func = `onmessage = ${eventsWorker.toString()}`
// 	const objectURL = URL.createObjectURL(new Blob([func]))
// 	let worker: Worker = new Worker(objectURL)
// 	worker.postMessage({ events, orderEventsURL })
// 	worker.onmessage = (e) => {
// 		URL.revokeObjectURL(objectURL)
// 		worker.terminate()
// 		done(e.data)
// 	}
// }
