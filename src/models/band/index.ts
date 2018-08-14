import { getGranularity, Granularity, subsequentDate } from '../../utils/dates'
import props from '../props'
import { Pixels, Milliseconds, Ratio } from '../../constants'
import { visibleRatio } from '../../utils'
import { BandConfig } from '../config';
import animator from '../../animator';

/**
 * A Band is a collection of domains. All the domains in the Band
 * have an equal position, width, from, to, zoom level, granularity, etc.
 * Easiest way to think of it is: they scroll together.
 */

export default abstract class Band<T extends BandConfig> {
	protected readonly defaultZoomLevel = 0

	// Timestamp of the visible start of the events domains
	from: Milliseconds
	
	// Timestamp of the visible end of the events domains
	to: Milliseconds
	
	// Visible time of the events domains
	time: Milliseconds

	// Level of detail (ie century, year, month, week, day, etc)
	granularity: Granularity

	// Total height of the band
	height: Pixels

	nextDate: (d: Milliseconds) => Milliseconds

	// The amount of pixels taken by one day. Metric used for calculating 
	// the x-position of an event or ruler on the timeline.
	pixelsPerMillisecond: Pixels

	prevLeft: Pixels
	prevZoomLevel: number

	top: Pixels

	visibleRatio: Ratio

	// Total width of the band
	width: Pixels

	private _left: Pixels
	get left() { return this._left }
	set left(left) { 
		this.prevLeft = this.left || left
		this._left = left
	}

	private _zoomLevel: number
	get zoomLevel(): number { return this._zoomLevel }
	set zoomLevel(zoomLevel: number) {
		if (zoomLevel < 0) zoomLevel = 0
		this.visibleRatio = visibleRatio(zoomLevel)
		this.width = Math.round(props.viewportWidth / this.visibleRatio)
		this.pixelsPerMillisecond = this.width / props.time
		this.time = this.visibleRatio * props.time
		this.granularity = getGranularity(props.from, props.to, this.visibleRatio)
		this.nextDate = subsequentDate(this.granularity)
		this.prevZoomLevel = this.zoomLevel || zoomLevel
		this._zoomLevel = zoomLevel
		this.setHorizontalProps()
	}

	constructor(public config: T) {}

	private setVerticalProps() {
		this.height = Math.round(this.config.heightRatio * props.viewportHeight)
		this.top = Math.round(this.config.topOffsetRatio * props.viewportHeight)
	}

	private setHorizontalProps() {
		this.from = props.center - this.time/2
		this.to = props.center + this.time/2
		this.left = (props.from - this.from) * this.pixelsPerMillisecond
	}

	init() {
		this.zoomLevel = this.config.zoomLevel
		this.setVerticalProps()
		animator.registerModel(this)
	}

	resize() {
		this.zoomLevel = this.zoomLevel
		this.setVerticalProps()
		// Horizontal props are set through the setting of the zoom level
	}

	update() {
		this.setHorizontalProps()
	}

	positionAtTimestamp(timestamp: Milliseconds): Pixels {
		return Math.round((timestamp - this.from) * this.pixelsPerMillisecond)
	}

	timestampAtProportion(proportion: Ratio): Milliseconds {
		return props.from + (props.time * proportion)
	}

	timestampAtPosition(position: Pixels): Milliseconds {
		return this.from + (position / this.pixelsPerMillisecond)
	}
}
