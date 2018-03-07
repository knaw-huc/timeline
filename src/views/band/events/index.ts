import Domain from '../../../models/domain'
import Event from '../../../models/event'
import createElement from '../../../utils/create-element'
import Band from '../index'
import addTop from '../../../utils/add-top'
import props from '../../../models/props'
import Segment from './segment'
import { findClosestRulerDate } from '../rulers'

export default class EventsBand extends Band {
	private eventsWrap
	private topAdder: (e: Event) => Event
	private segments: Segment[]

	constructor(domain: Domain, private events) {
		super(domain)

		this.topAdder = addTop(domain)

		this.events = events
			.map(e => new Event(e, domain))
			.sort((a, b) => a.date.getTime() - b.date.getTime())

		this.segments = this.createSegments()
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

		this.segments.forEach(s => bandWrap.appendChild(s.render()))
		this.renderChildren()

		bandWrap.appendChild(this.eventsWrap)

		return bandWrap
	}

	protected renderChildren() {
		const index = Math.floor(this.segments.length * props.center)
		for (let i = 0; i < this.segments.length; i++) {
			const seg = this.segments[i]

			if (i > index - 2 && i < index + 2) {
				if (seg.rendered) seg.show()
				else seg.renderEvents()
			} else {
				seg.hide()
			}
		}
	}

	private createSegments() {
		const segments = [] 
		const segmentCount = Math.ceil(1 / this.domain.visibleRatio)

		for (let i = 0; i < segmentCount; i++) {
			const ratioFrom = this.domain.visibleRatio * i
			const ratioTo = ratioFrom + this.domain.visibleRatio
			const from = this.domain.dateAtProportion(ratioFrom)
			const to = this.domain.dateAtProportion(ratioTo)

			const rulerDates = []
			let date = findClosestRulerDate(from, this.domain.granularity)
			while(date.getTime() < to.getTime()) {
				rulerDates.push(date)
				date = this.domain.nextDate(date)
			}

			const outOfBoundsIndex = this.events.findIndex(e => e.date.getTime() > to.getTime())
			let events = this.events.slice(0, outOfBoundsIndex)
			this.events = this.events.slice(outOfBoundsIndex)
			if (i === segmentCount - 1) events = events.concat(this.events)
			
			segments.push(new Segment(
				events,
				rulerDates,
				i * props.viewportWidth,
				this.topAdder,
				this.domain
			))
		}

		return segments
	}
}