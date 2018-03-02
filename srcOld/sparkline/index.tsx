import * as React from 'react'
import { IAggregate } from '../index'
import Domain from '../models/domain'
import DomainWrapper from '../domain-wrapper'

export interface IProps {
	aggregate: IAggregate[]
	domain: Domain
	style: React.CSSProperties
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
		const y = props.domain.viewportHeight - ((curr.count / countMax) * props.domain.viewportHeight)
		return `${prev} ${curveType} ${x} ${y}`
	}, '')

	// The (auto)fill of the path goes straight from the last position to the first
	// position, but it should go to the lower right corner and then to the lower
	// left corner, just (1px) out of the viewport. So a two lines are added on the
	// right and on the bottom to close the path manually.
	const pathCloser = ` L ${props.domain.width + 1} ${props.domain.viewportHeight + 1} L -1 ${props.domain.viewportHeight + 1}`

	// const x = (props.domain.width * props.domain.domainCenter) - ((props.domain.width * props.domain.visibleRatio) / 2)

	return (
		<DomainWrapper
			domain={props.domain}
			style={props.style}
		>
			<svg
				height={`${props.domain.viewportHeight}px`}
				style={{
					position: 'relative',
					zIndex: 1,
				}}
				preserveAspectRatio="none"
				viewBox={`0 0 ${props.domain.width} ${props.domain.viewportHeight}`}
				width={`${props.domain.width}px`}
			>
				<path
					d={path + pathCloser}
					style={{
						fill: 'rgba(245, 245, 255, .7)',
						stroke: 'rgb(180, 180, 255)',
					}}
				/>
			</svg>
		</DomainWrapper>
	)
}

export default Sparkline
