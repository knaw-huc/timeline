import Ev3nt from "../../../../../models/event"
import { EVENT_MIN_SPACE, EVENT_HEIGHT } from "../../../../../constants"
import createElement from '../../../../../utils/create-element'

export default class PointInTime {
	 constructor(private event: Ev3nt, private segmentOffset: number) {}

	public render() {
		const li = createElement(
			'li',
			'interval-wrap',
			[
				'background-color: blue',
				// 'border: 1px solid blue',
				'box-sizing: border-box',
				'font-size: 0.8em',
				'height: 4px',
				`margin-left: -${EVENT_HEIGHT/2}px`,
				'position: absolute',
				'white-space: nowrap',
			],
			[
				`left: ${this.event.left - this.segmentOffset}px`,
				`top: ${this.event.top}px`,
				`width: ${this.event.width}px`,
			]
		)
		li.setAttribute('title', `${this.event.title}\n${this.event.date.toDateString()}`)

		const title = createElement(
			'div',
			'interval-title',
			[
				'background-color: lightblue',
				'display: inline-block',
				`line-height: ${EVENT_HEIGHT}px`,
				'margin-top: 3px',
				`max-width: calc(${EVENT_MIN_SPACE}px - ${EVENT_HEIGHT}px)`,
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
