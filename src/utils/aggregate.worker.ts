import { AggregateEntry } from "../models/config";

const func = `onmessage = function(e) {
	let prevYear
	const run1 = e.data
		.reduce((prev, curr, index, array) => {
			const year = curr.date.getFullYear()
			if (prev.hasOwnProperty(year)) {
				prev[year]++
			} else {
				while (prevYear < year) {
					prevYear += 1
					prev[prevYear] = 0
				}
				prev[year] = 1
			}
			prevYear = year
			return prev
		}, {})
	const run2 = Object.keys(run1).map((year, index) => ({ year, count: run1[year]}))
	postMessage(run2)
}`


export default (events, done: (response: AggregateEntry[]) => void) => {
	const objectURL = URL.createObjectURL(new Blob([func]))
	let worker: Worker = new Worker(objectURL)
	worker.postMessage(events)
	worker.onmessage = (e) => {
		URL.revokeObjectURL(objectURL)
		worker.terminate()
		done(e.data)
	}
}