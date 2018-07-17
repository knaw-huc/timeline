import { RawSegment, Milliseconds, Ratio } from "../constants"
import { RawEv3nt } from "../models/event";

function segmentsWorker(e) {
	const center: Ratio = e.data.center
	const visibleRatio: Ratio = e.data.visibleRatio
	const from: Milliseconds = e.data.from
	const time: Milliseconds = e.data.time
	const to: Milliseconds = from + time
	const timePerRatio: Milliseconds = time * visibleRatio
	let events: RawEv3nt[] = e.data.events

	// const proportionAtDate = (date: Milliseconds): Ratio => (date - from) / time

	let lower: Milliseconds = from + (center * time) - timePerRatio
	let upper: Milliseconds = from + (center * time) + timePerRatio
	const segments: RawSegment[] = [{ from: lower, to: upper }]
	let prevLower: Milliseconds = lower
	let prevUpper: Milliseconds = upper
	while (lower > from || upper < to) {
		lower -= timePerRatio
		upper += timePerRatio

		if (lower > from) segments.push({ from: lower, to: prevLower })
		else if (lower <= from && prevLower > from) segments.push({ from, to: prevLower })

		if (upper < to) segments.push({ from: prevUpper, to: upper })
		else if (upper >= to && prevUpper < to) segments.push({ from: prevUpper, to })

		prevLower = lower
		prevUpper = upper
	}

	for(let j = 0; j < segments.length; j++) {
		// const [lower, upper] = ratios[j]
		const segment = segments[j]

		function filterFunc(e: RawEv3nt) {
			// const curr = proportionAtDate(e.date)
			if (e.date >= segment.from && e.date <= segment.to) return true				//      [  |--]----|	Start of event visible
			if (e.end_date != null) {
				if (
					(e.end_date >= segment.from && e.end_date <= segment.to) ||			// |----[--|  ]			End of event visible
					(e.date < segment.from && e.end_date > segment.to)					// |----[-----]----|	Event overlaps visible area
				) return true
				else return false
			}
			return false	
		}	

		segment.events = events.filter(filterFunc),
		// segments.push({
		// 	events: 
		// 	fromRatio: lower,
		// 	toRatio: upper,
		// })
		events = events.filter(e => !filterFunc(e))
	}

	segments.sort((a, b) => {
		if (a.from < b.from) return -1
		if (a.from > b.from) return 1
		return 0
	})

	//@ts-ignore Typescript wants the second parameter (targetOrigin), but the browser will throw
	postMessage(segments)
}

const func = `onmessage = ${segmentsWorker.toString()}`


export default (events, done: (response: RawSegment[]) => void) => {
	const objectURL = URL.createObjectURL(new Blob([func]))
	let worker: Worker = new Worker(objectURL)
	worker.postMessage(events)
	worker.onmessage = (e) => {
		URL.revokeObjectURL(objectURL)
		worker.terminate()
		done(e.data)
	}
}