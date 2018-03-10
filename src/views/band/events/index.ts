import Ev3nt from '../../../models/event'
import createElement from '../../../utils/create-element'
import props from '../../../models/props'
import Segment from './segment'
import Domain from '../../../models/domain'

export default class Events {
	private segments: Segment[]

	constructor(private domain: Domain, private events: Ev3nt[]) {
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

			// Find the next 'out of bounds' index
			let upperIndex = this.events.findIndex(e => e.date.getTime() > to.getTime())

			// Create a new variable for the upperIndex, because when there are no
			// events in the current segment, the upperIndex should be set to -1, but
			// the upperIndex value should not be forgotten.
			let tmpUpperIndex = (lowerIndex > upperIndex) ? -1 : upperIndex--

			// If it's the last cycle, include the last events in the last segment.
			// They are excluded because of the `<` sign.
			if (i === segmentCount - 1) tmpUpperIndex = this.events.length - 1 
			
			segments.push(new Segment(
				this.domain,
				this.events,
				from,
				to,
				lowerIndex,
				tmpUpperIndex,
				i * props.viewportWidth
			))

			lowerIndex = upperIndex + 1
		}

		return segments
	}
}