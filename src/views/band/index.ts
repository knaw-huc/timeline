import Domain from '../../models/domain'
import props from '../../models/props'
import createElement from '../../utils/create-element'
import Rulers from './rulers'
import { CENTER_CHANGE_EVENT } from '../../constants'

export default abstract class Band {
	private dragStart: number
	private dragOffset: number
	private rootElement: HTMLElement

	constructor(protected domain: Domain) {
		document.addEventListener(CENTER_CHANGE_EVENT, this.updateLeft)
	}

	private updateLeft = () => {
		this.rootElement.style.transform = `translate3d(${this.domain.updateLeft()}px, 0, 0)`
	}

	public render() {
		this.rootElement = createElement(
			'div',
			'band-wrap',
			[
				'background-color: white',
				'position: absolute',
			],
			[
				`height: ${this.domain.heightRatio * 100}%`,
				`top: ${this.domain.topOffsetRatio * 100}%`,
				`transform: translate3d(${this.domain.left}px, 0, 0)`,
				`width: ${this.domain.width}px`,
			]
		)

		this.rootElement.appendChild(new Rulers(this.domain).render())

		this.rootElement.addEventListener('mousedown', this.onMouseDown)
		this.rootElement.addEventListener('mousemove', this.onMouseMove)

		return this.rootElement
	}

	private onMouseDown = (ev) => {
		document.addEventListener('mouseup', this.onMouseUp)
		this.dragOffset = ev.clientX
		this.dragStart = this.domain.left
	}

	private onMouseMove = (ev) => {
		if (this.dragOffset) {
			const left = this.dragStart - (this.dragOffset - ev.clientX)
			props.center = left / (this.domain.viewportWidth - this.domain.width)
		}
	}

	private onMouseUp = () => {
		document.removeEventListener('mouseup', this.onMouseUp)
		this.dragOffset = null
	}
}