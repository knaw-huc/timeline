import { CENTER_CHANGE_DONE, Milliseconds, Pixels } from "../constants"
import Config from "./config"
import MinimapBand from "./band/minimap"
// import EventsBand from "./band/events"
import { debounce } from "../utils"
import EventsBand from "./band/events";
// import prepareConfig from '../utils/prepare-config'
// import { byDate } from "../utils/dates";

function onEventsBand (band: MinimapBand | EventsBand): band is EventsBand {
	return band instanceof EventsBand
}

function onMinimapBand (band: MinimapBand | EventsBand): band is MinimapBand {
	return band instanceof MinimapBand
}

export class Props {
	private readonly defaultCenterRatio = .5

	bands: (EventsBand | MinimapBand)[]
	eventsBands: EventsBand[]
	minimapBands: MinimapBand[]
	controlBand: EventsBand
	// minimapBands: MinimapBand[]

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

	init(config: Config) {
		if (config.rootElement == null) console.error('[init] No rootElement found')

		this.rootElement = config.rootElement
		this.dimensions = this.rootElement

		const [froms, tos] = config.bands.reduce((prev, curr) => {
			if (curr instanceof MinimapBand) return prev
			const events = curr.config.orderedEvents == null ? curr.config.events : curr.config.orderedEvents.events
			prev[0].push(events[0].date_min || events[0].date)
			prev[1].push(events.reduce((prev, curr) => {
				return Math.max(prev, curr.end_date || -Infinity, curr.end_date_max || -Infinity)
			}, -Infinity))
			return prev
		}, [[], []])

		this.from = Math.min(...froms) 
		this.to = Math.max(...tos)

		this.time = this.to - this.from

		this.center = (config.center != null) ?
			config.center :
			this.from + (this.defaultCenterRatio * this.time)

		this.bands = config.bands
		this.eventsBands = this.bands.filter(onEventsBand)
		this.minimapBands = this.bands.filter(onMinimapBand)
		this.controlBand = config.controlBand != null ? config.controlBand : this.eventsBands[0]

		for (const band of this.bands) {
			band.init()
		}
	}

	resize() {
		this.dimensions = this.rootElement
	}
}

export default new Props()