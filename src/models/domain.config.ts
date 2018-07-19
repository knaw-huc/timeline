import { Ratio, Pixels } from "../constants"
import { OrderedEvents, orderEvents } from "../utils/events.worker"
import { RawEv3nt } from "./event"

export default class DomainConfig {
	events?: RawEv3nt[] = []

	// When type is 'minimap' this is where the target domains are given
	targets?: number[] = null

	// Part of the horizontal space available to this domain.
	// If the ratio is .1 only 10% of the heigth is used for this domain.
	heightRatio?: Ratio = 1

	label?: string = null

	orderedEvents?: OrderedEvents = null

	rulers?: boolean = true

	// Number between 0 and 1 representing the offset from the top
	// at which the domain should start. A ratio of .3 would make the
	// domain start at 30% from the top.
	topOffsetRatio?: Ratio = 0

	type?: 'events' | 'minimap' = 'events'

	// Number between 0 and 1 representing the visible ratio of the domain
	// in relation to the total. If the total is 8 months, a ratio of .75
	// would show 6 months and hide 2 months. Ie (with center at .5): -[------]-
	visibleRatio?: Ratio = 1

	constructor(config: DomainConfig, viewportWidth: Pixels) {
		if (config.type === 'events') {
			if (config.events == null && config.orderedEvents == null) console.error('[DomainConfig] No events in config!')

			this.orderedEvents = (config.orderedEvents == null) ?
				orderEvents(config.events, viewportWidth, this.visibleRatio) :
				config.orderedEvents
		}

		Object.keys(config).forEach(k => {
			if (this.hasOwnProperty(k)) this[k] = config[k]
		})
	}
}
