import createElement from '../../utils/create-element'
import props from '../../models/props'
import { EVENT_HEIGHT, ZOOM_DONE, SCROLL_DONE, FONT_SIZE, IMAGE_BOUNDING_BOX, IMAGE_SIZE, IMAGE_BORDER_SIZE } from '../../constants'
import MinimapBand from '../../models/band/minimap'
import animator from '../../animator'
import EventsBand from '../../models/band/events'
import View from '../index'
import drawRulers from './rulers'
import eventBus from '../../event-bus'
import { RawEv3nt } from '../../index'

/**
 * The MiniMap is an abstract representation of the events on a band.
 * It gives an overview of densely (and scarcely) populated areas
 */
export default class Canvas implements View {
	private canvas: HTMLCanvasElement
	private ctx: CanvasRenderingContext2D

	private indicatorsCanvas: HTMLCanvasElement
	private indicatorsCtx: CanvasRenderingContext2D
	private indicatorsDrawn: boolean = false

	constructor() {
		animator.registerView(this)

		eventBus.register(ZOOM_DONE, this.onAnimationDone)
		eventBus.register(SCROLL_DONE, this.onAnimationDone)
	}

	private async updateImages() {
		for (const band of props.eventsBands) {
			for (const event of band.visibleEvents) {
				if (event.has_image == null) continue
				if (event.image == null) {
					const path = `${props.imagePath}/${event.wikidata_identifier}__${IMAGE_SIZE}.${event.has_image}`
					event.image = new Image()
					const onLoad = this.onLoad(event)
					event.image.addEventListener('load', onLoad)
					event.image.addEventListener('error', onLoad)
					event.image.src = path
				} else {
					this.drawImage(event)
				}
			}
		}
	}

	private onLoad = (event: RawEv3nt) => {
		const callback = (ev: Event) => {
			event.image.removeEventListener('load', callback)
			event.image.removeEventListener('error', callback)

			if (ev.type === 'error') {
				event.image = null
				return
			}

			if (event.image.width > event.image.height) {
				// First set the height, so we can use the old width
				event.image.height = Math.round(event.image.height * (IMAGE_BOUNDING_BOX / event.image.width))
				event.image.width = IMAGE_BOUNDING_BOX
			} else {
				// First set the width, so we can use the old height
				event.image.width = Math.round(event.image.width * (IMAGE_BOUNDING_BOX / event.image.height))
				event.image.height = IMAGE_BOUNDING_BOX
			}

			this.drawImage(event)
		}

		return callback
	}

	// Border uses fillRect instead of strokeRect, because strokeRect gives a different color. Don't ask me why.
	private drawImage(event: RawEv3nt) {
		const x = event.time ? event.left : event.left - (event.image.width / 2) - IMAGE_BORDER_SIZE
		const y = event.top - event.image.height

		this.ctx.fillStyle = event.color
		this.ctx.fillRect(x, y - IMAGE_BORDER_SIZE * 2, event.image.width + IMAGE_BORDER_SIZE * 2, event.image.height + IMAGE_BORDER_SIZE * 2)
		this.ctx.drawImage(event.image, x + IMAGE_BORDER_SIZE, y - IMAGE_BORDER_SIZE, event.image.width, event.image.height)
	}

	private onAnimationDone = () => {
		// this.updateImages()
	}

	render() {
		this.canvas = createElement('canvas', 'main', [
			'position: absolute',
		])

		this.canvas.width = props.viewportWidth
		this.canvas.height = props.viewportHeight
		this.ctx = this.canvas.getContext('2d')

		this.indicatorsCanvas = createElement('canvas', 'indicators', [
			'position: absolute',
		], [ 'z-index: 1' ])

		this.indicatorsCanvas.width = props.viewportWidth
		this.indicatorsCanvas.height = props.viewportHeight
		this.indicatorsCtx = this.indicatorsCanvas.getContext('2d')

		this.update()

		return [this.canvas, this.indicatorsCanvas]
	}

	resize() {
		this.indicatorsCanvas.width = props.viewportWidth
		this.indicatorsCanvas.height = props.viewportHeight

		this.canvas.width = props.viewportWidth
		this.canvas.height = props.viewportHeight

		this.indicatorsDrawn = false
	}

	private clear(band: MinimapBand | EventsBand) {
		this.ctx.clearRect(0, band.top, this.canvas.width, band.visibleHeight)
	}

	update = () => {
		for (const band of props.eventsBands) {
			this.drawEventsBand(band)
		}

		for (const band of props.minimapBands) {
			this.drawMinimapBand(band)
		}

		this.drawIndicators()
		this.updateImages()
	}

