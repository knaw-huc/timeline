import { Ratio, Milliseconds } from "../constants"
import { RawEv3nt } from "./event"
import DomainConfig from "./domain.config"

export class AggregateEntry {
	count: number
	year: number 
}

export default class Config {
	aggregate?: AggregateEntry[] = []

	center?: Ratio = .5

	domains: DomainConfig[] = []

	events: RawEv3nt[] = []

	from: Milliseconds

	// The HTML element where the Timeline will be attached to. The element should be a
	// block element with a width and height.
	rootElement: HTMLElement = null

	rowCount: number

	to: Milliseconds
}