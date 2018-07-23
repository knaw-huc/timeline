import Domain from '../../models/domain'
import props from '../../models/props'
import createElement from '../../utils/create-element'
import { CENTER_CHANGE } from '../../constants'
import EventsBand from './events'
import eventBus from '../../event-bus';
import animator from '../../animator';

export default class Band {
	private dragStart: number
	private dragOffset: number
	private rootElement: HTMLElement
	private eventsBand: EventsBand

	constructor(public domain: Domain) {
		eventBus.register(CENTER_CHANGE, this.updateLeft)
	}

	render() {
		this.rootElement = createElement(
			'div',
			'band-wrap',
			[
				'position: absolute',
				'z-index: 1',
			],
			[
				`box-shadow: inset 0 6px 20px ${this.domain.color != null ? this.domain.color(.1) : '#eee'}`,
				`height: ${this.domain.config.heightRatio * 100}%`,
				`top: ${this.domain.config.topOffsetRatio * 100}%`,
				`transform: translate3d(${this.domain.left}px, 0, 0)`,
				`width: ${this.domain.width}px`,
			]
		)

		// if (this.domain.config.type === 'minimap') {

		// }

		if (this.domain.config.type === 'events') {
			this.eventsBand = new EventsBand(this.domain)
			this.rootElement.appendChild(this.eventsBand.render())
		}

		if (this.domain.config.visibleRatio < 1) {
			eventBus.register('mousedown', this.onMouseDown, this.rootElement)
			eventBus.register('mousemove', this.onMouseMove, this.rootElement)
		}
		eventBus.register('dblclick', this.onDblClick, this.rootElement)

		return this.rootElement
	}

	private updateLeft = () => {
		this.rootElement.style.transform = `translate3d(${this.domain.updateLeft()}px, 0, 0)`
		if (this.eventsBand != null) this.eventsBand.renderChildren()
	}

	private onMouseDown = (ev) => {
		document.addEventListener('mouseup', this.onMouseUp)
		this.dragOffset = ev.clientX
		this.dragStart = this.domain.left
	}

	private onMouseMove = (ev) => {
		if (this.dragOffset) {
			const left = this.dragStart - (this.dragOffset - ev.clientX)
			props.center = left / (props.viewportWidth - this.domain.width)
		}
	}

	private onMouseUp = (ev) => {
		document.removeEventListener('mouseup', this.onMouseUp)
		this.dragOffset = null
	}

	private onDblClick = (ev) => {
		const rootLeft = this.rootElement.getBoundingClientRect().left
		const nextCenter = this.domain.proportionAtPosition(ev.clientX - rootLeft)
		animator.goTo(nextCenter)
		// props.center = proportion
	}
}