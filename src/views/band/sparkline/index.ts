import Domain from '../../../models/domain'
import { createSvg } from '../../../utils/create-element'
import aggregateWorker from '../../../utils/aggregate.worker'
import { AggregateEntry } from '../../../models/config'
import props from '../../../models/props'
import { RawEv3nt } from '../../../models/event';

export default class Sparkline {
	private svg: SVGElement
	private events: RawEv3nt[]

	constructor(private domain: Domain, private aggregate: AggregateEntry[]) {
		this.events = props.intervals.concat(props.pointsInTime)
	}

	render() {
		this.svg = createSvg('svg', null, {
			height: `${this.domain.height}px`,
			preserveAspectRatio: "none",
			viewBox: `0 0 ${this.domain.width} ${this.domain.height}`,
			width: `${this.domain.width}px`,
		})

		if (this.aggregate.length) {
			this.renderPath()
		}
		else if (this.events.length) {
			aggregateWorker(this.events, (aggregate) => {
				this.aggregate = aggregate
				this.renderPath()
			})
		}

		return this.svg
	}

	protected renderChildren() {}

	private createPath(): string {
		// Find the highest count (in math: the range), other counts will
		// be relative to the highest count. 
		const countMax = this.aggregate.reduce((prev, curr) => { return Math.max(prev, curr.count) }, 0)

		// Generate a path from the aggregation points
		const path = this.aggregate.reduce((prev, curr, index) => {
			const curveType = index === 0 ? 'M' : 'L'
			const x = (this.domain.width / (this.aggregate.length - 1)) * index
			const y = this.domain.height - ((curr.count / countMax) * this.domain.height)
			return `${prev} ${curveType} ${x} ${y}`
		}, '')

		// The (auto)fill of the path goes straight from the last position to the first
		// position, but it should go to the lower right corner and then to the lower
		// left corner, just (1px) out of the viewport. So a two lines are added on the
		// right and on the bottom to close the path manually.
		const pathCloser = ` L ${this.domain.width + 1} ${this.domain.height + 1} L -1 ${this.domain.height + 1}`

		return path + pathCloser
	}

	private renderPath() {
		const pathElement = createSvg(
			'path', 
			[
				'fill: rgba(245, 245, 255, .7)',
				'stroke: rgb(180, 180, 255)',
			],
			{ d: this.createPath() }
		)
		this.svg.appendChild(pathElement)
	}
}