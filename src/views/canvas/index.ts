import createElement from '../../utils/create-element'
import props from '../../models/props'
import { DATE_BAR_HEIGHT, Pixels, EVENT_HEIGHT, PIXELS_PER_LETTER } from '../../constants'
import { findClosestRulerDate } from '../../utils'
import { labelBody } from '../../utils/dates'
import MinimapBand from '../../models/band/minimap'
import { MinimapDomainConfig } from '../../models/config'
import animator from '../../animator'
import EventsBand from '../../models/band/events'
import View from '../index'

/**
 * The MiniMap is an abstract representation of the events on a band.
 * It gives an overview of densely (and scarcely) populated areas
 */
export default class Canvas implements View {
	private readonly font: string = "10px sans-serif"
	private canvas: HTMLCanvasElement
	private ctx: CanvasRenderingContext2D

	private offsiteCanvas: HTMLCanvasElement = createElement('canvas')
	private offsiteCtx: CanvasRenderingContext2D

	private indicatorsCanvas: HTMLCanvasElement
	private indicatorsCtx: CanvasRenderingContext2D

	constructor() {
		animator.registerView(this)
		this.offsiteCtx = this.offsiteCanvas.getContext('2d')
	}

	render() {
		this.canvas = createElement('canvas', 'minimap', [
			'position: absolute',
		])

		this.canvas.width = props.viewportWidth
		this.canvas.height = props.viewportHeight
		this.ctx = this.canvas.getContext('2d')
		this.ctx.font = this.font

		this.indicatorsCanvas = createElement('canvas', 'minimap', [
			'position: absolute',
		], [ 'z-index: 1' ])

		this.indicatorsCanvas.width = props.viewportWidth
		this.indicatorsCanvas.height = props.viewportHeight
		this.indicatorsCtx = this.indicatorsCanvas.getContext('2d')

		this.update()

		this.drawStaticMinimapBands()

		return [this.canvas, this.indicatorsCanvas]
	}

	private drawStaticMinimapBands() {
		props.minimapBands
			.filter(band => band.zoomLevel === 0)
			.forEach(band => {
				band.domains.forEach(domain => {
					this.drawMinimap(band, domain)
				})

				this.drawRulers(band)
			})

	}

	// Clear the canvas active parts
	private clear = () => {
		// Clear the events band
		this.ctx.clearRect(props.eventsBand.top, 0, this.canvas.width, props.eventsBand.height)

		// Clear the minimap bands which are not totally zoomed out.
		// If zoom level is 0, the band cannot move (it is completely visible),
		// so it does not have to be recalculated and updated
		props.minimapBands
			.filter(band => band.zoomLevel !== 0)
			.forEach(band => this.ctx.clearRect(0, band.top, this.canvas.width, band.height))
	}

	update = () => {
		if (this.canvas.width !== props.viewportWidth || this.canvas.height !== props.viewportHeight) {
			this.canvas.width = props.viewportWidth
			this.canvas.height = props.viewportHeight
			this.indicatorsCanvas.width = props.viewportWidth
			this.indicatorsCanvas.height = props.viewportHeight
			
			this.drawStaticMinimapBands()
		}

		this.clear()

		this.drawRulers(props.eventsBand)

		this.drawEvents()
		this.drawEventsText()

		props.minimapBands
			.filter(band => band.zoomLevel !== 0)
			.forEach(band => {
				band.domains.forEach(domain => {
					this.drawMinimap(band, domain)
				})

				this.drawRulers(band)
			})

		this.drawIndicators()
	}

	private drawEvents() {
		this.ctx.beginPath()

		for (const domain of props.eventsBand.domains) {
			for (const event of domain.orderedEvents.events) {
				if (event.from > props.eventsBand.to || event.to < props.eventsBand.from) continue

				if (!event.time) {
					this.ctx.moveTo(event.left, event.top + EVENT_HEIGHT/2)
					this.ctx.arc(event.left, event.top + EVENT_HEIGHT/2, EVENT_HEIGHT/3, 0, 2 * Math.PI)
				} else {
					this.ctx.rect(event.left, event.top, event.width, EVENT_HEIGHT)
				}
			}
		}

		this.ctx.fillStyle = `rgba(126, 0, 0, .3)`
		this.ctx.fill()
	}

	private drawEventsText() {
		this.ctx.fillStyle = `rgb(126, 0, 0)`
		for (const domain of props.eventsBand.domains) {
			for (const event of domain.orderedEvents.events) {
				if (event.from > props.eventsBand.to || event.to < props.eventsBand.from) continue

				let eventWidth = event.time === 0 ? event.padding : event.width
				let eventLeft = event.left

				if (event.left < 0 && event.time !== 0) {
					eventWidth = event.width + event.left
					eventLeft = 0
				}

				let eventLabelLength = event.label.length * PIXELS_PER_LETTER
				if (eventLabelLength <= eventWidth) {
					const paddingLeft = event.time ? 3 : 8
					this.ctx.fillText(event.label, eventLeft + paddingLeft, event.top + EVENT_HEIGHT - 3)
				}
			}
		}
	}

