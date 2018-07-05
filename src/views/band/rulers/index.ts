import Domain from '../../../models/domain'
import createElement from '../../../utils/create-element'
import Ruler from './ruler'
import { getStep } from '../../../utils/dates'
import { Granularity } from '../../../utils/dates'
import props from '../../../models/props'
import { Milliseconds } from '../../../constants';

export function findClosestRulerDate(d: Milliseconds, granularity: Granularity): Milliseconds {
	const date = new Date(d)
	let year = date.getFullYear()

	if (granularity >= Granularity.YEAR) {
		const step = getStep(granularity)
		if (granularity === Granularity.YEAR) year += 1
		else while(year % step !== 0) { year += 1 }
		return Date.UTC(year, 0, 1)
	} else if (granularity === Granularity.MONTH) {
		return Date.UTC(year, date.getMonth() + 1, 1)
	} else if (granularity === Granularity.DAY) {
		return Date.UTC(year, date.getMonth(), date.getDate() + 1)
	}

	return d
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

		let date = findClosestRulerDate(props.config.from, this.domain.granularity)
		while(date < props.config.to) {
			this.ul.appendChild(new Ruler(date, this.domain).render())
			date = this.domain.nextDate(date)
		}

		return this.ul
	}
}