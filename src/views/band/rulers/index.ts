import Domain from '../../../models/domain'
import createElement from '../../../utils/create-element'
import Ruler from './ruler'
import { getStep } from '../../../utils/date-range'
import { Granularity } from '../../../utils/dates';

const findClosestRulerPosition = (date: Date, granularity: Granularity) => {
	if (granularity > Granularity.YEAR) {
		const step = getStep(granularity)
		let year = date.getFullYear()
		while(year % step !== 0) { year += 1 }
		return new Date(year, 0, 1)
	}	
	return date
}

export default class Rulers {
	private iter: number = 0
	private ul: HTMLElement
	private prevRange: [Date, Date] = [null, null]

	constructor(private domain: Domain) {}

	public render() {
		this.ul = createElement(
			'ul',
			'ruler-wrap',
			[
				'bottom: 0',
				'left: 0',
				'list-style: none',
				'margin: 0',
				'padding: 0',
				'position: absolute',
				'right: 0',
				'top: 0',
				'whiteSpace: nowrap',
			]
		)

		this.renderRulers()

		return this.ul
	}

	private renderRulers = () => {
		let [from, to, last] = this.domain.initialActiveRange(++this.iter)
		from = findClosestRulerPosition(from, this.domain.granularity)

		const [prevFrom, prevTo] = this.prevRange

		const end = prevFrom || to
		for (let i = from; i < end; i = new Date(this.domain.nextDate(i))) {
			const r = new Ruler(i, this.domain)
			this.ul.appendChild(r.render())
		}

		if (prevTo) {
			for (let i = prevTo; i < to; i = new Date(this.domain.nextDate(i))) {
				const r = new Ruler(i, this.domain)
				this.ul.appendChild(r.render())
			}
		}

		this.prevRange = [from, to]

		if (!last) window.requestAnimationFrame(this.renderRulers)
	}
}