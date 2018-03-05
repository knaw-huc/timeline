import Domain from './models/domain'
import props from './models/props'
import EventsBand from './views/band/events'
import SparklineBand from './views/band/sparkline'
import Indicator from './views/indicator'
import createElement from './utils/create-element'
import createAggregate from './utils/create-aggregate'
import events from './data'

const defaultConfig = {
	aggregate: [],
	center: .5,
	domains: [],
	events: events,
	rootElement: null,
}

export default class Timeline {
	private domains: Domain[]
	private wrapper: HTMLElement

	constructor(private config) {
		this.config = {...defaultConfig, ...config}

		props.from = this.config.events[0].date
		props.to = this.config.events[this.config.events.length - 1].date

		this.domains = this.createDomains()

		this.config.rootElement.appendChild(this.render())
	}

	private render() {
		this.wrapper = createElement(
			'div',
			'wrapper',
			[
				'background-color: teal',
				'box-sizing: border-box',
				'height: 100%',
				'overflow: hidden',
				'position: relative',
				'width: 100%',
			]
		)
			
		this.renderEvents()
		this.renderSparklines()
		this.renderIndicators()

		return this.wrapper
	}

	private createDomains(): Domain[] {
		const { width, height } = this.config.rootElement.getBoundingClientRect()
		return this.config.domains.map(d => new Domain(d, width, height))
	}

	private renderEvents(): void {
		this.domains
			.filter(d => d.type === 'EVENTS')
			.map(d => new EventsBand(d, this.config.events))
			.forEach(this.appendToWrapper)
	}

	private renderSparklines(): void {
		this.domains
			.filter(d => d.type === 'SPARKLINE')
			.map(d => new SparklineBand(d, createAggregate(this.config.events)))
			.forEach(this.appendToWrapper)
	}

	private renderIndicators(): void {
		this.domains
			.filter(d => d.hasIndicatorFor != null)
			.map(d => new Indicator(d, this.domains[d.hasIndicatorFor]))
			.forEach(this.appendToWrapper)
	}

	private appendToWrapper = (child) => this.wrapper.appendChild(child.render())
}