import createElement from '../../utils/create-element'
import Domain from '../../models/domain'
import { CENTER_CHANGE_EVENT, DATE_BAR_HEIGHT, EVENT_ROW_HEIGHT, Pixels } from '../../constants'
import props from '../../models/props'

export default class Indicator {
	private leftOfIndicator: HTMLElement
	private rightOfIndicator: HTMLElement
	private width: Pixels
	private leftWidth: Pixels
	private rightWidth: Pixels
	private offset: Pixels

	constructor(private hostDomain: Domain, private targetDomain: Domain) {
		this.width = this.hostDomain.width / this.targetDomain.width * props.viewportWidth
		if (this.width < 2) this.width = 2

		let heightRatio = (this.targetDomain.height - DATE_BAR_HEIGHT) / (props.config.rowCount * EVENT_ROW_HEIGHT)
		if (heightRatio > 1) heightRatio = 1
		// this.height = (this.hostDomain.height) * heightRatio

		this.offset = props.viewportWidth - this.width

		this.leftWidth = this.nextLeftWidth()
		this.rightWidth = this.nextRightWidth()

		document.addEventListener(CENTER_CHANGE_EVENT, this.handleCenterChange)
	}

	public remove() {
		document.removeEventListener(CENTER_CHANGE_EVENT, this.handleCenterChange)
	}

	public render() {

		const wrapper = createElement(
			'div',
			'indicator-wrap',
			[
				'bottom: 0',
				'left: 0',
				'pointer-events: none',
				'position: absolute',
				'right: 0',
			],
			[
				`height: ${this.hostDomain.height}px`,
				`top: ${this.hostDomain.config.topOffsetRatio * 100}%`,
			]
		)

		this.leftOfIndicator = createElement(
			'div',
			'indicator',
			[
				'position: absolute',
				`bottom: ${0}px`,
				'cursor: -webkit-grab',
				'background-color: rgba(0, 0, 0, .1)',
				`height: ${this.hostDomain.height}px`,
				'z-index: 3',
			],
			[
				'left: 0',
				'transform-origin: left',
				`width: ${this.leftWidth}px`,
			]
		)

		this.rightOfIndicator = createElement(
			'div',
			'indicator',
			[],
			[
				'right: 0',
				'transform-origin: right',
				`width: ${this.rightWidth}px`,
			]
		)

		wrapper.appendChild(this.leftOfIndicator)
		wrapper.appendChild(this.rightOfIndicator)

		return wrapper
	}
	
	private handleCenterChange = (e) => {
		this.leftOfIndicator.style.transform = `scaleX(${this.leftWidthScale()})`
		this.rightOfIndicator.style.transform = `scaleX(${this.rightWidthScale()})`
	}

	private nextLeftWidth() {
		return this.offset * props.center
	}

	private nextRightWidth() {
		return props.viewportWidth - (this.nextLeftWidth() + this.width)
	}

	private leftWidthScale() {
		return this.nextLeftWidth()/this.leftWidth
	}

	private rightWidthScale() {
		return this.nextRightWidth()/this.rightWidth
	}
}