import { CENTER_CHANGE_DONE, Ratio, Milliseconds, Pixels } from "../constants"
import Config from "./config"
import MinimapBand from "./band/minimap"
import EventsBand from "./band/events"
import { debounce, calcPixelsPerMillisecond } from "../utils"
import prepareConfig from '../utils/prepare-config'
import { byDate } from "../utils/dates";

export class Props {
	private readonly defaultCenter = .5

	eventsBand: EventsBand
	minimapBands: MinimapBand[]

	// Timestamp of the start date of the timeline
	from: Milliseconds

	// Total time of the timeline
	time: Milliseconds

	// Timestamp of the end date of the timeline
	to: Milliseconds

	viewportHeight: Pixels
	viewportOffset: Pixels
	viewportWidth: Pixels

	async init(config: Config) {
		if (config.rootElement == null) console.error('[init] No rootElement found')

		this.dimensions = config.rootElement

		const froms = []
		const tos = []
		for (const domain of config.events.domains) {
			let events
			if (domain.hasOwnProperty('events')) {
				domain.events.sort(byDate)	
				events = domain.events
			}
			if (events == null) events = domain.orderedEvents.events

			froms.push(events[0].date_min || events[0].date)
			tos.push(events.reduce((prev, curr) => {
				return Math.max(prev, curr.end_date || -Infinity, curr.end_date_max || -Infinity)
			}, -Infinity))
		}
		this.from = Math.min(...froms) 
		this.to = Math.max(...tos)

		this.time = this.to - this.from

		// const pixelsPerMillisecond2 = calcPixelsPerMillisecond(this.viewportWidth, config.events.zoomLevel || 0, this.to - this.from)

		// this.from -= (this.viewportWidth / 8) / pixelsPerMillisecond2
		// this.to += (this.viewportWidth / 8) / pixelsPerMillisecond2
		// // this.to += this.time * .1
		// this.time = this.to - this.from

		const pixelsPerMillisecond = calcPixelsPerMillisecond(this.viewportWidth, config.events.zoomLevel || 0, this.to - this.from)
		config = await prepareConfig(config, pixelsPerMillisecond)

		if (config.center != null) this.center = config.center

		this.minimapBands = config.minimaps.map(mm => new MinimapBand(mm))

		this.eventsBand = new EventsBand(config.events)
	}

	/** Current center of the timeline by ratio [0, 1] */
	private _center: Ratio = this.defaultCenter
	get center() { return this._center }
	set center(n: Ratio) {
		if ((this._center === 0 && n < 0) || (this._center === 1 && n > 1)) return
		else if (n < 0) this._center = 0
		else if (n > 1) this._center = 1
		else this._center = n
		this.centerChangeDone()
	}

	set dimensions(rootElement: HTMLElement) {
		const style = getComputedStyle(rootElement)

		this.viewportHeight = parseInt(style.getPropertyValue('height'), 10)
		this.viewportOffset = rootElement.getBoundingClientRect().top
		this.viewportWidth = parseInt(style.getPropertyValue('width'), 10)
	}

	private centerChangeDone = debounce(() => {
		document.dispatchEvent(new CustomEvent(CENTER_CHANGE_DONE))
	}, 300)
}

export default new Props()