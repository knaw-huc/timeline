import createElement from '../../utils/create-element'
import Domain from '../../models/domain'
import { CENTER_CHANGE_EVENT } from '../../constants'
import props from '../../models/props'

export default class Indicator {
	private indicator: HTMLElement
	private width: number

	constructor(private hostDomain: Domain, private targetDomain: Domain) {
		this.width = this.hostDomain.width / this.targetDomain.width * this.targetDomain.viewportWidth

		document.addEventListener(CENTER_CHANGE_EVENT, (e) => {
			this.indicator.style.transform = `translate3d(${this.indicatorLeft()}px, 0, 0)`
		})
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
				`height: ${this.hostDomain.viewportHeight}px`,
				`top: ${this.hostDomain.topOffsetRatio * 100}%`,
			]
		)

		this.indicator = createElement(
			'div',
			'indicator',
			[
				'position: absolute',
				'bottom: 0',
				'cursor: -webkit-grab',
				'background-color: rgba(255, 0, 0, .05)',
				'z-index: 3',
			],
			[
				`height: ${this.hostDomain.viewportHeight}px`,
				`transform: translate3d(${this.indicatorLeft()}px, 0, 0)`,
				`width: ${this.width}px`,
			]
		)

		wrapper.appendChild(this.indicator)

		return wrapper
	}

	private indicatorLeft() {
		return (this.targetDomain.viewportWidth - this.width) * props.center
	}
}