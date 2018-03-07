import Domain from '../../models/domain'
import props from '../../models/props'
import createElement from '../../utils/create-element'
import { CENTER_CHANGE_EVENT } from '../../constants'

export default abstract class Band {
	private dragStart: number
	private dragOffset: number
	private rootElement: HTMLElement

	constructor(protected domain: Domain) {
		document.addEventListener(CENTER_CHANGE_EVENT, this.updateLeft)
	}

	public remove() {
		document.removeEventListener(CENTER_CHANGE_EVENT, this.updateLeft)
		this.rootElement.removeEventListener('mousedown', this.onMouseDown)
		this.rootElement.removeEventListener('mousemove', this.onMouseMove)
		this.rootElement.removeEventListener('dblclick', this.onDblClick)
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

		if (this.domain.visibleRatio < 1) {
			this.rootElement.addEventListener('mousedown', this.onMouseDown)
			this.rootElement.addEventListener('mousemove', this.onMouseMove)
		}
		this.rootElement.addEventListener('dblclick', this.onDblClick)

		return this.rootElement
	}

	protected abstract renderChildren(): void

	private updateLeft = () => {
		this.rootElement.style.transform = `translate3d(${this.domain.updateLeft()}px, 0, 0)`
		if (this.domain.type === 'EVENTS') this.renderChildren()
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
		// const shift = ev.clientX - this.dragOffset
		// let left = this.dragStart - (this.dragOffset - ev.clientX)
		// if (Math.abs(shift) > 300) {
		// 	let t = 0
		// 	const intervalId = setInterval(() => {
		// 		t += 50
		// 		if (t === 1000 || props.center === 0 || props.center === 1) return clearInterval(intervalId)

		// 		left += (shift / 100) * (-t/1000 + 1)
		// 		props.center = left / (this.domain.viewportWidth - this.domain.width)
		// 		console.log(t, -t/1000 + 1, left, props.center)
		// 	}, 50)
		// }
		this.dragOffset = null
	}

	private onDblClick = (ev) => {
		const rootLeft = this.rootElement.getBoundingClientRect().left
		const proportion = this.domain.proportionAtPosition(ev.clientX - rootLeft)
		props.center = proportion
	}
}