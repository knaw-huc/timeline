import * as React from 'react'

const Span = (props) =>
	<span
		style={{
			textShadow: '-3px 0 rgba(255, 255, 255, .7), 3px 0 rgba(255, 255, 255, .7), 0 -3px rgba(255, 255, 255, .7), 0 3px rgba(255, 255, 255, .7)',
		}}
	>
		{props.children}
	</span>

const DomainLabels: React.SFC = (props) =>
	<div
		style={{
			alignItems: 'center',
			boxSizing: 'border-box',
			color: '#666',
			display: 'grid',
			height: '100%',
			fontSize: '1.5em',
			gridTemplateColumns: '50% 50%',
			padding: '0 .5em',
			position: 'absolute',
			width: '100%',
			zIndex: 2,
		}}
	>
		<div><Span>1924</Span></div>
		<div style={{textAlign: 'right'}}>
			<Span>1948</Span>
		</div>
	</div>

export default DomainLabels