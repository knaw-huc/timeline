import Domain from '../../../models/domain'
import createElement from '../../../utils/create-element'
import props from '../../../models/props'
import DomainEvent, { RawEv3nt } from '../../../models/event'
import { DATE_BAR_HEIGHT, CENTER_CHANGE } from '../../../constants'
import eventBus from '../../../event-bus'
import { findClosestRulerDate } from '../rulers'
import { labelBody } from '../rulers/ruler'

export const onVisible = (from, to) => (e: RawEv3nt) => {
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
	private ctx: CanvasRenderingContext2D
	private maxHeight: number
	private eventHeight: number

	constructor(private domain: Domain) {
		if (this.domain.config.type === 'minimap') {
			this.maxHeight = this.domain.height - DATE_BAR_HEIGHT
			const rowCounts = this.domain.config.targets.map(index => props.domains[index].config.orderedEvents.rowCount)
			this.eventHeight = this.maxHeight / Math.max(...rowCounts)
			if (this.eventHeight < 1) this.eventHeight = 1
		}

		if (this.domain.config.visibleRatio < 1) {
			eventBus.register(CENTER_CHANGE, this.drawEvents)
		}
	}

	render() {
		this.canvas = createElement('canvas', 'minimap', [
			'position: absolute',
		], [
			`top: ${this.domain.config.topOffsetRatio * 100}%`
		])

		this.canvas.width = props.viewportWidth
		this.canvas.height = this.domain.height
		this.ctx = this.canvas.getContext('2d')

		this.drawEvents()

		return this.canvas
	}

	private drawEvents = () => {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

		const [from, to] = this.domain.fromTo
		const left = this.domain.positionAtDate(from)

		this.ctx.beginPath()

		if (this.domain.config.type === 'minimap') {
			this.domain.config.targets.forEach(targetIndex => {
				const targetDomain = props.domains[targetIndex]
				const { events } = targetDomain.config.orderedEvents
				this.ctx.fillStyle = targetDomain.color(.5)

				const visibleEvents = events.filter(onVisible(from, to))
				for (let i = 0; i < visibleEvents.length; i++) {
					const event = new DomainEvent(visibleEvents[i], this.domain)
					const y = this.maxHeight - ((event.row + 1) * this.eventHeight)
					const width = event.width < 1 ? 1 : event.width
					this.ctx.fillRect(event.left - left, y, width, this.eventHeight)
				}
			})
		}

		this.ctx.strokeStyle = `rgb(200, 200, 200)`
		this.ctx.fillStyle = `rgb(150, 150, 150)`
		let date = findClosestRulerDate(from, this.domain.granularity)
		while(date < to) {
			const left = this.domain.positionAtDate(date) + this.domain.left
			this.ctx.moveTo(left, 0)
			this.ctx.lineTo(left, this.domain.height)
			this.ctx.fillText(labelBody(date, this.domain.granularity), left + 3, this.domain.height - 3)
			date = this.domain.nextDate(date)
		}

		this.ctx.stroke()

		this.ctx.closePath()
	}
}
