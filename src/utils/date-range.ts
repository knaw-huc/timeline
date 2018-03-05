import { Granularity } from "./dates"

export const getStep = (granularity: Granularity): number => {
	if (granularity === Granularity.YEAR) return 1
	if (granularity === Granularity.DECADE) return 10
	if (granularity === Granularity.YEARS_50) return 50
	if (granularity === Granularity.CENTURY) return 100
	if (granularity === Granularity.MILLENIUM) return 1000
	throw new RangeError("[getStep] Only steps with a granularity greater than 'year' calculated")
}

// TODOD turn into generator?
export default (granularity: Granularity, prev: boolean = false): ((Date) => Date) => {
	const modifier = prev ? -1 : 1

	if (granularity >= Granularity.YEAR) {
		return (date) => new Date(date.getFullYear() + (getStep(granularity) * modifier), 0, 1)
	}

	if (granularity === Granularity.MONTH) {
		return (date) => new Date(date.getFullYear(), date.getMonth() + modifier, 1)
	}
	
	if (granularity === Granularity.WEEK) {
		return (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + (7 * modifier))
	}
	
	if (granularity === Granularity.DAY) {
		return (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + modifier)
	}
	
	if (granularity === Granularity.HOUR) {
		return (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + modifier)
	}
}