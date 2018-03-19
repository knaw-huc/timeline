import { Milliseconds, Grid, RawEv3nt } from "../constants"

function eventsWorker(e: { data: { events: RawEv3nt[] } }) {
	// const rawEvents: RawEv3nt[] = e.data.events

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
				hasSpace = (event.endDate < rows[cellIterator][0] || event.date > rows[cellIterator][1])
				cellIterator++
			}

			if (hasSpace) {
				rows.push([event.date, event.endDate])
				row = rowIterator
			}	

			rowIterator++
		}

		// If row is undefined, it means there is no space in the current grid and
		// we need to add an extra row to the grid
		if (row == null) row = grid.push([[event.date, event.endDate]]) - 1

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

	const [intervals, pointsInTime] = partition(e.data.events, (e) => e.endDate != null)

	const events = intervals
		.sort((a, b) => {
			if (a.date < b.date) return -1
			if (a.date > b.date) return 1

			if (a.endDate < b.endDate) return -1
			if (a.endDate > b.endDate) return 1

			return 0
		})
		.map(addRow)

	const from: Milliseconds = events[0].date
	const lastEvent = events[events.length - 1]
	const to: Milliseconds = lastEvent.hasOwnProperty('endDate') ? lastEvent.endDate : lastEvent.date

	//@ts-ignore Typescript wants the second parameter (targetOrigin), but the browser will throw
	postMessage([from, to, events, pointsInTime, grid, rowCount])
}

const func = `onmessage = ${eventsWorker.toString()}`


export default (events, done: (response: [Milliseconds, Milliseconds, RawEv3nt[], RawEv3nt[], Grid, number]) => void) => {
	const objectURL = URL.createObjectURL(new Blob([func]))
	let worker: Worker = new Worker(objectURL)
	worker.postMessage(events)
	worker.onmessage = (e) => {
		URL.revokeObjectURL(objectURL)
		worker.terminate()
		done(e.data)
	}
}
