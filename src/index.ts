import EventsDomain from './models/events.domain'
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
		clearTimeout(timeout)
		timeout = setTimeout(func, wait)
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
	private bands:(EventsBand | SparklineBand)[] = []
	private wrapper: HTMLElement

	constructor(config: Partial<Config>) {
		this.config = new Config(config)
		props.init(this.config)

		this.config.rootElement.appendChild(this.render())

		window.addEventListener('resize', this.debouncedRefresh)
	}


	public remove() {
		window.removeEventListener('resize', this.debouncedRefresh)
		this.config.rootElement.removeChild(this.wrapper)
		this.wrapper.remove()
		this.wrapper.innerHTML = ''
		this.wrapper = null
	}

	public refresh = (config: Partial<Config> = {}) => {
		this.config.refresh(config)
		this.remove()
		this.config.rootElement.appendChild(this.render())
		window.addEventListener('resize', this.debouncedRefresh)
	}
	private debouncedRefresh = debounce(this.refresh, 1000)

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

		return this.wrapper
	}

	private renderBands(): void {
		this.bands = this.config.domains
			.map(d => {
				if (d.type === 'EVENTS') return new EventsBand(new EventsDomain(d, this.config.events))
				if (d.type === 'SPARKLINE') return new SparklineBand(new Domain(d), this.config.events, this.config.aggregate)
			})
		this.bands.forEach(b => this.appendToWrapper(b))

		this.renderIndicators()
	}

	private renderIndicators(): void {
		this.bands
			.filter(band => band.domain.config.hasIndicatorFor != null)
			.map(band => new Indicator(band.domain, this.bands[band.domain.config.hasIndicatorFor].domain))
			.forEach(this.appendToWrapper)
	}

	private appendToWrapper = (child) => this.wrapper.appendChild(child.render())
}