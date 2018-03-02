// The minimal space (in px) an event should take. This space can be bigger
// than the width of the event, to accommodate the label.
export const EVENT_MIN_SPACE = 160 

export const EVENT_HEIGHT = 12

// The height (in px) of a row of events.
export const EVENT_ROW_HEIGHT = 16

export const DATE_BAR_HEIGHT = 60
export const RULER_LABELS_HEIGHT = 60

export const CENTER_CHANGE_EVENT = 'CENTER_CHANGE_EVENT'
export const READY_FOR_RENDER_EVENT = 'READY_FOR_RENDER_EVENT'

export const enum Granularity {
	HOUR,
	DAY,
	WEEK,
	MONTH,
	YEAR,
	DECADE,
	CENTURY,
	MILLENIUM,
}
