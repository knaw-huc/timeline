import { RawEv3nt } from "./models/event";

export const EVENT_HEIGHT = 14

// The height (in px) of a row of events.
export const EVENT_ROW_HEIGHT = 16 

export const DATE_BAR_HEIGHT = EVENT_ROW_HEIGHT 
export const RULER_LABELS_HEIGHT = 60

export const CENTER_CHANGE_DONE = 'CENTER_CHANGE_DONE'
export const ZOOM_DONE = 'ZOOM_DONE'

export const PIXELS_PER_LETTER = 8

export type Milliseconds = number
export type Grid = [Milliseconds, Milliseconds][][]

/** A Ratio is a number between 0 and 1 */
export type Ratio = number

export type Pixels = number

export class RawSegment {
	events?: RawEv3nt[]
	from: Milliseconds
	to: Milliseconds
}

export type Color = (opacity: number) => string
export const colors: Color[] = [
	'rgba(211,84,0',
	'rgba(219,10,91',
	'rgba(31,58,147',
	'rgba(0,128,0'
].map(color => (opacity: number = 1) => `${color},${opacity})`)