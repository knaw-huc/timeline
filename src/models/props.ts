import { CENTER_CHANGE_EVENT } from "../constants";
import Config from "./config";

export class Props {
	private _center: number = .5
	private _from: Date
	private _to: Date
	private _viewportWidth: number
	private _viewportHeight: number

	init(config: Config) {
		this.edges = config
		this.dimensions = config.rootElement
	}

	get center() { return this._center }
	set center(n: number) {
		if ((this._center === 0 && n < 0) || (this._center === 1 && n > 1)) return
		else if (n < 0) this._center = 0
		else if (n > 1) this._center = 1
		else this._center = n

		document.dispatchEvent(new CustomEvent(CENTER_CHANGE_EVENT, { detail: n }))
	}

	get from() { return this._from }
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
	}

	get viewportWidth() { return this._viewportWidth }
	get viewportHeight() { return this._viewportHeight }
	set dimensions(rootElement: HTMLElement) {
		const style = getComputedStyle(rootElement)
		this._viewportWidth = parseInt(style.getPropertyValue('width'), 10)
		this._viewportHeight = parseInt(style.getPropertyValue('height'), 10)
	}
}

export default new Props()