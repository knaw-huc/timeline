import { CENTER_CHANGE_DONE, Ratio, Milliseconds, Pixels, colors } from "../constants"
import Config from "./config"
// import { debounce } from "../utils"
import Domain from "./domain"
import DomainConfig from "./domain.config";
import { RawEv3nt } from "./event";
// import { onVisible } from "../views/band/minimap";
import { debounce, onVisible } from "../utils";

/**
 * Create a range from 0 up to, but not including n
 * ie: 3 => [0, 1, 2]
 * ie: 6 => [0, 1, 2, 3, 4, 5]
 */
function createRange(n: number) {
	return Array.apply(null, {length: n}).map(Number.call, Number)
}

/**
 * Random select an given amount from a set
 * ['a', 'b', 'c', 'd'], 2 => ['d', 'a']
 * [1, 2, 3, 4, 5, 6, 7, 8], 4 => [2, 1, 8, 4]
 */
function selectRandom(set: (string | number)[], amount: number) {
	const selected = []

	while(selected.length < amount) {
		const randomIndex = Math.floor(Math.random() * set.length)
		const nextItem = set[randomIndex]	
		if (selected.indexOf(nextItem) === -1 || set.length < amount) selected.push(nextItem)
	}

	return selected
}

export class Props {
	private readonly defaultCenter = .5
	config: Config
	domains: Domain[]

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

		this.config = {
			...config,
			domains: config.domains.map(d => new DomainConfig(d, this.viewportWidth))
		}

		const dates: number[] = this.config.domains
			.filter(d => d.type === 'events')
			.reduce((prev, curr) => {
				const { events } = curr.orderedEvents
				const firstEvent = events[0]
				const lastEvent = events[events.length - 1]
				prev.push(firstEvent.date_min, firstEvent.date, firstEvent.end_date, firstEvent.end_date_max)	
				prev.push(lastEvent.date_min, lastEvent.date, lastEvent.end_date, lastEvent.end_date_max)	
				return prev
			}, [])
			.filter(d => d != null)

		this.from = Math.min(...dates)
		this.to = Math.max(...dates)
		this.time = this.to - this.from

		if (config.center != null) this.center = config.center

		// Last, but not least, initiate the Domains. This depends on almost all the data
		// in this class, so keep it last (after viewport size, from, to, time, etc are set)
		const indices = selectRandom(createRange(colors.length), this.config.domains.filter(d => d.type === 'events').length)
		this.domains = this.config.domains.map((d, i) => new Domain(d, colors[indices[i]]))
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
		this.visibleEvents = this.domains
			.filter(d => d.config.type === 'events')
			.reduce((prev, curr) => {
				return prev.concat(curr.config.orderedEvents.events.filter(onVisible(from, to)))
			}, [])
	}

	private centerChangeDone = debounce(() => {
		this.calculateVisibleEvents()
		document.dispatchEvent(new CustomEvent(CENTER_CHANGE_DONE))
	}, 300)
}

export default new Props()