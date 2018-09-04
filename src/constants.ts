import { RawEv3nt } from "./models/event";

export const imageSizes = [16, 32, 64, 128, 256]

// The height of an event. This is best seen by the height of an interval
export const EVENT_HEIGHT = 32


// Function for letter width is lineair: letter_width(event_height) = 7.5/40 * event_height + 3.5
// - font size = 72 => letter width = 17
// - font size = 48 => letter width = 12.5
// - font size = 32 => letter width = 9.5
export const LETTER_WIDTH = Math.round(EVENT_HEIGHT * .1875 + 3.5)

// Function for font size is lineair: font_size(event_height) = 5/16 * event_height + 6
// Taken from two points:
// - event height = 16 => font size = 11
// - event height = 32 => font size = 16
export const FONT_SIZE = Math.round(EVENT_HEIGHT * .3125 + 6)

// The vertical space between two events. This is best seen between two intervals
export const ROW_SPACING = Math.round(EVENT_HEIGHT / 3)

// The height (in px) of a row of events.
export const EVENT_ROW_HEIGHT = EVENT_HEIGHT + ROW_SPACING
export const DATE_BAR_HEIGHT = EVENT_ROW_HEIGHT 

// The bounding box is the box where the image must fit within.
// In this case the image should not be higher or wider than
// 2 times the event row height
export const IMAGE_BOUNDING_BOX = (EVENT_ROW_HEIGHT * 2) - ROW_SPACING * 2
export const IMAGE_BORDER_SIZE = Math.round(ROW_SPACING / 2)
export const IMAGE_SIZE = imageSizes.reduce((prev, curr) => Math.abs(curr - IMAGE_BOUNDING_BOX) < Math.abs(prev - IMAGE_BOUNDING_BOX) ? curr : prev)

export const CENTER_CHANGE_DONE = 'CENTER_CHANGE_DONE'
export const ZOOM_DONE = 'ZOOM_DONE'
export const SCROLL_DONE = 'SCROLL_DONE'

export const PIXELS_PER_LETTER = 8

export const DEFAULT_IMAGE_PATH = '/images'

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
