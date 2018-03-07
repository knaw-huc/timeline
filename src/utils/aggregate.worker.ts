import { IAggregateEntry } from "../models/config";

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

const objectURL = URL.createObjectURL(new Blob([func]))

export default (events, done: (response: IAggregateEntry[]) => void) => {
	const worker: Worker = new Worker(objectURL)
	worker.postMessage(events)
	worker.onmessage = (e) => done(e.data)
}