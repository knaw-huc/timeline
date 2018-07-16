import props from './models/props'
import Config from './models/config'
import Band from './views/band'
import Indicator from './views/indicator'
import createElement from './utils/create-element'
import { debounce } from './utils/index'
import { orderEvents } from './utils/events.worker'
import Api from './api'

export { orderEvents }

// TODO Add resize event
// TODO Add clean up method (remove dom nodes and event listeners)
// TODO Add open ranges (ie: people still alive)
// TODO If event granularity is equal to band granularity a point in time should be rendered as an interval (as unsure?)
// TODO flip PiT when on edge of timeline
// TODO Scroll vertical when events higher than viewportHeight
// TODO max size of canvas is 32676px, so the current minimap does not work on big screens and large timelines
//		create a prev, curr, next canvas, te size of the viewport width and move and update them on center change
// TODO Move controls outside timeline and add an API to the timeline
// TODO Make the timeline standalone, so it does not need the server
export default class Timeline extends Api {
	private wrapper: HTMLElement

	constructor(config: Config) {
		super(config)

		config.rootElement.appendChild(this.render())
		window.addEventListener('resize', this.debouncedRefresh)
	}

	private refresh = (config: Partial<Config> = {}) => {
		console.error('Resize event not implemented!!')
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
		this.renderIndicators()

		return this.wrapper
	}

	private renderBands(): void {
		// TODO remove second param: props is global
		this.bands = props.domains.map(d => new Band(d, props.config.aggregate))
		this.bands.forEach(this.appendToWrapper)
	}

	private renderIndicators(): void {
		this.bands
			.filter(band => band.domain.config.hasIndicatorFor != null)
			.map(band => new Indicator(band.domain, this.bands[band.domain.config.hasIndicatorFor].domain))
			.forEach(this.appendToWrapper)
	}

	private appendToWrapper = (child) => this.wrapper.appendChild(child.render())
}
