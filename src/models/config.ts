import { Ratio } from "../constants"
import DomainConfig from "./domain.config"

export default class Config {
	center?: Ratio = .5

	domains?: DomainConfig[] = []

	// The HTML element where the Timeline will be attached to. The element should be a
	// block element with a width and height.
	rootElement?: HTMLElement = null
}