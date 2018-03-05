import { Granularity } from "../constants"

// TODOD turn into generator?
export default (granularity: Granularity, prev: boolean = false): ((Date) => Date) => {
	const modifier = prev ? -1 : 1

	if (granularity >= Granularity.YEAR) {
		const step = granularity === Granularity.MILLENIUM ?
			1000 :
			granularity === Granularity.CENTURY ?
				100 :
				granularity === Granularity.DECADE ?
				10 : 
				1

		return (date) =>
			// const nextYear = prev ? date.getFullYear() - step : date.getFullYear() + step
			new Date(date.getFullYear() + (step * modifier), 0, 1)
	}

	if (granularity === Granularity.MONTH) {
		return (date) =>
			// const month = prev ? date.getMonth() - 1 : date.getMonth() + 1
			new Date(date.getFullYear(), date.getMonth() + modifier, 1)
	}
	
	if (granularity === Granularity.WEEK) {
		return (date) => 
			// const day = prev ? date.getDate() - 7 : date.getDate() + 7
			new Date(date.getFullYear(), date.getMonth(), date.getDate() + (7 * modifier))
	}
	
	if (granularity === Granularity.DAY) {
		// const day = prev ? date.getDate() + 1
		return (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + modifier)
	}
	
	if (granularity === Granularity.HOUR) {
		return (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + modifier)
		// return (date) => date.setHours(date.getHours() + 1)
	}
}