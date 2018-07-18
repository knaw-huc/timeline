import props from './models/props'
import Config from './models/config'
import Band from './views/band'
import Indicator from './views/indicator'
import createElement from './utils/create-element'
import { debounce } from './utils/index'
import { orderEvents } from './utils/events.worker'
import Api from './api'
import eventBus from './event-bus'
import { RELOAD, PROPS_UPDATED } from './constants';

export { orderEvents }

// TODO add zoom func
// TODO Add open ranges (ie: people still alive)
// TODO If event granularity is equal to band granularity a point in time should be rendered as an interval (as unsure?)
// TODO flip PiT when on edge of timeline
// TODO Scroll vertical when events higher than viewportHeight
// TODO Make the timeline standalone, so it does not need the server
export default class Timeline extends Api {
	private wrapper: HTMLElement

	constructor(config: Config) {
		super()

		props.init(config)

		config.rootElement.appendChild(this.render())

		document.addEventListener(PROPS_UPDATED, () => {
			this.renderBands()
		})
		window.addEventListener('resize', () => {
			this.removeChildren()
			this.debouncedReload()
		})
	}

	private removeChildren() {
		eventBus.flush()

		Array
			.from(this.wrapper.children)
			.forEach(child => this.wrapper.removeChild(child))

	}

	public reload = () => {
		this.removeChildren()
		this.dispatchReloadEvent()	
	}
	private dispatchReloadEvent = () => document.dispatchEvent(new CustomEvent(RELOAD))
	private debouncedReload = debounce(this.dispatchReloadEvent, 600)

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
		this.bands = props.domains.map(d => new Band(d))
		this.bands.forEach(this.appendToWrapper)

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
