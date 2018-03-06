import Domain from './models/domain'
import props from './models/props'
import EventsBand from './views/band/events'
import SparklineBand from './views/band/sparkline'
import Indicator from './views/indicator'
import createElement from './utils/create-element'

// TODO create Config class
const defaultConfig = {
	aggregate: [],
	center: .5,
	domains: [],
	events: [],
	rootElement: null,
}

// TODO Add resize event
// TODO Add clean up method (remove dom nodes and event listeners)
// TODO Create intervals
// TODO Add open ranges (ie: people still alive)
export default class Timeline {
	private domains: Domain[]
	private wrapper: HTMLElement

	constructor(private config) {
		this.config = {...defaultConfig, ...config}

		const edges = []
		if (this.config.domains.some(d => d.type === 'EVENTS') && this.config.events.length > 1) {
			edges.push(new Date(this.config.events[0].date))
			edges.push(props.to = new Date(this.config.events[this.config.events.length - 1].date))
		}
		if (this.config.domains.some(d => d.type === 'SPARKLINE') && this.config.aggregate.length > 1) {
			edges.push(new Date(this.config.aggregate[0].year, 0, 1))
			edges.push(new Date(this.config.aggregate[this.config.aggregate.length - 1].year, 0, 1))
		}
		if (edges.length < 2) throw Error('Cannot draw Timeline with this config')

		props.from = new Date(Math.min(...edges))
		props.to = new Date(Math.max(...edges))

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
				'user-select: none',
				'width: 100%',
			]
		)
			
		this.renderBands()
		this.renderIndicators()

		return this.wrapper
	}

	private createDomains(): Domain[] {
		const style = getComputedStyle(this.config.rootElement)
		const height = parseInt(style.getPropertyValue('height'), 10)
		const width = parseInt(style.getPropertyValue('width'), 10)
		return this.config.domains.map(d => new Domain(d, width, height))
	}

	private renderBands(): void {
		this.domains.forEach(d => {
			let b
			if (d.type === 'EVENTS') b = new EventsBand(d, this.config.events)
			else if (d.type === 'SPARKLINE') b = new SparklineBand(d, this.config.events, this.config.aggregate)
			if (b) this.appendToWrapper(b)
		})
	}

	private renderIndicators(): void {
		this.domains
			.filter(d => d.hasIndicatorFor != null)
			.map(d => new Indicator(d, this.domains[d.hasIndicatorFor]))
			.forEach(this.appendToWrapper)
	}

	private appendToWrapper = (child) => this.wrapper.appendChild(child.render())
}