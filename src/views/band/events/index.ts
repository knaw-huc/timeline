import createElement from '../../../utils/create-element'
import props from '../../../models/props'
import Segment from './segment'
import Domain from '../../../models/domain'
import segmentsWorker from '../../../utils/segments.worker'
import { findClosestRulerDate } from '../rulers';
import Ruler from '../rulers/ruler';
import { DATE_BAR_HEIGHT, EVENT_ROW_HEIGHT } from '../../../constants';

export default class Events {
	private segments: Segment[]

	constructor(private domain: Domain) {}

	render() {
		const eventsBand = createElement('div', 'events-band')

		const segmentsWrap = createElement(
			'div',
			'segments',
			[
				`bottom: ${DATE_BAR_HEIGHT}px`,
				`height: ${(props.rowCount * EVENT_ROW_HEIGHT) + DATE_BAR_HEIGHT}px`,
				'position: absolute',
				'width: 100%',
			],
			[
				`height: ${this.domain.height}px`,
			]
		)

		segmentsWorker(
			{
				events: props.intervals.concat(props.pointsInTime),
				center: props.center,
				visibleRatio: this.domain.config.visibleRatio,
				from: new Date(props.from).getTime(),
				time: props.time
			},
			(segments) => {
				this.segments = segments.map(s => {
					const segment = new Segment(this.domain, s)
					segmentsWrap.appendChild(segment.render())
					return segment
				})
				this.renderChildren()
				eventsBand.appendChild(segmentsWrap)
			}
		)

		// TODO lazy load rulers
		// eventsBand.appendChild(this.renderRulers())

		return eventsBand
	}

	renderChildren() {
		// Find the index of the visible segment, which is located at props.center
		let index = Math.floor((this.segments.length - 1) * props.center)

		// Render the visible segment first
		this.segments[index].renderChildren()

		// Render the subsequent segments
		for (let i = index - 2; i <= index + 2; i++) {
			const segment = this.segments[i]
			if (i >= 0 && i < this.segments.length) {
				if (i !== index) segment.renderChildren()
				// this.renderRulers(segment)
			} 
		}
	}

	private renderRulers = () => {
		const rulers = createElement(
			'div',
			'rulers',
			[
				'width: 100%',
			],
			[
				`height: ${this.domain.height}px`,
			]
		)

		let date = findClosestRulerDate(new Date(props.from), this.domain.granularity)
		const to = props.to
		while(date.getTime() < to) {
			rulers.appendChild(new Ruler(date, this.domain).render())
			date = this.domain.nextDate(date)
		}
		
		return rulers
	}
}