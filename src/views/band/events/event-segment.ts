import DomainEvent, { RawEv3nt } from '../../../models/event'
import PointInTime from './event/point-in-time'
import Interval from './event/interval'
import Domain from '../../../models/domain'
import { RawSegment } from '../../../constants'

export default class Segment {
	rendered = false

	private rawEvents: RawEv3nt[]

	constructor(
		private domain: Domain,
		segmentData: RawSegment,
		private rootElement: HTMLUListElement
	) {
		this.rawEvents = segmentData.events
	}

	renderChildren() {
		if (this.rendered) return

		const frag = document.createDocumentFragment()

		for (let i = 0; i < this.rawEvents.length; i++) {
			const rawEvent = this.rawEvents[i]
			const event = new DomainEvent(rawEvent, this.domain)
			const EventClass = event.isInterval() ? Interval : PointInTime
			const view = new EventClass(this.domain, event)
			frag.appendChild(view.render())
		}

		this.rootElement.appendChild(frag)

		this.rendered = true
	}
}