import Ev3nt from "../../../../../models/event"
import createElement from '../../../../../utils/create-element'
import { EVENT_ROW_HEIGHT } from "../../../../../constants";

export default class PointInTime {
	 constructor(private event: Ev3nt, private segmentOffset: number) {}

	public render() {
		const backgroundColor = this.event.row % 2 === 0 ? 'blue' : 'red'

		const li = createElement(
			'li',
			'interval-wrap',
			[
				'box-sizing: border-box',
				'font-size: 0.8em',
				'height: 2px',
				'margin-top: 2px',
				'position: absolute',
				'white-space: nowrap',
			],
			[
				`background-color: ${backgroundColor}`,
				`left: ${this.event.left - this.segmentOffset}px`,
				`top: ${this.event.row * EVENT_ROW_HEIGHT}px`,
				`width: ${this.event.width}px`,
			]
		)
		li.setAttribute('title', `${this.event.title}\n${this.event.date.toDateString()}\n${this.event.endDate.toDateString()}`)

		const title = createElement(
			'div',
			'interval-title',
			[
				'display: inline-block',
				`line-height: ${14}px`,
				'margin-top: 2px',
				'overflow: hidden',
				'text-overflow: ellipsis',
			],
			[
				`color: ${backgroundColor}`,
			]
		)
		title.textContent = this.event.title

		li.appendChild(title)

		return li
	}
}
