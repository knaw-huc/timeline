import { Ratio, ComponentType } from "../constants";

export default class DomainConfig {
	components: Set<ComponentType> = new Set()

	hasEvents: boolean = true

	hasIndicatorFor: number = null

	// Part of the horizontal space available to this domain.
	// If the ratio is .1 only 10% of the heigth is used for this domain.
	heightRatio: Ratio = 1

	hasRulers: boolean = true

	hasSparkline: boolean = true

	// Number between 0 and 1 representing the offset from the top
	// at which the domain should start. A ratio of .3 would make the
	// domain start at 30% from the top.
	topOffsetRatio: Ratio = 0

	// Number between 0 and 1 representing the visible ratio of the domain
	// in relation to the total. If the total is 1 year, a ratio of .75
	// would show 9 months and hide 3 months.
	visibleRatio: Ratio = 1


	constructor(props) {
		Object.keys(props).forEach(k => {
			if (k === 'components') this[k] = new Set(props[k])
			else if (this.hasOwnProperty(k)) this[k] = props[k]
		})
	}

	// domainLabels?: boolean
	// rulerLabels?: boolean
}