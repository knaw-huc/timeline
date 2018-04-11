import { CENTER_CHANGE_EVENT, DIMENSIONS_CHANGE_EVENT, CENTER_CHANGE_DONE_EVENT, Grid, Ratio, Milliseconds } from "../constants"
import Config from "./config"
import { debounce } from "../utils"
import { RawEv3nt } from "./event";

export class Props {
	grid: Grid
	rowCount: number
	events: RawEv3nt[] = []
	from: Milliseconds
	to: Milliseconds
	time: Milliseconds

	init(config: Config) {
		// this.edges = config
		this.dimensions = config.rootElement
	}

	private _center: Ratio = .5
	/** Current center of the timeline by ratio [0, 1] */
	get center() { return this._center }
	set center(n: Ratio) {
		if ((this._center === 0 && n < 0) || (this._center === 1 && n > 1)) return
		else if (n < 0) this._center = 0
		else if (n > 1) this._center = 1
		else this._center = n

		document.dispatchEvent(new CustomEvent(CENTER_CHANGE_EVENT, { detail: n }))
		this.centerChangeDone()
	}

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