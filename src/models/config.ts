import props from "./props"
import DomainConfig from "./domain.config"

export class AggregateEntry {
	count: number
	year: number 
}

export class RawEv3nt {
	title: string
	date: string
}


export default class Config {
	public aggregate: AggregateEntry[] = []
	public center: number = .5
	public domains: DomainConfig[] = []
	public events: RawEv3nt[] = []
	public rootElement: HTMLElement = null

	constructor(config: Partial<Config>) {
		Object.keys(config).forEach(k => {
			if (k === 'domains') this[k] = config.domains.map(d => new DomainConfig(d))
			else if (this.hasOwnProperty(k)) this[k] = config[k]
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