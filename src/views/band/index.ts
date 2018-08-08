import Band from '../../models/band'
import props from '../../models/props'
import createElement from '../../utils/create-element'
import eventBus from '../../event-bus'
import animator from '../../animator'
import View from '../index'
import { Milliseconds } from '../../constants';

export default class BandView implements View { 
	// private dragStart: number
	private dragOffset: number
	protected rootElement: HTMLElement

	constructor(public band: Band) {}

	render() {
		this.rootElement = createElement(
			'div',
			'band-wrap',
			[
				'position: absolute',
				'z-index: 1',
			],
			[
				`height: ${this.band.height}px`,
				`top: ${this.band.top}px`,
				`width: ${props.viewportWidth}px`,
			]
		)

		if (this.band.zoomLevel > 0) {
			eventBus.register('mousedown', this.onMouseDown, this.rootElement)
			eventBus.register('mousemove', this.onMouseMove, this.rootElement)
		}
		eventBus.register('dblclick', this.onDblClick, this.rootElement)

		return this.rootElement
	}

	private onMouseDown = (ev) => {
		document.addEventListener('mouseup', this.onMouseUp)
		this.dragOffset = ev.clientX
	}

	private onMouseMove = (ev) => {
		if (this.dragOffset && this.band.zoomLevel > 0) {
			// Calculate the difference between the current mouse position and
			// the previous mouse position. This yields an offset in pixels, which
			// is converted to milliseconds.
			const offsetX: Milliseconds = (this.dragOffset - ev.clientX) / this.band.pixelsPerMillisecond
			props.center += offsetX
			animator.play() // Request an animation frame from the Animator
			this.dragOffset = ev.clientX
		}
	}

	private onMouseUp = (ev) => {
		this.dragOffset = null
		document.removeEventListener('mouseup', this.onMouseUp)
	}

	private onDblClick = (ev) => {
		const nextCenter = this.band.timestampAtPosition(ev.clientX)
		animator.goTo(nextCenter)
	}

	resize() {
		this.rootElement.style.cssText = `height: ${this.band.height}px; top: ${this.band.top}px; width: ${props.viewportWidth}px;`
	}
}