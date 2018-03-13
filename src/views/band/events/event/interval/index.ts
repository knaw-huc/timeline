import Ev3nt from "../../../../../models/event"
import createElement from '../../../../../utils/create-element'
import { EVENT_ROW_HEIGHT } from "../../../../../constants"

export default class PointInTime {
	 constructor(private event: Ev3nt, private segmentOffset: number) {}

	public render() {
		const backgroundColor = this.event.row % 2 === 0 ? 'rgb(235, 235, 255)' : 'rgb(215, 215, 255)'

		const li = createElement(
			'li',
			'interval-wrap',
			[
				'border: 1px solid black',
				'box-sizing: border-box',
				'font-size: 0.8em',
				`height: ${EVENT_ROW_HEIGHT - 6}px`,
				'margin-bottom: 4px',
				'position: absolute',
				'white-space: nowrap',
			],
			[
				`background-color: ${backgroundColor}`,
				`left: ${this.event.left - this.segmentOffset}px`,
				`top: ${(this.event.row) * EVENT_ROW_HEIGHT}px`,
				`width: ${this.event.width}px`,
			]
		)
		li.setAttribute('title', `${this.event.title}\n${this.event.date.toDateString()}\n${this.event.endDate.toDateString()}`)

		const title = createElement(
			'div',
			'interval-title',
			[
				'display: inline-block',
				`line-height: ${EVENT_ROW_HEIGHT - 6}px`,
				'overflow: hidden',
				'padding: 0 .25em',
				'text-overflow: ellipsis',
			]
		)
		title.textContent = this.event.title

		li.appendChild(title)

		return li
	}
}
