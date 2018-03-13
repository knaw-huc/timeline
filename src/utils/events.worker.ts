import { RawEv3nt } from "../models/config"

function eventsWorker(e) {
	let [events, center, visibleRatio, fromTime, time] = e.data

	events = events
		.sort((a, b) => {
			if (a.date < b.date) return -1
			if (a.date > b.date) return 1
			if (a.hasOwnProperty('endDate') && b.hasOwnProperty('endDate')) {
				if (a.endDate < b.endDate) return -1
				if (a.endDate > b.endDate) return 1
			}
			return 0
		})
		.map(e => {
			e.date = new Date(e.date).getTime()
			if (e.hasOwnProperty('endDate')) e.endDate = new Date(e.endDate).getTime()
			return e
		})

	const proportionAtDate = (date: number): number => (date - fromTime) / time

	const partition = (arr, filterFunc): [any, any] => {
		const matched = []
		const unmatched = []

		for (let i = 0; i < arr.length; i++) {
			const bool = filterFunc.call(arr, arr[i], i)
			if (bool) matched.push(arr[i])
			else unmatched.push(arr[i])
		}

		return [matched, unmatched];
	};

	const segments = []
	const ratios = []
	let lower = center
	let upper = center
	let i = 0

	let prevLower
	let prevUpper

	while (lower > 0) {
		if (i === 0) {
			lower = center - visibleRatio * 1.5
			upper = center + visibleRatio * 1.5
			ratios.push([lower, upper])
		}
		else {
			lower -= visibleRatio
			upper += visibleRatio

			if (lower > 0) ratios.push([lower, prevLower])
			else if (lower <= 0 && prevLower > 0) ratios.push([0, prevLower])
			if (upper < 1) ratios.push([prevUpper, upper])
			else if (upper >= 1 && prevUpper < 1) ratios.push([prevUpper, 1])
		}

		prevLower = lower
		prevUpper = upper

		i++
	}

	for(let j = 0; j < ratios.length; j++) {
		const [lower, upper] = ratios[j]
		const part = partition(events, (e) => {
			const curr = proportionAtDate(e.date)
			if (curr >= lower && curr <= upper) return true				//      [  |--]----|
			else if (e.endDate != null) {
				const currEnd = proportionAtDate(e.endDate)
				if (
					(currEnd >= lower && currEnd <= upper) ||			// |----[--|  ]
					(curr < lower && currEnd > upper)					// |----[-----]----|
				) return true
				else return false
			}
			return false	
		})	
		segments.push({
			events: part[0],
			fromRatio: lower,
			toRatio: upper,
		})
		events = part[1]
	}

	segments.sort((a, b) => {
		if (a.fromRatio < b.fromRatio) return -1
		if (a.fromRatio > b.fromRatio) return 1
		return 0
	})

	//@ts-ignore Typescript wants the second parameter (targetOrigin), but the browser will throw
	postMessage(segments)
}

const func = `onmessage = ${eventsWorker.toString()}`


export default (events, done: (response: RawEv3nt[]) => void) => {
	const objectURL = URL.createObjectURL(new Blob([func]))
	let worker: Worker = new Worker(objectURL)
	worker.postMessage(events)
	worker.onmessage = (e) => {
		URL.revokeObjectURL(objectURL)
		worker.terminate()
		done(e.data)
	}
}