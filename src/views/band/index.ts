import Band from '../../models/band'
import props from '../../models/props'
import createElement from '../../utils/create-element'
import eventBus from '../../event-bus'
import animator from '../../animator'
import View from '../index'
import { Milliseconds } from '../../constants';
import { MinimapBandConfig, EventsBandConfig } from '../../models/config'
import EventsBand from '../../models/band/events';

export default class BandView implements View { 
	private dragOffsetX: number
	private dragOffsetY: number
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

	private onMouseDown = (ev) => {
		document.addEventListener('mouseup', this.onMouseUp)
		this.dragOffsetX = ev.clientX
		this.dragOffsetY = ev.clientY
	}

	private onMouseMove = (ev) => {
		if (this.band instanceof EventsBand && this.dragOffsetY) {
			this.band.offsetY =  ev.clientY - this.dragOffsetY
		}

		if (this.dragOffsetX) {
			// Calculate the difference between the current mouse position and
			// the previous mouse position. This yields an offset in pixels, which
			// is converted to milliseconds.
			const centerChange: Milliseconds = (this.dragOffsetX - ev.clientX) / this.band.pixelsPerMillisecond
			props.center += centerChange

			// Request an animation frame from the Animator which updates the
			// models and the views
			animator.nextFrame() 

			// Update the drag offset, so the next mouse move will be relative
			// to the previous mouse move
			this.dragOffsetX = ev.clientX
			this.dragOffsetY = ev.clientY
		}
	}

	private onMouseUp = (ev) => {
		this.dragOffsetX = null
		this.dragOffsetY = null
		document.removeEventListener('mouseup', this.onMouseUp)
	}

	private onDblClick = (ev) => {
		const nextCenter = this.band.timestampAtPosition(ev.clientX)
		animator.goTo(nextCenter)
	}

	resize() {
		this.rootElement.style.cssText = `height: ${this.band.visibleHeight}px; top: ${this.band.top}px; width: ${props.viewportWidth}px;`
	}
}