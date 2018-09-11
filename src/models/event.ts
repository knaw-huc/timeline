import { Milliseconds, Pixels } from '../constants';
import { Granularity } from '../utils/dates';

export enum ImageFileType {
	NONE = 'none',
	JPG = 'jpg',
	SVG = 'svg',
	GIF = 'gif',
	PNG = 'png',
}

class Point {
	type: "Point"
	coordinates: [number, number]
}

export class Ev3ntLocation {
	coor: Point
	coor4326: Point
	dmin: Milliseconds
	dmin_g: Granularity
	d: Milliseconds
	d_g: Granularity
	ed: Milliseconds
	ed_g: Granularity
	dmax: Milliseconds
	dmax_g: Granularity
}

export class RawEv3nt {
	d: Milliseconds
	d_g?: Granularity = Granularity.DAY
	dmin?: Milliseconds
	dmin_g?: Granularity
	dsc?: string
	ed?: Milliseconds
	ed_g?: Granularity
	dmax?: Milliseconds
	dmax_g?: Granularity
	id?: string
	lbl?: string
	row?: number
	wid?: string
	locs: Ev3ntLocation[]

	from: Milliseconds
	to: Milliseconds

	// tags: string[]

	// The length of time an event took.
	// A Point in Time has time = 0
	// For an interval, if something takes 1 year, time = 31536000000
	time?: Milliseconds

	// The space an event needs for display
	// Point in Time = label width + padding
	// Interval = padding
	space?: Milliseconds

	left?: Pixels
	top?: Pixels
	width?: Pixels
	uncertain_from_width?: Pixels
	uncertain_to_width?: Pixels
	color?: string

	img?: ImageFileType
	image?: HTMLImageElement
}
