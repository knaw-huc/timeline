import Domain from '../../models/domain'
import { createSvg } from '../../utils/create-element'
import BandWrapper from './index'

export default class SparklineBand {
	constructor(private domain: Domain, private aggregate) {}

	public render() {
		const wrapper = new BandWrapper(this.domain).render()
		this.aggregate

		const svg = createSvg('svg', null, {
			height: `${this.domain.viewportHeight}px`,
			preserveAspectRatio: "none",
			viewBox: `0 0 ${this.domain.width} ${this.domain.viewportHeight}`,
			width: `${this.domain.width}px`,
		})

		const path = createSvg(
			'path', 
			[
				'fill: rgba(245, 245, 255, .7)',
				'stroke: rgb(180, 180, 255)',
			],
			{ d: this.createPath() }
		)

		svg.appendChild(path)

		wrapper.appendChild(svg)

		return wrapper
	}

	private createPath(): string {
		// Find the highest count (in math: the range), other counts will
		// be relative to the highest count. 
		const countMax = this.aggregate.reduce((prev, curr) => { return Math.max(prev, curr.count) }, 0)

		// Generate a path from the aggregation points
		const path = this.aggregate.reduce((prev, curr, index) => {
			const curveType = index === 0 ? 'M' : 'L'
			const x = (this.domain.width / (this.aggregate.length - 1)) * index
			const y = this.domain.viewportHeight - ((curr.count / countMax) * this.domain.viewportHeight)
			return `${prev} ${curveType} ${x} ${y}`
		}, '')

		// The (auto)fill of the path goes straight from the last position to the first
		// position, but it should go to the lower right corner and then to the lower
		// left corner, just (1px) out of the viewport. So a two lines are added on the
		// right and on the bottom to close the path manually.
		const pathCloser = ` L ${this.domain.width + 1} ${this.domain.viewportHeight + 1} L -1 ${this.domain.viewportHeight + 1}`

		return path + pathCloser
	}
}