import createElement from '../../../utils/create-element'
import props from '../../../models/props'
import EventSegment from './event-segment'
import RulerSegment from './ruler-segment'
import Domain from '../../../models/domain'
import segmentsWorker from '../../../utils/segments.worker'
import { DATE_BAR_HEIGHT } from '../../../constants';

export default class Events {
	private eventSegments: EventSegment[] = []
	private rulerSegments: RulerSegment[] = []

	constructor(private domain: Domain) {}

	render() {
		const eventsBand = createElement('div', 'events-band')

		const rulerSegmentsWrap = createElement(
			'div',
			'ruler-segments',
			[
				`bottom: ${DATE_BAR_HEIGHT}px`,
				'position: absolute',
			],
			[
				`height: ${this.domain.height}px`,
			]
		)

		const eventSegmentsWrap = createElement(
			'div',
			'event-segments',
			[
				`bottom: ${DATE_BAR_HEIGHT}px`,
				'position: absolute',
			],
			[
				`height: ${this.domain.height}px`,
			]
		)

		segmentsWorker(
			{
				events: props.events,
				center: props.center,
				visibleRatio: this.domain.config.visibleRatio,
				from: new Date(props.from).getTime(),
				time: props.time
			},
			(segments) => {
				segments.forEach(s => {
					const eventSegment = new EventSegment(this.domain, s)
					this.eventSegments.push(eventSegment)
					eventSegmentsWrap.appendChild(eventSegment.render())

					const rulerSegment = new RulerSegment(this.domain, s)
					this.rulerSegments.push(rulerSegment)
					rulerSegmentsWrap.appendChild(rulerSegment.render())
				})
				this.renderChildren()

				eventsBand.appendChild(eventSegmentsWrap)
				eventsBand.appendChild(rulerSegmentsWrap)
			}
		)

		return eventsBand
	}

	renderChildren() {
		// Find the index of the visible segment, which is located at props.center
		let index = Math.floor((this.eventSegments.length - 1) * props.center)

		// Render the visible segment first
		this.eventSegments[index].renderChildren()
		this.rulerSegments[index].renderChildren()

		// Render the subsequent segments
		for (let i = index - 2; i <= index + 2; i++) {
			const eventSegment = this.eventSegments[i]
			const rulerSegment = this.rulerSegments[i]
			if (i >= 0 && i < this.eventSegments.length) {
				if (i !== index) {
					eventSegment.renderChildren()
					rulerSegment.renderChildren()
				}
			} 
		}
	}
}