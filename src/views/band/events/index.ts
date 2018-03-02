import Domain from '../../../models/domain'
import Event from '../../../models/event'
import createElement from '../../../utils/create-element'
import BandWrapper from '../index'
import PointInTime from './event/point-in-time'
// import { READY_FOR_RENDER_EVENT } from '../../../constants'
import addTop from '../../../utils/add-top'

export default class EventsBand {
	private events
	private eventsWrap

	constructor(private domain: Domain, events) {
		this.events = events
			.map(e => new Event(e, this.domain))
			.map(addTop())

		// document.addEventListener(READY_FOR_RENDER_EVENT, this.renderChildren)
	}

	public render() {
		this.eventsWrap = createElement(
			'ul',
			'events-wrap',
			[
				'list-style: none',
				'margin: 0',
				'padding: 0',
				'width: 100%',
			],
			[
				`height: ${this.domain.height}px`,
			]
		)

		this.events
			// .filter(e => e.shouldRender())
			// .map(e => e.isInterval() ? new TimeInterval(e) : new PointInTime(e))
			.map(e => new PointInTime(e).render())
			.forEach(e => this.eventsWrap.appendChild(e))

		const bandWrap = new BandWrapper(this.domain).render()
		bandWrap.appendChild(this.eventsWrap)

		return bandWrap
		// const frag = document.createDocumentFragment()

	}
}