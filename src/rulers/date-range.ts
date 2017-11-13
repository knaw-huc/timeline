import { Granularity } from "../constants";

const dateRange = (from: Date, to: Date, granularity: Granularity): Date[] => {
	const range = []
	let nextFrom

	if (granularity >= Granularity.YEAR) {
		const step = granularity === Granularity.MILLENIUM ?
			1000 :
			granularity === Granularity.CENTURY ?
				100 :
				granularity === Granularity.DECADE ?
				10 : 
				1
		nextFrom = (from) => from.setFullYear(from.getFullYear() + step)
	} else if (granularity === Granularity.MONTH) {
		nextFrom = (from) => from.setMonth(from.getMonth() + 1)
	} else if (granularity === Granularity.WEEK) {
		nextFrom = (from) => from.setDate(from.getDate() + 7)
	} else if (granularity === Granularity.DAY) {
		nextFrom = (from) => from.setDate(from.getDate() + 1)
	} else if (granularity === Granularity.HOUR) {
		nextFrom = (from) => from.setHours(from.getHours() + 1)
	}

	while (from < to) {
		range.push(from)
		from = new Date(from.valueOf())
		nextFrom(from)
	}

	return range
}

export default dateRange