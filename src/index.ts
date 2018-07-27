import props from './models/props'
import Config from './models/config/index'
import BandView from './views/band'
import createElement from './utils/create-element'
import { debounce } from './utils'
import { orderEvents, OrderedEvents } from './utils/events.worker'
import Api from './api'
import EventsBandView from './views/band/events'
import Canvas from './views/canvas'

export { Config as TimelineConfig, orderEvents, OrderedEvents }

// TODO add a roadmap
// TODO Add open ranges (ie: people still alive)
// TODO If event granularity is equal to band granularity a point in time should be rendered as an interval (as unsure?)
// TODO flip PiT when on edge of timeline
// TODO Scroll vertical when events higher than viewportHeight
// TODO make it possible to have only minimap bands (see index.floods.html)
// TODO make indicator draggable
// TODO add config to add space/time before first and last events
// TODO if minimap visible area is bigger than viewport, zoom out the minimap
export default class Timeline extends Api {
	private wrapper: HTMLElement

	constructor(private config: Config) {
		super()

		props.init(config)

		config.rootElement.appendChild(this.render())

		window.addEventListener('resize', this.debouncedResize)
	}

	public resize = () => {
		props.dimensions = this.config.rootElement
		props.eventsBand.zoomLevel = props.eventsBand.zoomLevel
		props.minimapBands.forEach(mmb => mmb.zoomLevel = mmb.zoomLevel)
		this.animator.play()
	}
	private debouncedResize = debounce(this.resize, 600)

	public reload = (config?: Config) => {
		if (config != null) props.init(config)
		this.resize()
	}

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

		// Render canvas
		this.appendToWrapper(new Canvas())

		// Render bands (for mouse interactivity)
		this.appendToWrapper(new EventsBandView(props.eventsBand))
		props.minimapBands
			.map(band => new BandView(band))
			.forEach(this.appendToWrapper)

		this.renderLabels()

		return this.wrapper
	}

	// TODO use a class (like BandView) and a render method and appendToWrapper
	private renderLabels() {
		props.eventsBand.domains
			.filter(d => d.label != null)
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
						`top: ${d.topOffsetRatio * 100}%`
					]
				)
				eventsLabel.innerText = d.label
				this.wrapper.appendChild(eventsLabel)
			})

	}

	private appendToWrapper = (child) => this.wrapper.appendChild(child.render())
}
