import { RawEv3nt } from "./models/event";

// The minimal space (in px) an event should take. This space can be bigger
// than the width of the event, to accommodate the label.
export const EVENT_MIN_SPACE = 160 

export const EVENT_HEIGHT = 14

// The height (in px) of a row of events.
export const EVENT_ROW_HEIGHT = 20

export const DATE_BAR_HEIGHT = EVENT_ROW_HEIGHT 
export const RULER_LABELS_HEIGHT = 60

export const CENTER_CHANGE_EVENT = 'CENTER_CHANGE_EVENT'
export const CENTER_CHANGE_DONE_EVENT = 'CENTER_CHANGE_EVENT_DONE'
export const DIMENSIONS_CHANGE_EVENT = 'DIMENSIONS_CHANGE_EVENT'

export type Milliseconds = number
export type Grid = [Milliseconds, Milliseconds][][]

export type ComponentType = 'EVENTS' | 'MINIMAP' | 'RULERS' | 'SPARKLINE'

/** A Ratio is a number between 0 and 1 */
export type Ratio = number

export type Pixels = number

export class RawSegment {
	events?: RawEv3nt[]
	from: Milliseconds
	to: Milliseconds
}
