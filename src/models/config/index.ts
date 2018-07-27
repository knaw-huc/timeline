import { Ratio } from "../../constants"
import { OrderedEvents } from "../../utils/events.worker";
import { RawEv3nt } from "../event";

export abstract class DomainConfig {
	// Part of the horizontal space available to this domain.
	// If the ratio is .1 only 10% of the heigth is used for this domain.
	heightRatio?: Ratio = 1

	// Show rulers?
	rulers?: boolean = true

	// Number between 0 and 1 representing the offset from the top
	// at which the domain should start. A ratio of .3 would make the
	// domain start at 30% from the top.
	topOffsetRatio?: Ratio = 0
}

export class MinimapDomainConfig extends DomainConfig {
	// The indices of the events domains which are visualized by the minimap
	targets?: number[] = []
}

export class EventsDomainConfig extends DomainConfig {
	events?: RawEv3nt[]
	label?: string
	orderedEvents?: OrderedEvents
}

export class BandConfig<T> {
	domains?: T[] = []

	// Number between 0 and 1 representing the visible ratio of the domain
	// in relation to the total. If the total is 8 months, a ratio of .75
	// would show 6 months and hide 2 months. Ie (with center at .5): -[------]-
	zoomLevel?: number = 0
}


export default class Config {
	center?: Ratio = .5

	events: BandConfig<EventsDomainConfig>

	minimaps?: BandConfig<MinimapDomainConfig>[] = []

	// The HTML element where the Timeline will be attached to. The element should be a
	// block element with a width and height.
	rootElement: HTMLElement
}