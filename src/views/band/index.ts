import Domain from '../../models/domain'
import createElement from '../../utils/create-element'
import Rulers from './rulers'
import { CENTER_CHANGE_EVENT } from '../../constants'

export default class BandWrapper {
	private dragStart: number
	private dragOffset: number
	private id: string
	private rootElement: HTMLElement

	constructor(private domain: Domain) {
		this.id = crypto.getRandomValues(new Uint32Array(1))[0].toString(16)

		document.addEventListener(CENTER_CHANGE_EVENT, (e) => {
			if (e['detail']['id'] !== this.id) {
				this.domain.setCenter(e['detail']['center'])
				this.updateLeft()
			}
		})
	}

	private updateLeft = () => {
		this.rootElement.style.transform = `translate3d(${this.domain.left}px, 0, 0)`
	}

	public render() {
		this.rootElement = createElement(
			'div',
			'band-wrap',
			[
				'background-color: lightyellow',
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
			this.domain.setLeft(left)
			this.updateLeft()

			document.dispatchEvent(new CustomEvent(CENTER_CHANGE_EVENT, {
				detail: {
					center: this.domain.center,
					id: this.id,
				}
			}))
		}
	}

	private onMouseUp = () => {
		document.removeEventListener('mouseup', this.onMouseUp)
		this.dragOffset = null
	}
}