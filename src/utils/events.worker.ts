import { Milliseconds, EVENT_ROW_HEIGHT, LETTER_WIDTH } from "../constants"
import { RawEv3nt } from "../models/event";

export class OrderedEvents {
	events: RawEv3nt[] = []
	row_count: number = 0
}

export function orderEvents(events: RawEv3nt[], pixelsPerMillisecond: Milliseconds): OrderedEvents { 
	if (!events.length) return new OrderedEvents()

	const rows: number[] = [-Infinity]

	const imageSize: Milliseconds = Math.round(EVENT_ROW_HEIGHT * 2 / pixelsPerMillisecond)

	function rowHasSpace(row: number, imageFrom: Milliseconds) {
		return (rows[row + 1] == null || rows[row + 1] < imageFrom) && (rows[row + 2] == null || rows[row + 2] < imageFrom) 
	}

	function addRow(event: RawEv3nt): RawEv3nt {
		if (event.lbl == null) event.lbl = 'NO LABEL'
		event.from = event.dmin || event.d
		event.to = event.dmax || event.ed
		if (event.to == null) event.to = event.from
		event.time = event.to == null ? 0 : event.to - event.from

		const space = (event.lbl.length * LETTER_WIDTH) / pixelsPerMillisecond
		event.space = space > event.time ? space - event.time : 0
		const eventRight = Math.round(event.from + event.time + event.space)

		let row: number
		if (event.img) {
			// A point in time with an image starts half an image earlier than the point (in time)
			const imageFrom = event.time ? event.from : event.from - imageSize / 2
			const imageTo = event.time ? event.from + imageSize : event.from + imageSize / 2

			row = rows.findIndex(r => imageFrom > r)

			if (row > -1) {
				let hasSpace = false
				while (!hasSpace) {
					hasSpace = rowHasSpace(row, imageFrom)
					if (hasSpace) break
					row = rows.findIndex((r, i) => i > row && imageFrom > r)
					if (row === -1) hasSpace = true
				}
			}

			if (row === -1) {
				row = rows.push(eventRight) - 1
				rows.push(imageTo)
				rows.push(imageTo)
			} else {
				rows[row] = eventRight
				rows[row + 1] = imageTo
				rows[row + 2] = imageTo
			}
		} else {
			row = rows.findIndex(r => event.from > r)

			if (row === -1) {
				row = rows.push(eventRight) - 1
			} else {
				rows[row] = eventRight
			}
		}

		event.row = row

		return event
	}

	events = events.map(addRow)

	return {
		events,
		row_count: rows.length
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
