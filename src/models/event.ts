import { Milliseconds, Pixels } from '../constants';
import { Granularity } from '../utils/dates';

export enum ImageFileType {
	NONE = 'none',
	JPG = 'jpg',
	SVG = 'svg',
	GIF = 'gif',
	PNG = 'png',
}

export class RawEv3nt {
	date: Milliseconds
	date_granularity?: Granularity = Granularity.DAY
	date_min?: Milliseconds
	date_min_granularity?: Granularity
	description?: string
	end_date?: Milliseconds
	end_date_granularity?: Granularity
	end_date_max?: Milliseconds
	end_date_max_granularity?: Granularity
	id?: string
	label?: string
	row?: number
	wikidata_identifier?: string

	from: Milliseconds
	to: Milliseconds

	tags: string[]
	locations: any[]

	// The length of time an event took.
	// A Point in Time has time = 0
	// For an interval, if something takes 1 year, time = 31536000000
	time?: Milliseconds

	// The space an event needs for display
	// Point in Time = label width + padding
	// Interval = padding
	space?: Milliseconds

	left?: Pixels
	padding?: Pixels
	top?: Pixels
	width?: Pixels
	width_uncertain_from?: Pixels
	width_uncertain_to?: Pixels
	color?: string

	has_image?: ImageFileType
	image: HTMLImageElement
}
