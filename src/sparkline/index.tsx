import * as React from 'react'
import { IAggregate } from '../index';
import { DATE_BAR_HEIGHT } from '../constants';

export interface IProps {
	aggregate: IAggregate[]
	width: number
}
const Sparkline: React.SFC<IProps> = (props) => {
	// #TODO
	// Fix sparkline if width is smaller than aggregate length,
	// this means there are more aggregation elements than pixels
	if (props.aggregate.length > props.width) return null

	// Find the highest count (in math: the range), other counts will
	// be relative to the highest count. 
	const countMax = props.aggregate.reduce((prev, curr) => { return Math.max(prev, curr.count) }, 0)

	// Generate a path from the aggregation points
	const path = props.aggregate.reduce((prev, curr, index) => {
		const curveType = index === 0 ? 'M' : 'L'
		const x = (props.width / (props.aggregate.length - 1)) * index
		const y = DATE_BAR_HEIGHT - ((curr.count / countMax) * DATE_BAR_HEIGHT)
		return `${prev} ${curveType} ${x} ${y}`
	}, '')

	// The (auto)fill of the path goes straight from the last position to the first
	// position, but it should go to the lower right corner and then to the lower
	// left corner, just (1px) out of the viewport. So a two lines are added on the
	// right and on the bottom to close the path manually.
	const pathCloser = ` L ${props.width + 1} ${DATE_BAR_HEIGHT + 1} L -1 ${DATE_BAR_HEIGHT + 1}`

	return (
		<svg
			style={{
				position: 'absolute',
				bottom: 0,
			}}
			viewBox={`0 0 ${props.width} ${DATE_BAR_HEIGHT}`}
		>
			<path
				d={path + pathCloser}
				style={{
					fill: 'rgb(245, 245, 255)',
					stroke: 'rgb(180, 180, 255)',
				}}
			/>
		</svg>
	)
}

export default Sparkline