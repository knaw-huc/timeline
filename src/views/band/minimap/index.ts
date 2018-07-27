import createElement from '../../../utils/create-element'
import props from '../../../models/props'
import { DATE_BAR_HEIGHT, Pixels, EVENT_HEIGHT } from '../../../constants'
import Animatable from '../../animatable'
import { findClosestRulerDate, onVisible } from '../../../utils'
import { labelBody } from '../../../utils/dates'
import MinimapBand from '../../../models/band/minimap'
import { DomainConfig, MinimapDomainConfig, EventsDomainConfig } from '../../../models/config'
import Band from '../../../models/band'

/**
 * The MiniMap is an abstract representation of the events on a band.
 * It gives an overview of densely (and scarcely) populated areas
 */
export default class MiniMap extends Animatable {
	private readonly font: string = "10px sans-serif"
	private canvas: HTMLCanvasElement
	private ctx: CanvasRenderingContext2D

	constructor() {
		super() 
		this.register()
	}

	render() {
		this.canvas = createElement('canvas', 'minimap', [
			'position: absolute',
		])

		this.canvas.width = props.viewportWidth
		this.canvas.height = props.viewportHeight
		this.ctx = this.canvas.getContext('2d')
		this.ctx.font = this.font

		this.update()

		return this.canvas
	}

	update = () => {
		// TODO Clear rect only the bands where zoomLevel > 0
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

		this.ctx.beginPath()

		props.eventsBand.domains.forEach(domain => {
			if (domain.rulers) this.drawRulers(props.eventsBand, domain)
		})

		props.minimapBands.forEach(band => {
			band.domains.forEach(domain => {
				this.drawMinimap(band, domain)
				if (domain.rulers) this.drawRulers(band, domain)
				this.drawIndicators(band, domain)
			})
		})

		this.ctx.closePath()

		props.eventsBand.domains.forEach(domain => {
			this.drawEvents(domain)
		})
	}

	private drawEvents(domain: EventsDomainConfig) {
		const band = props.eventsBand
		const left = band.positionAtTimestamp(band.from)
		const { events } = domain.orderedEvents
		const visibleEvents = events.filter(onVisible(band.from, props.eventsBand.to))
		const offsetY = domain.topOffsetRatio * props.viewportHeight
		const domainHeight = (domain.heightRatio * props.viewportHeight) - DATE_BAR_HEIGHT

		for (const event of visibleEvents) {
			const eventWidth = Math.round(event.time * band.pixelsPerMillisecond)
			let eventLeft = band.positionAtTimestamp(event.date_min != null ? event.date_min : event.date) - left
			const y = offsetY + domainHeight - ((event.row + 1) * (EVENT_HEIGHT + 2))
			let width = eventWidth < 1 ? 1 : eventWidth

			this.ctx.fillStyle = `rgba(126, 0, 0, .3)`
			if (event.end_date == null) {
				this.ctx.beginPath()
				this.ctx.arc(eventLeft - EVENT_HEIGHT/2, y + EVENT_HEIGHT/2, EVENT_HEIGHT/2, 0, 2 * Math.PI)
				this.ctx.fill()
				this.ctx.closePath()
			} else {
				this.ctx.fillRect(eventLeft, y, width, EVENT_HEIGHT)
			}

			if (eventLeft < 0) {
				width = width + eventLeft
				eventLeft = 0
			}
			if (this.ctx.measureText(event.label).width + 10 < width) {
				this.ctx.fillStyle = `rgb(126, 0, 0)`
				this.ctx.fillText(event.label, eventLeft + 3, y + EVENT_HEIGHT - 3)
			}
		}
	}

	private drawMinimap(band: MinimapBand, domain: MinimapDomainConfig) {
		const maxHeight: Pixels = band.height - DATE_BAR_HEIGHT
		const maxRowCount = band.domains.reduce((prev, curr) => {
			const counts = curr.targets.map(index => props.eventsBand.domains[index].orderedEvents.rowCount)
			return Math.max(prev, ...counts)
		}, 0)
		let eventHeight: Pixels = maxHeight / maxRowCount

		// If the events have a height less than 1, this means the minimap will be higher than the available
		// height (maxHeight). To fix this, the minimap is rendered on an invisible canvas and drawn (scaled)
		// on the visible canvas
		if (eventHeight < 1) {
			eventHeight = 1
			const canvas = createElement('canvas')
			canvas.width = props.viewportWidth
			canvas.height = maxRowCount
			const ctx = canvas.getContext('2d')
			drawEvents(ctx, maxRowCount, 0)
			this.ctx.drawImage(canvas, 0, band.top, props.viewportWidth, maxHeight)
		} else {
			eventHeight = Math.round(eventHeight)
			drawEvents(this.ctx, maxHeight)
		}

		function drawEvents(ctx: CanvasRenderingContext2D, height, offsetY = band.top) {
			const left = band.positionAtTimestamp(band.from)
			ctx.fillStyle = `rgba(0, 0, 0, .2)`

			domain.targets.forEach(targetIndex => {
				const targetDomain = props.eventsBand.domains[targetIndex]
				// this.ctx.fillStyle = targetDomain.color(.5)

				const { events } = targetDomain.orderedEvents
				const visibleEvents = events.filter(onVisible(band.from, band.to))

				for (const event of visibleEvents) {
					const eventWidth = Math.round(event.time * band.pixelsPerMillisecond)
					const eventLeft = band.positionAtTimestamp(event.date_min != null ? event.date_min : event.date)
					const y = offsetY + height - ((event.row + 1) * eventHeight)
					const width = eventWidth < 1 ? 1 : eventWidth
					ctx.fillRect(eventLeft - left, y, width, eventHeight)
				}
			})
		}
	}

	private drawIndicators(band: MinimapBand, domain: MinimapDomainConfig) {
		this.ctx.fillStyle = `rgba(0, 0, 0, .1)`

		// Left indicator
		const indicatorTOP = Math.round(domain.topOffsetRatio * props.viewportHeight)
		const leftIndicatorRightX = band.positionAtTimestamp(props.eventsBand.from) + band.left
		this.ctx.fillRect(0, indicatorTOP, leftIndicatorRightX, band.height)

		// Right indicator
		const rightIndicatorLeftX = band.positionAtTimestamp(props.eventsBand.to) + band.left
		this.ctx.fillRect(rightIndicatorLeftX, indicatorTOP, props.viewportWidth, band.height)

		// Cover the DATE_BAR
		this.ctx.fillRect(leftIndicatorRightX, indicatorTOP + band.height - DATE_BAR_HEIGHT, rightIndicatorLeftX - leftIndicatorRightX, DATE_BAR_HEIGHT)
	}

	private drawRulers(band: Band, domain: DomainConfig) {
		this.ctx.strokeStyle = `rgb(200, 200, 200)`
		this.ctx.fillStyle = `rgb(150, 150, 150)`
		let date = findClosestRulerDate(band.from, band.granularity)
		const y = domain.topOffsetRatio * props.viewportHeight
		const height = domain.heightRatio * props.viewportHeight
		while(date < band.to) {
			const left = band.positionAtTimestamp(date) + band.left
			this.ctx.moveTo(left, y)
			this.ctx.lineTo(left, y + height)
			this.ctx.fillText(labelBody(date, band.granularity), left + 3, y + height - 3)
			date = band.nextDate(date)
		}
		this.ctx.stroke()
	}
}
