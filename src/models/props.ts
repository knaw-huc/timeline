import { CENTER_CHANGE_EVENT, DIMENSIONS_CHANGE_EVENT, CENTER_CHANGE_DONE_EVENT } from "../constants"
import Config from "./config"
import { debounce } from "../utils"

export class Props {

	init(config: Config) {
		this.edges = config
		this.dimensions = config.rootElement
	}

	private _center: number = .5
	/** Current center of the timeline by ratio [0, 1] */
	get center() { return this._center }
	set center(n: number) {
		if ((this._center === 0 && n < 0) || (this._center === 1 && n > 1)) return
		else if (n < 0) this._center = 0
		else if (n > 1) this._center = 1
		else this._center = n

		document.dispatchEvent(new CustomEvent(CENTER_CHANGE_EVENT, { detail: n }))
		this.centerChangeDone()
	}

	private _from: Date
	private _to: Date
	/** Lowest date on the timeline */
	get from() { return this._from }
	/** Highest date on the timeline */
	get to() { return this._to }
	set edges(config: Config) {
		const edges = []
		if (config.domains.some(d => d.type === 'EVENTS') && config.events.length > 1) {
			edges.push(new Date(config.events[0].date))
			edges.push(new Date(config.events[config.events.length - 1].date))
		}
		if (config.domains.some(d => d.type === 'SPARKLINE') && config.aggregate.length > 1) {
			edges.push(new Date(config.aggregate[0].year, 0, 1))
			edges.push(new Date(config.aggregate[config.aggregate.length - 1].year, 0, 1))
		}
		if (edges.length < 2) throw Error('Cannot draw Timeline with this config')

		this._from = new Date(Math.min(...edges))
		this._to = new Date(Math.max(...edges))
		this._time = this._to.getTime() - this._from.getTime()
	}

	private _time: number
	/** Total time (ms) of the timeline */
	get time() { return this._time }

	private _viewportWidth: number
	private _viewportHeight: number
	/** Width of the timeline's viewport */
	get viewportWidth() { return this._viewportWidth }
	/** Height of the timeline's viewport */
	get viewportHeight() { return this._viewportHeight }
	set dimensions(rootElement: HTMLElement) {
		const style = getComputedStyle(rootElement)
		const nextWidth = parseInt(style.getPropertyValue('width'), 10)
		const nextHeight = parseInt(style.getPropertyValue('height'), 10)

		if (
			(this._viewportWidth != null && this._viewportWidth !== nextWidth) ||
			(this._viewportHeight != null && this._viewportHeight !== nextHeight)
		) {
			document.dispatchEvent(new CustomEvent(DIMENSIONS_CHANGE_EVENT))
		}

		this._viewportWidth = nextWidth
		this._viewportHeight = nextHeight
	}

	private centerChangeDone = debounce(() => document.dispatchEvent(new CustomEvent(CENTER_CHANGE_DONE_EVENT)), 300)
}

export default new Props()