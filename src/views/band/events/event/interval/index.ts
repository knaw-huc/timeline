import DomainEvent from "../../../../../models/event"
import createElement from '../../../../../utils/create-element'
import { EVENT_ROW_HEIGHT } from "../../../../../constants"
import props from "../../../../../models/props"
import EventsBand from "../../../../../models/band/events";

export default class Interval {
	 constructor(private band: EventsBand, private event: DomainEvent) {}

	public render() {
		const li = createElement(
			'li',
			'interval-wrap',
			[
				'box-sizing: border-box',
				'font-size: 0.8em',
				`height: ${EVENT_ROW_HEIGHT - 6}px`,
				'position: absolute',
				'white-space: nowrap',
				'z-index: 1',
			],
			[
				`background-color: ${this.band.color(.25)}`,
				`left: ${this.event.left}px`,
				`bottom: ${(this.event.row) * EVENT_ROW_HEIGHT}px`,
				`width: ${this.event.width}px`,
			]
		)

		const title = createElement(
			'div',
			'interval-title',
			[
				'display: inline-block',
				`line-height: ${EVENT_ROW_HEIGHT - 6}px`,
				`max-width: ${props.viewportWidth/10}px`,
				'overflow: hidden',
				'padding: 0 .25em',
				'text-overflow: ellipsis',
			]
		)
		title.textContent = this.event.label
		title.title = this.event.label

		li.appendChild(title)

		return li
	}
}
