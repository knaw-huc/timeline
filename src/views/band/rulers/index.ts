import Domain from '../../../models/domain'
import createElement from '../../../utils/create-element'
import Ruler from './ruler'
import { getStep } from '../../../utils/dates'
import { Granularity } from '../../../utils/dates';
import props from '../../../models/props';

export const findClosestRulerDate = (date: Date, granularity: Granularity) => {
	let year = date.getFullYear()

	if (granularity >= Granularity.YEAR) {
		const step = getStep(granularity)
		if (granularity === Granularity.YEAR) year += 1
		else while(year % step !== 0) { year += 1 }
		return new Date(year, 0, 1)
	} else if (granularity === Granularity.MONTH) {
		return new Date(year, date.getMonth() + 1, 1)
	} else if (granularity === Granularity.DAY) {
		return new Date(year, date.getMonth(), date.getDate() + 1)
	}

	return date
}

export default class Rulers {
	private ul: HTMLElement

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

		let date = findClosestRulerDate(props.from, this.domain.granularity)
		while(date.getTime() < props.to.getTime()) {
			this.ul.appendChild(new Ruler(date, this.domain).render())
			date = this.domain.nextDate(date)
		}

		return this.ul
	}
}