import Ev3nt from '../../../models/event'
import createElement from '../../../utils/create-element'
import PointInTime from './event/point-in-time'
import Interval from './event/interval'
import Ruler from '../rulers/ruler'
import Domain from '../../../models/domain'
import props from '../../../models/props';
import { findClosestRulerDate } from '../rulers';

export default class Segment {
	private _rendered: boolean = false
	private rootElement: HTMLElement
	private left: number

	constructor(
		private domain: Domain,
		private events: Ev3nt[],
		public fromRatio: number,
		private toRatio: number,
	) {
		this.left = this.fromRatio * this.domain.width
	}

	render() {
		this.rootElement = createElement(
			'ul',
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

	renderChildren() {
		if (this._rendered) return

		this.renderRulers()

		for (let i = 0; i < this.events.length; i++) {
			const event = this.events[i]
			const EventClass = event.isInterval() ? Interval : PointInTime
			const view = new EventClass(this.domain.topAdder(event), this.left)
			this.rootElement.appendChild(view.render())
		}

		this._rendered = true
	}

	private renderRulers = () => {
		let date = findClosestRulerDate(this.domain.dateAtProportion(this.fromRatio), this.domain.granularity)
		const to = this.domain.dateAtProportion(this.toRatio).getTime()
		while(date.getTime() < to) {
			this.rootElement.appendChild(new Ruler(date, this.domain, this.left).render())
			date = this.domain.nextDate(date)
		}
	}
}