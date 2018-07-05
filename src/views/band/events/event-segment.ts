import DomainEvent, { RawEv3nt } from '../../../models/event'
import createElement from '../../../utils/create-element'
import PointInTime from './event/point-in-time'
import Interval from './event/interval'
import Domain from '../../../models/domain'
import props from '../../../models/props'
import { RawSegment, Milliseconds } from '../../../constants'

export default class Segment {
	rendered = false

	private rootElement: HTMLElement
	private left: number
	private rawEvents: RawEv3nt[]
	private from: Milliseconds

	constructor(
		private domain: Domain,
		segmentData: RawSegment,
	) {
		this.rawEvents = segmentData.events
		this.from = segmentData.from
		this.left = ((props.config.from - this.from) / props.time) * this.domain.width
	}

	render() {
		this.rootElement = createElement(
			'div',
			'segment',
			[
				'bottom: 0',
				'list-style: none',
				'margin: 0',
				'padding: 0',
				'position: absolute',
				'top: 0',
				`width: ${props.viewportWidth}px`,

			],
			[
				`left: ${this.left}px`,
			]
		)

		return this.rootElement
	}

	renderChildren() {
		if (this.rendered) return

		const ul = createElement('ul', 'events', [
			'list-style: none',
			'margin: 0',
			'padding: 0',
		])

		for (let i = 0; i < this.rawEvents.length; i++) {
			const event = new DomainEvent(this.rawEvents[i], this.domain)
			const EventClass = event.isInterval() ? Interval : PointInTime
			const view = new EventClass(event, this.left)
			ul.appendChild(view.render())
		}

		this.rootElement.appendChild(ul)

		this.rendered = true
	}
}