import Band from '.'
import { EventsBandConfig } from '../config'
import animator from '../../animator'
import { Pixels, EVENT_HEIGHT, DATE_BAR_HEIGHT } from '../../constants'
import props from '../props'
import { RawEv3nt } from '../event'
import { orderEvents } from '../../utils/events.worker';
import { byDate } from '../../utils/dates';
import { calcPixelsPerMillisecond } from '../../utils';

export default class EventsBand extends Band<EventsBandConfig> {
	events: RawEv3nt[] = []
	rowCount: number = 0
	visibleEvents: RawEv3nt[] = []

	constructor(config: EventsBandConfig) {
		super({ ...new EventsBandConfig(), ...config })

		if (this.config.events != null) this.config.events.sort(byDate)
	}

	init() {
		super.init()

		const pixelsPerMillisecond = calcPixelsPerMillisecond(props.viewportWidth, this.config.zoomLevel || 0, props.to - props.from)
		const orderedEvents = this.config.orderedEvents == null ?
			orderEvents(this.config.events, pixelsPerMillisecond) :
			this.config.orderedEvents

		this.rowCount = orderedEvents.row_count

		// While setting this.events, add the top prop to every event
		const offsetY = this.config.topOffsetRatio * props.viewportHeight
		const domainHeight = (this.config.heightRatio * props.viewportHeight) - DATE_BAR_HEIGHT
		this.events = orderedEvents.events.map(event => {
			event.top = offsetY + domainHeight - ((event.row + 1) * (EVENT_HEIGHT + 2))
			return event
		})

		this.updateEvents()
	}

	private updateEvents() {
		this.visibleEvents = this.events
			.filter(event => !(event.from > this.to || event.to < this.from))
			.map(event => {
				// event.left (px) === event.from (ms) + band offset (ms)
				event.left = this.positionAtTimestamp(event.from) //+ this.left			 // ||<- left ->[   event   ]                 ||  

				// event.width (px) === event.time (ms)
				event.width = Math.round((event.time) * this.pixelsPerMillisecond)       // ||          [<- width ->]                 ||
				if (event.time && event.width < 1) event.width = 1

				// event.padding (px) === event.space (ms)
				event.padding = Math.round((event.space) * this.pixelsPerMillisecond)    // ||          [   event   ]<- padding ->    ||

				return event
			})
	}

	update() {
		super.update()
		this.updateEvents()
	}

	getEventByCoordinates(x: Pixels, y: Pixels): RawEv3nt {
		const timestamp = this.timestampAtPosition(x)

		const event = this.events.find(e => {
			if (!(e.from < timestamp && e.from + e.time + e.space > timestamp)) return false

			const bottomOfDomain = props.viewportOffset + ((this.config.topOffsetRatio + this.config.heightRatio) * props.viewportHeight) - DATE_BAR_HEIGHT
			const row = Math.floor((bottomOfDomain - y) / (EVENT_HEIGHT + 2))
			return e.row === row
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
