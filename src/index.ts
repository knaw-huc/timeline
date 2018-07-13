import props from './models/props'
import Config from './models/config'
import Band from './views/band'
import Indicator from './views/indicator'
import createElement from './utils/create-element'
import { debounce } from './utils/index'
import { orderEvents } from './utils/events.worker'
import { CENTER_CHANGE_DONE_EVENT, Milliseconds, Ratio } from './constants'

export { orderEvents }

export interface OnChangeFunctionProps { center: Ratio, visibleFrom: Milliseconds, visibleTo: Milliseconds }
export type OnChangeFunction = (props: OnChangeFunctionProps, e: Event) => void

// TODO Add rows with domain knowledge
// TODO Add resize event
// TODO Add clean up method (remove dom nodes and event listeners)
// TODO Add open ranges (ie: people still alive)
// TODO If event granularity is equal to band granularity a point in time should be rendered as an interval 
// TODO flip PiT when on edge of timeline
// TODO Scroll vertical when events higher than viewportHeight
export default class Timeline {
	private bands:Band[] = []
	private wrapper: HTMLElement

	constructor(config: Config) {
		props.init(config)

		config.rootElement.appendChild(this.render())
		window.addEventListener('resize', this.debouncedRefresh)
	}

	remove() {
		window.removeEventListener('resize', this.debouncedRefresh)
		props.config.rootElement.removeChild(this.wrapper)
		this.wrapper.remove()
		this.wrapper.innerHTML = ''
		this.wrapper = null
	}

	refresh = (config: Partial<Config> = {}) => {
		// this.remove()
		// window.addEventListener('resize', this.debouncedRefresh)
	}
	private debouncedRefresh = debounce(this.refresh, 1000)

	change(onChange: OnChangeFunction) {
		document.addEventListener(CENTER_CHANGE_DONE_EVENT, (ev) => {
			const [from, to] = this.bands[0].domain.fromTo

			onChange(
				{
					center: props.center,
					visibleFrom: from,
					visibleTo: to,
				},
				ev
			)
		})
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