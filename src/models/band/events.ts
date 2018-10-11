import Band, { BandType } from '.'
import { EventsBandConfig } from '../config'
import animator from '../../animator'
import { Pixels, EVENT_ROW_HEIGHT, Milliseconds } from '../../constants'
import props from '../props'
import { Ev3nt } from '../event'
import { OrderedBand } from '../../utils/events.worker'
import { byDate } from '../../utils/dates'

export default class EventsBand extends Band<EventsBandConfig> {
	type = BandType.EventsBand

	// Total height of the band (compare this.visibleHeight and this.availableHeight)
	private height: number

	private lowestVisibleRow: number
	private highestVisibleRow: number

	events: Ev3nt[] = []
	rowCount: number = 0
	visibleEvents: Ev3nt[] = []

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

	init(orderedBand: OrderedBand) {
		super.init()

		this.events = orderedBand.events
		this.rowCount = orderedBand.rowCount

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

				event.uncertain_from_width = 0
				if (event.dmin != null) {
					let uncertain_from_to
					if (event.d != null) {
						uncertain_from_to = event.d
					}
					else if (event.ed != null) {
						uncertain_from_to = event.ed
					} else if (event.dmax != null) {
						uncertain_from_to = event.dmin + (event.dmax - event.dmin) / 2
					} else {
						throw Error(['updateEvents', 'Width uncertain from is not definable', JSON.stringify(event)].join('\n'))
					}

					event.uncertain_from_width = (uncertain_from_to - event.dmin) * this.pixelsPerMillisecond
				}

				event.uncertain_to_width = 0
				if (event.dmax != null) {
					let uncertain_to_from
					if (event.ed != null) {
						uncertain_to_from = event.ed
					}
					else if (event.d != null) {
						uncertain_to_from = event.d
					} else if (event.dmin != null) {
						uncertain_to_from = event.dmin + (event.dmax - event.dmin) / 2
					} else {
						throw Error(['updateEvents', 'Width uncertain to is not definable', JSON.stringify(event)].join('\n'))
					}

					event.uncertain_to_width = (event.dmax - uncertain_to_from) * this.pixelsPerMillisecond
				}

				event.top = this.top + this.availableHeight - ((event.row + 1) * EVENT_ROW_HEIGHT) + this.offsetY

				event.color = this.getColor(event.from, event.to)

				return event
			})
	}

	update() {
		super.update()
		this.updateEvents()
	}

	getEventByCoordinates(x: Pixels, y: Pixels): Ev3nt {
		const timestamp = this.timestampAtPosition(x)

		const bottomOfDomain: Pixels = props.viewportOffset + this.top + this.availableHeight + this.offsetY
		const clickedRow: number = Math.floor((bottomOfDomain - y) / EVENT_ROW_HEIGHT)

		const event = this.events.find(e => {
			if (
				!(e.from < timestamp && e.screenTo > timestamp) ||
				(e.row < this.lowestVisibleRow || e.row > this.highestVisibleRow)
			) return false

			return e.row === clickedRow
		})

		return event
	}

	// orderEvents() {
	// 	orderEvents(this.events, this.pixelsPerMillisecond)
	// }

	zoomIn() {
		animator.zoomTo(this, this.zoomLevel + 1)
	}

	zoomOut() {
		animator.zoomTo(this, this.zoomLevel - 1)
	}
}
