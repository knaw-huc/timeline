import Domain from '../../../models/domain'
import createElement from '../../../utils/create-element' 
import { DATE_BAR_HEIGHT } from '../../../constants'
import { Granularity } from '../../../utils/dates';

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const getWeekNumber = (date: Date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7)
};

const labelBody = (d: Date, granularity: Granularity) => {
	if (granularity >= Granularity.YEAR) {
		return d.getFullYear().toString()
	} else if (granularity === Granularity.MONTH) {
		let body = months[d.getMonth()]
		if (d.getMonth() === 0) body = `${d.getFullYear().toString()}, ${body}`
		return body
	} else if (granularity === Granularity.WEEK) {
		return `${months[d.getMonth()]}<br />week ${getWeekNumber(d)}`
	} else if (granularity === Granularity.DAY) {
		return days[d.getDate()]
	} else if (granularity === Granularity.HOUR) {
		return 'NOT IMPLEMENTED'
	}
}

export default class Ruler {
	constructor(private date: Date, private domain: Domain, private offset: number = 0) {}

	public render() {
		const li = createElement(
			'li',
			'ruler',
			[
				'border-left: 1px solid #EEE',
				'box-sizing: border-box',
				'height: 100%',
				'padding-left: 6px',
				'position: absolute',
				'transition: all 1s cubic-bezier(.25,.8,.25,1)',
			],
			[
				`left: ${this.domain.positionAtDate(this.date) - this.offset}px`,
			]
		)

		const label = createElement(
			'div',
			'ruler-label',
			[
				'alignItems: flex-end',
				'bottom: 10px',
				'color: #888',
				'display: flex',
				'font-size: .75em',
				`height: calc(${DATE_BAR_HEIGHT} - 10px)`,
				'position: absolute',
				'width: 60px',
				'zIndex: 2',
			]
		)
		label.innerHTML = labelBody(this.date, this.domain.granularity)
		label.title = this.date

		li.appendChild(label)
		return li
	}
}