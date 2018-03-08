import Ev3nt from '../../../models/event'
import createElement from '../../../utils/create-element'
import PointInTime from './event/point-in-time'
import Ruler from '../rulers/ruler'
import Domain from '../../../models/domain'
import props from '../../../models/props';
import { findClosestRulerDate } from '../rulers';

export default class Segment {
	public rendered: boolean = false
	private rootElement: HTMLElement

	constructor(
		private domain: Domain,
		// public events: Ev3nt[],
		private from: Date,
		private to: Date,
		private lowerIndex: number,
		private upperIndex: number,
		public left: number,
		private topAdder: (e: Ev3nt) => Ev3nt,
		private events: Ev3nt[]
	) {}

	public render() {
		this.rootElement = createElement(
			'ul',
			'segment',
			[
				'bottom: 0',
				'display: none',
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

	public renderChildren() {
		for (let i = this.lowerIndex; i <= this.upperIndex; i++) {
			const pit = new PointInTime(this.topAdder(this.events[i]), this.left)
			this.rootElement.appendChild(pit.render())
		}

		this.renderRulers()
		this.show()
		this.rendered = true
	}

	public show() {
		this.rootElement.style.display = 'block'
	}

	public hide() {
		this.rootElement.style.display = 'none'
	}

	private renderRulers = () => {
		let date = findClosestRulerDate(this.from, this.domain.granularity)
		const to = this.to.getTime()
		while(date.getTime() < to) {
			this.rootElement.appendChild(new Ruler(date, this.domain, this.left).render())
			date = this.domain.nextDate(date)
		}
	}
}