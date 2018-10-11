import { Milliseconds, Pixels, DEFAULT_IMAGE_PATH, EventType } from "../constants"
import Config from "./config"
import MinimapBand from "./band/minimap"
import EventsBand from "./band/events"
import { BandType } from './band'
import { RawEv3nt } from './event';
import { orderEvents } from '..';
import eventBus from '../event-bus';

function onEventsBand (band: MinimapBand | EventsBand): band is EventsBand {
	return band.type === BandType.EventsBand
}

function onMinimapBand (band: MinimapBand | EventsBand): band is MinimapBand {
	return band.type === BandType.MinimapBand
}

export class Props {
	private readonly defaultCenterRatio = .5

	parent: RawEv3nt

	bands: (EventsBand | MinimapBand)[]
	eventsBands: EventsBand[]
	minimapBands: MinimapBand[]
	controlBand: EventsBand
	// minimapBands: MinimapBand[]

	imagePath: string

	// Timestamp of the start date of the timeline
	from: Milliseconds

	// Total time of the timeline
	time: Milliseconds

	// Timestamp of the end date of the timeline
	to: Milliseconds

	rootElement: HTMLElement

	viewportHeight: Pixels
	viewportOffset: Pixels
	viewportWidth: Pixels

	/** Current center of the timeline by ratio [0, 1] */
	private _center: Milliseconds
	get center() { return this._center }
	set center(n: Milliseconds) {
		if ((this._center === this.from && n < this.from) || (this._center === this.to && n > this.to)) return
		if (n < this.from) this._center = this.from 
		else if (n > this.to) this._center = this.to
		else this._center = n
		eventBus.dispatch(EventType.CenterChange)
	}

	set dimensions(rootElement: HTMLElement) {
		const style = getComputedStyle(rootElement)

		this.viewportHeight = parseInt(style.getPropertyValue('height'), 10)
		this.viewportOffset = rootElement.getBoundingClientRect().top
		this.viewportWidth = parseInt(style.getPropertyValue('width'), 10)
	}

	init(config: Config) {
		if (config.rootElement == null) console.error('[init] No rootElement found')

		this.imagePath = config.imagePath != null ? config.imagePath : DEFAULT_IMAGE_PATH
		this.rootElement = config.rootElement
		this.dimensions = this.rootElement

		this.bands = config.bands
		this.eventsBands = this.bands.filter(onEventsBand)
		this.minimapBands = this.bands.filter(onMinimapBand)
		this.controlBand = config.controlBand != null ? config.controlBand : this.eventsBands[0]

		const t0 = performance.now()
		const options = {
			bands: this.eventsBands
				.map(band => ({
					events: band.config.events,
					zoomLevel: band.config.zoomLevel
				})),
			parent: config.parent,
			viewportWidth: this.viewportWidth
		}
		const orderResult = orderEvents(options)
		this.parent = orderResult.parent
		this.from = orderResult.from
		this.to = orderResult.to
		this.time = orderResult.time
		const t1 = performance.now();
		console.log('Performance: ', `${t1 - t0}ms\n[from] ${new Date(this.from).toUTCString()}\n[ to ] ${new Date(this.to).toUTCString()}`)

		this.center = (config.center != null) ?
			config.center :
			this.from + (this.defaultCenterRatio * this.time)

		for (const [index, band] of this.eventsBands.entries()) {
			band.init(orderResult.bands[index])
		}

		for (const band of this.minimapBands) {
			band.init()
		}
	}

	resize() {
		this.dimensions = this.rootElement
	}
}

export default new Props()