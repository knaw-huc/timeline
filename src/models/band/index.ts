import { getGranularity, Granularity, subsequentDate } from '../../utils/dates'
import props from '../props'
import { Pixels, Milliseconds, Ratio } from '../../constants'
import { visibleRatio } from '../../utils'
import { BandConfig, MinimapDomainConfig, EventsDomainConfig } from '../config';

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
		this.time = this.visibleRatio * props.time
		this.update()
		this.granularity = getGranularity(props.from, props.to, this.visibleRatio)
		this.nextDate = subsequentDate(this.granularity)
		this.pixelsPerMillisecond = this.width / props.time
		this._zoomLevel = zoomLevel
	}

	constructor(config: BandConfig<MinimapDomainConfig | EventsDomainConfig>) {
		this.zoomLevel = config.zoomLevel
		this.height = Math.round(config.domains.reduce((prev, curr) => prev + curr.heightRatio, 0) * props.viewportHeight)
		this.top = Math.round(config.domains.reduce((prev, curr) => Math.min(prev, curr.topOffsetRatio), 1) * props.viewportHeight)
	}

	protected update() {
		const offset = props.center * (props.time - this.time)
		this.from = props.from + offset
		this.to = this.from + this.time
		this.left = Math.round(props.center * (props.viewportWidth - this.width))
	}

	positionAtTimestamp(date: Milliseconds): Pixels {
		return Math.round((date - props.from) * this.pixelsPerMillisecond)
	}

	proportionAtPosition(position: Pixels): Ratio {
		return (Math.abs(this.left) + position) / this.width
	}

	timestampAtProportion(proportion: Ratio): Milliseconds {
		return props.from + (props.time * proportion)
	}
}
