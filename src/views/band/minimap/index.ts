import Domain from '../../../models/domain'
import createElement from '../../../utils/create-element'
import props from '../../../models/props'
import DomainEvent, { RawEv3nt } from '../../../models/event'
import { DATE_BAR_HEIGHT, CENTER_CHANGE_DONE } from '../../../constants';
import eventBus from '../../../event-bus';

const onVisible = (from, to) => (e: RawEv3nt) => {
	const eventFrom = e.date_min || e.date
	let eventTo = e.end_date_max || e.end_date
	if (eventTo == null) eventTo = eventFrom
	if (eventFrom == null && eventTo == null) return false
	return !(eventTo < from || eventFrom > to)
}

/**
 * The MiniMap is an abstract representation of the events on a band.
 * It gives an overview of densely (and scarcely) populated areas
 */
export default class MiniMap {
	private canvas: HTMLCanvasElement
	private context: CanvasRenderingContext2D
	private maxHeight: number
	private eventHeight: number

	constructor(private domain: Domain) {
		this.maxHeight = this.domain.height - DATE_BAR_HEIGHT
		this.eventHeight = this.maxHeight / props.config.rowCount
		if (this.eventHeight < 1) this.eventHeight = 1
		if (this.domain.config.visibleRatio < 1) {
			eventBus.register(CENTER_CHANGE_DONE, this.drawEvents)
		}
	}

	render() {
		this.canvas = createElement('canvas', 'minimap', [
			'position: absolute',
		])

		this.canvas.width = props.viewportWidth
		this.canvas.height = this.domain.height
		this.context = this.canvas.getContext('2d')
		this.context.fillStyle = 'rgba(180, 180, 255, 1)'

		this.drawEvents()

		return this.canvas
	}

	private drawEvents = () => {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

		const left = this.domain.positionAtDate(this.domain.fromTo[0])
		this.canvas.style.left = `${left}px`

		const [from, to] = this.domain.fromTo
		const visibleEvents = props.config.events.filter(onVisible(from, to))
		for (let i = 0; i < visibleEvents.length; i++) {
			const event = new DomainEvent(visibleEvents[i], this.domain)
			const y = this.maxHeight - ((event.row + 1) * this.eventHeight)
			const width = event.width < 1 ? 1 : event.width
			this.context.fillRect(event.left - left, y, width, this.eventHeight)
		}

	}
}