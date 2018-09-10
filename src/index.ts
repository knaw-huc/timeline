import props, { Props } from './models/props'
import Config from './models/config/index'
import BandView from './views/band'
import createElement from './utils/create-element'
import { debounce, calcPixelsPerMillisecond } from './utils'
import { OrderedEvents, orderEvents } from './utils/events.worker'
import Api, { OnChangeFunction } from './api'
import EventsBandView from './views/band/events'
import Canvas from './views/canvas'
import View from './views'
import Label from './views/label'
import Popup from './views/popup'
import MinimapBand from './models/band/minimap'
import EventsBand from './models/band/events'
import { formatDate } from './utils/dates'
import { RawEv3nt } from './models/event'
import { BandType } from './models/band'
// import Debug from './views/debug'

export {
	Config as TimelineConfig,
	Props as TimelineProps,
	EventsBand,
	MinimapBand,
	OrderedEvents,
	calcPixelsPerMillisecond,
	formatDate,
	orderEvents,
	RawEv3nt
}

export type OnSelectFunction = (e: RawEv3nt, band: EventsBand, props: Props) => void

// TODO sort intervals first and than the points in time on top
// TODO use available vertical space (not fixed to EVENT_HEIGHT), see examples/100m 
// TODO expose only API, put the Timeline and it's render in a separate view
// TODO add async loading of events
// TODO add API to constrain by spacial data
// TODO Add open ranges (ie: people still alive)
// TODO If event granularity is equal to band granularity a point in time should be rendered as an interval (as unsure?)
// TODO make it possible to have only minimap bands (see examples/floods)
// TODO add context menu for settings (which bands to show, toggle hor/ver scroll, change colors)
// TODO add info about how many events below and above current view (show after scroll and hide after x seconds)
// TODO rearrange the grid after the events are zoomed in further than the config level (you get a grid per zoom level or event.row is different per zoom level)
// TODO add a picture to an event
// TODO add a popup to an event
// TODO make option for fixed minimap, no zoom when events band get's zoomed
export default class Timeline extends Api {
	private wrapper: HTMLDivElement
	private popup: Popup

	constructor(protected config: Config, onChange?: OnChangeFunction, private onSelect?: OnSelectFunction) {
		super(onChange)

		props.init(config)
		config.rootElement.appendChild(this.render())

		this.popup = new Popup(this.wrapper)

		const debouncedResize = debounce(this.resize, 600)
		window.addEventListener('resize', debouncedResize)
	}

	hidePopup() {
		this.popup.hide()
	}

	showPopup(event: RawEv3nt) {
		this.popup.show(event)
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
				band.type === BandType.EventsBand ?
					new EventsBandView(band as EventsBand, this.onSelect) :
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
			.filter(band => band.type === BandType.EventsBand && (band as EventsBand).config.label != null)
			.map(band => new Label(band as EventsBand))
			.forEach(this.appendToWrapper)
	}

	private appendToWrapper = (child: View) => {
		let children = child.render()
		if (!Array.isArray(children)) children = [children]
		children.forEach(c => this.wrapper.appendChild(c))
	}
}
