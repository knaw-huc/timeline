import { Ratio } from "../constants"
import DomainConfig from "./domain.config"

// export class AggregateEntry {
// 	count: number
// 	year: number 
// }

export default class Config {
	// aggregate?: AggregateEntry[] = []

	center?: Ratio = .5

	domains?: DomainConfig[] = []

	// from: Milliseconds

	// The HTML element where the Timeline will be attached to. The element should be a
	// block element with a width and height.
	rootElement?: HTMLElement = null

	// rowCount: number

	// to: Milliseconds
}