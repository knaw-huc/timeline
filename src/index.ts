import props from './models/props'
import Config from './models/config/index'
import BandView from './views/band'
import createElement from './utils/create-element'
import { debounce, calcPixelsPerMillisecond } from './utils'
import { orderEvents, OrderedEvents } from './utils/events.worker'
import Api from './api'
import EventsBandView from './views/band/events'
import Canvas from './views/canvas'
import View from './views'
import Label from './views/label'

export { Config as TimelineConfig, orderEvents, OrderedEvents, calcPixelsPerMillisecond }

// TODO add config to add space/time before first and last events
// TODO use available vertical space (not fixed to EVENT_HEIGHT), see examples/100m 
// TODO zoom in to milliseconds
// TODO Add open ranges (ie: people still alive)
// TODO If event granularity is equal to band granularity a point in time should be rendered as an interval (as unsure?)
// TODO flip PiT when on edge of timeline
// TODO Scroll vertical when events higher than viewportHeight
// TODO make it possible to have only minimap bands (see index.floods.html)
// TODO make indicator draggable
// TODO show when playing animation (button pressed?)
export default class Timeline extends Api {
	private minimapBandViews: BandView[]
	private eventsBandView: EventsBandView
	private wrapper: HTMLElement

	constructor(protected config: Config, onChange?, private onSelect?) {
		super(config.rootElement, onChange)

		props.init(config)

		config.rootElement.appendChild(this.render())

		const debouncedResize = debounce(this.resize, 600)
		window.addEventListener('resize', debouncedResize)
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
		this.eventsBandView = new EventsBandView(props.eventsBand, this.onSelect)
		this.appendToWrapper(this.eventsBandView)

		this.minimapBandViews = props.minimapBands.map(band => new BandView(band))
		this.minimapBandViews.forEach(this.appendToWrapper)

		this.renderLabels()

		return this.wrapper
	}

	// TODO use a class (like BandView) and a render method and appendToWrapper
	private renderLabels() {
		props.eventsBand.domains
			.filter(d => d.label != null)
			.map(d => new Label(d))
			.forEach(this.appendToWrapper)

	}

	private appendToWrapper = (child: View) => {
		let children = child.render()
		if (!Array.isArray(children)) children = [children]
		children.forEach(c => this.wrapper.appendChild(c))
	}

	reload = (config?: Config) => {
		if (config != null) props.init(config)
		this.resize()
	}

	resize = () => {
		props.dimensions = this.config.rootElement
		props.eventsBand.zoomLevel = props.eventsBand.zoomLevel
		this.eventsBandView.resize()
		props.minimapBands.forEach(mmb => mmb.zoomLevel = mmb.zoomLevel)
		this.minimapBandViews.forEach(mmbv => mmbv.resize())
		this.animator.play()
	}
}
