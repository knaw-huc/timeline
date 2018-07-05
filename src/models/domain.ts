import { getGranularity, Granularity } from '../utils/dates'
import { subsequentDate } from '../utils/dates'
import props from './props'
import DomainConfig from './domain.config'
import { Pixels, Milliseconds, Ratio } from '../constants';

class Domain {
	config: DomainConfig
	// Level of detail (ie century, year, month, week, day, etc)
	granularity: Granularity

	// The amount of pixels taken by one day. Metric used for calculating 
	// the x-position of an event or ruler on the timeline.
	pixelsPerMillisecond: number

	width: number
	height: number

	private _left: Pixels
	get left() { return this._left }
	set left(left) { 
		if (left < -this.width + props.viewportWidth) left = props.viewportWidth - this.width
		else if (left > 0) left = 0 
		this._left = left
	}

	nextDate: (d: Milliseconds) => Milliseconds

	constructor(configProps) {
		this.config = new DomainConfig(configProps)
		this.height = props.viewportHeight * this.config.heightRatio
		this.width = props.viewportWidth / this.config.visibleRatio
		this.granularity = getGranularity(props.config.from, props.config.to, this.config.visibleRatio)
		this.nextDate = subsequentDate(this.granularity)
		this.pixelsPerMillisecond = this.width / props.time
		this.updateLeft()
	}

	updateLeft(): Pixels {
		this.left = props.center * (props.viewportWidth - this.width)
		return this.left
	}

	positionAtDate(date: Milliseconds): Pixels {
		return (date - props.config.from) * this.pixelsPerMillisecond
	}

	proportionAtPosition(position: Pixels): Ratio {
		return position / this.width
	}

	dateAtProportion(proportion: Ratio): Milliseconds {
		return props.config.from + (props.time * proportion)
	}

	get fromTo(): [Milliseconds, Milliseconds] {
		const visibleTime = this.config.visibleRatio * props.time
		const from = props.config.from + (props.center * (props.time - visibleTime))
		const to = props.config.from + (props.center * (props.time - visibleTime)) + visibleTime
		return [from, to]
	}
}

export default Domain