import Band, { BandType } from '.'
import { EventsBandConfig } from '../config'
import animator from '../../animator'
import { Pixels, EVENT_ROW_HEIGHT, Milliseconds } from '../../constants'
import props from '../props'
import { RawEv3nt } from '../event'
import { orderEvents } from '../../utils/events.worker';
import { byDate } from '../../utils/dates';
import { calcPixelsPerMillisecond } from '../../utils';

export default class EventsBand extends Band<EventsBandConfig> {
	type = BandType.EventsBand

	// Total height of the band (compare this.visibleHeight and this.availableHeight)
	private height: number

	private lowestVisibleRow: number
	private highestVisibleRow: number

	events: RawEv3nt[] = []
	rowCount: number = 0
	visibleEvents: RawEv3nt[] = []

	private _offsetY: Pixels = 0
	get offsetY() { return this._offsetY }
	set offsetY(offsetYChange) { 
		this._offsetY += offsetYChange
		if (this._offsetY < 0) this._offsetY = 0

		// If the height is not bigger than the available height, there is no
		// need to scroll vertically and the max offset should be 0
		const maxOffset = this.height > this.availableHeight ?
			this.height - this.availableHeight + EVENT_ROW_HEIGHT :
			0

		if (this._offsetY > maxOffset) this._offsetY = maxOffset

		const lowestRow = this._offsetY / EVENT_ROW_HEIGHT
		this.lowestVisibleRow = Math.ceil(lowestRow)
		this.highestVisibleRow = this.lowestVisibleRow + this.visibleRowsCount
	}

	constructor(config: EventsBandConfig) {
		super({ ...new EventsBandConfig(), ...config })
		if (this.config.events != null) this.config.events.sort(byDate)
	}

	init() {
		super.init()

		const pixelsPerMillisecond = calcPixelsPerMillisecond(props.viewportWidth, this.config.zoomLevel || 0, props.time)
		const orderedEvents = this.config.orderedEvents == null ?
			orderEvents(this.config.events, pixelsPerMillisecond) :
			this.config.orderedEvents
		this.events = orderedEvents.events
		this.rowCount = orderedEvents.row_count

		this.height = EVENT_ROW_HEIGHT * this.rowCount

		// Set the offset Y to fill this.visibleRows
		this.offsetY = 0

		this.updateEvents()
	}

	private getColor(from: Milliseconds, to: Milliseconds): string {
		const beforeRGB = [253, 231, 37]
		const centerRGB = [49, 220, 215]
		const afterRGB = [204, 104, 232]

		let diff: Milliseconds
		if (props.center > to) { // event is left of center
			diff = props.center - to
		} else if (props.center < from) { // event is right of center
			diff = from - props.center
		} else {
			return `rgb(${centerRGB.join(', ')})`
		}

		const ratio = diff / (this.time / 2)

		const outerRGB = (props.center > to) ? beforeRGB : afterRGB

		const codes = centerRGB
			.map((code, i) => {
				return code + ((outerRGB[i] - code) * ratio)
			})
			.join(', ')

		return `rgb(${codes})`
	}

	private updateEvents() {
		this.visibleEvents = this.events
			.filter(event => 
				// Compare event to this.to and this.from to determine if the event is visible horizontally
				!(event.from > this.to || event.to < this.from) && 
				// Compare event to the visible rows to determine if the event is visible vertically
				event.row >= this.lowestVisibleRow && event.row <= this.highestVisibleRow 
			)
			.map(event => {
				// event.left (px) === event.from (ms) + band offset (ms)
				event.left = this.positionAtTimestamp(event.from)						 // ||<- left ->[   event   ]                 ||  


				// event.width (px) === event.time (ms)
				event.width = Math.round((event.time) * this.pixelsPerMillisecond)       // ||          [<- width ->]                 ||
				if (event.time && event.width < 1) event.width = 1

				event.width_uncertain_from = (event.date_min != null) ?
					(event.date - event.date_min) * this.pixelsPerMillisecond :
					0

				event.width_uncertain_to = (event.end_date_max != null) ?
					(event.end_date_max - event.end_date) * this.pixelsPerMillisecond :
					0

				// event.padding (px) === event.space (ms)
				event.padding = Math.round((event.space) * this.pixelsPerMillisecond)    // ||          [   event   ]<- padding ->    ||

				event.top = this.top + this.availableHeight - ((event.row + 1) * EVENT_ROW_HEIGHT) + this.offsetY

				event.color = this.getColor(event.from, event.to)

				return event
			})
	}

	update() {
		super.update()
		this.updateEvents()
	}

	getEventByCoordinates(x: Pixels, y: Pixels): RawEv3nt {
		const timestamp = this.timestampAtPosition(x)

		const bottomOfDomain: Pixels = props.viewportOffset + this.top + this.availableHeight + this.offsetY
		const clickedRow: number = Math.floor((bottomOfDomain - y) / EVENT_ROW_HEIGHT)

		const event = this.events.find(e => {
			if (
				!(e.from < timestamp && e.from + e.time + e.space > timestamp) ||
				(e.row < this.lowestVisibleRow || e.row > this.highestVisibleRow)
			) return false

			return e.row === clickedRow
		})

		return event
	}

	zoomIn() {
		animator.zoomTo(this, this.zoomLevel + 1)
	}

	zoomOut() {
		animator.zoomTo(this, this.zoomLevel - 1)
	}
}
