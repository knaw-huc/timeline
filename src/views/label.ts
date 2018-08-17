import View from "./index"
import createElement from '../utils/create-element'
import EventsBand from "../models/band/events";

export default class Label implements View {
	constructor(private band: EventsBand) {}

	render() {
		const wrapper: HTMLDivElement = createElement('div', 'events-label-wrapper',
			[
				'border-top: 1px solid #CCC',
				'pointer-events: none',
				'position: absolute',
				'width: 100%',
				'z-index: 3',
			],
			[
				`top: ${this.band.config.topOffsetRatio * 100}%`
			]
		)

		const eventsLabel: HTMLDivElement = createElement('div', 'events-label', [
			'background: white',
			'border-bottom-right-radius: 4px',
			'box-shadow: 1px 2px 4px #AAA',
			'color: #444',
			'display: inline-block',
			'font-family: sans-serif',
			'font-size: .8em',
			'padding: 4px 8px',
		])
		eventsLabel.innerText = this.band.config.label

		wrapper.appendChild(eventsLabel)

		return wrapper
	}

	resize() {

	}
}