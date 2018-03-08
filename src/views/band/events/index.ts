import Ev3nt from '../../../models/event'
import createElement from '../../../utils/create-element'
import addTop from '../../../utils/add-top'
import props from '../../../models/props'
import Segment from './segment'
import Domain from '../../../models/domain'

export default class Events {
	private topAdder: (e: Ev3nt) => Ev3nt
	private segments: Segment[]

	constructor(private domain: Domain, private events: Ev3nt[]) {
		this.topAdder = addTop(domain)

		this.segments = this.createSegments()
	}

	public render() {
		const segmentsWrap = createElement(
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

		this.segments.forEach(s => segmentsWrap.appendChild(s.render()))
		this.renderChildren()

		return segmentsWrap
	}

	public renderChildren() {
		const index = Math.floor(this.segments.length * props.center)
		for (let i = 0; i < this.segments.length; i++) {
			const seg = this.segments[i]

			if (i > index - 2 && i < index + 2) {
				if (seg.rendered) seg.show()
				else seg.renderChildren()
			} else {
				seg.hide()
			}
		}
	}

	private createSegments(): Segment[] {
		const segments = [] 
		const segmentCount = Math.ceil(1 / this.domain.config.visibleRatio)

		let lowerIndex = 0 
		for (let i = 0; i < segmentCount; i++) {
			const ratioFrom = this.domain.config.visibleRatio * i
			const ratioTo = ratioFrom + this.domain.config.visibleRatio
			const from = this.domain.dateAtProportion(ratioFrom)
			const to = this.domain.dateAtProportion(ratioTo)

			const toTime = to.getTime()
			let upperIndex = this.events.findIndex(e => e.date.getTime() > toTime)
			const tmpUpperIndex = (lowerIndex > upperIndex) ? -1 : upperIndex--

			if (i === segmentCount - 1) upperIndex = this.events.length - 1
			
			segments.push(new Segment(
				this.domain,
				from,
				to,
				lowerIndex,
				tmpUpperIndex,
				i * props.viewportWidth,
				this.topAdder,
				this.events
			))

			lowerIndex = upperIndex + 1
		}

		return segments
	}
}