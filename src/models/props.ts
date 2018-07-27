import { CENTER_CHANGE_DONE, Ratio, Milliseconds, Pixels } from "../constants"
import Config from "./config"
import MinimapBand from "./band/minimap"
import EventsBand from "./band/events"
import { debounce } from "../utils"
import prepareConfig from '../utils/prepare-config'

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
	viewportWidth: Pixels

	init(config: Config) {
		if (config.rootElement == null) console.error('[init] No rootElement found')

		this.dimensions = config.rootElement

		config = prepareConfig(config, this.viewportWidth)

		this.from = config.events.domains
			.reduce((prev, curr) => {
				const { from } = curr.orderedEvents
				if (prev == null) return from
				return (prev < from) ? prev : from
			}, null as number)

		this.to = config.events.domains
			.reduce((prev, curr) => {
				const { to } = curr.orderedEvents
				if (prev == null) return to
				return (prev > to) ? prev : to
			}, null as number)

		this.time = this.to - this.from

		if (config.center != null) this.center = config.center

		this.minimapBands = config.minimaps.map(mm => new MinimapBand(mm))

		this.eventsBand = new EventsBand(config.events)

		// Last, but not least, initiate the Domains. This depends on almost all the data
		// in this class, so keep it last (after viewport size, from, to, time, etc are set)
		// const indices = selectRandom(createRange(colors.length), this.config.domains.filter(d => d.type === 'events').length)
		// this.domains = this.config.domains.map((d, i) => new Domain(d, colors[indices[i]]))
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
		const nextWidth = parseInt(style.getPropertyValue('width'), 10)
		const nextHeight = parseInt(style.getPropertyValue('height'), 10)

		this.viewportWidth = nextWidth
		this.viewportHeight = nextHeight
	}

	private centerChangeDone = debounce(() => {
		document.dispatchEvent(new CustomEvent(CENTER_CHANGE_DONE))
	}, 300)
}

export default new Props()