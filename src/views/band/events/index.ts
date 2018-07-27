// import createElement from '../../../utils/create-element'
// import props from '../../../models/props'
// import EventSegment from './event-segment'
// import segmentsWorker from '../../../utils/segments.worker'
// import { DATE_BAR_HEIGHT } from '../../../constants'
// import Animatable from '../../animatable';
// import EventsBand from '../../../models/band/events'

// export default class Events extends Animatable {
// 	private eventSegments: EventSegment[] = []

// 	constructor(private band: EventsBand) {
// 		super()
// 		this.register()
// 	}

// 	render() {
// 		const eventsBand = createElement('div', 'events-band')

// 		const eventSegmentsWrap = createElement(
// 			'ul',
// 			'events',
// 			[
// 				`bottom: ${DATE_BAR_HEIGHT}px`,
// 				`list-style: none`,
// 				'position: absolute',
// 			],
// 			[
// 				`height: ${this.band.height}px`,
// 			]
// 		)

// 		// TODO Move to server if there is a server. Use config.orderedEvents
// 		segmentsWorker(
// 			{
// 				events: this.band.config.orderedEvents.events,
// 				center: props.center,
// 				visibleRatio: this.band.visibleRatio,
// 				from: new Date(props.from).getTime(),
// 				time: props.time
// 			},
// 			(segments) => {
// 				segments.forEach(s => {
// 					const eventSegment = new EventSegment(this.band, s, eventSegmentsWrap)
// 					this.eventSegments.push(eventSegment)
// 				})
// 				this.update()

// 				eventsBand.appendChild(eventSegmentsWrap)
// 			}
// 		)

// 		return eventsBand
// 	}

// 	update = () => {
// 		// Find the index of the visible segment, which is located at props.center
// 		let index = Math.floor((this.eventSegments.length - 1) * props.center)

// 		// Render the visible segment first
// 		this.eventSegments[index].renderChildren()

// 		// Render the subsequent segments
// 		for (let i = index - 2; i <= index + 2; i++) {
// 			const eventSegment = this.eventSegments[i]
// 			if (i >= 0 && i < this.eventSegments.length) {
// 				if (i !== index) eventSegment.renderChildren()
// 			} 
// 		}
// 	}
// }