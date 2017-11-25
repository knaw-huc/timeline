import { Granularity } from "../constants";

const dateRange = (from: Date, to: Date, granularity: Granularity): Date[] => {
	const range: Date[] = []
	let nextFrom: (Date) => Date

	if (granularity >= Granularity.YEAR) {
		from = new Date(from.getFullYear(), 0, 1)

		const step = granularity === Granularity.MILLENIUM ?
			1000 :
			granularity === Granularity.CENTURY ?
				100 :
				granularity === Granularity.DECADE ?
				10 : 
				1
		nextFrom = (from) => from.setFullYear(from.getFullYear() + step)
	} else if (granularity === Granularity.MONTH) {
		from = new Date(from.getFullYear(), from.getMonth(), 1)
		nextFrom = (from) => from.setMonth(from.getMonth() + 1)
	} else if (granularity === Granularity.WEEK) {
		from = new Date(from.getFullYear(), from.getMonth(), from.getDate())
		nextFrom = (from) => from.setDate(from.getDate() + 7)
	} else if (granularity === Granularity.DAY) {
		from = new Date(from.getFullYear(), from.getMonth(), from.getDate())
		nextFrom = (from) => from.setDate(from.getDate() + 1)
	} else if (granularity === Granularity.HOUR) {
		from = new Date(from.getFullYear(), from.getMonth(), from.getDate(), from.getHours())
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