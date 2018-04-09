import props from "./props"
import DomainConfig from "./domain.config"
import { Ratio } from "../constants";
import { RawEv3nt } from "./event";

export class AggregateEntry {
	count: number
	year: number 
}

export default class Config {
	aggregate: AggregateEntry[] = []
	center: Ratio = .5
	domains: DomainConfig[] = []
	events: RawEv3nt[] = []

	// The HTML element where the Timeline will be attached to. The element should be a
	// block element with a width and height.
	rootElement: HTMLElement = null

	// The events should be sorted when passed to Timeline, because a data store will likely be faster
	// at sorting than the client. If that is in some way not possible, the lib can sort the events.
	sortEvents: boolean = false

	constructor(config: Partial<Config>) {
		Object.keys(config).forEach(k => {
			if (k === 'domains') this.domains = config.domains.map(d => new DomainConfig(d))
			else if (this.hasOwnProperty(k)) this[k] = config[k]
		})
		
		// if (config.sortEvents) {
		// 	config.events.sort((a, b) => {
		// 		if (a.date < b.date) return -1
		// 		if (a.date > b.date) return 1
		// 		if (a.hasOwnProperty('endDate') && b.hasOwnProperty('endDate')) {
		// 			if (a.endDate < b.endDate) return -1
		// 			if (a.endDate > b.endDate) return 1
		// 		}
		// 		return 0
		// 	})
		// }
	}

	refresh(config: Partial<Config>) {
		Object.keys(config).forEach(k => {
			if (this.hasOwnProperty(k)) this[k] = config[k]
		})

		// if (config.hasOwnProperty('aggregate') || config.hasOwnProperty('events')) props.edges = this
		if (config.hasOwnProperty('center')) props.center = this.center
		props.dimensions = this.rootElement
	}
}