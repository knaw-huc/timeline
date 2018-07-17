import Domain from '../../models/domain'
import props from '../../models/props'
import createElement from '../../utils/create-element'
import { CENTER_CHANGE } from '../../constants'
import Sparkline from './sparkline'
import Rulers from './rulers'
import MiniMap from './minimap'
import EventsBand from './events'

export default class Band {
	private dragStart: number
	private dragOffset: number
	private rootElement: HTMLElement
	private eventsBand: EventsBand

	constructor(public domain: Domain) {
		document.addEventListener(CENTER_CHANGE, this.updateLeft)
	}

	remove() {
		document.removeEventListener(CENTER_CHANGE, this.updateLeft)
		this.rootElement.removeEventListener('mousedown', this.onMouseDown)
		this.rootElement.removeEventListener('mousemove', this.onMouseMove)
		this.rootElement.removeEventListener('dblclick', this.onDblClick)
	}

	render() {
		this.rootElement = createElement(
			'div',
			'band-wrap',
			[
				'background-color: white',
				'box-shadow: inset 0 6px 20px #eee',
				'position: absolute',
			],
			[
				`height: ${this.domain.config.heightRatio * 100}%`,
				`top: ${this.domain.config.topOffsetRatio * 100}%`,
				`transform: translate3d(${this.domain.left}px, 0, 0)`,
				`width: ${this.domain.width}px`,
			]
		)

		if (this.domain.config.components.has('SPARKLINE')) {
			const sparkline = new Sparkline(this.domain, props.config.aggregate)
			this.rootElement.appendChild(sparkline.render())
		}

		if (this.domain.config.components.has('RULERS') && !this.domain.config.components.has('EVENTS')) {
			this.rootElement.appendChild(new Rulers(this.domain).render())
		}

		if (this.domain.config.components.has('MINIMAP')) {
			const minimap = new MiniMap(this.domain)
			this.rootElement.appendChild(minimap.render())
		}

		if (this.domain.config.components.has('EVENTS')) {
			this.eventsBand = new EventsBand(this.domain)
			this.rootElement.appendChild(this.eventsBand.render())
		}

		if (this.domain.config.visibleRatio < 1) {
			this.rootElement.addEventListener('mousedown', this.onMouseDown)
			this.rootElement.addEventListener('mousemove', this.onMouseMove)
		}
		this.rootElement.addEventListener('dblclick', this.onDblClick)

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
		const proportion = this.domain.proportionAtPosition(ev.clientX - rootLeft)
		props.center = proportion
	}
}