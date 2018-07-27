import Band from '.'
import { BandConfig, EventsDomainConfig } from '../config';
import animator from '../../animator';
import { Pixels, EVENT_HEIGHT, DATE_BAR_HEIGHT } from '../../constants';
import { RawEv3nt } from '../event';
import props from '../props';

export default class EventsBand extends Band {
	domains: EventsDomainConfig[]

	constructor(config: BandConfig<EventsDomainConfig>) {
		super(config)
		this.domains = config.domains
	}

	getEventByCoordinates(x: Pixels, y: Pixels): RawEv3nt {
		const timestamp = this.timestampAtProportion(this.proportionAtPosition(x))

		const domain = this.domains.find(d => {
			const top = d.topOffsetRatio * props.viewportHeight
			const height = d.heightRatio * props.viewportHeight
			return top < y && top + height > y
		})

		const event = domain.orderedEvents.events.find(e => {
			const eventFrom = e.date_min != null ? e.date_min : e.date
			const eventTo = e.end_date_max != null ? e.end_date_max : e.end_date
			if (!(eventFrom < timestamp && eventTo > timestamp)) return false

			const bottomOfDomain = ((domain.topOffsetRatio + domain.heightRatio) * props.viewportHeight) - DATE_BAR_HEIGHT
			const row = Math.floor((bottomOfDomain - y) / (EVENT_HEIGHT + 2))
			return e.row === row
		})

		return event
	}

	zoomIn() {
		animator.zoomTo(this.zoomLevel + 1)
		console.log('in', this.zoomLevel)
	}

	zoomOut() {
		const nextZoomLevel = (this.zoomLevel === 0) ? 0 :  this.zoomLevel - 1
		animator.zoomTo(nextZoomLevel)
		console.log('out', this.zoomLevel)
	}
}
