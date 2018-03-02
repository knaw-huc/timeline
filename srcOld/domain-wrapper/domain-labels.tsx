// ToDo move out of sparkline because it is used on every domain
import * as React from 'react'
import Domain from '../models/domain';

const Span = (props) =>
	<span
		style={{
			textShadow: '-3px 0 rgba(255, 255, 255, .7), 3px 0 rgba(255, 255, 255, .7), 0 -3px rgba(255, 255, 255, .7), 0 3px rgba(255, 255, 255, .7)',
		}}
	>
		{props.children}
	</span>

export interface IProps {
	domain: Domain
}
const DomainLabels: React.SFC<IProps> = (props) =>
	<div
		style={{
			alignItems: 'center',
			boxSizing: 'border-box',
			color: '#666',
			display: 'grid',
			height: '100%',
			gridTemplateColumns: '50% 50%',
			padding: '0 .25em',
			position: 'absolute',
			width: '100%',
			zIndex: 2,
		}}
	>
		<div>
			<Span>{props.domain.from.getFullYear()}</Span>
		</div>
		<div style={{textAlign: 'right'}}>
			<Span>{props.domain.to.getFullYear()}</Span>
		</div>
	</div>

export default DomainLabels