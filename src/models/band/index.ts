import { getGranularity, Granularity, subsequentDate } from '../../utils/dates'
import props from '../props'
import { Pixels, Milliseconds, Ratio } from '../../constants'
import { visibleRatio } from '../../utils'
import { BandConfig, MinimapDomainConfig, EventsDomainConfig } from '../config';
import animator from '../../animator';

/**
 * A Band is a collection of domains. All the domains in the Band
 * have an equal position, width, from, to, zoom level, granularity, etc.
 * Easiest way to think of it is: they scroll together.
 */

export default abstract class Band {
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

	top: Pixels

	visibleRatio: Ratio

	// Total width of the band
	width: Pixels

	private _left: Pixels
	get left() { return this._left }
	set left(left) { 
		if (left < -this.width + props.viewportWidth) left = props.viewportWidth - this.width
		else if (left > 0) left = 0 
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
		this._zoomLevel = zoomLevel
		this.update()
	}

	constructor(config: BandConfig<MinimapDomainConfig | EventsDomainConfig>) {
		this.zoomLevel = config.zoomLevel
		this.height = Math.round(config.domains.reduce((prev, curr) => prev + curr.heightRatio, 0) * props.viewportHeight)
		this.top = Math.round(config.domains.reduce((prev, curr) => Math.min(prev, curr.topOffsetRatio), 1) * props.viewportHeight)
		animator.registerModel(this)
	}

	update() {
		this.from = props.center - this.time/2
		this.to = props.center + this.time/2
		this.left = (props.from - this.from) * this.pixelsPerMillisecond
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
