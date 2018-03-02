import Domain from './models/domain'
import EventsBand from './views/band/events'
import SparklineBand from './views/band/sparkline'
import Indicator from './views/indicator'
import createElement from './utils/create-element'
import createAggregate from './utils/create-aggregate'
import events from './data'

const defaultProps = {
	aggregate: [],
	center: .5,
	domains: [],
	events: events,
	rootElement: null,
}

export default class Timeline {
	private domains: Domain[]
	private wrapper: HTMLElement

	constructor(private props) {
		this.props = {...defaultProps, ...props}

		this.domains = this.createDomains()

		this.props.rootElement.appendChild(this.render())
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
		

		// const t0 = performance.now()
		// const d = domains[0]
		// const events = this.props.events
		// 	.filter(x => x.date > d.dateAtProportion(.5 - d.visibleRatio) && x.date < d.dateAtProportion(.5 + d.visibleRatio))
		// console.log(events)
		// const t1 = performance.now()
		// console.log((t1-t0)/1000)

			
		this.renderEvents()
		this.renderSparklines()
		this.renderIndicators()

		return this.wrapper
	}

	private createDomains(): Domain[] {
		const { width, height } = this.props.rootElement.getBoundingClientRect()
		const from = this.props.events[0].date
		const to = this.props.events[this.props.events.length - 1].date
		return this.props.domains
			.map(d => {
				const domain = new Domain(d, from, to, width, height)
				domain.setCenter(this.props.center)
				return domain
			})
	}

	private renderEvents(): void {
		this.domains
			.filter(d => d.type === 'EVENTS')
			.map(d => new EventsBand(d, this.props.events))
			.forEach(this.appendToWrapper)
	}

	private renderSparklines(): void {
		this.domains
			.filter(d => d.type === 'SPARKLINE')
			.map(d => new SparklineBand(d, createAggregate(this.props.events)))
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