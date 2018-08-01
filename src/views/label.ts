import View from "./index"
import createElement from '../utils/create-element'
import { EventsDomainConfig } from "../models/config";

export default class Label implements View {
	constructor(private domain: EventsDomainConfig) {}

	render() {
		const wrapper: HTMLDivElement = createElement('div', 'events-label-wrapper',
			[
				'border-top: 1px solid #CCC',
				'position: absolute',
				'width: 100%',
			],
			[
				`top: ${this.domain.topOffsetRatio * 100}%`
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
		eventsLabel.innerText = this.domain.label

		wrapper.appendChild(eventsLabel)

		return wrapper
	}
}