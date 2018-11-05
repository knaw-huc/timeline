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

// TODO should the location also have dmin and dmax?
export class Ev3ntLocation {
	/** Coordinates using the EPSG:3857 coordinate reference system */
	coor?: Point

	/** Coordinates using the EPSG:4326 coordinate reference system */
	coor4326?: Point

	/** Earliest possible date. Only used when start date is uncertain */
	dmin?: Milliseconds

	/** Earliest possible date granularity */
	dmin_g?: Granularity

	/** Date */
	d?: Milliseconds

	/** Date granularity */
	d_g?: Granularity

	/** End date */
	ed?: Milliseconds

	/** End date granularity */
	ed_g?: Granularity

	/** Latest possible date. Only used when end date is uncertain */
	dmax?: Milliseconds

	/** Latest possible date granularity */
	dmax_g?: Granularity
}

/** A voyage is a change in the location of an event over time.
 * 
 * The route of the voyage will be determined by:
 * - route ID: map of routes should be resolved by props.loadRoutes
 * - start point and end point: the route will be interpolated
 */
export class Voyage {
	/** Start date of the voyage */
	d: Milliseconds

	/** End date of the voyage */
	ed: Milliseconds

	/** ID of a route */
	route?: string

	/** Start point */
	sp?: Point

	/** End point */
	ep?: Point
}

/** An area is the surface of an event between two given dates */
export class Area {
	/** Start date of the voyage */
	d: Milliseconds

	/** End date of the voyage */
	ed: Milliseconds

	/** ID of an area */
	area: string
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
	areas: Area[]
	locs: Ev3ntLocation[]
	voyages: Voyage[]
	wid: string
}

export class Ev3nt extends RawEv3nt {
	from: Milliseconds
	to: Milliseconds
	screenTo: Milliseconds

	/**
	 * The length of time of an event
	 * 
	 * PointInTime has time = 0
	 * Interval has time = 31536000000, if the event takes 1 year,
	 */ 
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
