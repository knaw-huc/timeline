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
	public fromRatio: number
	private events
	private toRatio

	constructor(
		private domain: Domain,
		segmentData,
	) {
		const [events, fromRatio, toRatio] = segmentData
		this.events = events.map(e => this.domain.topAdder(new Ev3nt(e, this.domain)))
		this.fromRatio = fromRatio
		this.toRatio = toRatio
		this.left = this.fromRatio * this.domain.width
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

	renderChildren() {
		if (this._rendered) return

		this.renderRulers()
		this.renderEvents()

		this._rendered = true
	}

	private renderRulers = () => {
		const ul = createElement('ul', 'rulers', [
			'list-style: none',
			'margin: 0',
			'padding: 0',
		])
		let date = findClosestRulerDate(this.domain.dateAtProportion(this.fromRatio), this.domain.granularity)
		const to = this.domain.dateAtProportion(this.toRatio).getTime()
		while(date.getTime() < to) {
			ul.appendChild(new Ruler(date, this.domain, this.left).render())
			date = this.domain.nextDate(date)
		}
		this.rootElement.appendChild(ul)
	}

	private renderEvents() {
		const ul = createElement('ul', 'events', [
			'list-style: none',
			'margin: 0',
			'padding: 0',
		])
		for (let i = 0; i < this.events.length; i++) {
			const event = this.domain.topAdder(this.events[i])
			const EventClass = event.isInterval() ? Interval : PointInTime
			const view = new EventClass(event, this.left)
			ul.appendChild(view.render())
		}
		this.rootElement.appendChild(ul)
	}
}