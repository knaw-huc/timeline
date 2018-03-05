import Domain from '../../../models/domain'
import Event from '../../../models/event'
import createElement from '../../../utils/create-element'
import Band from '../index'
import PointInTime from './event/point-in-time'
// import { READY_FOR_RENDER_EVENT } from '../../../constants'
import addTop from '../../../utils/add-top'

export default class EventsBand extends Band {
	private eventsWrap
	private iter = 0
	private topAdder

	constructor(domain: Domain, private events) {
		super(domain)
		this.topAdder = addTop(domain)
	}

	public render() {
		const bandWrap = super.render()

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

		this.renderEvents()

		bandWrap.appendChild(this.eventsWrap)

		return bandWrap
	}

	private renderEvents = () => {
		const [from, to, last] = this.domain.initialActiveRange(++this.iter)
		this.events
			.filter(e => e.date >= from && e.date <= to && !e.isRendered)
			.map(e => {
				e.isRendered = true
				return this.topAdder(new Event(e, this.domain))
			})
			.forEach(e => this.eventsWrap.appendChild(new PointInTime(e).render()))

		if (!last) window.requestAnimationFrame(this.renderEvents)
	}
}