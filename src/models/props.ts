import { CENTER_CHANGE_DONE, Ratio, Milliseconds, Pixels } from "../constants"
import Config from "./config"
import MinimapBand from "./band/minimap"
import EventsBand from "./band/events"
import { RawEv3nt } from "./event";
import { debounce, onVisible } from "../utils"
import animator from "../animator";

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

	visibleEvents: RawEv3nt[] = []

	init(config: Config) {
		this.dimensions = config.rootElement

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

	// TODO update event label if not in view (but rest of the event is)
	calculateVisibleEvents() {
		const [from, to] = this.domains.find(d => d.config.type === 'events').fromTo
		this.visibleEvents = this.eventsBand.domains
			.reduce((prev, curr) => {
				return prev.concat(curr.config.orderedEvents.events.filter(onVisible(from, to)))
			}, [])
	}

	private centerChangeDone = debounce(() => {
		this.calculateVisibleEvents()
		document.dispatchEvent(new CustomEvent(CENTER_CHANGE_DONE))
	}, 300)

	zoomIn() {
		animator.zoomTo(this.zoomLevel + 1)
		console.log('in', this.zoomLevel)
	}

	zoomOut() {
		const nextZoomLevel = (this.zoomLevel === 0) ? 0 :  this.zoomLevel - 1
		animator.zoomTo(nextZoomLevel)
		console.log('out', this.zoomLevel)
	}
}

export default new Props()