	private drawMinimap(band: MinimapBand, domain: MinimapDomainConfig) {
		const maxHeight: Pixels = band.height - DATE_BAR_HEIGHT
		const maxRowCount = band.domains.reduce((prev, curr) => {
			const counts = curr.targets.map(index => props.eventsBand.domains[index].orderedEvents.row_count)
			return Math.max(prev, ...counts)
		}, 0)
		let eventHeight: Pixels = maxHeight / maxRowCount

		// If the events have a height less than 1, this means the minimap will be higher than the available
		// height (maxHeight). To fix this, the minimap is rendered on an invisible canvas and drawn (scaled)
		// on the visible canvas
		if (eventHeight < 1) {
			eventHeight = 1
			this.offsiteCanvas.width = props.viewportWidth
			this.offsiteCanvas.height = maxRowCount
			drawEvents(this.offsiteCtx, maxRowCount, 0)
			this.ctx.drawImage(this.offsiteCanvas, 0, band.top, props.viewportWidth, maxHeight)
		} else {
			eventHeight = Math.round(eventHeight)
			drawEvents(this.ctx, maxHeight)
		}

		function drawEvents(ctx: CanvasRenderingContext2D, height, offsetY = band.top) {
			ctx.beginPath()
			const left = band.positionAtTimestamp(band.from)

			domain.targets.forEach(targetIndex => {
				const targetDomain = props.eventsBand.domains[targetIndex]

				for (const event of targetDomain.orderedEvents.events) {
					if (event.from > band.to || event.to < band.from) continue
					const eventWidth = Math.round(event.time * band.pixelsPerMillisecond)
					const eventLeft = band.positionAtTimestamp(event.date_min != null ? event.date_min : event.date)
					const y = offsetY + height - ((event.row + 1) * eventHeight)
					const width = eventWidth < 1 ? 1 : eventWidth
					ctx.rect(eventLeft - left, y, width, eventHeight)
				}
			})

			ctx.fillStyle = `rgba(0, 0, 0, .2)`
			ctx.fill()
		}
	}

	private drawIndicators() {
		this.indicatorsCtx.clearRect(0, 0, props.viewportWidth, props.viewportHeight)

		this.indicatorsCtx.beginPath()

		props.minimapBands.forEach(band => {
			band.domains.forEach(domain => {
				// Left indicator
				const indicatorTOP = Math.round(domain.topOffsetRatio * props.viewportHeight)
				const leftIndicatorRightX = band.positionAtTimestamp(props.eventsBand.from) + band.left
				this.indicatorsCtx.rect(0, indicatorTOP, leftIndicatorRightX, band.height)

				// Right indicator
				const rightIndicatorLeftX = band.positionAtTimestamp(props.eventsBand.to) + band.left
				this.indicatorsCtx.rect(rightIndicatorLeftX, indicatorTOP, props.viewportWidth, band.height)

				// Cover the DATE_BAR
				this.indicatorsCtx.rect(leftIndicatorRightX, indicatorTOP + band.height - DATE_BAR_HEIGHT, rightIndicatorLeftX - leftIndicatorRightX, DATE_BAR_HEIGHT)
			})
		})

		this.indicatorsCtx.fillStyle = `rgba(0, 0, 0, .1)`
		this.indicatorsCtx.fill()

		// Draw red center line
		this.indicatorsCtx.fillStyle = `rgba(255, 0, 0, .5)`
		const x = props.eventsBand.positionAtTimestamp(props.eventsBand.timestampAtProportion(props.center)) + props.eventsBand.left
		this.indicatorsCtx.fillRect(x - 1, 0, 2, props.viewportHeight)

		this.indicatorsCtx.closePath()
	}

	private drawRulers(band: MinimapBand | EventsBand) {
		this.ctx.beginPath()
		this.ctx.fillStyle = `rgb(150, 150, 150)`

		for (const domain of band.domains) {
			if (!domain.rulers) continue

			let date = findClosestRulerDate(band.from, band.granularity)
			const y = domain.topOffsetRatio * props.viewportHeight
			const height = domain.heightRatio * props.viewportHeight

			while(date < band.to) {
				const left = band.positionAtTimestamp(date) + band.left
				this.ctx.moveTo(left, y)
				this.ctx.lineTo(left, y + height)
				if (domain.rulerLabels) this.ctx.fillText(labelBody(date, band.granularity), left + 3, y + height - 3)
				date = band.nextDate(date)
			}
		}

		this.ctx.strokeStyle = `rgb(200, 200, 200)`
		this.ctx.stroke()
	}
}
