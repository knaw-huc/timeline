import createElement from '../../utils/create-element'
import props from '../../models/props'
import { EVENT_HEIGHT, DATE_BAR_HEIGHT, ZOOM_DONE, SCROLL_DONE, EVENT_ROW_HEIGHT, Pixels } from '../../constants'
import MinimapBand from '../../models/band/minimap'
import animator from '../../animator'
import EventsBand from '../../models/band/events'
import View from '../index'
import drawRulers from './rulers'
import eventBus from '../../event-bus'
import { RawEv3nt } from '../..';

const BORDER_WIDTH = 2

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
					const path = `${props.imagePath}/${event.wikidata_identifier}__32.${event.has_image}`
					event.image = new Image()
					event.image.addEventListener('load', this.drawImageOnCanvas(event))
					event.image.src = path
				} else {
					this.loadImage(event)
				}
			}
		}
	}

	private drawImageOnCanvas = (event: RawEv3nt) => {
		const callback = () => {
			event.image.removeEventListener('load', callback)

			// The bounding box is the box where the image must fit within.
			// In this case the image should not be higher or wider than
			// 2 times the event row height
			const boundingBox: Pixels = EVENT_ROW_HEIGHT * 2

			if (event.image.width > event.image.height) {
				// First set the height, so we can use the old width
				event.image.height = event.image.height * (boundingBox / event.image.width)
				event.image.width = boundingBox
			} else {
				// First set the width, so we can use the old height
				event.image.width = event.image.width * (boundingBox / event.image.height)
				event.image.height = boundingBox
			}

			this.loadImage(event)

			// const canvas = createElement('canvas')
			// canvas.width = (EVENT_ROW_HEIGHT * 2) - (BORDER_WIDTH * 2)
			// canvas.height = (EVENT_ROW_HEIGHT * 2) - (BORDER_WIDTH * 2)
			// const ctx = canvas.getContext('2d')

			// ctx.lineWidth = 2
			// const xOffset = 0 // Stroke and image always stick to the left. KEEP FOR DOCUMENTATION PURPOSES

			// The stroke x, y, width, height are the points in the middel of the ctx.lineWidth
			// Thus a stroke at 0, 0 with a line width of 2 will start at -1 and stop at 1
			// const borderX = ctx.lineWidth / 2 // xOffset + ctx.lineWidth / 2
			// const borderY = yOffset + ctx.lineWidth / 2
			// const borderWidth = img.width - ctx.lineWidth
			// const strokeHeight = img.height - ctx.lineWidth
			// event.imageBorder = [borderX, borderY, borderWidth, strokeHeight]

			// The image is positioned inside the stroke (the border)
			// const imgX = ctx.lineWidth // xOffset + ctx.lineWidth
			// const imgY = yOffset + ctx.lineWidth
			// const imgWidth = img.width - ctx.lineWidth * 2
			// const imgHeight = img.height - ctx.lineWidth * 2

			// Image

			// if (img.width > img.height) {
			// 	img.width = canvas.width
			// 	img.height = canvas.height * (canvas.width / img.width)
			// } else {
			// 	img.height = canvas.height
			// 	img.width = canvas.width * (canvas.height / img.height)
			// }

			// // const yOffset = canvas.height - img.height
			// // ctx.drawImage(img, 0, yOffset, img.width, img.height)

			// ctx.fillStyle = 'rgb(255, 0, 0)'
			// console.log(canvas.width, canvas.height)
			// ctx.fillRect(0, 0, canvas.width, canvas.height)

			// event.imageCanvas = canvas


			// console.log(imgLeft, imgTop, imgWidth, imgHeight, canvas.width, canvas.height)
			// let x, y
			// if (event.time) {
			// 	x = event.left + 4
			// 	y = event.top - img.height
			// 	ctx.strokeRect(event.left + 2, y, img.width + 4, img.height)
			// } else {
			// 	x = event.left - (img.width / 2)
			// 	y = event.top - img.height - 4
			// 	this.ctx.strokeStyle = event.color
			// 	this.ctx.strokeRect(x, y, img.width, img.height)

			// 	this.ctx.beginPath()
			// 	this.ctx.moveTo(event.left - 8, y + img.height)
			// 	this.ctx.lineTo(event.left, y + img.height + 8)
			// 	this.ctx.lineTo(event.left + 8, y + img.height)
			// 	this.ctx.fillStyle = event.color
			// 	this.ctx.fill()
			// }
		}

		return callback
	}

	private loadImage(event: RawEv3nt) {
		const x = event.time ? event.left : event.left - (event.image.width / 2) - BORDER_WIDTH
		const y = event.top - event.image.height
		// Border uses fillRect instead of strokeRect, because strokeRect gives a different color. Don't ask me why.
		this.ctx.fillStyle = event.color
		this.ctx.fillRect(x, y - BORDER_WIDTH * 2, event.image.width + BORDER_WIDTH * 2, event.image.height + BORDER_WIDTH * 2)
		this.ctx.drawImage(event.image, x + BORDER_WIDTH, y - BORDER_WIDTH)
	}

	private onAnimationDone = () => {
		this.updateImages()
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
		this.updateImages()

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
		this.ctx.font = '11px sans-serif'
		this.ctx.fillStyle = `rgb(40, 40, 40)`

		for (const event of band.visibleEvents) {
			// let eventWidth = event.time === 0 ? event.padding : event.width
			let eventLeft = event.left

			if (event.left < 0 && event.time !== 0) {
				// eventWidth = event.width + event.left
				eventLeft = -event.width_uncertain_from 
			}

			// let eventLabelLength = event.label.length * PIXELS_PER_LETTER
			// if (eventLabelLength <= eventWidth) {
				const paddingLeft = event.time ? 3 : 8
				this.ctx.fillText(event.label, eventLeft + paddingLeft + event.width_uncertain_from, event.top + EVENT_HEIGHT - 3)
			// }
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
			this.indicatorsCtx.rect(leftIndicatorRightX, indicatorTOP + band.visibleHeight - DATE_BAR_HEIGHT, rightIndicatorLeftX - leftIndicatorRightX, DATE_BAR_HEIGHT)
		}

		this.indicatorsCtx.fillStyle = `rgba(0, 0, 0, .04)`
		this.indicatorsCtx.fill()

		this.indicatorsCtx.closePath()

		this.indicatorsDrawn = true
	}
}
