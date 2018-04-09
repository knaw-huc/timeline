import { Milliseconds, Grid } from "../constants"
import { RawEv3nt } from "../models/event";

export type SortFuncReturn = [Milliseconds, Milliseconds, RawEv3nt[], RawEv3nt[], Grid, number]
export function sortEvents(rawEvents: RawEv3nt[]): SortFuncReturn { 
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

		// Search the grid for a row which has space for the current event
		let rowIterator = 0
		while (row == null && rowIterator < grid.length) {
			const rows = grid[rowIterator]
			let cellIterator = 0
			let hasSpace = true

			while (hasSpace && cellIterator < rows.length) {
				hasSpace = (event.end_date < rows[cellIterator][0] || event.date > rows[cellIterator][1])
				cellIterator++
			}

			if (hasSpace) {
				rows.push([event.date, event.end_date])
				row = rowIterator
			}	

			rowIterator++
		}

		// If row is undefined, it means there is no space in the current grid and
		// we need to add an extra row to the grid
		if (row == null) row = grid.push([[event.date, event.end_date]]) - 1

		// Increment the row count if necessary
		if (row > rowCount) rowCount = row

		// Add the found row to the event
		event.row = row

		return event
	}

	function partition<T>(arr: T[], filterFunc: (T) => boolean): [T[], T[]] {
		const matched = []
		const unmatched = []

		for (let i = 0; i < arr.length; i++) {
			const bool = filterFunc.call(arr, arr[i], i)
			if (bool) matched.push(arr[i])
			else unmatched.push(arr[i])
		}

		return [matched, unmatched];
	}

	const [intervals, pointsInTime] = partition(rawEvents, (e: RawEv3nt) => e.end_date != null)

	const events = intervals
		.sort((a, b) => {
			if (a.date < b.date) return -1
			if (a.date > b.date) return 1

			if (a.end_date < b.end_date) return -1
			if (a.end_date > b.end_date) return 1

			return 0
		})
		.map(addRow)

	const from: Milliseconds = events[0].date
	const lastEvent = events[events.length - 1]
	const to: Milliseconds = lastEvent.hasOwnProperty('end_date') ? lastEvent.end_date : lastEvent.date

	return [from, to, intervals, pointsInTime, grid, rowCount]
}

export function eventsWorker(e: { data: { events: RawEv3nt[], sortFuncURL: string } }) {
	importScripts(e.data.sortFuncURL)
	
	//@ts-ignore Typescript wants the second parameter (targetOrigin), but the browser will throw
	postMessage(sortEvents(e.data.events))
}

export default (events: RawEv3nt[], done: (response: SortFuncReturn) => void) => {
	const sortFuncURL = URL.createObjectURL(new Blob([sortEvents]))
	const func = `onmessage = ${eventsWorker.toString()}`
	const objectURL = URL.createObjectURL(new Blob([func]))
	let worker: Worker = new Worker(objectURL)
	worker.postMessage({ events, sortFuncURL })
	worker.onmessage = (e) => {
		URL.revokeObjectURL(objectURL)
		worker.terminate()
		done(e.data)
	}
}
