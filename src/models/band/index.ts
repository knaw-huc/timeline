import { getGranularity, Granularity, subsequentDate } from '../../utils/dates'
import props from '../props'
import { Pixels, Milliseconds, Ratio } from '../../constants'
import { visibleRatio } from '../../utils'
import { BandConfig, MinimapDomainConfig, EventsDomainConfig } from '../config'

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

	// Total height of the domain
	height: Pixels

	// The amount of pixels taken by one day. Metric used for calculating 
	// the x-position of an event or ruler on the timeline.
	pixelsPerMillisecond: Pixels

	visibleRatio: Ratio

	// Total width of the domain
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
	set zoomLevel(zl: number) {
		this.visibleRatio = visibleRatio(zl)
		const visibleTime = this.visibleRatio * props.time
		const offset = props.center * (props.time - visibleTime)
		this.from = props.from + offset
		this.to = this.from + visibleTime
		this.time = this.to - this.from
		this._zoomLevel = zl
	}

	nextDate: (d: Milliseconds) => Milliseconds

	constructor(public config: BandConfig<MinimapDomainConfig | EventsDomainConfig>) {
		this.visibleRatio = visibleRatio(config.zoomLevel)
		this.width = props.viewportWidth / this.visibleRatio
		this.granularity = getGranularity(props.from, props.to, this.visibleRatio)
		this.nextDate = subsequentDate(this.granularity)
		this.pixelsPerMillisecond = this.width / props.time
		// console.log(this.visibleRatio, this.pixelsPerMillisecond)
		this.updateLeft()
	}


	updateLeft(): Pixels {
		this.left = props.center * (props.viewportWidth - this.width)
		return this.left
	}

	positionAtDate(date: Milliseconds): Pixels {
		return (date - props.from) * this.pixelsPerMillisecond
	}

	proportionAtPosition(position: Pixels): Ratio {
		return position / this.width
	}

	dateAtProportion(proportion: Ratio): Milliseconds {
		return props.from + (props.time * proportion)
	}
}
