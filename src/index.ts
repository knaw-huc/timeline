import props from './models/props'
import Indicator from './views/indicator'
import createElement from './utils/create-element'
// import eventsWorker from './utils/events.worker'
import { debounce } from './utils/index'
import Config from './models/config'
import Band from './views/band';
import Domain from './models/domain';

// TODO Add resize event
// TODO Add clean up method (remove dom nodes and event listeners)
// TODO Add open ranges (ie: people still alive)
// TODO If event granularity is equal to band granularity a point in time should be rendered as an interval 
// TODO flip PiT when on edge of timeline
// TODO Scroll vertical when events higher than viewportHeight
export default class Timeline {
	private config: Config
	private bands:Band[] = []
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
		this.bands = this.config.domains.map(d => new Band(d, this.config.events, this.config.aggregate))
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