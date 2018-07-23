import props from './models/props'
import Config from './models/config'
import Band from './views/band'
// import Indicator from './views/indicator'
import createElement from './utils/create-element'
import { debounce } from './utils/index'
import { orderEvents, OrderedEvents } from './utils/events.worker'
import Api from './api'
import eventBus from './event-bus'
import { CENTER_CHANGE_DONE } from './constants';
import MiniMap from './views/band/minimap';

export { Config as TimelineConfig, orderEvents, OrderedEvents }

// TODO add a roadmap
// TODO add zoom func
// TODO Add open ranges (ie: people still alive)
// TODO If event granularity is equal to band granularity a point in time should be rendered as an interval (as unsure?)
// TODO flip PiT when on edge of timeline
// TODO Scroll vertical when events higher than viewportHeight
// TODO keep the labels visible when the event is still visible but the label outside the viewport
// TODO remove topOffsetRatio
// TODO make it possible to have only minimap bands (see index.floods.html)
// TODO add check if `type` prop is present in config
// TODO make indicator draggable
// TODO all visible from/to is the same for all domains with type === 'events', so move to props
export default class Timeline extends Api {
	private wrapper: HTMLElement

	constructor(config: Config) {
		super()

		props.init(config)

		config.rootElement.appendChild(this.render())

		// <DEBUGGING>
		 document.addEventListener(CENTER_CHANGE_DONE, () => {
			const data = {} 
			const body = document.getElementsByTagName('body')[0]
			function countChildren(root: Element) {
				Array.from(root.children).forEach(child => {
					const name = `${child.tagName}-${child.className}`
					data[name] = data.hasOwnProperty(name) ? ++data[name] : 1
					countChildren(child)
				})
			}
			countChildren(body)
			console.log(data, props.visibleEvents.length)
		})
		// </DEBUGGING>

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

	public reload = (config?: Config) => {
		config = config != null ? config : props.config
		props.init(config)

		this.removeChildren()
		this.renderBands()
	}
	private debouncedReload = debounce(this.reload, 600)

	private render() {
		this.wrapper = createElement(
			'div',
			'wrapper',
			[
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

		this.renderLabels()
		this.renderIndicators()
	}

	private renderIndicators(): void {
		this.bands
			.map(band => new MiniMap(band.domain))
			.forEach(this.appendToWrapper)

		// this.bands
		// 	.filter(band => band.domain.config.targets != null)
		// 	.map(band => new Indicator(band.domain))
		// 	.forEach(this.appendToWrapper)
	}

	private renderLabels() {
		props.domains
			.filter(d => d.config.label != null)
			.map(d => {
				const eventsLabel: HTMLDivElement = createElement('div', 'events-label',
					[
						'border-bottom-right-radius: 4px',
						'color: #444',
						'font-size: .8em',
						'font-family: sans-serif',
						'padding: 2px 4px',
						'position: absolute',
					],
					[
						`top: ${d.config.topOffsetRatio * 100}%`
					]
				)
				eventsLabel.innerText = d.config.label
				this.wrapper.appendChild(eventsLabel)
			})

	}

	private appendToWrapper = (child) => this.wrapper.appendChild(child.render())
}
