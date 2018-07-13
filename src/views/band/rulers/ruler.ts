import Domain from '../../../models/domain'
import createElement from '../../../utils/create-element' 
import { DATE_BAR_HEIGHT, Milliseconds } from '../../../constants'
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

const labelBody = (d: Milliseconds, granularity: Granularity) => {
	const date = new Date(d)
	if (granularity >= Granularity.YEAR) {
		return date.getFullYear().toString()
	} else if (granularity === Granularity.MONTH) {
		let body = months[date.getMonth()]
		if (date.getMonth() === 0) body = `${date.getFullYear().toString()}, ${body}`
		return body
	} else if (granularity === Granularity.WEEK) {
		return `${months[date.getMonth()]}<br />week ${getWeekNumber(date)}`
	} else if (granularity === Granularity.DAY) {
		let body = days[date.getDay()]
		body = `${body}<br />${months[date.getMonth()]} ${date.getDate()}`
		if (date.getMonth() === 0 && date.getDate() === 1) body = `${body}, ${date.getFullYear().toString()}`
		return body
	} else if (granularity === Granularity.HOUR) {
		return 'NOT IMPLEMENTED'
	}
}

export default class Ruler {
	constructor(private date: Milliseconds, private domain: Domain, private offset: number = 0) {}

	public render() {
		const li = createElement(
			'div',
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
				'bottom: 2px',
				'color: #888',
				'display: flex',
				'font-size: .75em',
				`height: calc(${DATE_BAR_HEIGHT} - 10px)`,
				'position: absolute',
				'width: 75px',
				'zIndex: 2',
			]
		)
		label.innerHTML = labelBody(this.date, this.domain.granularity)
		label.title = this.date

		li.appendChild(label)
		return li
	}
}