import { Milliseconds, Pixels, PIXELS_PER_LETTER, EVENT_HEIGHT } from '../constants';
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
	coor?: Point
	coor4326?: Point
	dmin?: Milliseconds
	dmin_g?: Granularity
	d?: Milliseconds
	d_g?: Granularity
	ed?: Milliseconds
	ed_g?: Granularity
	dmax?: Milliseconds
	dmax_g?: Granularity
}

export class Voyage {
	d: Milliseconds
	ed: Milliseconds
	route: string
	sp?: Point // Start point
	ep?: Point // End point
}

export class RawEv3nt {
	class: string[]
	d: Milliseconds
	d_g: Granularity
	dmax: Milliseconds
	dmax_g: Granularity
	dmin: Milliseconds
	dmin_g: Granularity
	dsc: string
	ed: Milliseconds
	ed_g: Granularity
	id: string
	img: ImageFileType
	lbl: string
	locs: Ev3ntLocation[]
	voyages: Voyage[]
	wid: string
}

export class Ev3nt extends RawEv3nt {
	from: Milliseconds
	to: Milliseconds
	screenTo: Milliseconds

	// The length of time an event took.
	// A Point in Time has time = 0
	// For an interval, if the event takes 1 year, time = 31536000000
	time?: Milliseconds

	row: number

	/* runtime */
	// Same as from, to, screenTo and time as in: they all just need the pixelsPerMS var to be calc'd?
	left?: Pixels
	top?: Pixels
	width?: Pixels
	uncertain_from_width?: Pixels
	uncertain_to_width?: Pixels
	color?: string

	image?: HTMLImageElement
	/* runtime */

	constructor(event: RawEv3nt, pixelsPerMillisecond?: Pixels) {
		super()

		for (const key in event) {
			if ((event as any)[key] != null) (this as any)[key] = (event as any)[key]
		}

		if (this.lbl == null) this.lbl = 'NO LABEL'
		if (this.id == null) this.id = 'id_' + crypto.getRandomValues(new Uint8Array(4)).join('_')

		this.from = this.dmin || this.d
		this.to = this.dmax || this.ed
		if (this.to == null) this.to = this.from
		this.time = this.to - this.from

		if (pixelsPerMillisecond != null) {
			const paddingRight = Math.round(EVENT_HEIGHT * 2 / pixelsPerMillisecond)
			let space = ((this.lbl.length * PIXELS_PER_LETTER) / pixelsPerMillisecond) + paddingRight
			space = space > this.time ? space - this.time : 0
			this.screenTo = Math.round(this.from + this.time + space)
		}
	}
}
