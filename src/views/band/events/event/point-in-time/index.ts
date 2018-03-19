import Ev3nt from "../../../../../models/event"
import { EVENT_MIN_SPACE, EVENT_HEIGHT, EVENT_ROW_HEIGHT } from "../../../../../constants"
import createElement from '../../../../../utils/create-element'

export default class PointInTime {
	 constructor(private event: Ev3nt, private segmentOffset: number) {}

	public render() {
		const li = createElement(
			'li',
			'pit-wrap',
			[
				'box-sizing: border-box',
				'font-size: 0.8em',
				`margin-left: -${EVENT_HEIGHT/2}px`,
				'position: absolute',
				'white-space: nowrap',
				`max-width: ${EVENT_MIN_SPACE}px`,
			],
			[
				`left: ${this.event.left - this.segmentOffset}px`,
				`bottom: ${(this.event.row) * EVENT_ROW_HEIGHT}px`,
			]
		)
		li.setAttribute('title', `${this.event.title}\n${this.event.date.toDateString()}`)

		const title = createElement(
			'div',
			'pit-title',
			[
				'background-color: rgba(255,255,255,.75)',
				'display: inline-block',
				`line-height: ${EVENT_HEIGHT}px`,
				`max-width: calc(${EVENT_MIN_SPACE}px - ${EVENT_HEIGHT}px)`,
				'overflow: hidden',
				'padding: .25em',
				'text-overflow: ellipsis',
			]
		)
		title.textContent = this.event.title

		const point = createElement(
			'div',
			'pit-point',
			[
				'background-image: radial-gradient(white 20%, black 100%)',
				`border-radius: ${EVENT_HEIGHT/2}px`,
				'display: inline-block',
				'margin: .25em 0',
				`width: ${EVENT_HEIGHT}px`,
				`height: ${EVENT_HEIGHT}px`,
			]
		)

		li.appendChild(point)
		li.appendChild(title)

		return li
	}
}
