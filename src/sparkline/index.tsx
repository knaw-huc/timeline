import * as React from 'react'
import { IAggregate, IDomainDef } from '../index'
import Domain from '../models/domain'
import Rulers from '../rulers/rulers'
import DomainLabels from './domain-labels'

export interface IProps {
	aggregate: IAggregate[]
	domain: Domain
	domainDef: IDomainDef
}
const Sparkline: React.SFC<IProps> = (props) => {
	if (props.aggregate == null) return null
	// #TODO
	// Fix sparkline if width is smaller than aggregate length,
	// this means there are more aggregation elements than pixels
	if (props.aggregate.length > props.domain.width) return null

	// Find the highest count (in math: the range), other counts will
	// be relative to the highest count. 
	const countMax = props.aggregate.reduce((prev, curr) => { return Math.max(prev, curr.count) }, 0)

	// Generate a path from the aggregation points
	const path = props.aggregate.reduce((prev, curr, index) => {
		const curveType = index === 0 ? 'M' : 'L'
		const x = (props.domain.width / (props.aggregate.length - 1)) * index
		const y = props.domain.height - ((curr.count / countMax) * props.domain.height)
		return `${prev} ${curveType} ${x} ${y}`
	}, '')

	// The (auto)fill of the path goes straight from the last position to the first
	// position, but it should go to the lower right corner and then to the lower
	// left corner, just (1px) out of the viewport. So a two lines are added on the
	// right and on the bottom to close the path manually.
	const pathCloser = ` L ${props.domain.width + 1} ${props.domain.height + 1} L -1 ${props.domain.height + 1}`

	return (
		<div>
			{
				props.domainDef.rulers &&
				<Rulers
					domain={props.domain}
				/>
			}
			{
				props.domainDef.domainLabels &&
				<DomainLabels
					domain={props.domain}
				/>
			}
			<svg
				viewBox={`0 0 ${props.domain.width} ${props.domain.height}`}
				style={{
					position: 'relative',
					zIndex: 1,
				}}
			>
				<path
					d={path + pathCloser}
					style={{
						fill: 'rgba(245, 245, 255, .7)',
						stroke: 'rgb(180, 180, 255)',
					}}
				/>
			</svg>
		</div>
	)
}

export default Sparkline