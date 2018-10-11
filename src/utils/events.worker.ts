import { Milliseconds, EVENT_ROW_HEIGHT, Pixels } from "../constants"
import { Ev3nt, RawEv3nt } from "../models/event"
import { calcPixelsPerMillisecond } from './index'

interface InputBand {
	events: RawEv3nt[]
	zoomLevel: number
}
export interface OrderedBand {
	events: Ev3nt[]
	pixelsPerMillisecond?: Pixels
	rowCount: number
	zoomLevel: number
}
interface Options {
	parent?: RawEv3nt,
	bands: InputBand[]
	viewportWidth: Pixels,
}

export class OrderedTimeline {
	bands: OrderedBand[]
	from: Milliseconds
	parent: Ev3nt
	time: Milliseconds
	to: Milliseconds
}

export function orderEvents(options: Options): OrderedTimeline { 
	if (options.bands == null || !options.bands.length) return new OrderedTimeline()

	let from = options.bands.reduce((prev, curr) => {
		const firstEvent = curr.events[0]
		return Math.min(prev, firstEvent.dmin || Infinity, firstEvent.d || Infinity)
	}, Infinity)

	let to = options.bands.reduce((prev, curr) => {
		const highest = curr.events.reduce((prev2, curr2) => { 
			return Math.max(prev2, curr2.d || - Infinity, curr2.ed || -Infinity, curr2.dmax || -Infinity)
		}, -Infinity)
		return Math.max(highest, prev)
	}, -Infinity)

	let parent
	if (options.parent != null) {
		parent = new Ev3nt(options.parent) as Ev3nt
		from = Math.min(from, parent.dmin || Infinity, parent.d || Infinity)
		to = Math.max(to, parent.ed || -Infinity, parent.dmax || -Infinity)
	}

	const time = to - from

	function processBand(band: InputBand) {
		const pixelsPerMillisecond = calcPixelsPerMillisecond(options.viewportWidth, band.zoomLevel, time)

		const rows: number[] = [-Infinity]

		const imageSize: Milliseconds = Math.round(EVENT_ROW_HEIGHT * 2 / pixelsPerMillisecond)

		function rowHasSpace(row: number, imageFrom: Milliseconds) {
			return (rows[row + 1] == null || rows[row + 1] < imageFrom) && (rows[row + 2] == null || rows[row + 2] < imageFrom) 
		}

		function addRow(rawEvent: RawEv3nt): Ev3nt {
			const event = new Ev3nt(rawEvent, pixelsPerMillisecond)

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
					row = rows.push(event.screenTo) - 1
					rows.push(imageTo)
					rows.push(imageTo)
				} else {
					rows[row] = event.screenTo
					rows[row + 1] = imageTo
					rows[row + 2] = imageTo
				}
			} else {
				row = rows.findIndex(r => event.from > r)

				if (row === -1) {
					row = rows.push(event.screenTo) - 1
				} else {
					rows[row] = event.screenTo
				}
			}

			event.row = row

			return event
		}

		return {
			events: band.events.map(addRow),
			zoomLevel: band.zoomLevel,
			pixelsPerMillisecond,
			rowCount: rows.length,
		}
	}

	return {
		bands: options.bands.map(processBand),
		from,
		parent,
		time,
		to,
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