	private drawEventsBand(band: EventsBand) {
		this.clear(band)
		drawRulers(this.ctx, band)

		for (const event of band.visibleEvents) {
			// If point in time, draw circle
			if (!event.time) {
				this.ctx.moveTo(event.left, event.top + EVENT_HEIGHT/2)
				this.ctx.beginPath()
				this.ctx.arc(event.left, event.top + EVENT_HEIGHT/2, EVENT_HEIGHT/3, 0, 2 * Math.PI)
				this.ctx.fillStyle = event.color
				this.ctx.fill()
			
			// Else if interval, draw rectangle
			} else {
				let left = event.left
				let width = event.width

				if (event.width_uncertain_from > 1) {
					const gradient = this.ctx.createLinearGradient(event.left, 0, event.left + event.width_uncertain_from, 0)
					gradient.addColorStop(0, 'white')
					gradient.addColorStop(1, event.color)
					this.ctx.fillStyle = gradient
					this.ctx.fillRect(event.left, event.top, event.width_uncertain_from, EVENT_HEIGHT)

					left = event.left + event.width_uncertain_from
					width -= event.width_uncertain_from
				}

				if (event.width_uncertain_to > 1) {
					width -= event.width_uncertain_to

					const gradientLeft = left + width
					const gradientWidth = gradientLeft + event.width_uncertain_to
					const gradient = this.ctx.createLinearGradient(gradientLeft, 0, gradientWidth, 0)
					gradient.addColorStop(0, event.color)
					gradient.addColorStop(1, 'white')
					this.ctx.fillStyle = gradient
					this.ctx.fillRect(gradientLeft, event.top, event.width_uncertain_to, EVENT_HEIGHT)
				}

				this.ctx.fillStyle = event.color
				this.ctx.fillRect(left, event.top, width, EVENT_HEIGHT)
			}
		}

		this.drawEventsText(band)
	}

	private drawEventsText(band: EventsBand) {
		this.ctx.font = `${FONT_SIZE}px sans-serif`
		this.ctx.fillStyle = `rgb(40, 40, 40)`

		for (const event of band.visibleEvents) {
			let eventLeft = event.left

			if (event.left < 0 && event.time !== 0) {
				eventLeft = -event.width_uncertain_from 
			}

			const paddingLeft = event.time ? FONT_SIZE / 3 : FONT_SIZE / 1.2
			const x = eventLeft + paddingLeft + event.width_uncertain_from
			const y = event.top + FONT_SIZE + ((EVENT_HEIGHT - FONT_SIZE) / 2) - 2
			this.ctx.fillText(event.label, Math.round(x), Math.round(y))
		}
	}

	private drawMinimapBand(band: MinimapBand) {
		// Do not draw the minimap if left or zoom level have not changed
		if (band.isDrawn && band.prevOffsetX === band.offsetX && band.prevZoomLevel === band.zoomLevel) return

		this.clear(band)

		drawRulers(this.ctx, band)

		const minimapCanvas = band.draw()

		this.ctx.drawImage(minimapCanvas, 0, band.top, props.viewportWidth, band.availableHeight)

		band.isDrawn = true
	}

	private drawIndicators() {
		// The indicators only change when the zoomLevel is changed
		if (this.indicatorsDrawn && props.eventsBands.every(b => b.prevZoomLevel === b.zoomLevel)) return

		this.indicatorsCtx.clearRect(0, 0, props.viewportWidth, props.viewportHeight)
		this.indicatorsCtx.beginPath()

		for (const band of props.minimapBands) {
			const eventsBand = props.eventsBands[band.config.indicatorFor]

			// Left indicator
			const indicatorTOP = Math.round(band.config.topOffsetRatio * props.viewportHeight)
			const leftIndicatorRightX = band.positionAtTimestamp(eventsBand.from)
			this.indicatorsCtx.rect(0, indicatorTOP, leftIndicatorRightX, band.visibleHeight)

			// Right indicator
			const rightIndicatorLeftX = band.positionAtTimestamp(eventsBand.to)
			this.indicatorsCtx.rect(rightIndicatorLeftX, indicatorTOP, props.viewportWidth, band.visibleHeight)

			// Cover the DATE_BAR
			this.indicatorsCtx.rect(leftIndicatorRightX, indicatorTOP + band.availableHeight, rightIndicatorLeftX - leftIndicatorRightX, band.visibleHeight - band.availableHeight)
		}

		this.indicatorsCtx.fillStyle = `rgba(0, 0, 0, .04)`
		this.indicatorsCtx.fill()

		this.indicatorsCtx.closePath()

		this.indicatorsDrawn = true
	}
}
