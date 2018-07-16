import { AggregateEntry } from "../models/config"

function aggregateWorker(e) {
	let prevYear
	const run1 = e.data
		.reduce((prev, curr, index, array) => {
			// Worker receives the raw Ev3nt Object, not the Ev3nt class,
			// so getters and setters are not available, hence curr._date
			const year = new Date(curr.date).getFullYear()
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
	//@ts-ignore Typescript wants the second parameter (targetOrigin), but the browser will throw
	postMessage(run2)
}

const func = `onmessage = ${aggregateWorker.toString()}`


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