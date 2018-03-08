import { DomainType } from "./domain";
import props from "./props";

export interface IAggregateEntry {
	count: number
	year: number 
}

export interface IRawEntry {
	title: string
	date: string
}

export interface IRawDomain {
	// domainLabels?: boolean
	hasIndicatorFor?: number
	heightRatio?: number
	visibleRatio?: number
	// rulerLabels?: boolean
	// rulers?: boolean
	topOffsetRatio?: number
	type: DomainType
}

export default class Config {
	public aggregate: IAggregateEntry[] = []
	public center: number = .5
	public domains: IRawDomain[] = []
	public events: IRawEntry[] = []
	public rootElement: HTMLElement = null

	constructor(config: Partial<Config>) {
		Object.keys(config).forEach(k => {
			if (this.hasOwnProperty(k)) this[k] = config[k]
		})
	}

	public refresh(config: Partial<Config>) {
		Object.keys(config).forEach(k => {
			if (this.hasOwnProperty(k)) this[k] = config[k]
		})

		if (config.hasOwnProperty('aggregate') || config.hasOwnProperty('events')) props.edges = this
		if (config.hasOwnProperty('center')) props.center = this.center
		props.dimensions = this.rootElement
	}
}