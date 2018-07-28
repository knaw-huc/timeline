import Band from '../../models/band'
import props from '../../models/props'
import createElement from '../../utils/create-element'
import eventBus from '../../event-bus'
import animator from '../../animator'

export default class BandView {
	private dragStart: number
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
		this.dragStart = this.band.left
	}

	private onMouseMove = (ev) => {
		if (this.dragOffset && this.band.zoomLevel > 0) {
			const left = this.dragStart - (this.dragOffset - ev.clientX)
			props.center = left / (props.viewportWidth - this.band.width)
			animator.play() // Request an animation frame from the Animator
		}
	}

	private onMouseUp = (ev) => {
		this.dragOffset = null
		document.removeEventListener('mouseup', this.onMouseUp)
	}

	private onDblClick = (ev) => {
		const nextCenter = this.band.proportionAtPosition(ev.clientX)
		animator.goTo(nextCenter)
	}
}