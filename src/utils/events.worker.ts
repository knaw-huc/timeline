import { Milliseconds, Grid } from "../constants"
import { RawEv3nt } from "../models/event";
import { byDate } from "./dates";

export class OrderedEvents {
	events: RawEv3nt[] = []
	from: Milliseconds = null
	to: Milliseconds = null
	grid: Grid = []
	rowCount: number = 0
}

// TODO remove visibleRatio and use 1 ms per 1 pixel as normalized values
export function orderEvents(events: RawEv3nt[]): OrderedEvents { 
	if (!events.length) return new OrderedEvents()
	/** Keep a count the number of rows. It's returned to the main thread to construct the events bar and indicators */
	let rowCount: number = 0

	events = events.sort(byDate)

	const from = events.reduce((prev, curr) => {
		return Math.min(curr.date_min || Infinity, curr.date || Infinity, prev)
	}, Infinity)

	const to = events.reduce((prev, curr) => {
		return Math.max(curr.end_date_max || -Infinity, curr.end_date || -Infinity, prev)
	}, -Infinity)

	/**
	 * The grid exists of rows of cells. A cell is an event defined by it's left position and width:
	 * cell = [left, width], row = [cell, cell, etc], grid = [row, row, etc]
	*/
	const grid: Grid = []
	// const millisecondsPerPixel = (to - from) / (viewportWidth / visibleRatio)
	// const eventMinWidth = millisecondsPerPixel * viewportWidth * .1

	const ctx = document.createElement('canvas').getContext('2d')
	// TODO turn in to constant
	ctx.font = '10px sans-serif'

	const addRow = (event: RawEv3nt): RawEv3nt => {
		// Create a variable to hold the row to find
		let row: number

		// TODO add from and to to the event object
		// TODO add width to the event object (width in pixels (calc text length if pit and if interval smaller than text length))
		// 		but be carefull, width is also calced when zoom, etc, so should be some sort of normalized width
		
		event.from = event.date_min != null ? event.date_min : event.date
		event.to = event.end_date_max != null ? event.end_date_max : event.end_date

		event.time = event.to == null ? 0 : event.to - event.from
		event.textWidth = ctx.measureText(event.label).width

		// Search the grid for a row which has space for the current event
		let rowIterator = 0
		while (row == null && rowIterator < grid.length) {
			const rows = grid[rowIterator]
			let cellIterator = 0
			let hasSpace = true

			while (hasSpace && cellIterator < rows.length) {
				hasSpace = (event.to < rows[cellIterator][0] || event.from > rows[cellIterator][0] + rows[cellIterator][1])
				cellIterator++
			}

			if (hasSpace) {
				rows.push([event.from, event.time])
				row = rowIterator
			}	

			rowIterator++
		}

		// If row is undefined, it means there is no space in the current grid and
		// we need to add an extra row to the grid
		if (row == null) row = grid.push([[event.from, event.time]]) - 1

		// Increment the row count if necessary
		if (row > rowCount) rowCount = row

		// Add the found row to the event
		event.row = row

		return event
	}

	return {
		events: events.map(addRow),
		from,
		to,
		grid,
		rowCount
	}
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
