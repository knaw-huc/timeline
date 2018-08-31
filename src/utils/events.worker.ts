import { Milliseconds, Grid, EVENT_HEIGHT, EVENT_ROW_HEIGHT } from "../constants"
import { RawEv3nt } from "../models/event";

function addIntervalToGrid(grid: Grid, event: RawEv3nt, eventRight: Milliseconds) {
	if (event.row == null) event.row = grid.push([]) - 1
	grid[event.row].push([event.from, eventRight])

	if (event.has_image != null) {
		if (grid[event.row + 1] == null) grid[event.row + 1] = []
		grid[event.row + 1].push([event.imageFrom, event.imageTo])

		if (grid[event.row + 2] == null) grid[event.row + 2] = []
		grid[event.row + 2].push([event.imageFrom, event.imageTo])
	}
}

export class OrderedEvents {
	events: RawEv3nt[] = []
	row_count: number = 0
}

const PIXELS_PER_LETTER = 8

export function orderEvents(events: RawEv3nt[], pixelsPerMillisecond: Milliseconds): OrderedEvents { 
	if (!events.length) return new OrderedEvents()

	/** Keep a count the number of rows. It's returned to the main thread to construct the events bar and indicators */
	let rowCount: number = 0

	/**
	 * The grid exists of rows of cells. A cell is an event defined by it's left position and right position:
	 * cell = [left, width], row = [cell, cell, etc], grid = [row, row, etc]
	*/
	const grid: Grid = []

	const paddingRight = Math.round(EVENT_HEIGHT * 2 / pixelsPerMillisecond)

	const imageSize: Milliseconds = Math.round(EVENT_ROW_HEIGHT * 2 / pixelsPerMillisecond)

	const addRow = (event: RawEv3nt): RawEv3nt => {
		if (event.label == null) event.label = 'NO LABEL'
		event.from = event.date_min || event.date
		event.to = event.end_date_max || event.end_date
		if (event.to == null) event.to = event.from
		event.time = event.to == null ? 0 : event.to - event.from
		// If the event is a Point in Time, we use the label width to determine the width
		// event.space = 0
		if (event.label == null) event.label = 'NO LABEL'
		const space = ((event.label.length * PIXELS_PER_LETTER) / pixelsPerMillisecond) + paddingRight
		event.space = space > event.time ? space - event.time : 0

		if (event.has_image) {
			event.imageFrom = event.time ? event.from : event.from - imageSize / 2
			event.imageTo = event.time ? event.from + imageSize : event.from + imageSize / 2
		}

		const eventRight = event.from + event.time + event.space

		// Search the grid for a row which has space for the current event
		let rowIterator = 0
		while (event.row == null && rowIterator < grid.length) {
			let cellIterator = 0
			let hasSpace = true

			while (hasSpace && cellIterator < grid[rowIterator].length) {
				// If event.to is smaller than cell.from, the rest of the cells
				// will also be "after" `event` and we don't have to check the rest, 
				// so break
				if (eventRight < grid[rowIterator][cellIterator][0]) break;

				// Check if event.from is greater than cell.to, otherwise
				// there is overlap and hence no space
				hasSpace = event.from > grid[rowIterator][cellIterator][1]

				if (hasSpace && event.has_image != null) {
					if (grid[rowIterator + 1] == null) break;
					hasSpace = grid[rowIterator + 1].every(occupiedSpace =>
						event.imageTo < occupiedSpace[0] || event.imageFrom > occupiedSpace[1]
					)
				}

				if (hasSpace && event.has_image != null) {
					if (grid[rowIterator + 2] == null) break;
					hasSpace = grid[rowIterator + 2].every(occupiedSpace =>
						event.imageTo < occupiedSpace[0] || event.imageFrom > occupiedSpace[1]
					)

				}

				cellIterator++
			}

			// If the current row has space, add the row to the event and add the event to the grid
			if (hasSpace) {
				event.row = rowIterator
				addIntervalToGrid(grid, event, eventRight)
			}	

			rowIterator++
		}

		// If row is undefined, it means there is no space in the current grid and
		// we need to add an extra row to the grid
		if (event.row == null) addIntervalToGrid(grid, event, eventRight)

		// Increment the row count if necessary
		if (event.row > rowCount) rowCount = event.row

		return event
	}

	return {
		events: events.map(addRow), 
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
