import Band, { BandType } from '../../models/band'
import props from '../../models/props'
import createElement from '../../utils/create-element'
import eventBus from '../../event-bus'
import animator from '../../animator'
import View from '../index'
import { Milliseconds, Pixels, EventType } from '../../constants'
import { MinimapBandConfig, EventsBandConfig } from '../../models/config'
import EventsBand from '../../models/band/events'

export default class BandView implements View { 
	private dragOffsetX: Pixels
	private dragOffsetY: Pixels
	private dragStartTime: Milliseconds
	private dragStartPosition: [Pixels, Pixels]
	protected lastDragInterval: Milliseconds
	protected rootElement: HTMLElement

	constructor(public band: Band<MinimapBandConfig | EventsBandConfig>) {}

	render() {
		this.rootElement = createElement(
			'div',
			'band-wrap',
			[
				'position: absolute',
				'z-index: 2',
			],
			[
				`height: ${this.band.visibleHeight}px`,
				`top: ${this.band.top}px`,
				`width: ${props.viewportWidth}px`,
			]
		)

		eventBus.register('mousedown', this.onMouseDown, this.rootElement)
		eventBus.register('mousemove', this.onMouseMove, this.rootElement)
		eventBus.register('dblclick', this.onDblClick, this.rootElement)

		return this.rootElement
	}

	private onMouseDown = (ev: MouseEvent) => {
		// TODO use eventBus
		document.addEventListener('mouseup', this.onMouseUp)
		this.dragStartTime = Date.now()
		this.dragStartPosition = [ev.clientX, ev.clientY]
		this.dragOffsetX = ev.clientX
		this.dragOffsetY = ev.clientY
	}

	private onMouseMove = (ev: MouseEvent) => {
		if (this.dragOffsetX == null) return

		const yChange = ev.clientY - this.dragOffsetY
		const xChange = ev.clientX - this.dragOffsetX

		if (this.band.type === BandType.EventsBand) {
			const band = this.band as EventsBand
			// If the band's Y offset is 0, which means the band is "at the bottom",
			// only move vertical if the yChange is bigger than the xChange
			// and the change is bigger than 5 pixels (aribtrary number).
			// Otherwise, if scrolling left/right will show/hide the bottom row, which feels yanky.
			// This makes the band "stick" to the "bottom"
			if (
				band.offsetY !== 0 ||
				(Math.abs(yChange) > Math.abs(xChange) && Math.abs(yChange) > 5)
			 ) {
				band.offsetY =  yChange
			}
		}

		// Calculate the difference between the current mouse position and
		// the previous mouse position. This yields an offset in pixels, which
		// is converted to milliseconds.
		const centerChange: Milliseconds = xChange / this.band.pixelsPerMillisecond
		props.center -= centerChange

		// Request an animation frame from the Animator which updates the
		// models and the views
		animator.nextFrame() 

		// Update the drag offset, so the next mouse move will be relative
		// to the previous mouse move
		this.dragOffsetX = ev.clientX
		this.dragOffsetY = ev.clientY
	}

	private onMouseUp = (ev: MouseEvent) => {
		this.lastDragInterval = Date.now() - this.dragStartTime 
		this.dispatchScrollDoneEvent(ev)
		this.dragOffsetX = null
		this.dragOffsetY = null
		document.removeEventListener('mouseup', this.onMouseUp)
	}

	/**
	 * Dispatch the scroll done event when the drag is significant enough
	 * 
	 * A drag is significant if the time between mouse down and mouse up
	 * is greater than 200ms or when the position change (in x or y direction)
	 * is greater than 5px
	 *
	 */
	private dispatchScrollDoneEvent(ev: MouseEvent) {
		const significantDrag: boolean = [
			this.dragStartPosition[0] - ev.clientX,
			this.dragStartPosition[1] - ev.clientY
		]
			.map(Math.abs)
			.some(offset => offset > 5)

		if (this.lastDragInterval > 200 || significantDrag) {
			eventBus.dispatch(EventType.ScrollDone)
		}
	}

	private onDblClick = (ev: MouseEvent) => {
		const nextCenter = this.band.timestampAtPosition(ev.clientX)
		animator.goTo(nextCenter)
	}

	resize() {
		this.rootElement.style.cssText = `height: ${this.band.visibleHeight}px; top: ${this.band.top}px; width: ${props.viewportWidth}px;`
	}
}