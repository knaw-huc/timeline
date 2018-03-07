import Domain from './models/domain'
import props from './models/props'
import EventsBand from './views/band/events'
import SparklineBand from './views/band/sparkline'
import Indicator from './views/indicator'
import createElement from './utils/create-element'
import Config from './models/config'

const debounce = (func, wait) => {
	let timeout
	return () => {
		if (timeout != null) clearTimeout(timeout)
		timeout = setTimeout(() => { func('a'); console.log(timeout, this)}, wait)
	}
}

// TODO Add resize event
// TODO Add clean up method (remove dom nodes and event listeners)
// TODO Create intervals
// TODO Add open ranges (ie: people still alive)
// TODO If event granularity is equal to band granularity a point in time should be rendered as an interval 
// TODO flip PiT when on edge of timeline
// TODO Scroll vertical when events higher than viewportHeight
export default class Timeline {
	private config: Config
	private domains: Domain[]
	private views = []
	private wrapper: HTMLElement

	constructor(config: Partial<Config>) {
		this.config = new Config(config)
		props.init(this.config)

		this.domains = this.createDomains()

		this.config.rootElement.appendChild(this.render())

		window.addEventListener('resize', debounce(this.resize, 1000))
	}

	public remove() {
		window.removeEventListener('resize', this.resize)
		this.views.forEach(v => v.remove())
		this.config.rootElement.removeChild(this.wrapper)
		this.wrapper.remove()
		this.wrapper.innerHTML = ''
		this.wrapper = null
	}

	private resize = (i) => {
		console.log('r', i)
		// this.remove()
		// this.domains = this.createDomains()
		// this.config.rootElement.appendChild(this.render())
		// window.addEventListener('resize', this.resize)
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
		return this.config.domains.map(d => new Domain(d))
	}

	private renderBands(): void {
		const bands = this.domains.map(d => {
			if (d.type === 'EVENTS') return new EventsBand(d, this.config.events)
			if (d.type === 'SPARKLINE') return new SparklineBand(d, this.config.events, this.config.aggregate)
		})
		this.views.push(...bands)
		bands.forEach(b => this.appendToWrapper(b))
	}

	private renderIndicators(): void {
		const indicators = this.domains
			.filter(d => d.hasIndicatorFor != null)
			.map(d => new Indicator(d, this.domains[d.hasIndicatorFor]))
		this.views.push(...indicators)
		indicators.forEach(this.appendToWrapper)
	}

	private appendToWrapper = (child) => this.wrapper.appendChild(child.render())
}