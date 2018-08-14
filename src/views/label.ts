import View from "./index"
import createElement from '../utils/create-element'
import EventsBand from "../models/band/events";

export default class Label implements View {
	constructor(private band: EventsBand) {}

	render() {
		const wrapper: HTMLDivElement = createElement('div', 'events-label-wrapper',
			[
				'border-top: 1px solid #CCC',
				'position: absolute',
				'width: 100%',
			],
			[
				`top: ${this.band.config.topOffsetRatio * 100}%`
			]
		)

		const eventsLabel: HTMLDivElement = createElement('div', 'events-label', [
			'background: white',
			'border-bottom-right-radius: 4px',
			'box-shadow: 1px 2px 4px #AAA',
			'display: inline-block',
			'color: #444',
			'font-size: .8em',
			'font-family: sans-serif',
			'padding: 4px 8px',
		])
		eventsLabel.innerText = this.band.config.label

		wrapper.appendChild(eventsLabel)

		return wrapper
	}
}