import props from './models/props'
import Config from './models/config/index'
import BandView from './views/band'
import createElement from './utils/create-element'
import { debounce, calcPixelsPerMillisecond } from './utils'
import { OrderedEvents, orderEvents } from './utils/events.worker'
import Api from './api'
import EventsBandView from './views/band/events'
import Canvas from './views/canvas'
import View from './views'
import Label from './views/label'
import MinimapBand from './models/band/minimap'
import EventsBand from './models/band/events'
// import Debug from './views/debug'

export {
	Config as TimelineConfig,
	orderEvents,
	OrderedEvents,
	calcPixelsPerMillisecond,
	EventsBand,
	MinimapBand,
}

// FIXME click event after vertical scroll
// TODO implement SCROLL_DONE event
// TODO timeline at speed 1 should be a fixed speed (like one viewport per 10s or something)
// TODO expose only API, put the Timeline and it's render in a separate view
// TODO add async loading of events
// TODO disambiguate click/scroll
// TODO add API to constrain by spacial data
// TODO Add open ranges (ie: people still alive) and EDTF dates
// TODO zoom in to milliseconds
// TODO If event granularity is equal to band granularity a point in time should be rendered as an interval (as unsure?)
// TODO flip PiT when on edge of timeline
// TODO make it possible to have only minimap bands (see examples/floods)
// TODO use available vertical space (not fixed to EVENT_HEIGHT), see examples/100m 
// TODO add context menu for settings (which bands to show, toggle hor/ver scroll, change colors)
// TODO add info about how many events below and above current view (show after scroll and hide after x seconds)
export default class Timeline extends Api {
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

		// Render bands
		this.views = props.bands
			.map(band =>
				(band instanceof EventsBand) ?
					new EventsBandView(band, this.onSelect) :
					new BandView(band)
			)
		this.views.push(new Canvas())
		this.views.forEach(this.appendToWrapper)	

		this.renderLabels()

		// @ts-ignore
		// if (process.env.NODE_ENV === 'development') this.appendToWrapper(new Debug())

		const redLine = createElement('div', 'red-line', [
			'background-color: rgb(126, 0, 0)',
			'bottom: 0',
			'left: calc(50% - 1px)',
			'position: absolute',
			'top: 0',
			'width: 2px',
			'z-index: 4'
		])

		this.wrapper.appendChild(redLine)

		return this.wrapper
	}

	private renderLabels() {
		props.bands
			.filter(band => band instanceof EventsBand && band.config.label != null)
			.map(band => new Label(band as EventsBand))
			.forEach(this.appendToWrapper)
	}

	private appendToWrapper = (child: View) => {
		let children = child.render()
		if (!Array.isArray(children)) children = [children]
		children.forEach(c => this.wrapper.appendChild(c))
	}
}
