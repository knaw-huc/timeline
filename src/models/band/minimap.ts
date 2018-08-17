import Band from '.'
import { MinimapBandConfig } from '../config'
import { Pixels } from '../../constants'
import props from '../props'
import createElement from '../../utils/create-element'


function extendConfig(config: MinimapBandConfig): MinimapBandConfig {
	const extendedConfig: MinimapBandConfig = { ...new MinimapBandConfig(), ...config }
	if (!extendedConfig.targets.length) extendedConfig.targets.push(0)
	return extendedConfig
}

export default class MinimapBand extends Band<MinimapBandConfig> {
	private eventHeight: Pixels
	private maxRowCount: number

	isDrawn: boolean = false

	// This canvas holds the "end product". It's output is
	// rendered by the main canvas. It's output is also used
	// as input (starting point) for the next canvas
	private canvas: HTMLCanvasElement = createElement('canvas')
	private ctx: CanvasRenderingContext2D = this.canvas.getContext('2d')

	// To update the "end product" canvas, the "end product" canvas is drawn on to the
	// next canvas with a left offset (caused by user scroll or zoom). This copies the
	// part that hasn't changed. The newly visible events are than added to the next canvas
	// and when finished copied on to the "end product" canvas
	private nextCanvas: HTMLCanvasElement = createElement('canvas')
	private nextCtx: CanvasRenderingContext2D = this.nextCanvas.getContext('2d')

	constructor(config: MinimapBandConfig) {
		super(extendConfig(config))
	}

	init() {
		super.init()

		this.maxRowCount = this.config.targets.reduce((prev, curr) => {
			const { rowCount } = props.eventsBands[curr]
			return Math.max(prev, rowCount)
		}, 0)

		const eventHeight = this.availableHeight / this.maxRowCount
		this.eventHeight = eventHeight < 1 ? 1 : Math.round(eventHeight)

		this.canvas.width = props.viewportWidth
		this.canvas.height = this.maxRowCount * this.eventHeight

		this.nextCanvas.width = props.viewportWidth
		this.nextCanvas.height = this.maxRowCount * this.eventHeight
	}

	resize() {
		super.resize()
		this.isDrawn = false
	}

	draw(): HTMLCanvasElement {
		if (!this.isDrawn) this.drawEvents()
		else this.updateNextCanvas()

		// Copy the next canvas to canvas
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.ctx.drawImage(this.nextCanvas, 0, 0)

		return this.canvas
	}

	private drawEvents(from = this.from, to = this.to) {
		this.nextCtx.beginPath()

		this.config.targets.forEach(targetIndex => {
			const targetBand = props.eventsBands[targetIndex]

			for (const event of targetBand.events) {
				if (event.from > to || event.to < from) continue
				const eventWidth = Math.round(event.time * this.pixelsPerMillisecond)
				const eventLeft = this.positionAtTimestamp(event.date_min != null ? event.date_min : event.date)
				const y = this.maxRowCount - ((event.row + 1) * this.eventHeight)
				const width = eventWidth < 1 ? 1 : eventWidth
				this.nextCtx.rect(eventLeft, y, width, this.eventHeight)
			}
		})

		this.nextCtx.fillStyle = `rgb(190, 190, 190)`
		this.nextCtx.fill()
	}

	private updateNextCanvas() {
		// Round the left offset to whole pixels (otherwise the browser interprets and adds gradient)
		const leftOffset = Math.round(this.offsetX - this.prevOffsetX)
		// No offset = no change = no re-draw
		if (leftOffset === 0) return this.canvas

		this.nextCtx.clearRect(0, 0, this.nextCanvas.width, this.nextCanvas.height)
		this.nextCtx.drawImage(this.canvas, leftOffset, 0)

		let from, to
		if (leftOffset < 0) { // scroll to left
			from = this.timestampAtPosition(props.viewportWidth + leftOffset)
			to = this.to
		} else {
			from = this.from
			to = this.timestampAtPosition(leftOffset)
		}
		this.drawEvents(from, to)
	}
}
