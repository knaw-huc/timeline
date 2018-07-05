import createElement from '../../../utils/create-element'
import Domain from '../../../models/domain'
import props from '../../../models/props';
import { RawSegment, Milliseconds } from '../../../constants';
import { findClosestRulerDate } from '../rulers';
import Ruler from '../rulers/ruler';

export default class Segment {
	rendered = false

	private rootElement: HTMLElement
	private left: number
	private from: Milliseconds
	private to: Milliseconds

	constructor(
		private domain: Domain,
		segmentData: RawSegment,
	) {
		this.from = segmentData.from
		this.to = segmentData.to
		this.left = ((props.config.from - this.from) / props.time) * this.domain.width
	}

	render() {
		this.rootElement = createElement(
			'div',
			'segment',
			[
				'bottom: 0',
				'list-style: none',
				'margin: 0',
				'padding: 0',
				'position: absolute',
				'top: 0',
				`width: ${props.viewportWidth}px`,

			],
			[
				`left: ${this.left}px`,
			]
		)

		return this.rootElement
	}

	renderChildren = () => {
		if (this.rendered) return

		const rulers = createElement(
			'div',
			'rulers',
			[
				`width: ${props.viewportWidth}px`,
			],
			[
				`left: ${this.left}px`,
				`height: ${this.domain.height}px`,
			]
		)

		let date = findClosestRulerDate(this.from, this.domain.granularity)
		while(date < this.to) {
			rulers.appendChild(new Ruler(date, this.domain, this.left).render())
			date = this.domain.nextDate(date)
		}

		this.rootElement.appendChild(rulers)

		this.rendered = true
	}
}